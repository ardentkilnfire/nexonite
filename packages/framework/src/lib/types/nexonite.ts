import type { ClientOptions } from 'discord.js';
import type { setDevMode } from '../utils';

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
    components?:
        | {
              /**
               * Path to buttons
               */
              buttons: string;

              /**
               * path to modals
               */
              modals?: string;

              /**
               * Path to selectMenus
               */
              selectMenus?: string;
          }
        | {
              /**
               * Path to buttons
               */
              buttons?: string;

              /**
               * path to modals
               */
              modals: string;

              /**
               * Path to selectMenus
               */
              selectMenus?: string;
          }
        | {
              /**
               * Path to buttons
               */
              buttons?: string;

              /**
               * path to modals
               */
              modals?: string;

              /**
               * Path to selectMenus
               */
              selectMenus: string;
          };

    /**
     * The dev options for the bot.
     *
     * @see{@link setDevMode}
     */
    dev?: ReturnType<typeof setDevMode>;

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
