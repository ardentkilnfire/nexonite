import { ClientOptions } from 'discord.js';

export interface NexoOptions {
    /**
     * Base discord.js client options
     */
    clientOptions: ClientOptions;

    /**
     * Path to commands
     */
    commands?: string;

    /**
     * Path to events
     */
    events?: string;

    /**
     * Components
     */
    components?: {
        /**
         * Path to buttons
         */
        buttons: string;

        /**
         * path to modals
         */
        modals: string;

        /**
         * Path to selectMenus
         */
        selectMenus: string;
    };

    /**
     * Developer mode options
     */
    dev?: {
        /**
         * Should dev mode be enabled globally?
         */
        global?: boolean;

        /**
         * The guilds to run dev mode commands in
         */
        guilds?: string[];
    };

    /**
     * Should nexonite cache commands - highly recommended
     * @default true
     */
    cache?: boolean;

    /**
     * Whether to emit debug messages
     */
    debug?: boolean;
}
