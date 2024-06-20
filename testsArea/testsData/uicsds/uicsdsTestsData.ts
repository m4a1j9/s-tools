import {
    SingleToSingle,
    SingleToPair,
    PairToSingle,
} from '@interfaces';

import * as ConvertersCreator from '@implementations';

/* Conversion laws list */

const trivialArrayItemToMapItemTransformer: SingleToPair<number, number, number>
    = (number): [number, number] => [number, number];

const shiftedArrayItemToMapItemTransformer: SingleToPair<number, number, number>
    = (number): [number, number] => [number, number + 1];

const trivialArrayItemToSetItemTransformer: SingleToSingle<string, string>
    = (string) => string;

const upperCaseArrayItemToSetItemTransformer: SingleToSingle<string, string>
    = (string) => string.toUpperCase();

const trivialArrayItemToCharacterTransformer: SingleToSingle<number, string>
    = (number) => `${number}`;

const complexArrayItemToCharacterTransformer: SingleToSingle<number[], string>
    = (listOfNumbers) => `${listOfNumbers}`;




const trivialMapItemToSingleValueTransformer: PairToSingle<number, number, number>
    = (pair) => pair.at(-1);

const keyValueSumTransformer: PairToSingle<number, number, number>
    = (pair) => pair.at(0) + pair.at(-1);

const trivialMapItemToStringTransformer: PairToSingle<string, string, string>
    = (pair) => pair.at(0);

const keyValuePairConcatenatedTransformer: PairToSingle<number, number, string>
    = (pair) => pair.join('');



const trivialSingleToSingleTransformer: SingleToSingle<number, string>
    = (value) => `${value}`;

const negativeSingleToSingleTransformer: SingleToSingle<number, string>
    = (value) =>  `${-value}`;

const singleToPair: SingleToPair<string, string, string>
    = (value) => [value.at(0), value.slice(1)];


const trivialCharTransformer: SingleToSingle<string, string>
    = (char) => char;

const trivialCharToPairTransformer: SingleToPair<string, string, string>
    = (char) => [char, char];


/* Converters list */

const arrayToMapTrivial = ConvertersCreator
    .createArrayToMap<number, number, number>(trivialArrayItemToMapItemTransformer);
const arrayToMapShifted = ConvertersCreator
    .createArrayToMap<number, number, number>(shiftedArrayItemToMapItemTransformer);

const arrayToSetTrivial = ConvertersCreator
    .createArrayToSet<string, string>(trivialArrayItemToSetItemTransformer);
const arrayToSetUpperCase = ConvertersCreator
    .createArrayToSet<string, string>(upperCaseArrayItemToSetItemTransformer);

const arrayToStringTrivial = ConvertersCreator
    .createArrayToString<number>(trivialArrayItemToCharacterTransformer);
const arrayToStringComplex = ConvertersCreator
    .createArrayToString(complexArrayItemToCharacterTransformer);



const mapToArrayTrivial = ConvertersCreator
    .createMapToArray(trivialMapItemToSingleValueTransformer);
const keyValueSumToArray = ConvertersCreator
    .createMapToArray(keyValueSumTransformer);

const mapToSetTrivial = ConvertersCreator
    .createMapToSet(trivialMapItemToSingleValueTransformer);
const keyValueSumToSet = ConvertersCreator
    .createMapToSet(keyValueSumTransformer);

const mapToStringTrivial = ConvertersCreator
    .createMapToString(trivialMapItemToStringTransformer);
const keyValuePairConcatenated = ConvertersCreator
    .createMapToString(keyValuePairConcatenatedTransformer);


const setToArrayTrivial = ConvertersCreator
    .createSetToArray(trivialSingleToSingleTransformer);
const setToArrayNegative = ConvertersCreator
    .createSetToArray(negativeSingleToSingleTransformer);

const setToMapFirstLetter = ConvertersCreator
    .createSetToMap(singleToPair);
const setToNegativeString = ConvertersCreator
    .createSetToString(negativeSingleToSingleTransformer);


const stringToArray = ConvertersCreator
    .createStringToArray(trivialCharTransformer);

const stringToSet = ConvertersCreator
    .createStringToSet(trivialCharTransformer);

const stringToMap = ConvertersCreator
    .createStringToMap(trivialCharToPairTransformer);


const testData = {
    arrayToMap: {
        description: 'Converts Array to Map',
        transformers: [
          arrayToMapTrivial,
          arrayToMapShifted,
        ],
        initialData: [
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            [
                [7, 8, 10],
                [12, 3, -10],
            ],
        ],
        referenceData: [
            [
                new Map([[1, 1], [2, 2], [3, 3]]),
                new Map([[4, 4], [5, 5], [6, 6]]),
            ],
            [
                new Map([[7, 8], [8, 9], [10, 11]]),
                new Map([[12, 13], [3, 4], [-10, -9]]),
            ],
        ],
    },
    arrayToSet: {
        description: 'Converts Array to Set',
        transformers: [
            arrayToSetTrivial,
            arrayToSetUpperCase,
        ],
        initialData: [
            [
                ['a', 'A', 'A'],
                ['afs', 'asdf', 'afs'],
            ],
            [
                ['a', 'A', 'a'],
                ['fafs', 'nnhgn', 'kldfb'],
            ],
        ],
        referenceData: [
            [
                new Set(['a', 'A', 'A']),
                new Set(['afs', 'asdf', 'afs']),
            ],
            [
                new Set(['A', 'A', 'A']),
                new Set(['FAFS', 'NNHGN', 'KLDFB']),
            ],
        ],
    },
    arrayToString: {
        description: 'Converts Array to String',
        transformers: [
          arrayToStringTrivial,
          arrayToStringComplex,
        ],
        initialData: [
            [
                [ 1, -2, 3],
                [1.23, .03, -.034],
            ],
            [
                [[1, 2], [3, 4, 5]],
                [[.042, -133], [-.52, 1.364]],
            ],
        ],
        referenceData: [
          [
              '1-23',
              '1.230.03-0.034',
          ],
          [
              '1,23,4,5',
              '0.042,-133-0.52,1.364',
          ],
        ],
    },

    mapToArray: {
        description: 'Converts Map to Array',
        transformers: [
          mapToArrayTrivial,
          keyValueSumToArray,
        ],
        initialData: [
            [
              new Map([[-1, 1], [1, -1], [1234, -2345]]),
              new Map([[415, -3634], [932, -35], [8851, 23]]),
            ],
            [
                new Map([[-1, 1], [1, -1], [0, -1]]),
                new Map([[-100, 1], [-1, -1], [3, 2]]),
            ],
        ],
        referenceData: [
            [
              [1, -1, -2345],
              [-3634, -35, 23],
            ],
            [
                [0, 0, -1],
                [-99, -2, 5],
            ],
        ],
    },
    mapToSet: {
        description: 'Converts Map to Set',
        transformers: [
            mapToSetTrivial,
            keyValueSumToSet,
        ],
        initialData: [
            [
                new Map([[415, -3634], [932, -35], [8851, 23]]),
                new Map([[-1, 1], [1, -1], [1234, -2345]]),
            ],
            [
                new Map([[-1, 1], [1, -1], [0, -1]]),
                new Map([[-100, 1], [-1, -1], [3, 2]]),
            ],
        ],
        referenceData: [
            [
                new Set([-3634, -35, 23]),
                new Set([1, -1, -2345]),
            ],
            [
                new Set([0, 0, -1]),
                new Set([-99, -2, 5]),
            ],
        ],
    },
    mapToString: {
        description: 'Converts Map to String',
        transformers: [
            mapToStringTrivial,
            keyValuePairConcatenated,
        ],
        initialData: [
            [
                new Map([[-3634, 415], [-35, 932], [23, 8851]]),
                new Map([[-1, 1], [1, -1], [1234, -2345]]),
            ],
            [
                new Map([[-1, 1], [1, -1], [0, -1]]),
                new Map([[-100, 1], [-1, -1], [3, 2]]),
            ],
        ],
        referenceData: [
            [
                [-3634, -35, 23].join(''),
                [-1, 1, 1234].join(''),
            ],
            [
                ['-11', '1-1', '0-1'].join(''),
                ['-1001', '-1-1', '32'].join(''),
            ],
        ],
    },

    setToArray: {
        description: 'Converts Set to Array',
        transformers: [
            setToArrayTrivial,
            setToArrayNegative,
        ],
        initialData: [
            [
                new Set([1, 1, -1, 2, -543, 564.233,]),
                new Set([235, 345, -.345, 2,]),
            ],
            [
                new Set([1, 1, -1, 2, -543, 564.233,]),
                new Set([235, 345, -.345, 2,]),
            ]
        ],
        referenceData: [
            [
                ['1', '-1', '2', '-543', '564.233',],
                ['235', '345', '-0.345', '2',],
            ],
            [
                ['-1', '1', '-2', '543', '-564.233',],
                ['-235', '-345', '0.345', '-2',],
            ],
        ],
    },
    setToMap: {
        description: 'Converts Set to Map',
        transformers: [
            setToMapFirstLetter,
        ],
        initialData: [
            [
                new Set(['advad', 'dfbsdfb', 'dfbnkl']),
                new Set(['aa', 'aa', 'd']),
            ],
        ],
        referenceData: [
            [
                new Map([['a', 'dvad'], ['d', 'fbsdfb'], ['d', 'fbnkl']]),
                new Map([['a', 'a'], ['a', 'a'], ['d', '']]),
            ],
        ],
    },
    setToString: {
        description: 'Converts Set to String',
        transformers: [
            setToNegativeString,
        ],
        initialData: [
            [
                new Set([1, 2, 3, 4, 5]),
                new Set([]),
            ]
        ],
        referenceData: [
            [
                '-1-2-3-4-5',
                '',
            ]
        ],
    },

    stringToArray: {
        description: 'Converts String to Array',
        transformers: [
            stringToArray,
        ],
        initialData: [
            [
                'hsfhdsgh',
            ],
        ],
        referenceData: [
            [
                'hsfhdsgh'.split(''),
            ],
        ],
    },
    stringToSet: {
        description: 'Converts String to Set',
        transformers: [
            stringToSet,
        ],
        initialData: [
            [
                'hsfhdsgh',
            ],
        ],
        referenceData: [
            [
                new Set('hsfhdsgh'.split('')),
            ],
        ],
    },
    stringToMap: {
        description: 'Converts String to Map',
        transformers: [
            stringToMap,
        ],
        initialData: [
            [
                'hsfhdsgh',
            ],
        ],
        referenceData: [
            [
                new Map('hsfhdsgh'.split('').map((char) => [char, char])),
            ],
        ],
    },
};

export default testData;