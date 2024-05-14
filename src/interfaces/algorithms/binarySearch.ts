export interface ComparatorResult {
    equal?: boolean,
    less?: boolean,
    greater?: boolean,
}
export type comparator<T> = (first: T, second: T) => ComparatorResult;