import type { ClientOptions } from 'discord.js';

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
     * Developer mode options
     * 
     * @type {boolean | string[]}
     * @default false
     *
     * @example
     * // Enable developer mode globaly
     * dev: true
     *
     * @example
     * // Enable developer mode on guild basis
     * dev: ['3241234567890123456', '7891234567890123456', '9012345678901234567']
     */
    dev?: boolean | string[];

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
