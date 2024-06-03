import { createLogger } from '$utils/logger';
import { Client } from 'discord.js';

// Types
import type { Logger } from '$types/logger';
import type { NexoOptions } from '$types/nexonite';

/**
 * The main class of the framework.
 * Extends Discord.js Client class to provide additional functionality.
 */
export class Nexonite extends Client {
    /**
     * The logger instance for this client.
     */
    public readonly log: Logger;

    /**
     * The options for the client.
     */
    public readonly nexoOptions: NexoOptions;

    /**
     * Creates a new Nexonite instance.
     * @param options - The options for the client.
     */
    constructor(options: NexoOptions) {
        super(options.clientOptions);

        this.log = createLogger(this);
        this.nexoOptions = options;
    }

    /**
     * Logs in the client with the provided token.
     * If no token is provided, it looks for the DISCORD_TOKEN environment variable.
     * @param token - The token to use for login.
     * @returns A promise that resolves with the token.
     */
    async login(token?: string): Promise<string> {
        return super.login(token || process.env.DISCORD_TOKEN).then((token) => {
            this.log(`Logged in as ${this.user?.tag}`);
            return token;
        });
    }
}
