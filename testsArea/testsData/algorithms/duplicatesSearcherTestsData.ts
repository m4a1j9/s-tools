import {buildDuplicatesSearcher} from '@implementations';

interface SimpleObjectData {
    value: string,
}

const valueExtractor = (data: SimpleObjectData) => data.value;


export const numericalDuplicatesSearcher = buildDuplicatesSearcher<number>();

export const objectDuplicatesSearcher = buildDuplicatesSearcher(valueExtractor);

export const generateListOfUniqueNumbers = (): number[] => [
    1,
    2,
    3,
    4,
    -5,
];

export const generateListOfNumbersWithDuplicates = (): number[] => [
    1,
    1,
    2,
    2,
    3,
];

export const generateListOfUniqueObjects = (): SimpleObjectData[] => [
    {
        value: 'a',
    },
    {
        value: 'b',
    },
    {
        value: 'c',
    }
];


export const generateListOfObjectsWithDuplicates = (): SimpleObjectData[] => [
    {
        value: 'a',
    },
    {
        value: 'a',
    },
    {
        value: 'c',
    }
];