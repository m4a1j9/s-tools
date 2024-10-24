import {
    ValueExtractor,
    DuplicateData,
} from '@interfaces';

/**
 * Looks for duplications input iterable may have
 * @param source duplications source iterable
 * @param valueExtractor optional function, derives a primitive according which two values are considered as duplicates
 * @returns **Map**: keys are **valueExtractor** values, values are lists of **DuplicateData**:
 * **duplicateIndex: number** and **duplicateValue: T**
 */
export const duplicatesSearcher =
<T, V = T>(
    source: Iterable<T>,
    valueExtractor: ValueExtractor<T, V> = (x) => x as unknown as V,
): Map<V, DuplicateData<T>[]> => {

    let currentIndex = 0;
    const duplicatesDict = new Map<V, DuplicateData<T>[]>();

    for (const item of source) {

        const valueToCheck = valueExtractor(item);

        const repetitionsList =  duplicatesDict.get(valueToCheck) || [];

        repetitionsList.push({
            duplicateIndex: currentIndex,
            duplicateValue: item,
        });

        duplicatesDict.set(
            valueToCheck,
            repetitionsList,
        );

        currentIndex++;
    }
    

    return duplicatesDict;

};

/**
 * Creates a duplicate search procedure instance with given value extractor
 * @param valueExtractor function that extracts a value two elements of a list are duplicates according to it
 */
export const buildDuplicatesSearcher = <T, V = T>(
    valueExtractor?: ValueExtractor<T, V>,
) => {
    return (source: Iterable<T>) => duplicatesSearcher<T, V>(source, valueExtractor);
};

// <u>**duplicatesSearcher**</u> function alias
export const groupByKey = duplicatesSearcher;

// <u>**buildDuplicatesSearcher**</u> function alias
export const buildGroupByKey = buildDuplicatesSearcher;