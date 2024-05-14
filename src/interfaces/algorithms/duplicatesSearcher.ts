export type ValueExtractor<S, R = S> = (value: S) => R;

export interface DuplicateData<T> {
    duplicateIndex: number;
    duplicateValue: T;
}