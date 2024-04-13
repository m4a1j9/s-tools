# <u>Common tools (ct, also @vyacheslav97/ct)</u>

Common tools (hereinafter referred to as **ct**) - a common JavaScript data structures and associated processing procedures package. 

Tip: questions bother your head? Feel free to contact me: https://t.me/WernerWalter

# Module guts
- [Universal iterable converter (UIC)](#uic)
- [Universal iterable converter (standard data structures, UICSDS)](#uicsds)
- [Current known issues](#KnownIssues)

<a id="uic"></a>
## Universal iterable converter (UIC)

UIC module provides a user with two functions: **transformToIterable** and its wrapper, **createIterableTransformer**. UIC module is represented by uic.ts file of original project.

**transformToIterable** is a core procedure - it defines the way an input iterable is converted to an output one. 
**createIterableTransformer** wraps **transformToIterable** to create an iterable convertor with encapsulated target iterable constructor. 

**transformToIterable** algorithm essentials:

- Accepts 3 arguments: source iterable object, target iterable constructor and source iterable value converter (the last is optional)
- Sometimes source iterable can be consumed by target iterable constructor as it is, then source iterable value converter may be omitted
- Otherwise, a proxy iterable is created, that wraps source iterable values in source iterable value converter. Then this proxy iterable is passed to a target iterable constructor

### Usage notes

UIC members  can be imported as follows:

```ts
import {createIterableTransformer, transformToIterable} from '@vyacheslav97/ct/uic';
```


**createIterableTransformer** is highly recommended for usage instead of **transformToIterable** to avoid redundant target iterable constructor referencing.
For example, lets inspect a **createIterableTransformer** application from **uicsds.ts**:

```ts
/**
 * Creates <u>**Array**</u> to <u>**Map**</u> converter
 * @param arrayItemTransformer <u>**Array**</u> item transformer, derives key-value pair from array item
 */
export function createArrayToMap<ArrayItemType, K, V>(
    arrayItemTransformer: SingleToPair<ArrayItemType, K, V>,
) {
    return createIterableTransformer<ArrayItemType[], [K, V], Map<K, V>>(Map, arrayItemTransformer);
}
```

**createArrayToMap** creates an **Array** to **Map** transformer. All such transformer needs to be utilized is an array item transform function, which converts an array item to key-value pair for **Map** constructor. 
Here goes an **createArrayToMap** application example:

```ts

// Clarifies the rule how to transform array item to a key-value pair list
const shiftedArrayItemToMapItemTransformer: SingleToPair<number, number, number>
    = (number): [number, number] => [number, number + 1];

// Creates array to map converter with certain array item rule transformation
const arrayToMapShifted = createArrayToMap<number, number, number>(shiftedArrayItemToMapItemTransformer);

arrayToMapShifted([1, 2, 3]) //--> {1 -> 2, 2 -> 3, 3 -> 4} - final Map object content
```

Remember, you are able to create your own custom iterable transformers!

<a id="uicsds"></a>
## Universal iterable converter (standard data structures, UICSDS)

UICSDS module consists of **createIterableTransformer** applications to built-in JavaScript iterable datastructures. uicsds.ts represents UICSDS module content.

UICSDS module members can be imported as follows:

```ts
import {createArrayToMap, createMapToSet} from '@vyacheslav97/ct/uicsds';
```

### Usage notes

It's pretty easy to use:
- first, just import caught your eye transformer creator
- then specify source iterable transformation function
- finally create your iterable converter


Example:

```ts
// All needed type aliases for conversion laws can be imported as follows:
import {
  SingleToPair,
  SingleToSingle,
  PairToSingle
} from "@vyacheslav97/uic/interfaces";

// Map item to a character transformer 
const keyValuePairConcatenatedTransformer: PairToSingle<number, number, string>
    = (pair) => pair.join('');

// Create transformer itself 
const keyValuePairConcatenated = createMapToString(keyValuePairConcatenatedTransformer);

keyValuepairConcatenated(new Map([[1, 1], [2, 2]])); // results in '1122'

```

<a id="KnownIssues"></a>
## Current known issues

Webstorm (always) and VS Code (sometimes) can't autocomplete imports and don't fetch doc strings content. 
Despite this issue test project with simple webpack configurations assembles well and runs installed module code smoothly.
If you now how to handle described issue via tuning ct package in particular, please, feel free to contact me. I'll appreciate your help.



# Roadmap

Next scheduled implementations:

- Oriented graph data structure, able to handle adding and deleted nodes, to search for node using built-in DFS and BFS algorithms or via user-specified procedure. Tree data structure as a child of oriented graph is implied to be realized in most generalized way to be adopted to various existing trees: binary trees, RB trees and so on
- Standard generalized algorithms like binary search, unique values search and so on
