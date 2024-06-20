import { isSnowflake } from './snowflakes';

// Types
import type { HighlightColors } from '$types/utils';

/**
 * Highlights the input text with the specified color and optionally makes it bold.
 *
 * @param {string} text - The string to be highlighted.
 * @param {object} options - An object containing the color and bold properties.
 * @param {HighlightColors} [options.color] - The color to highlight the text. Can be one of:
 *                                   "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white".
 *                                   Defaults to "white" if not specified.
 * @param {boolean} [options.bold=false] - A boolean flag to indicate if the text should be bold.
 *                                         Defaults to false.
 * @returns {string} - The formatted string with ANSI escape codes for the specified color and boldness.
 *
 * @example
 * // Highlight the text in green and make it bold
 * const highlightedText = highlight("Hello, World!", { color: 'green', bold: true });
 * console.log(highlightedText);
 *
 * @example
 * // Highlight the text in yellow without making it bold
 * const highlightedText = highlight("Hello, World!", { color: 'yellow' });
 * console.log(highlightedText);
 *
 * @example
 * // Highlight the text in white (default color) and make it bold
 * const highlightedText = highlight("Hello, World!", { bold: true });
 * console.log(highlightedText);
 */
export function highlight(
    text: string,
    options: { color?: HighlightColors; bold?: boolean } = {},
): string {
    const colorCodes: { [key in HighlightColors]: string } = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
    };

    const color = options.color ? colorCodes[options.color] : colorCodes.white;
    const bold = options.bold ? '\x1b[1m' : '';
    const reset = '\x1b[0m';
    const normalWeight = '\x1b[22m';

    return `${bold}${color}${text}${reset}${normalWeight}`;
}

/**
 * Sets the development mode for the bot.
 *
 * @param {Object} options - The options for setting development mode.
 * @param {boolean} options.enableGlobally - Whether to enable development mode globally.
 * @param {string[]} options.guilds - The guilds to enable development mode for.
 * @returns {[boolean, string[]]} - An array containing the enableGlobally and guilds values.
 */
export function setDevMode({
    enableGlobally,
    guilds,
}: {
    enableGlobally: boolean;
    guilds: string[];
}): [boolean, string[]] {
    return [enableGlobally, guilds];
}

/**
 * Extracts the client id from a token.
 *
 * @param {string} token - The token from which to extract the client id.
 * @return {string | null} - The client id if it exists, otherwise null.
 */
export function clientIdFromToken(token: string): string | null {
    const encodedId = token.split('.')[0];
    const possiblyASnowflake = Buffer.from(encodedId, 'base64').toString();
    return isSnowflake(possiblyASnowflake) ? possiblyASnowflake : null;
}
