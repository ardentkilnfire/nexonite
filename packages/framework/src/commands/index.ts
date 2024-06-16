import { createHash } from 'node:crypto';

// Types
import type { APICommandExec, CommandOptions, PrefixCommandExec } from '$types/commands';
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
    A extends CommandOptions,
    K extends APICommandExec<T> | PrefixCommandExec,
    T extends BaseInteraction = ChatInputCommandInteraction | ContextMenuCommandInteraction,
> {
    /**
     * The command options.
     */
    public readonly options: A;
    /**
     * The command execution function.
     */
    public readonly execute: K;

    /**
     * Creates a new instance of the class.
     *
     * @param {A} options - The command options.
     * @param {K} execute - The command execution function.
     * @throws {TypeError} If the execute function is not of the correct type.
     */
    constructor(options: A, execute: K) {
        if (!execute || typeof execute != 'function')
            throw new TypeError(`Expected execute to be a function but received ${typeof execute}`);

        (this.options = options), (this.execute = execute);
    }

    
    /**
     * Gets the command data.
     *
     */
    get commandData(): A['data'] {
        return this.options.data;
    }

    /**
     * Gets the hash of the command data for caching.
     *
     * @returns {string} - The hash of the command data.
     */
    // Will be required for caching system
    get hash() {
        return createHash('sha256').update(JSON.stringify(this.commandData)).digest('hex');
    }
}
