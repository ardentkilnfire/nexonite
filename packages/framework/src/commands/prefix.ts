import { BaseCommand } from '.';

// Types
import type { CommandConfigs, PrefixCommandExec, PrefixCommandsJSONBody } from '$types/commands';

/**
 * Class representing a prefix command.
 */
export class PrefixCommand extends BaseCommand<PrefixCommandsJSONBody, PrefixCommandExec> {
    /**
     * Creates a new instance of the prefix command.
     *
     * @param {PrefixCommandsJSONBody} options - The options for the command.
     * @param {PrefixCommandExec} execute - The function to execute when the command is triggered.
     */
    constructor(
        data: PrefixCommandsJSONBody,
        execute: PrefixCommandExec,
        configs?: CommandConfigs,
    ) {
        super(data, execute, configs);
    }
}

/**
 * Function to create a new PrefixCommand.
 *
 * @param {PrefixCommandsJSONBody & { execute: PrefixCommandExec; }} options - The options for the command.
 * @returns {PrefixCommand} - The created PrefixCommand.
 */
export function prefixCommand({
    data,
    execute,
    configs,
}: {
    data: PrefixCommandsJSONBody;
    execute: PrefixCommandExec;
    configs?: CommandConfigs;
}): PrefixCommand {
    return new PrefixCommand(data, execute, configs);
}
