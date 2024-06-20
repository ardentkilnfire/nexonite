import { BaseCommand } from '.';

// Types
import type {
    APICommandExec,
    AutoCompleteHandler,
    CommandConfigs,
    SlashCommandsJSONBody,
} from '$types/commands';
import type { ChatInputCommandInteraction } from 'discord.js';

/**
 * Class representing a slash command.
 *
 * @template T - The type of the interaction.
 */
export class SlashCommand extends BaseCommand<
    SlashCommandsJSONBody,
    APICommandExec<ChatInputCommandInteraction>,
    ChatInputCommandInteraction
> {
    /**
     * The autocomplete handler for the command.
     */
    public readonly autocomplete?: AutoCompleteHandler;

    /**
     * Creates a new instance of the class.
     *
     * @param {SlashCommandsJSONBody} options - The options for the command.
     * @param {APICommandExec<ChatInputCommandInteraction>} execute - The command execution function.
     * @param {AutoCompleteHandler} [autocomplete] - The autocomplete handler for the command.
     * @throws {TypeError} If the autocomplete handler is not a function.
     */
    constructor(
        data: SlashCommandsJSONBody,
        execute: APICommandExec<ChatInputCommandInteraction>,
        config?: CommandConfigs,
        autocomplete?: AutoCompleteHandler,
    ) {
        super(data, execute, config);

        if (autocomplete && typeof autocomplete !== 'function') {
            throw new TypeError('Autocomplete handler must be a function');
        }

        this.autocomplete = autocomplete;
    }
}

/**
 * Function to create a new slash command.
 *
 * @param {SlashCommandsJSONBody & { execute: APICommandExec<ChatInputCommandInteraction>; autocomplete?: AutoCompleteHandler; }} options - The options for the command.
 * @returns {SlashCommand} - The created slash command.
 */
export function slashCommand({
    data,
    execute,
    config,
    autocomplete,
}: {
    data: SlashCommandsJSONBody;
    execute: APICommandExec<ChatInputCommandInteraction>;
    config?: CommandConfigs;
    autocomplete?: AutoCompleteHandler;
}): SlashCommand {
    return new SlashCommand(data, execute, config, autocomplete);
}
