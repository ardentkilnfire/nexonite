import { BaseCommand } from '.';

// Types
import type { PrefixCommandExec, PrefixCommandOptions } from '$types/commands';

/**
 * Class representing a prefix command.
 */
export class PrefixCommand extends BaseCommand<PrefixCommandOptions, PrefixCommandExec> {
    /**
     * Creates a new instance of the prefix command.
     *
     * @param {PrefixCommandOptions} options - The options for the command.
     * @param {PrefixCommandExec} execute - The function to execute when the command is triggered.
     */
    constructor(options: PrefixCommandOptions, execute: PrefixCommandExec) {
        super(options, execute);
    }
}

/**
 * Function to create a new PrefixCommand.
 *
 * @param {PrefixCommandOptions & { execute: PrefixCommandExec; }} options - The options for the command.
 * @returns {PrefixCommand} - The created PrefixCommand.
 */
export function prefixCommand(
    options: PrefixCommandOptions & {
        execute: PrefixCommandExec;
    },
): PrefixCommand {
    const { execute, ...rest } = options;
    return new PrefixCommand({ ...rest }, execute);
}
