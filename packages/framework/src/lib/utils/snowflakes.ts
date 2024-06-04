import { SnowflakeUtil } from 'discord.js';
import { z } from 'zod';

/**
 * Check if the given id is a valid snowflake.
 * Thanks to https://github.com/ghostdevv/jellycommands
 *
 * @param {any} id - The id to be checked.
 * @returns {id is string} - True if the id is a valid snowflake, false otherwise.
 */
export function isSnowflake(id: any): id is string {
    try {
        SnowflakeUtil.deconstruct(id);
        return true;
    } catch {
        return false;
    }
}

export const snowflakeSchema = z
    .string({
        invalid_type_error: 'Snowflake ids should be given as a string',
        required_error: 'Must give a valid Snowflake id',
    })
    .min(18, { message: 'Discord Snowflake ids are at least 18 chars' });
