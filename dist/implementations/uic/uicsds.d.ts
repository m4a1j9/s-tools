import { SingleToSingle, SingleToPair, PairToSingle } from '../../interfaces/uic/interfaces';
/**********************************************************************************************************************/
/**
 * Creates <u>**Array**</u> to <u>**Map**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives key-value pair from array item
 */
export declare function createArrayToMap<ArrayItemType, K, V>(arrayItemTransformer: SingleToPair<ArrayItemType, K, V>): (sourceIterable: ArrayItemType[]) => Map<K, V>;
/**
 * Creates <u>**Array**</u> to <u>**Set**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, extracts some value from array item
 */
export declare function createArrayToSet<ArrayItemType, SetItemType>(arrayItemTransformer?: SingleToSingle<ArrayItemType, SetItemType>): (sourceIterable: ArrayItemType[]) => Set<SetItemType>;
/**
 * Creates <u>**Array**</u> to <u>**string**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives value as character from array item
 */
export declare function createArrayToString<ArrayItemType>(arrayItemTransformer?: SingleToSingle<ArrayItemType, string>): (sourceIterable: ArrayItemType[]) => string;
/**********************************************************************************************************************/
/**
 * Creates <u>**Map**</u> to <u>**Array**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, retrieves Array item from Map item
 */
export declare function createMapToArray<K, V, ArrayItemType>(mapItemTransformer?: PairToSingle<K, V, ArrayItemType>): (sourceIterable: Map<K, V>) => ArrayItemType[];
/**
 * Creates <u>**Map**</u> to <u>**Set**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, extracts Set item from Map item
 */
export declare function createMapToSet<K, V, SetItemType>(mapItemTransformer?: PairToSingle<K, V, SetItemType>): (sourceIterable: Map<K, V>) => Set<SetItemType>;
/**
 * Creates <u>**Map**</u> to <u>**string**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, forms a character out Map item
 */
export declare function createMapToString<K, V>(mapItemTransformer?: PairToSingle<K, V, string>): (sourceIterable: Map<K, V>) => string;
/**********************************************************************************************************************/
/**
 * Creates <u>**Set**</u> to <u>**Array**</u> converter
 * @param setItemTransformer **Set** item transformer, forms an Array item out Set item
 */
export declare function createSetToArray<SetItemType, ArrayItemType>(setItemTransformer?: SingleToSingle<SetItemType, ArrayItemType>): (sourceIterable: Set<SetItemType>) => ArrayItemType[];
/**
 * Creates <u>**Set**</u> to <u>**Map**</u> converter
 * @param setItemTransformer **Set** item transformer, forms Map item out Set item
 */
export declare function createSetToMap<SetItemType, K, V>(setItemTransformer: SingleToPair<SetItemType, K, V>): (sourceIterable: Set<SetItemType>) => Map<K, V>;
/**
 * Creates <u>**Set**</u> to <u>**string**</u> converter
 * @param setItemTransformer **Set** item transformer, forms character out Set item
 */
export declare function createSetToString<SetItemType>(setItemTransformer?: SingleToSingle<SetItemType, string>): (sourceIterable: Set<SetItemType>) => string;
/**********************************************************************************************************************/
/**
 * Creates <u>**string**</u> to <u>**Array**</u> converter
 * @param characterTransformer character transformer, forms Array item out character
 */
export declare function createStringToArray<ArrayItemType>(characterTransformer?: SingleToSingle<string, ArrayItemType>): (sourceIterable: string) => ArrayItemType[];
/**
 * Creates <u>**string**</u> to <u>**Map**</u> converter
 * @param characterTransformer character transformer, forms Map item out character
 */
export declare function createStringToMap<K, V>(characterTransformer: SingleToPair<string, K, V>): (sourceIterable: string) => Map<K, V>;
/**
 * Creates <u>**string**</u> to <u>**Set**</u> converter
 * @param characterTransformer character transformer, forms Set item out character
 */
export declare function createStringToSet<SetItemType>(characterTransformer?: SingleToSingle<string, SetItemType>): (sourceIterable: string) => Set<SetItemType>;
