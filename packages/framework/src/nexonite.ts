import type { Logger } from '$lib/types/logger';
import type { NexoOptions } from '$lib/types/nexonite';
import { createLogger } from '$lib/utils/logger';
import { Client } from 'discord.js';

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
            this.log.debug(`Logged in as ${this.user?.tag}`);
            return token;
        });
    }
}
