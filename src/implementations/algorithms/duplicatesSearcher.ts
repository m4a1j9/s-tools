import {
    ValueExtractor,
    DuplicateData,
} from '@algorithms/duplicatesSearcher/interfaces';

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

export const buildDuplicatesSearcher = <T, V = T>(
    valueExtractor?: ValueExtractor<T, V>,
) => {
    return (source: Iterable<T>) => duplicatesSearcher<T, V>(source, valueExtractor);
};