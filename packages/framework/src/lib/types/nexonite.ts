import type { ClientOptions } from 'discord.js';
import type { AtLeastOne } from './utils';

/**
 * The options for the Nexonite framework.
 */
export interface NexoOptions {
    /**
     * The options for the Discord client.
     * @see https://discord.js.org/docs/packages/discord.js/14.15.3/Client:Class
     */
    clientOptions: ClientOptions;

    /**
     * The path to the commands directory.
     * If not specified, commands will not be loaded.
     * @default undefined
     */
    commands?: string;

    /**
     * The paths to the components directories.
     * If not specified, components will not be loaded.
     * @default undefined
     */
    components?: AtLeastOne<{
        /**
         * The path to the buttons directory.
         */
        buttons: string;

        /**
         * The path to the modals directory.
         */
        modals: string;

        /**
         * The path to the selectMenus directory.
         */
        selectMenus: string;
    }>;

    /**
     * Whether to log debug messages or not.
     * @default false
     */
    debug?: boolean;

    /**
     * Registers commands in specified guilds only, Ideal for testing commands before deploying.
     * If not specified, dev mode will not be enabled.
     * @default undefined
     */
    dev?: {
        /**
         * Whether to enable global dev mode or not.
         * @default false
         */
        global: boolean;

        /**
         * The guilds to enable dev mode for.
         * @default []
         */
        guilds: string[];
    };

    /**
     * The path to the events directory.
     * If not specified, events will not be loaded.
     * @default undefined
     */
    events?: string;

    /**
     * The global cooldown for commands and components in milliseconds.
     * To disable global cooldown, set it to 0.
     * @default 5000
     */
    globalCooldown?: number;

    /**
     * The fallback messages to show in various validation errors.
     * If not specified, hardcoded messages will be used.
     * @default undefined
     */
    messages?: AtLeastOne<{
        /**
         * The message to show when a command is on cooldown.
         */
        cooldown: string;
        /**
         * The message to show when a command is unknown.
         */
        unknownCommand: string;
        /**
         * The message to show when a component is unknown.
         */
        unknownComponent: string;
    }>;
}
