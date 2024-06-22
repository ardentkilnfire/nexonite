import { createHash } from 'node:crypto';

// Types
import type { CommandConfigs, CommandExec, CommandJSONBody } from '$types/commands';
import type {
    BaseInteraction,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
} from 'discord.js';

/**
 * Abstract base class for all commands.
 *
 * @template A - The command options.
 * @template K - The command execution function.
 * @template T - The base interaction type. Defaults to ChatInputCommandInteraction | ContextMenuCommandInteraction.
 */
export abstract class BaseCommand<
    A extends CommandJSONBody,
    K extends CommandExec<T>,
    T extends BaseInteraction = ChatInputCommandInteraction | ContextMenuCommandInteraction,
> {
    /**
     * The command options.
     */
    public readonly data: A;

    public readonly configs?: CommandConfigs;

    /**
     * The command execution function.
     */
    public readonly execute: K;

    constructor(data: A, execute: K, configs?: CommandConfigs) {
        if (!execute || typeof execute != 'function')
            throw new TypeError(`Expected execute to be a function but received ${typeof execute}`);

        this.data = data;
        this.execute = execute;
        this.configs = configs;
    }

    /**
     * Gets the command data.
     *
     */
    get commandData(): A {
        return this.data;
    }

    /**
     * Gets the hash of the command data for caching.
     *
     * @returns {string} - The hash of the command data.
     */
    // Will be required for caching system
    get hash(): string {
        return createHash('sha256').update(JSON.stringify(this.commandData)).digest('hex');
    }
}
