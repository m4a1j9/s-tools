import { IterableConstructor, ValueTransformer } from '../../interfaces/uic/interfaces';
/**
 * Creates iterable transformer into target iterable via **targetIterableConstructor**
 * and transformation law, determined via optional **valueTransformer** function
 * @param targetIterableConstructor final iterable constructor, has to accept an iterable
 * @param valueTransformer transforms values of source iterables to mediate iterable target iterable constructor
 * receives as an argument
 */
export declare function createIterableTransformer<S extends Iterable<unknown>, M, T>(targetIterableConstructor: IterableConstructor<M, T>, valueTransformer?: ValueTransformer<S extends Iterable<infer U> ? U : never, M>): (sourceIterable: S) => T;
/**
 * Transforms **sourceIterable** to desirable iterable via **targetIterableConstructor**
 * and **valueTransformer** function
 * @param sourceIterable source iterable to transform
 * @param targetIterableConstructor target iterable constructor, accepts single iterable argument
 * @param valueTransformer optional function, represents a middleware between source iterable and
 * one to pass into target iterable constructor. Transforms each source iterable value to the middleware one
 */
export declare function transformToIterable<S extends Iterable<unknown>, M, T>(sourceIterable: S, targetIterableConstructor: IterableConstructor<M, T>, valueTransformer?: ValueTransformer<S extends Iterable<infer U> ? U : never, M>): T;
