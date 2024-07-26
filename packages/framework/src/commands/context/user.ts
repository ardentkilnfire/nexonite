import { BaseCommand } from '..';

// Types
import type { CommandConfigs, CommandExec, ContextCommandData } from '$types/commands';
import type { UserContextMenuCommandInteraction } from 'discord.js';

/**
 * Class representing a user context menu command.
 * @extends {BaseCommand<ContextCommandData, UserContextMenuCommandInteraction>}
 */
export class UserContextMenuCommand extends BaseCommand<
    ContextCommandData,
    UserContextMenuCommandInteraction
> {
    /**
     * Creates an instance of UserContextMenuCommand.
     * @param {ContextCommandData} data - The data for the command.
     * @param {CommandExec<UserContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     * @param {Partial<CommandConfigs>} [configs] - The configuration options for the command.
     */
    constructor(
        data: ContextCommandData,
        execute: CommandExec<UserContextMenuCommandInteraction>,
        configs?: Partial<CommandConfigs>,
    ) {
        super(data, execute, configs);
    }
}

/**
 * Creates a user context menu command.
 * @param {Object} options - The options for the command.
 * @param {ContextCommandData} options.data - The data for the command.
 * @param {CommandExec<UserContextMenuCommandInteraction>} options.execute - The function to execute when the command is triggered.
 * @param {Partial<CommandConfigs>} [options.config] - The configuration options for the command.
 * @returns {UserContextMenuCommand} The created user context menu command.
 */
export function userContextMenuCommand({
    data,
    execute,
    config,
}: {
    data: ContextCommandData;
    execute: CommandExec<UserContextMenuCommandInteraction>;
    config?: Partial<CommandConfigs>;
}) {
    return new UserContextMenuCommand(data, execute, config);
}

