import { ApplicationCommandType } from 'discord.js';
import { BaseCommand } from '.';

// Types
import type { APICommandExec, ContextMenuCommandOptions } from '$types/commands';
import type {
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from 'discord.js';

/**
 * Class representing a user context menu command.
 */
export class UserContextMenuCommand extends BaseCommand<
    ContextMenuCommandOptions,
    APICommandExec<UserContextMenuCommandInteraction>,
    UserContextMenuCommandInteraction
> {
    /**
     * The type of the command.
     */
    public readonly type = ApplicationCommandType.User;

    /**
     * Creates a new UserContextMenuCommand.
     *
     * @param {ContextMenuCommandOptions} options - The options for the command.
     * @param {APICommandExec<UserContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     */
    constructor(
        options: ContextMenuCommandOptions,
        execute: APICommandExec<UserContextMenuCommandInteraction>,
    ) {
        super(options, execute);

        if (this.type !== options.data.type)
            throw new TypeError(
                `Expected type to be ${this.type} but received ${options.data.type}`,
            );
    }
}

/**
 * Function to create a new UserContextMenuCommand.
 *
 * @param {ContextMenuCommandOptions & { execute: APICommandExec<UserContextMenuCommandInteraction> }} options - The options for the command.
 * @returns {UserContextMenuCommand} - The created UserContextMenuCommand.
 */
export function userContextMenuCommand(
    options: ContextMenuCommandOptions & {
        execute: APICommandExec<UserContextMenuCommandInteraction>;
    },
): UserContextMenuCommand {
    const { execute, ...rest } = options;
    return new UserContextMenuCommand({ ...rest }, execute);
}

/**
 * Class representing a message context menu command.
 */
export class MessageContextMenuCommand extends BaseCommand<
    ContextMenuCommandOptions,
    APICommandExec<MessageContextMenuCommandInteraction>,
    MessageContextMenuCommandInteraction
> {
    /**
     * The type of the command.
     */
    public readonly type = ApplicationCommandType.Message;

    /**
     * Creates a new MessageContextMenuCommand.
     *
     * @param {ContextMenuCommandOptions} options - The options for the command.
     * @param {APICommandExec<MessageContextMenuCommandInteraction>} execute - The function to execute when the command is triggered.
     */
    constructor(
        options: ContextMenuCommandOptions,
        execute: APICommandExec<MessageContextMenuCommandInteraction>,
    ) {
        super(options, execute);
        if (this.type !== options.data.type)
            throw new TypeError(
                `Expected type to be ${this.type} but received ${options.data.type}`,
            );
    }
}

/**
 * Function to create a new MessageContextMenuCommand.
 *
 * @param {ContextMenuCommandOptions & { execute: APICommandExec<MessageContextMenuCommandInteraction> }} options - The options for the command.
 * @returns {MessageContextMenuCommand} - The created MessageContextMenuCommand.
 */
export function messageContextMenuCommand(
    options: ContextMenuCommandOptions & {
        execute: APICommandExec<MessageContextMenuCommandInteraction>;
    },
): MessageContextMenuCommand {
    const { execute, ...rest } = options;
    return new MessageContextMenuCommand({ ...rest }, execute);
}
