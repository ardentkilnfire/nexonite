import { snowflakeSchema } from '$utils/snowflakes';
import { atLeastOneSchema } from '$utils/zod';
import { z } from 'zod';

export const nexoOptionsSchema = z.object({
    clientOptions: z.object({}).passthrough(),

    commands: z.string().optional(),

    components: atLeastOneSchema(
        z.object({
            buttons: z.string().optional(),
            modals: z.string().optional(),
            selectMenus: z.string().optional(),
        }),
    ).optional(),

    debug: z.boolean().default(() => !!process.env['DEBUG']),

    dev: z
        .object({
            global: z.boolean(),
            guilds: snowflakeSchema.array(),
        })
        .default({
            global: false,
            guilds: [],
        }),

    events: z.string().optional(),

    globalCooldown: z.number().nonnegative().finite().multipleOf(1000).default(5000),

    messages: atLeastOneSchema(
        z.object({
            cooldown: z.string().optional(),
            unknownCommand: z.string().optional(),
            unknownComponent: z.string().optional(),
        }),
    ).optional(),
});
