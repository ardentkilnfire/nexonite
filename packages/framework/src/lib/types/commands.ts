import type { Nexonite } from '$/nexonite';
import type {
    Awaitable,
    BaseInteraction,
    Message,
    PermissionResolvable,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

/**
 * Type for the execution of an API command.
 *
 * @template T - The type of the interaction.
 * @param {Nexonite} client - The client instance.
 * @param {T} interaction - The interaction received.
 * @returns {Awaitable<void>} - A promise that resolves when the command is done executing.
 */
export type APICommandExec<T extends BaseInteraction> = (
    client: Nexonite,
    interaction: T,
) => Awaitable<void>;

/**
 * Type for the execution of a prefix command.
 *
 * @param {Nexonite} client - The client instance.
 * @param {Message} msg - The message received.
 * @param {...string[]} args - The arguments passed to the command.
 * @returns {Awaitable<void>} - A promise that resolves when the command is done executing.
 */
export type PrefixCommandExec = (
    client: Nexonite,
    msg: Message,
    ...args: string[]
) => Awaitable<void>;

/**
 * Interface for the options of a command.
 */
export interface BaseCommandOptions {
    /**
     * Additional configuration options.
     */
    config?: {
        /**
         * Whether the command can only be used in DMs.
         */
        dm?: boolean;

        /**
         * Whether the command is disabled.
         */
        disabled?: boolean;

        /**
         * Whether the command is only available to the bot developer(s).
         */
        devOnly?: boolean;

        /**
         * The cooldown duration in seconds.
         */
        cooldown?: number;

        /**
         * Whether the command should be marked for deletion from the API upon the bot's restart.
         */
        markForDeletionFromAPI?: boolean;
    };
}

/**
 * Interface for the options of context menu commands.
 *
 */
export interface ContextMenuCommandOptions extends BaseCommandOptions {
    /**
     * The data for the context menu command.
     */
    data: RESTPostAPIContextMenuApplicationCommandsJSONBody;
}

/**
 * Interface for the options of prefix commands.
 *
 */
export interface PrefixCommandOptions extends BaseCommandOptions {
    /**
     * The data for the prefix command.
     */
    data: {
        /**
         * The name of the command.
         */
        name: string;

        /**
         * The description of the command.
         */
        description: string;

        /**
         * The expected arguments for the command.
         */
        expectedArgs?: string[];

        /**
         * The aliases for the command.
         */
        aliases?: string[];

        /**
         * The permissions required to run the command.
         */
        permissions?: PermissionResolvable;
    };
}

/**
 * Type that represents the options for a command.
 *
 */
export type CommandOptions =
    | ContextMenuCommandOptions
    | PrefixCommandOptions;
