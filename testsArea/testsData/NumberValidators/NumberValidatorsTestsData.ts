export const isNumberTestsData = [
    {
        data: 3123,
        result: true,
    },
    {
        data: 3123.235,
        result: true,
    },
    {
        data: -53123.234,
        result: true,
    },
    {
        data: '12435',
        result: false,
    },
    {
        data: 'sfdbsdfb',
        result: false,
    },
    {
        data: NaN,
        result: false,
    },
    {
        data: {},
        result: false,
    },
];

export const integerNumberRegexpTestsData = [
    {
        data: '123',
        result: true,
    },
    {
        data: '0123',
        result: false,
    },
    {
        data: '-353245',
        result: true,
    },
    {
        data: '-034552',
        result: false,
    },
    {
        data: '21314.24',
        result: false,
    },
    {
        data: '0123.2345',
        result: false,
    },
    {
        data: '0',
        result: true,
    },
    {
        data: '-0',
        result: false,
    },
];

export const floatNumberRegexpTestsData = [
    {
        data: '123',
        result: true,
    },
    {
        data: '0123',
        result: false,
    },
    {
        data: '-353245',
        result: true,
    },
    {
        data: '-034552',
        result: false,
    },
    {
        data: '21314.24',
        result: true,
    },
    {
        data: '21314.24',
        result: true,
    },
    {
        data: '0',
        result: true,
    },
    {
        data: '-0',
        result: true,
    },
    {
        data: '124234.',
        result: true,
    },
    {
        data: 'sfdbsdfb',
        result: false,
    },
    {
        data: '0.',
        result: true,
    },
];

export const exponentialNumberFormatRegexpTestsData = [
    {
        data: '123',
        result: false,
    },
    {
        data: '123E3',
        result: true,
    },
    {
        data: '0123',
        result: false,
    },
    {
        data: '0123E3',
        result: false,
    },
    {
        data: '123.E12',
        result: true,
    },
    {
        data: '-353245',
        result: false,
    },
    {
        data: '-353245E1',
        result: true,
    },
    {
        data: '-034552',
        result: false,
    },
    {
        data: '21314.24',
        result: false,
    },
    {
        data: '21314.24E-10',
        result: true,
    },
    {
        data: '0123.2345',
        result: false,
    },
    {
        data: '0',
        result: false,
    },
    {
        data: '-0',
        result: false,
    },
    {
        data: '124234.',
        result: false,
    },
    {
        data: 'sfdbsdfb',
        result: false,
    },
    {
        data: '0.',
        result: false,
    },
];