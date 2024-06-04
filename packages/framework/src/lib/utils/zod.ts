import { z } from 'zod';

/**
 * Parses a Zod schema and throws an error if it fails
 * Thanks to https://github.com/ghostdevv/jellycommands
 *
 * @param name - The name of the schema being parsed
 * @param schema - The Zod schema to parse
 * @param data - The data to parse
 * @throws {TypeError} - If the data does not match the schema
 */
export function parseSchema<T extends z.ZodType>(
    name: string,
    schema: T,
    data: unknown,
): z.infer<T> {
    const result = schema.safeParse(data);

    if (result.success) return result.data;

    const formattedError = result.error.errors
        .map((e) => `    => [${e.path.join(' -> ')}] (${e.code}) ${e.message}`)
        .join('\n');
    throw new TypeError(`Error parsing schema for ${name}:\n${formattedError}\n`);
}
