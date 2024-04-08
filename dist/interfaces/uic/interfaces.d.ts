/*********************************************************************************************************************/
export type ValueTransformer<S, T> = (value: S) => T;
export type IterableConstructor<S, T> = new (iterable: Iterable<S>) => T;
/*********************************************************************************************************************/
export type SingleToPair<S, K, V> = ValueTransformer<S, [K, V]>;
export type SingleToSingle<S, T> = ValueTransformer<S, T>;
export type PairToSingle<K, V, S> = ValueTransformer<[K, V], S>;
