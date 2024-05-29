import { Client } from 'discord.js';
import { Logger } from './lib/types/logger';
import { NexoOptions } from './lib/types/nexonite';
import { createLogger } from './lib/utils/logger';

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
