import { snowflakeSchema } from '$utils/snowflakes';
import { atLeastOneSchema } from '$utils/zod';
import { z } from 'zod';

const componentsSchema = z.object({
    buttonsPath: z.string().optional(),
    modalsPath: z.string().optional(),
    selectMenusPath: z.string().optional(),
});

const messagesSchema = z.object({
    cooldown: z.string().optional(),
    unknownCommand: z.string().optional(),
    unknownComponent: z.string().optional(),
});

export const nexoOptionsSchema = z.object({
    clientOptions: z.object({}).passthrough(),

    commands: z.string().optional(),

    eventsPath: z.string().optional(),

    components: atLeastOneSchema(componentsSchema).optional(),

    dev: z.tuple([z.boolean(), snowflakeSchema.array().nonempty()]).optional(),

    cache: z.boolean().default(true),

    debug: z.boolean().default(() => !!process.env['DEBUG']),

    globalCooldown: z.number().default(5000),

    messages: atLeastOneSchema(messagesSchema).optional(),
});
