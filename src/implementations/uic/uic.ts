// Universal Iterable Converter (UIC)

import {
    IterableConstructor,
    ValueTransformer
} from '@uic/interfaces';


/**
 * Creates iterable transformer into target iterable via **targetIterableConstructor**
 * and transformation law, determined via optional **valueTransformer** function
 * @param targetIterableConstructor final iterable constructor, has to accept an iterable
 * @param valueTransformer transforms values of source iterables to mediate iterable target iterable constructor
 * receives as an argument
 */
export function createIterableTransformer<S extends Iterable<unknown>, M, T>(
    targetIterableConstructor: IterableConstructor<M, T>,
    valueTransformer?: ValueTransformer<S extends Iterable<infer U> ? U : never, M>
) {
    return (sourceIterable: S) =>
        transformToIterable<S, M, T>(sourceIterable, targetIterableConstructor, valueTransformer);
}

/**
 * Transforms **sourceIterable** to desirable iterable via **targetIterableConstructor**
 * and **valueTransformer** function
 * @param sourceIterable source iterable to transform
 * @param targetIterableConstructor target iterable constructor, accepts single iterable argument
 * @param valueTransformer optional function, represents a middleware between source iterable and
 * one to pass into target iterable constructor. Transforms each source iterable value to the middleware one
 */
export function transformToIterable<S extends Iterable<unknown>, M, T>(
    sourceIterable: S,
    targetIterableConstructor: IterableConstructor<M, T>,
    valueTransformer?: ValueTransformer<S extends Iterable<infer U> ? U : never, M>
): T {

    if (typeof valueTransformer !== 'function') {
        return new targetIterableConstructor(sourceIterable as unknown as Iterable<M>);
    }
    const sourceIterableIterator = sourceIterable[Symbol.iterator]();

    const auxiliaryIterable = {
        [Symbol.iterator]() {
            return {
                next() {
                    const sourceIteratorResult = sourceIterableIterator.next();
                    return sourceIteratorValueTransformer(sourceIteratorResult, valueTransformer);
                },
            };
        },
    };

    return buildTargetIterable(auxiliaryIterable, targetIterableConstructor);
}

function sourceIteratorValueTransformer<S, T>(
    sourceIteratorResult: IteratorResult<unknown, unknown>,
    valueTransformer: ValueTransformer<S, T>
): IteratorResult<T> {

    if (!sourceIteratorResult.done) {
        return {
            ...sourceIteratorResult,
            value: valueTransformer(sourceIteratorResult.value as S),
        } as IteratorResult<T>;
    }

    return {
        ...sourceIteratorResult
    } as IteratorResult<T>

}

const exceptions = {
    'Array': function<S, T>(sourceIterable: Iterable<S>) { return [...sourceIterable] as T; },
    'String': function<S>(sourceIterable: Iterable<S>) {return [...sourceIterable].join('');},
};

function buildTargetIterable<S, T>(sourceIterable: Iterable<S>, targetIterableConstructor: IterableConstructor<S, T>) {
    const constructorName = targetIterableConstructor.name;

    const exceptionBuilder = exceptions[constructorName as keyof typeof exceptions];

    if(exceptionBuilder) {
        //@ts-ignore
        return exceptionBuilder(sourceIterable) as T;
    }

    return new targetIterableConstructor(sourceIterable);
} 