import type { setDevMode } from '$utils/.';
import type { ClientOptions } from 'discord.js';
import type { AtLeastOne } from './utils';

export interface NexoOptions {
    /**
     * Base discord.js client options
     *
     * @example
     * clientOptions: {
     *     intents: [
     *         GatewayIntentBits.Guilds,
     *     ]
     * }
     */
    clientOptions: ClientOptions;

    /**
     * Path to commands
     *
     * @example
     * commandsPath: './src/commands'
     */
    commandsPath?: string;

    /**
     * Path to events
     *
     * @example
     * eventsPath: './src/events'
     */
    eventsPath?: string;

    /**
     * Paths to components
     *
     * @example
     * components: {
     *     buttonsPath: './src/components/buttons',
     *     modalsPath: './src/components/modals',
     *     selectMenusPath: './src/components/selectMenus',
     * }
     */
    components?: AtLeastOne<{
        /**
         * Path to buttons
         */
        buttonsPath: string;
        /**
         * Path to modals
         */
        modalsPath: string;
        /**
         * Path to select menus
         */
        selectMenusPath: string;
    }>;

    /**
     * The dev options for the bot.
     *
     * @example
     * dev: setDevMode({
     *     enableGlobally: true, // marks all commands as devOnly
     *     guilds: ['123456789123456789', '987654321987654321'],
     * })
     *
     * @see{@link setDevMode}
     */
    dev?: ReturnType<typeof setDevMode>;

    /**
     * Should nexonite cache commands - highly recommended
     * @default true
     */
    cache?: boolean;

    /**
     * Whether to emit debug messages
     *
     * @default false
     *
     * @example
     * debug: true // will log debug messages
     */
    debug?: boolean;

    /**
     * The global cooldown for all commands and components in milliseconds.
     *
     * Hint: If you want to disable the global cooldown, set it to 0
     *
     * @default 5000
     *
     * @example
     * cooldown: 5000 // 5 seconds
     */
    globalCooldown?: number;

    /**
     * Custom messages to be used in the cooldown middleware.
     *
     * @example
     * TODO: Add link to docs for string modifiers like %remainingCooldown%
     *
     * messages: {
     *     cooldownMessage: 'You are on cooldown, please try again after %remainingCooldown%.',
     *     unknownCommand: 'Unknown command %commandName%.',
     *     unknownComponent: 'Unknown %componentType%  %componentName%.',
     * }
     *
     */
    messages?: AtLeastOne<{
        /**
         * Message to be sent when a user is on cooldown.
         */
        cooldown: string;
        /**
         * Message to be sent when a user tries to run an unknown command.
         */
        unknownCommand: string;
        /**
         * Message to be sent when a user tries to run an unknown component.
         */
        unknownComponent: string;
    }>;
}
