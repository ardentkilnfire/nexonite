import { BaseCommand } from '..';

// Types
import type {
    AutoCompleteHandler,
    CommandConfigs,
    CommandExec,
    SlashCommandData,
} from '$types/commands';
import type { ChatInputCommandInteraction } from 'discord.js';

/**
 * Class representing a slash command.
 * @extends BaseCommand
 */
export class SlashCommand extends BaseCommand<SlashCommandData, ChatInputCommandInteraction> {
    /**
     * The autocomplete handler for this command.
     */
    public readonly autocomplete?: AutoCompleteHandler;

    /**
     * Creates an instance of SlashCommand.
     * @param {SlashCommandData} data - The data for the command.
     * @param {CommandExec<ChatInputCommandInteraction>} execute - The function to execute when the command is triggered.
     * @param {Partial<CommandConfigs>} [configs] - The configuration options for the command.
     * @param {AutoCompleteHandler} [autocomplete] - The autocomplete handler for this command.
     */
    constructor(
        data: SlashCommandData,
        execute: CommandExec<ChatInputCommandInteraction>,
        configs?: Partial<CommandConfigs>,
        autocomplete?: AutoCompleteHandler,
    ) {
        super(data, execute, configs);

        if (autocomplete && typeof autocomplete !== 'function') {
            throw new TypeError('Autocomplete handler must be a function');
        }

        this.autocomplete = autocomplete;
    }
}

/**
 * Creates a slash command.
 * @param {Object} options - The options for the command.
 * @param {SlashCommandData} options.data - The data for the command.
 * @param {CommandExec<ChatInputCommandInteraction>} options.execute - The function to execute when the command is triggered.
 * @param {Partial<CommandConfigs>} [options.config] - The configuration options for the command.
 * @param {AutoCompleteHandler} [options.autocomplete] - The autocomplete handler for this command.
 * @returns {SlashCommand} The created slash command.
 */
export function slashCommand({
    data,
    execute,
    config,
    autocomplete,
}: {
    data: SlashCommandData;
    execute: CommandExec<ChatInputCommandInteraction>;
    config?: Partial<CommandConfigs>;
    autocomplete?: AutoCompleteHandler;
}): SlashCommand {
    return new SlashCommand(data, execute, config, autocomplete);
}
