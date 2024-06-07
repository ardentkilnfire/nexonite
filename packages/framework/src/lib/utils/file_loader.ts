import { readdir } from 'fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'url';

/**
 * Asynchronously loads files from a specified directory and calls a provided callback function
 * for each file. The callback function is passed the default export of each file.
 *
 * @param {string} path - The path to the directory to load files from.
 * @param {(data: T) => void} callback - The function to call for each file.
 * @template T - The type of the default export of each file.
 */
export async function loadFiles<T>(path: string, callback: (data: T) => void) {
    const directoryContents = await readdir(path, {
        withFileTypes: true,
        recursive: true,
    });

    for (const file of directoryContents) {
        // Skip directories
        if (file.isDirectory()) continue;

        // Skip files starting with an underscore
        if (file.name.startsWith('_')) {
            continue;
        }

        const filePath = join(file.parentPath, file.name);
        const data = await import(pathToFileURL(filePath).href);

        callback(data.default);
    }
}
