import { z } from 'zod';
import { snowflakeSchema } from '$utils/snowflakes';

export const nexoOptionsSchema = z.object({
    clientOptions: z.object({}).passthrough(),
    commands: z
        .union([
            z.object({
                APICommandsPath: z.string(),
                prefixCommandsPath: z.string().optional(),
            }),
            z.object({
                APICommandsPath: z.string().optional(),
                prefixCommandsPath: z.string(),
            }),
        ])
        .optional(),
    eventsPath: z.string().optional(),
    components: z
        .union([
            z.object({
                buttons: z.string(),
                modals: z.string().optional(),
                selectMenus: z.string().optional(),
            }),
            z.object({
                buttons: z.string().optional(),
                modals: z.string(),
                selectMenus: z.string().optional(),
            }),
            z.object({
                buttons: z.string().optional(),
                modals: z.string().optional(),
                selectMenus: z.string(),
            }),
        ])
        .optional(),
    dev: z.tuple([z.boolean(), snowflakeSchema.array().nonempty()]).optional(),
    cache: z.boolean().default(true),
    debug: z.boolean().default(() => !!process.env['DEBUG']),
});
