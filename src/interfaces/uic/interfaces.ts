// UIC types
/*********************************************************************************************************************/

export type ValueTransformer<S, T> = (value: S) => T;
export type IterableConstructor<S, T> = new (iterable: Iterable<S>) => T;

// UICSDS types
/*********************************************************************************************************************/

export type SingleToPair<S, K, V> = ValueTransformer<S, [K, V]>;
export type SingleToSingle<S, T> = ValueTransformer<S, T>;
export type PairToSingle<K, V, S> = ValueTransformer<[K, V], S>;
export type PairToPair<S1, S2, T1, T2> = ValueTransformer<[S1, S2], [T1, T2]>;
