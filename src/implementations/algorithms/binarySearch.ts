import {
    comparator,
} from '@algorithms/binarySearch/interfaces';


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

export const buildBinarySearch = <ArrayUnit>(comparator: comparator<ArrayUnit>) => {
    return (sourceList: ArrayUnit[], target: ArrayUnit) => binarySearch(sourceList, target, comparator);
}

