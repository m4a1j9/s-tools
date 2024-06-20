import {
    comparator,
} from '@interfaces';


/**
 * Binary search function template
 * @param sourceList list (**Array**) for binary search
 * @param target target one is looking for
 * @param comparator function that compares array items with each other.
 * Source list must be sorted according to comparator function
 * @returns target index if found, undefined otherwise
 */
export const binarySearch = <ArrayUnit>(
    sourceList: ArrayUnit[],
    target: ArrayUnit,
    comparator: comparator<ArrayUnit>,
): number | undefined => {

    if (!sourceList?.length) {
        return;
    }

    let [start, end] = [0, sourceList.length - 1];

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        const {
            equal,
            less,
            greater,
        } = comparator(sourceList.at(mid)!, target);

        if (equal) {
            return mid;
        }

        if (less) {
            start = mid + 1;
            continue;
        }

        if (greater) {
            end = mid - 1;
        }
    }

};

/**
 * Creates instance of binary search template with predefined comparator
 * @param comparator comparator function
 */
export const buildBinarySearch = <ArrayUnit>(comparator: comparator<ArrayUnit>) => {
    return (sourceList: ArrayUnit[], target: ArrayUnit) => binarySearch(sourceList, target, comparator);
}

