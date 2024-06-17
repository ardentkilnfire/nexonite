import { BaseCommand } from '.';

// Types
import type { APICommandExec, AutoCompleteHandler, SlashCommandsOptions } from '$types/commands';
import type { ChatInputCommandInteraction } from 'discord.js';

/**
 * Class representing a slash command.
 *
 * @template T - The type of the interaction.
 */
export class SlashCommand extends BaseCommand<
    SlashCommandsOptions,
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
     * @param {SlashCommandsOptions} options - The options for the command.
     * @param {APICommandExec<ChatInputCommandInteraction>} execute - The command execution function.
     * @param {AutoCompleteHandler} [autocomplete] - The autocomplete handler for the command.
     * @throws {TypeError} If the autocomplete handler is not a function.
     */
    constructor(
        options: SlashCommandsOptions,
        execute: APICommandExec<ChatInputCommandInteraction>,
        autocomplete?: AutoCompleteHandler,
    ) {
        super(options, execute);

        if (autocomplete && typeof autocomplete !== 'function') {
            throw new TypeError('Autocomplete handler must be a function');
        }

        this.autocomplete = autocomplete;
    }
}

/**
 * Function to create a new slash command.
 *
 * @param {SlashCommandsOptions & { execute: APICommandExec<ChatInputCommandInteraction>; autocomplete?: AutoCompleteHandler; }} options - The options for the command.
 * @returns {SlashCommand} - The created slash command.
 */
export function slashCommand(
    options: SlashCommandsOptions & {
        execute: APICommandExec<ChatInputCommandInteraction>;
        autocomplete?: AutoCompleteHandler;
    },
): SlashCommand {
    const { autocomplete, execute, ...rest } = options;
    return new SlashCommand({ ...rest }, execute, autocomplete);
}
