import { parseSchema } from '$utils/zod';
import { createHash } from 'node:crypto';
import { z } from 'zod';

// Types
import type { BaseInteraction } from 'discord.js';
import type { CommandConfigs, CommandData, CommandExec } from '$types/commands';

export class BaseCommand<A extends CommandData, T extends BaseInteraction> {
    public readonly data: A;
    public readonly configs?: Partial<CommandConfigs>;

    public readonly execute: CommandExec<T>;

    constructor(data: A, execute: CommandExec<T>, configs?: Partial<CommandConfigs>) {
        if (!execute || typeof execute != 'function')
            throw new TypeError(`Expected execute to be a function but received ${typeof execute}`);

        this.data = data;
        this.execute = execute;
        this.configs = parseSchema('CommandConfigs', commandConfigSchema, configs);
    }

    get commandData(): A {
        return this.data;
    }

    get hashId(): string {
        const serializedData = JSON.stringify(this.data, null, 0);
        return createHash('sha256').update(serializedData).digest('hex');
    }
}

export const commandConfigSchema = z
    .object({
        cooldown: z.number().optional(),
        devOnly: z.boolean().optional(),
        dm: z.boolean().optional(),
        disabled: z.boolean().optional(),
        markDeleted: z.boolean().optional(),
        guilds: z.array(z.string()).optional(),
    })
    .default({});
