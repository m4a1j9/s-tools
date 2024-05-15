import {ComparatorResult} from '@algorithms/binarySearch/interfaces';
import {buildBinarySearch} from '@algorithms/binarySearch';


const numbersComparator = (x: number, y: number): ComparatorResult => ({
    less: x < y,
    greater: x > y,
    equal: x === y,
});

export const numericalBinarySearch = buildBinarySearch<number>(numbersComparator);

export const successfullyFindsValueData = {
    data: [1, 2, 3, 4, 5],
    target: 2,
    resultIndex: 1,
};

export const noResultForEmptyArrayData = {
    data: [],
    target: 3,
    resultIndex: undefined,
};

export const noResultData = {
    data: [1, 2, 3, 4, 5],
    target: -10,
    resultIndex: undefined,
};