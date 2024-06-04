import { parseSchema } from '$utils/zod';
import { eventOptionsSchema } from './schema';

// Types
import type { EventExec, EventName, EventOptions } from '$types/events';

/**
 * A class representing an event.
 *
 * @template T - The event name.
 */
export class Event<T extends EventName = EventName> {
    /**
     * The options for the event.
     */
    public readonly options: Required<EventOptions<T>>;

    /**
     * Creates a new event.
     *
     * @param {T} name - The name of the event.
     * @param {EventExec<T>} execute - The function to execute when the event is triggered.
     * @param {EventOptions<T>} options - The options for the event.
     * @throws {TypeError} If the name or execute is not of the correct type.
     */
    constructor(
        public readonly name: T,
        public readonly execute: EventExec<T>,
        options: EventOptions<T>,
    ) {
        if (!name || typeof name != 'string')
            throw new TypeError(`Expected type string for name, received ${typeof name}`);

        if (!execute || typeof execute != 'function')
            throw new TypeError(`Expected type function for run, received ${typeof execute}`);

        this.options = <Required<EventOptions<T>>>(
            parseSchema('Events Schema', eventOptionsSchema, options)
        );
    }
}

/**
 * A factory function for creating Event instances.
 *
 * @template T - The event name.
 * @param {EventOptions<T> & { execute: EventExec<T> }} options - The options for the event.
 * @param {EventExec<T>} options.execute - The function to execute when the event is triggered.
 * @param {T} options.name - The name of the event.
 * @param {boolean} [options.once=false] - Whether the event should only be triggered once.
 * @returns {Event<T>} - The created Event instance.
 * @throws {TypeError} If the name or execute is not of the correct type.
 */
export function event<T extends EventName>(
    options: EventOptions<T> & { execute: EventExec<T> },
): Event<T> {
    const { execute, ...rest } = options;

    return new Event(options.name, execute, rest);
}
