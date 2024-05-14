import {
    ValueExtractor,
    DuplicateData,
} from '@algorithms/duplicatesSearcher/interfaces';

export const duplicatesSearcher =
<T, V = T>(
    source: Iterable<T>,
    valueExtractor: ValueExtractor<T, V> = (x) => x as unknown as V,
): DuplicateData<T>[] => {

    let currentIndex = 0;
    const valuesController = new Set<V>();
    const duplicates: DuplicateData<T>[] = [];

    for (const item of source) {

        const valueToCheck = valueExtractor(item);

        !valuesController.has(valueToCheck)
            ? valuesController.add(valueToCheck)
            : duplicates.push({
                duplicateIndex: currentIndex,
                duplicateValue: item,
            });

        currentIndex++;
    }


    return duplicates;

};

export const buildDuplicatesSearcher = <T, V = T>(
    valueExtractor?: ValueExtractor<T, V>,
) => {
    return (source: Iterable<T>) => duplicatesSearcher<T, V>(source, valueExtractor);
};