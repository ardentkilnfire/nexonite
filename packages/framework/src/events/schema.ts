import { z } from 'zod';

// Types
import type { EventName } from '$types/events';

export const eventOptionsSchema = z.object({
    name: z.string() as z.ZodType<EventName>,
    once: z.boolean().default(false),
});
