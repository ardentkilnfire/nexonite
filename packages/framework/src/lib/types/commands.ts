import type { Nexonite } from '$/nexonite';
import type { MessageContextMenuCommand, UserContextMenuCommand } from '$commands/context';
import type { SlashCommand } from '$commands/slash';
import type {
    AutocompleteInteraction,
    Awaitable,
    BaseInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

/**
 * Type representing a command execution function.
 *
 * @template T - The type of the interaction.
 * @param {Nexonite} client - The client instance.
 * @param {T} interaction - The interaction received.
 * @returns {Awaitable<void>} - A promise that resolves when the command is done executing.
 */
export type CommandExec<T extends BaseInteraction> = (
    client: Nexonite,
    interaction: T,
) => Awaitable<void>;

/**
 * Type representing the configuration options for a command.
 */
export interface CommandConfigs {
    /**
     * The cooldown for the command in seconds. Will be ignored when `globalCooldown` is set.
     */
    cooldown?: number;

    /**
     * Whether the command can be used in DMs.
     */
    dm?: boolean;

    /**
     * Whether the command is disabled.
     */
    disabled?: boolean;

    /**
     * Whether the command can only be used by developers.
     */
    devOnly?: boolean;

    /**
     * The guilds where the command is available.
     */
    guilds?: string[];

    /**
     * Whether the command should be deleted from the API after it is marked for deletion.
     */
    markForDeletionFromAPI?: boolean;
}

/**
 * Type representing the JSON body for context menu commands.
 */
export type ContextMenuCommandsJSONBody = RESTPostAPIContextMenuApplicationCommandsJSONBody;

/**
 * Type representing the JSON body for slash commands.
 */
export type SlashCommandsJSONBody = RESTPostAPIApplicationCommandsJSONBody;

/**
 * Type representing the autocomplete handler for a command.
 */
export type AutoCompleteHandler = (
    client: Nexonite,
    interaction: AutocompleteInteraction,
) => Promise<void>;

/**
 * Type representing the JSON body for any type of command.
 */
export type CommandJSONBody = ContextMenuCommandsJSONBody | SlashCommandsJSONBody;

/**
 * Type representing any type of command (slash, user context menu, message context menu).
 */
export type AnyCommand = SlashCommand | UserContextMenuCommand | MessageContextMenuCommand;
