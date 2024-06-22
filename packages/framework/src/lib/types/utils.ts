/**
 * Type definition for color options.
 */
export type HighlightColors =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white';

/**
 * Type definition for an object with at least one required property.
 *
 * @template T - The object type.
 * @returns A type that has at least one required property from T.
 */
export type AtLeastOne<T> = {
    [K in keyof T]: Pick<T, K> & Partial<Omit<T, K>>;
}[keyof T];
