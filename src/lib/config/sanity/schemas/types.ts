import type { Reference } from 'sanity';

/**
 * Resolves the type of a Reference to the referenced type.
 */
export type Resolved<T> = T extends Reference & { _def: infer U } ? U : T;
