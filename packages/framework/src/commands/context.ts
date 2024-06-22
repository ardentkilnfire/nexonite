import { ApplicationCommandType } from 'discord.js';
import { BaseCommand } from '.';

// Types
import type { CommandConfigs, CommandExec, ContextMenuCommandsJSONBody } from '$types/commands';
import type {
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from 'discord.js';

/**
 * Class representing a user context menu command.
 */
export class UserContextMenuCommand extends BaseCommand<
    ContextMenuCommandsJSONBody,
    CommandExec<UserContextMenuCommandInteraction>,
    UserContextMenuCommandInteraction
> {
    /**
     * The type of the command.
     */
    public readonly type = ApplicationCommandType.User;

    /**
     * Creates a new UserContextMenuCommand.
     *
     * @param {ContextMenuCommandsJSONBody} options - The options for the command.
     * @param {CommandExec<UserContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     */
    constructor(
        data: ContextMenuCommandsJSONBody,
        execute: CommandExec<UserContextMenuCommandInteraction>,
        configs?: CommandConfigs,
    ) {
        super(data, execute, configs);

        if (this.type !== data.type)
            throw new TypeError(`Expected type to be ${this.type} but received ${data.type}`);
    }
}

/**
 * Function to create a new UserContextMenuCommand.
 *
 * @param {ContextMenuCommandsJSONBody & { execute: CommandExec<UserContextMenuCommandInteraction> }} options - The options for the command.
 * @returns {UserContextMenuCommand} - The created UserContextMenuCommand.
 */
export function userContextMenuCommand({
    data,
    execute,
    configs,
}: {
    data: ContextMenuCommandsJSONBody;
    execute: CommandExec<UserContextMenuCommandInteraction>;
    configs?: CommandConfigs;
}): UserContextMenuCommand {
    return new UserContextMenuCommand(data, execute, configs);
}

/**
 * Class representing a message context menu command.
 */
export class MessageContextMenuCommand extends BaseCommand<
    ContextMenuCommandsJSONBody,
    CommandExec<MessageContextMenuCommandInteraction>,
    MessageContextMenuCommandInteraction
> {
    /**
     * The type of the command.
     */
    public readonly type = ApplicationCommandType.Message;

    /**
     * Creates a new MessageContextMenuCommand.
     *
     * @param {ContextMenuCommandsJSONBody} options - The options for the command.
     * @param {CommandExec<MessageContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     */
    constructor(
        data: ContextMenuCommandsJSONBody,
        execute: CommandExec<MessageContextMenuCommandInteraction>,
        config?: CommandConfigs,
    ) {
        super(data, execute, config);
        if (this.type !== data.type)
            throw new TypeError(`Expected type to be ${this.type} but received ${data.type}`);
    }
}

/**
 * Function to create a new MessageContextMenuCommand.
 *
 * @param {ContextMenuCommandsJSONBody & { execute: CommandExec<MessageContextMenuCommandInteraction> }} options - The options for the command.
 * @returns {MessageContextMenuCommand} - The created MessageContextMenuCommand.
 */
export function messageContextMenuCommand({
    data,
    execute,
    configs,
}: {
    data: ContextMenuCommandsJSONBody;
    execute: CommandExec<MessageContextMenuCommandInteraction>;
    configs?: CommandConfigs;
}): MessageContextMenuCommand {
    return new MessageContextMenuCommand(data, execute, configs);
}
