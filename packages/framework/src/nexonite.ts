import { nexoOptionsSchema } from '$/nexoSchema';
import { getCommandIdMap } from '$commands/cache';
import { resolveCommands } from '$commands/resolve';
import { respond } from '$commands/respond';
import { Event } from '$events/.';
import { highlight } from '$utils/.';
import { loadFiles } from '$utils/file_loader';
import { createLogger } from '$utils/logger';
import { parseSchema } from '$utils/zod';
import { Client } from 'discord.js';

// Types
import type { EventName } from '$types/events';
import type { Logger } from '$types/logger';
import type { NexoOptions } from '$types/nexonite';
import type { ClientEvents } from 'discord.js';

/**
 * The main class of the framework.
 * Extends Discord.js Client class to provide additional functionality.
 */
export class Nexonite extends Client {
    /**
     * The logger instance for this client.
     */
    public readonly log: Logger;

    /**
     * The options for the client.
     */
    public readonly nexoOptions: NexoOptions;

    /**
     * Creates a new Nexonite instance.
     * @param options - The options for the client.
     */
    constructor(options: NexoOptions) {
        super(options.clientOptions);

        this.log = createLogger(this);
        // @ts-expect-error issue with intents
        this.nexoOptions = parseSchema('NexoOptions', nexoOptionsSchema, options) as NexoOptions;
    }

    /**
     * Logs in the client with the provided token.
     * If no token is provided, it looks for the DISCORD_TOKEN environment variable.
     * @param token - The token to use for login.
     * @returns A promise that resolves with the token.
     */
    async login(token?: string): Promise<string> {
        // Try to load commands
        if (this.nexoOptions.commands) {
            this.log.debug('Attempting to load commands...');
            this.initCommandsRegistration(this.nexoOptions.commands);
        } else {
            this.log.debug('No commands path specified!');
        }

        // Try to load events
        if (this.nexoOptions.events) {
            this.log.debug('Attempting to load events...');
            this.registerEvents(this.nexoOptions.events);
        } else {
            this.log.debug('No events path specified!');
        }

        return super.login(token || process.env.DISCORD_TOKEN).then((token) => {
            this.log(`Logged in as ${this.user?.tag}`);
            return token;
        });
    }

    /**
     * Registers events from the specified path.
     * @param eventsPath - The path to the event files.
     */
    private async registerEvents(eventsPath: string) {
        const events = new Set<Event<EventName>>();

        await loadFiles<Event<EventName>>(eventsPath, (event) => {
            if (!(event instanceof Event))
                throw new Error(`Found invalid item "${event}" in options.events`);

            events.add(event);
        });

        if (!events.size) return this.log.debug('Events path is specified, but no events found!');

        for (const event of events) {
            const eventCallback = async (...args: ClientEvents[EventName]) => {
                try {
                    await event.execute(this, ...args);
                } catch (err) {
                    this.log.error(
                        `There was an error running event -> ${highlight(`(${event.name})`, { color: 'cyan', bold: true })}\n`,
                        err,
                    );
                }
            };

            event.options.once
                ? this.once(event.name, eventCallback)
                : this.on(event.name, eventCallback);
        }
    }

    /**
     * Initializes command registration and event listening.
     * Resolves commands from the specified path and registers them with the client.
     * Listens for 'interactionCreate' events and responds to them.
     *
     * @param {string} commandPaths - The path to the command files.
     * @throws {Error} If dev guilds array is empty and dev commands are used.
     */
    private async initCommandsRegistration(commandPaths: string) {
        const resolvedCommands = await resolveCommands(this, commandPaths);
        const commandIdMap = await getCommandIdMap(this, resolvedCommands);

        if (!this.nexoOptions.dev?.guilds?.length) {
            const hasDevCommands = Array.from(resolvedCommands.commands).some(
                (command) => command.configs?.devOnly,
            );

            if (this.nexoOptions.dev?.global || hasDevCommands)
                throw new Error(
                    'You must provide at least one guild id in the dev guilds array to use dev commands',
                );
        }

        // Whenever there is a interactionCreate event respond to it
        this.on('interactionCreate', (interaction) => {
            this.log.debug(
                `Interaction received: ${interaction.id} | ${interaction.type} | Command Id: ${interaction.isCommand() && interaction.commandId}`,
            );

            respond({
                interaction,
                client: this,
                commandIdMap,
            });
        });
    }
}
