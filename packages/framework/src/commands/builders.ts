import { PermissionResolvable } from 'discord.js';

// Types
import type { PrefixCommandsJSONBody } from '$types/commands';

/**
 * Class representing a prefix command builder.
 */
export class PrefixCommandBuilder {
    /**
     * The name of the command.
     */
    public readonly name: string = undefined!;
    /**
     * The description of the command.
     */
    public readonly description: string = undefined!;
    /**
     * The expected arguments for the command.
     */
    public readonly expectedArgs?: string[];
    /**
     * The aliases for the command.
     */
    public readonly aliases?: string[];
    /**
     * The permissions required to run the command.
     */
    public readonly permissions?: PermissionResolvable;

    /**
     * Sets the name of the command and returns the builder.
     *
     * @param {string} name - The name of the command.
     * @returns {PrefixCommandBuilder} - The builder instance.
     */
    public setName(name: string): PrefixCommandBuilder {
        Reflect.set(this, 'name', name);
        return this;
    }

    /**
     * Sets the description of the command and returns the builder.
     *
     * @param {string} description - The description of the command.
     * @returns {PrefixCommandBuilder} - The builder instance.
     */
    public setDescription(description: string): PrefixCommandBuilder {
        Reflect.set(this, 'description', description);
        return this;
    }

    /**
     * Sets the expected arguments of the command and returns the builder.
     *
     * @param {string[]} expectedArgs - The expected arguments of the command.
     * @returns {PrefixCommandBuilder} - The builder instance.
     */
    public setExpectedArgs(expectedArgs: string[]): PrefixCommandBuilder {
        Reflect.set(this, 'expectedArgs', expectedArgs);
        return this;
    }

    /**
     * Sets the aliases of the command and returns the builder.
     *
     * @param {string[]} aliases - The aliases of the command.
     * @returns {PrefixCommandBuilder} - The builder instance.
     */
    public setAliases(aliases: string[]): PrefixCommandBuilder {
        Reflect.set(this, 'aliases', aliases);
        return this;
    }

    /**
     * Sets the permissions required to run the command and returns the builder.
     *
     * @param {PermissionResolvable} permissions - The permissions required to run the command.
     * @returns {PrefixCommandBuilder} - The builder instance.
     */
    public setPermissions(permissions: PermissionResolvable): PrefixCommandBuilder {
        Reflect.set(this, 'permissions', permissions);
        return this;
    }

    /**
     * Converts the builder into a JSON object representing the command data.
     *
     */
    public toJSON(): PrefixCommandsJSONBody {
        return {
            name: this.name,
            description: this.description,
            expectedArgs: this.expectedArgs,
            aliases: this.aliases,
            permissions: this.permissions,
        };
    }
}
