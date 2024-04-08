// UIC Standard Data Structures (UICSDS)

import {
    createIterableTransformer
} from './uic';

import {
    SingleToSingle,
    SingleToPair,
    PairToSingle,
} from '@interfaces/uic/interfaces';


// "arrayTo" converters
/**********************************************************************************************************************/

/**
 * Creates <u>**Array**</u> to <u>**Map**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives key-value pair from array item
 */
export function createArrayToMap<ArrayItemType, K, V>(
    arrayItemTransformer: SingleToPair<ArrayItemType, K, V>,
) {
    return createIterableTransformer<ArrayItemType[], [K, V], Map<K, V>>(Map, arrayItemTransformer);
}


/**
 * Creates <u>**Array**</u> to <u>**Set**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, extracts some value from array item
 */
export function createArrayToSet<ArrayItemType, SetItemType>(
    arrayItemTransformer?: SingleToSingle<ArrayItemType, SetItemType>,
) {
    return createIterableTransformer<ArrayItemType[], SetItemType, Set<SetItemType>>(Set, arrayItemTransformer);
}


/**
 * Creates <u>**Array**</u> to <u>**string**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives value as character from array item
 */
export function createArrayToString<ArrayItemType>(
    arrayItemTransformer?: SingleToSingle<ArrayItemType, string>,
) {
    //@ts-ignore
    return createIterableTransformer<ArrayItemType[], string, string>(String, arrayItemTransformer);
}


// "mapTo" converters
/**********************************************************************************************************************/

/**
 * Creates <u>**Map**</u> to <u>**Array**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, retrieves Array item from Map item
 */
export function createMapToArray<K, V, ArrayItemType>(
    mapItemTransformer?: PairToSingle<K, V, ArrayItemType>,
) {
    return createIterableTransformer<Map<K, V>, ArrayItemType, ArrayItemType[]>(Array, mapItemTransformer);
}


/**
 * Creates <u>**Map**</u> to <u>**Set**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, extracts Set item from Map item
 */
export function createMapToSet<K, V, SetItemType>(
    mapItemTransformer?: PairToSingle<K, V, SetItemType>,
) {
    return createIterableTransformer<Map<K, V>, SetItemType, Set<SetItemType>>(Set, mapItemTransformer);
}


/**
 * Creates <u>**Map**</u> to <u>**string**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, forms a character out Map item
 */
export function createMapToString<K, V>(
    mapItemTransformer?: PairToSingle<K, V, string>,
) {
    //@ts-ignore
    return createIterableTransformer<Map<K, V>, string, string>(String, mapItemTransformer);
}

// "setTo" converters
/**********************************************************************************************************************/

/**
 * Creates <u>**Set**</u> to <u>**Array**</u> converter
 * @param setItemTransformer **Set** item transformer, forms an Array item out Set item
 */
export function createSetToArray<SetItemType, ArrayItemType>(
    setItemTransformer?: SingleToSingle<SetItemType, ArrayItemType>,
) {
    return createIterableTransformer<Set<SetItemType>, ArrayItemType, ArrayItemType[]>(Array, setItemTransformer);
}


/**
 * Creates <u>**Set**</u> to <u>**Map**</u> converter
 * @param setItemTransformer **Set** item transformer, forms Map item out Set item
 */
export function createSetToMap<SetItemType, K, V>(
    setItemTransformer: SingleToPair<SetItemType, K, V>,
) {
    return createIterableTransformer<Set<SetItemType>, [K, V], Map<K, V>>(Map, setItemTransformer);
}


/**
 * Creates <u>**Set**</u> to <u>**string**</u> converter
 * @param setItemTransformer **Set** item transformer, forms character out Set item
 */
export function createSetToString<SetItemType>(
    setItemTransformer?: SingleToSingle<SetItemType, string>,
) {
    //@ts-ignore
    return createIterableTransformer<Set<SetItemType>, string, string>(String, setItemTransformer);
}

// "stringTo" converters
/**********************************************************************************************************************/

/**
 * Creates <u>**string**</u> to <u>**Array**</u> converter
 * @param characterTransformer character transformer, forms Array item out character
 */
export function createStringToArray<ArrayItemType>(
    characterTransformer?: SingleToSingle<string, ArrayItemType>,
) {
    return createIterableTransformer<string, ArrayItemType, ArrayItemType[]>(Array, characterTransformer);
}


/**
 * Creates <u>**string**</u> to <u>**Map**</u> converter
 * @param characterTransformer character transformer, forms Map item out character
 */
export function createStringToMap<K, V>(
    characterTransformer: SingleToPair<string, K, V>,
) {
    return createIterableTransformer<string, [K, V], Map<K, V>>(Map, characterTransformer);
}


/**
 * Creates <u>**string**</u> to <u>**Set**</u> converter
 * @param characterTransformer character transformer, forms Set item out character
 */
export function createStringToSet<SetItemType>(
    characterTransformer?: SingleToSingle<string, SetItemType>,
) {
    return createIterableTransformer<string, SetItemType, Set<SetItemType>>(Set, characterTransformer);
}