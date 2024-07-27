import { BaseCommand } from '..';

// Types
import type { CommandConfigs, CommandExec, ContextCommandData } from '$types/commands';
import type { MessageContextMenuCommandInteraction } from 'discord.js';

/**
 * Class representing a message context menu command.
 * @extends BaseCommand
 */
export class MessageContextMenuCommand extends BaseCommand<
    ContextCommandData,
    MessageContextMenuCommandInteraction
> {
    /**
     * Creates an instance of MessageContextMenuCommand.
     * @param {ContextCommandData} data - The data for the context menu command.
     * @param {CommandExec<MessageContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     * @param {Partial<CommandConfigs>} [configs] - The configuration options for the command.
     */
    constructor(
        data: ContextCommandData,
        execute: CommandExec<MessageContextMenuCommandInteraction>,
        configs?: Partial<CommandConfigs>,
    ) {
        super(data, execute, configs);
    }
}

/**
 * Creates a message context menu command.
 * @param {Object} options - The options for the command.
 * @param {ContextCommandData} options.data - The data for the context menu command.
 * @param {CommandExec<MessageContextMenuCommandInteraction>} options.execute - The function to execute when the command is triggered.
 * @param {Partial<CommandConfigs>} [options.config] - The configuration options for the command.
 * @returns {MessageContextMenuCommand} The created message context menu command.
 */
export function messageContextMenuCommand({
    data,
    execute,
    config,
}: {
    data: ContextCommandData;
    execute: CommandExec<MessageContextMenuCommandInteraction>;
    config?: Partial<CommandConfigs>;
}): MessageContextMenuCommand {
    return new MessageContextMenuCommand(data, execute, config);
}
