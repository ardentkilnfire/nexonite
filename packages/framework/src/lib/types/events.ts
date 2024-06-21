import type { Nexonite } from '$/nexonite';
import type { Awaitable, ClientEvents } from 'discord.js';

export type EventName = keyof ClientEvents;

/**
 * Function type for event execution.
 *
 * @template T - The event name.
 * @param {Nexonite} client - The client instance.
 * @param {...args: T extends keyof ClientEvents ? ClientEvents[T] : any[]} args - The arguments passed to the event.
 * @returns {Awaitable<void>} - A promise that resolves when the event is done executing.
 */
export type EventExec<T extends EventName> = (
    client: Nexonite,
    ...args: T extends keyof ClientEvents ? ClientEvents[T] : any[]
) => Awaitable<void>;

/**
 * The options for the event.
 *
 * @template T - The event name.
 */
export interface EventOptions<T extends EventName> {
    /**
     * The event name: https://discord.js.org/docs/packages/discord.js/14.15.3/ClientEvents:Interface
     */
    name: T;

    /**
     * Should the event be ran once or every time it's received
     *
     * @default false
     */
    once?: boolean;
}
