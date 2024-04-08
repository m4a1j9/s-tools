"use strict";
// Universal Iterable Converter (UIC)
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToIterable = exports.createIterableTransformer = void 0;
/**
 * Creates iterable transformer into target iterable via **targetIterableConstructor**
 * and transformation law, determined via optional **valueTransformer** function
 * @param targetIterableConstructor final iterable constructor, has to accept an iterable
 * @param valueTransformer transforms values of source iterables to mediate iterable target iterable constructor
 * receives as an argument
 */
function createIterableTransformer(targetIterableConstructor, valueTransformer) {
    return (sourceIterable) => transformToIterable(sourceIterable, targetIterableConstructor, valueTransformer);
}
exports.createIterableTransformer = createIterableTransformer;
/**
 * Transforms **sourceIterable** to desirable iterable via **targetIterableConstructor**
 * and **valueTransformer** function
 * @param sourceIterable source iterable to transform
 * @param targetIterableConstructor target iterable constructor, accepts single iterable argument
 * @param valueTransformer optional function, represents a middleware between source iterable and
 * one to pass into target iterable constructor. Transforms each source iterable value to the middleware one
 */
function transformToIterable(sourceIterable, targetIterableConstructor, valueTransformer) {
    if (typeof valueTransformer !== 'function') {
        return new targetIterableConstructor(sourceIterable);
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
exports.transformToIterable = transformToIterable;
function sourceIteratorValueTransformer(sourceIteratorResult, valueTransformer) {
    if (!sourceIteratorResult.done) {
        return {
            ...sourceIteratorResult,
            value: valueTransformer(sourceIteratorResult.value),
        };
    }
    return {
        ...sourceIteratorResult
    };
}
const exceptions = {
    'Array': function (sourceIterable) { return [...sourceIterable]; },
    'String': function (sourceIterable) { return [...sourceIterable].join(''); },
};
function buildTargetIterable(sourceIterable, targetIterableConstructor) {
    const constructorName = targetIterableConstructor.name;
    const exceptionBuilder = exceptions[constructorName];
    if (exceptionBuilder) {
        //@ts-ignore
        return exceptionBuilder(sourceIterable);
    }
    return new targetIterableConstructor(sourceIterable);
}
