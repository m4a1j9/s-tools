"use strict";
// UIC Standard Data Structures (UICSDS)
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStringToSet = exports.createStringToMap = exports.createStringToArray = exports.createSetToString = exports.createSetToMap = exports.createSetToArray = exports.createMapToString = exports.createMapToSet = exports.createMapToArray = exports.createArrayToString = exports.createArrayToSet = exports.createArrayToMap = void 0;
const uic_1 = require("./uic");
// "arrayTo" converters
/**********************************************************************************************************************/
/**
 * Creates <u>**Array**</u> to <u>**Map**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives key-value pair from array item
 */
function createArrayToMap(arrayItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Map, arrayItemTransformer);
}
exports.createArrayToMap = createArrayToMap;
/**
 * Creates <u>**Array**</u> to <u>**Set**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, extracts some value from array item
 */
function createArrayToSet(arrayItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Set, arrayItemTransformer);
}
exports.createArrayToSet = createArrayToSet;
/**
 * Creates <u>**Array**</u> to <u>**string**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives value as character from array item
 */
function createArrayToString(arrayItemTransformer) {
    //@ts-ignore
    return (0, uic_1.createIterableTransformer)(String, arrayItemTransformer);
}
exports.createArrayToString = createArrayToString;
// "mapTo" converters
/**********************************************************************************************************************/
/**
 * Creates <u>**Map**</u> to <u>**Array**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, retrieves Array item from Map item
 */
function createMapToArray(mapItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Array, mapItemTransformer);
}
exports.createMapToArray = createMapToArray;
/**
 * Creates <u>**Map**</u> to <u>**Set**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, extracts Set item from Map item
 */
function createMapToSet(mapItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Set, mapItemTransformer);
}
exports.createMapToSet = createMapToSet;
/**
 * Creates <u>**Map**</u> to <u>**string**</u> converter
 * @param mapItemTransformer <u>**Map**</u> item transformer, forms a character out Map item
 */
function createMapToString(mapItemTransformer) {
    //@ts-ignore
    return (0, uic_1.createIterableTransformer)(String, mapItemTransformer);
}
exports.createMapToString = createMapToString;
// "setTo" converters
/**********************************************************************************************************************/
/**
 * Creates <u>**Set**</u> to <u>**Array**</u> converter
 * @param setItemTransformer **Set** item transformer, forms an Array item out Set item
 */
function createSetToArray(setItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Array, setItemTransformer);
}
exports.createSetToArray = createSetToArray;
/**
 * Creates <u>**Set**</u> to <u>**Map**</u> converter
 * @param setItemTransformer **Set** item transformer, forms Map item out Set item
 */
function createSetToMap(setItemTransformer) {
    return (0, uic_1.createIterableTransformer)(Map, setItemTransformer);
}
exports.createSetToMap = createSetToMap;
/**
 * Creates <u>**Set**</u> to <u>**string**</u> converter
 * @param setItemTransformer **Set** item transformer, forms character out Set item
 */
function createSetToString(setItemTransformer) {
    //@ts-ignore
    return (0, uic_1.createIterableTransformer)(String, setItemTransformer);
}
exports.createSetToString = createSetToString;
// "stringTo" converters
/**********************************************************************************************************************/
/**
 * Creates <u>**string**</u> to <u>**Array**</u> converter
 * @param characterTransformer character transformer, forms Array item out character
 */
function createStringToArray(characterTransformer) {
    return (0, uic_1.createIterableTransformer)(Array, characterTransformer);
}
exports.createStringToArray = createStringToArray;
/**
 * Creates <u>**string**</u> to <u>**Map**</u> converter
 * @param characterTransformer character transformer, forms Map item out character
 */
function createStringToMap(characterTransformer) {
    return (0, uic_1.createIterableTransformer)(Map, characterTransformer);
}
exports.createStringToMap = createStringToMap;
/**
 * Creates <u>**string**</u> to <u>**Set**</u> converter
 * @param characterTransformer character transformer, forms Set item out character
 */
function createStringToSet(characterTransformer) {
    return (0, uic_1.createIterableTransformer)(Set, characterTransformer);
}
exports.createStringToSet = createStringToSet;
