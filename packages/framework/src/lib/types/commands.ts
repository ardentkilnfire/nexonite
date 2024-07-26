import type { SlashCommand } from '$/commands/slash';
import type { Nexonite } from '$/nexonite';
import type {
    AutocompleteInteraction,
    Awaitable,
    BaseInteraction,
    Interaction,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

/**
 * Configuration options for a command.
 */
export interface CommandConfigs {
    /**
     * The cooldown for the command in seconds.
     */
    cooldown: number;

    /**
     * Whether the command can only be used by developers.
     */
    devOnly: boolean;

    /**
     * Whether the command can only be used in DMs.
     */
    dm: boolean;

    /**
     * Whether the command is disabled.
     */
    disabled: boolean;

    /**
     * The guild IDs where the command is available.
     */
    guilds: string[];

    /**
     * Whether the command should be deferred.
     */
    defer: boolean;
}

/**
 * Options for executing a command.
 * @template T The type of interaction.
 */
interface CommandExecOptions<T extends BaseInteraction> {
    /**
     * The interaction.
     */
    interaction: T;

    /**
     * The client.
     */
    client: Nexonite;
}

/**
 * The function that executes a command.
 * @template T The type of interaction.
 * @param options The options.
 * @returns A promise that resolves when the command is executed.
 */
export type CommandExec<T extends BaseInteraction> = (
    options: CommandExecOptions<T>,
) => Awaitable<void>;

/**
 * The data for a slash command.
 */
export type SlashCommandData = RESTPostAPIApplicationCommandsJSONBody;

/**
 * The data for a context menu command.
 */
export type ContextCommandData = RESTPostAPIContextMenuApplicationCommandsJSONBody;

/**
 * The data for a command.
 */
export type CommandData = SlashCommandData | ContextCommandData;

/**
 * The function that handles autocomplete interactions.
 * @param options The options.
 * @returns A promise that resolves when the autocomplete is handled.
 */
export type AutoCompleteHandler = (options: {
    client: Nexonite;
    interaction: AutocompleteInteraction;
}) => Awaitable<void>;

/**
 * Any type of command.
 */
export type AnyCommand = SlashCommand;

/**
 * The commands available in guilds.
 */
export type GuildCommands = Map<string, Set<AnyCommand>>;

/**
 * The global commands.
 */
export type GlobalCommands = Set<AnyCommand>;

/**
 * A map from command IDs to commands.
 */
export type CommandIdMap = Map<string, AnyCommand>;

/**
 * The resolved commands.
 */
export interface ResolvedCommands {
    /**
     * The commands available in guilds.
     */
    guildCommands: GuildCommands;

    /**
     * The global commands.
     */
    globalCommands: GlobalCommands;

    /**
     * All the commands.
     */
    commands: Set<AnyCommand>;
}

/**
 * A map from command names to command IDs.
 */
export type IdResolverMap = Record<string, string>;

/**
 * The data for a command response.
 */
export interface CommandResponseData {
    /**
     * The client.
     */
    client: Nexonite;

    /**
     * The interaction.
     */
    interaction: Interaction;
    
    /**
     * The map from command IDs to commands.
     */
    commandIdMap: CommandIdMap;
}

