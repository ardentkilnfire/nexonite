import { createLogger } from '$utils/logger';
import { Client } from 'discord.js';

// Types
import type { Logger } from '$types/logger';
import type { NexoOptions } from '$types/nexonite';

export class Nexonite extends Client {
    public readonly log: Logger;
    public readonly nexoOptions: NexoOptions;

    constructor(options: NexoOptions) {
        super(options.clientOptions);

        this.log = createLogger(this);
        this.nexoOptions = options;
    }

    async login(token?: string): Promise<string> {
        return super.login(token || process.env.DISCORD_TOKEN).then((token) => {
            this.log(`Logged in as ${this.user?.tag}`);
            return token;
        });
    }
}
