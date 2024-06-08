# <u>Common tools (ct, also @vyacheslav97/ct)</u>

Common tools (hereinafter referred to as **ct**) - a common JavaScript data structures and associated processing procedures package ([package repository](https://github.com/VyacheslavMishin/ct/tree/master)). 

Tip: questions bother your head? Feel free to [contact me](https://t.me/WernerWalter)

Current version renewals:

- [**isNumber** data validator](#)
- [Decimal integers regular expressions](#): signed, unsigned, negative integers of arbitrary length
- [Decimal floating point numbers expressions](#): signed, unsigned, negative floats of arbitrary length
- [Decimal numbers of exponential format](#)

Next scheduled updates:

- **Table** class template
- Default pathfinder template based on BFS algorithm
- Default leveling step function based on DFS algorithm



## Prerequisites

To get along with this module (e.g. enable IntelliSense), enable in consumer project **tsconfig.json** **resolvePackageJsonImports**, **resolvePackageJsonExports** options, also check **module** and **moduleResolution** are **Node16**.

# Module guts
- [Universal iterable converter (UIC)](#uic)
- [Universal iterable converter (standard data structures, UICSDS)](#uicsds)
- [Graph abstract class](#GraphAbstractClass)
- [Tree abstract class](#TreeAbstractClass)
- [Mutations history template class](#mutationsHistory)
- [Binary search procedure template](#binarySearch)
- [Duplicates search procedure template](#duplicatesSearch)

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



<a id="GraphAbstractClass"></a>

## Graph abstract class

Graph abstract class implements oriented graph abstraction with basic graph content manipulations: adding nodes, deleting nodes. 

Graph node is represented via following generic interface:

```ts
interface GraphNodeInterface<NodeData = void> {
    nodeId: string, // unic graph node identifier
    // set of other graph nodes ids, from which boundaries are received
    incomingBoundaries: Map<string, string>,
    // set of other graph nodes which receive boundaries from a given node
    outgoingBoundaries: Map<string, string>,
    // Extra node data, may be ommited
    nodeData?: NodeData,
}
```

Graph class itself implements next interface:

```ts
interface GraphInterface<NodeData = void> {
	// base data structure containing all graph nodes
    nodes: Map<string, GraphNodeInterface<NodeData>>,
    
    getNode: (nodeId: string) => GraphNodeInterface<NodeData> | undefined,
    getNodeData: (nodeId: string) => NodeData | undefined,

	
    hasNode: (nodeId: string) => boolean,
    addNode: (node: GraphNodeInterface<NodeData>) => void,
    removeNode: (nodeId: string) => GraphNodeInterface<NodeData> | undefined,

    flatten: (startNodeId: string) => Iterable<GraphNodeInterface<NodeData>>,
    buildPath: (startNodeId: string, endNodeId: string) => GraphNodeInterface<NodeData>[] | undefined,
}
```

Some methods are not covered above:

- **setFlattenProcedure** - initializes **flatten** method via user defined leveling step function
- **setPathFinderProcedure** - initializes **buildPath** method via user defined pathfinder
- **buildFlattenProcedure**, **buildPathFinder** - are used for two previous method, it is highly recommended to avoid calling these methods



### Usage notes

Import Graph class: 

```ts
import Graph from '@vyacheslav97/ct/graph';
// All necessary interfaces can be imported from '@vyacheslav97/ct/graphs/interfaces'
```




#### Initialization

Graph can be initialized via its constructor if proper set of arguments is passed. 

Graph constructor expects following arguments:

```ts
constructor(
    sourceIterable?: Iterable<[string, GraphNodeInterface<NodeData>]>,
    config?: GraphConfig<NodeData>,
)
```

Where **GraphConfig<NodeData>**:

```ts
interface GraphConfig<NodeData = void> {
    levelingStepFunction?: LevelingStepFunction<NodeData>,
    pathFinder?: PathBuilder<NodeData>,
}

type LevelingStepFunction<NodeData = void> = (
    currentNode: GraphNodeInterface<NodeData>,
    sourceGraph: GraphInterface<NodeData>,
) => GraphNodeInterface<NodeData> | null;

type PathBuilder<NodeData = void> = (
    startNode: GraphNodeInterface<NodeData>,
    endNode: GraphNodeInterface<NodeData>,
    sourceGraph: GraphInterface<NodeData>,
) => GraphNodeInterface<NodeData>[];

```

**<u>USE WITH CAUTION</u>**: source iterable is passed to **Map** constructor as it is, with no input nodes validation (for now). You should not expect graph constructor to build edges. In future updates such validation is **planned to be implemented**.

If no constructor arguments are specified, empty graph instance is created.

Soon graph instance was created, nodes can be added to it via **addMethod**:

```ts
/**
 * Adds node to graph. Throws error if node of the same id already exists
 * @param nodeToAdd node to add, GraphNodeInterface<**NodeData**>
 */
addNode(nodeToAdd: GraphNodeInterface<NodeData>)
```

**addNode** adds a node to graph instance and all specified within that node edges.

Any node of graph instance can be retrieved using **getNode** method:

```ts
/**
 * Returns graph node of specified id, if graph has node with such id
 * @param nodeId target node id, **string**
 */
getNode(nodeId: string)
```

To retrieve **nodeData** you can use method **getNodeData**, which expects target node id as an argument.

To check whether graph possesses a node, use **hasNode** method (expects node id as an argument).

To remove some specific node, use **removeNode** method:

```ts
/**
 * Removes node of given id. Does nothing if wrong id is provided
 * @param nodeId id of node to remove, **string**
 */
removeNode(nodeId: string)
```

If graph is needed to be flattened, use **flatten** method. It returns an iterable, which can be used to convert a graph instance into array.

To find path between two specific nodes of given graph, use **buildPath** method.

**flatten** and **builtPath** have own peculiarities: both can be overridden, but only **flatten** has default behavior -  it returns **nodes** field **values** iterable if no custom flatten procedure is specified.

To override **flatten** procedure, use **setFlattenProcedure** method. 

Example:

```ts
// Has to gain one node from another. If it turns impossible - returns null
const levelingStepFunction: LevelingStepFunction<unknown> = ( // function for "linked list"
    currentNode: GraphNodeInterface<unknown>,
    graph: GraphInterface<unknown>,
) => {
    const {
        outgoingBoundaries,
    } = currentNode;
    const firstOutgoingBoundary = [...outgoingBoundaries]?.[0]?.[0];

    return graph.getNode(firstOutgoingBoundary) || null;

};

const graph = new Graph();

graph.setFlattenProcedure(levelingStepFunction);

// then call [...graph.flatten('someStartNodeId')], for example, or use for ... of, or whatever

```


To initialize or override **buildPath** method, call **setPathFinderProcedure** method. 

Example:

```ts
// Simple pathfinder for "linked list" 
const pathFinder: PathBuilder<unknown> = (
    startNode: GraphNodeInterface<unknown>,
    endNode: GraphNodeInterface<unknown>,
    graph: GraphInterface<unknown>,
) => {

    let currentNode: GraphNodeInterface<unknown> = startNode;
    const result: GraphNodeInterface<unknown>[] = [];

    do {
        result.push(currentNode);
        currentNode = graph.getNode([...currentNode.outgoingBoundaries]?.[0]?.[0])!;
    } while(result[result.length - 1]?.nodeId !== endNode.nodeId)

    return result;

};

const graph = new Graph();
graph.setPathFinderProcedure(pathFinder);

// here you go, call graph.buildPath('startNodeId', 'endNodeId');
// BUT REMEMBER: invalid node ids (e.g. absent one) will trigger an error

```

**buildPath** call with no initialization triggers an error.

<a id="TreeAbstractClass"></a>

## Tree abstract class

Import Tree class: 

```ts
import Tree from '@vyacheslav97/ct/tree';
```

**Tree** abstract class extends **Graph** abstract class. This extension brings in following mutations:

- **addNode**: 

  ```ts
  /**
   * Adds node to a tree instance, avoiding loops generation
   * @param nodeToAdd node data to add
   *
   * Throws error, if:
   * - Has more than one incoming or outgoing boundary
   * - First added node has **parentNodeId**
   * - Node of the same **nodeId** already exists on a tree instance
   * - Node has **parentNodeId** out of its **incomingBoundaries** or **outgoingBoundaries**
   */
  addNode(nodeToAdd: GraphNodeInterface<NodeData>)
  ```

- **removeNode**:

  ```ts
  /**
   * Removes a node from a tree instance (and the node whole subtree by default)
   * Doesn't remove a node if it doesn't exist on the tree instance
   * @param nodeId id of node to remove
   * @param deleteSubTree if true (by default) node and its subtree are removed
   */
  removeNode(nodeId: string, deleteSubTree = true)
  ```

- **rootNodeId** added - it contains tree root node id

- **nodeData** field becomes mandatory (but remains extensible): it has to contain **parentNodeId** field for each tree node except root one

- Constructor signature changes slightly: 

  ```ts
  constructor(
          rootNodeId: string = '',
          sourceIterable?: Iterable<[string, GraphNodeInterface<NodeData>]>,
          config?: GraphConfig<NodeData>,
      )
  ```

<a id="mutationsHistory"></a>

## Mutations history template class

**MutationsHistory** template class import:

```ts
import MutationsHistory from '@vyacheslav97/ct/mutationsHistory';
```

**MutationsHistory** implements changes history abstract mechanism. It is described via following interface:

```ts
interface MutationsHistoryInterface<HistoryUnitType> {

    lastSavedChangeIndex: number,

    commitedMutations: HistoryUnitType[],
    canceledMutations: HistoryUnitType[],

    getCurrentMutation: () => HistoryUnitType | undefined,

    addMutation: (mutation: HistoryUnitType) => void,
    cancelLastMutation: () => void,
    restoreCanceledMutation: () => void,
    saveCurrentMutation: () => void,
    backToSavedMutation: () => void,


    saveAndClear: () => void,
    clearHistory: () => void,

}
```

### MutationshHistory  API 

***Data:***

- **commitedMutations** stack - stack of committed changes
- **canceledMutations** stack - stack of canceled changes
- **lastSavedChangeIndex** - index of last saved change

***Methods:***

- **getCurrentMutation** - returns the most recent committed change
- **addMutation** - adds a fresh mutation to **commitedMutations** stack. Devastates filled **canceledMutations** stack
- **cancelLastMutation** - removes the most recent mutation from **commitedMutations** stack and places it in **canceledMutations** stack
- **restoreCanceledMutation** - if there are canceled mutations, then removes fresh mutation from **canceledMutations** stack and moves it to **commitedMutations** stack
- **saveCurrentMutation** - updates **lastSavedChangeIndex** with commitedMutations.length - 1
- **backToSavedMutation** - cancels or restores all mutations up to the last saved
- **saveAndClear** - saves the most recent commited mutation and demolishes the rest (canceled inclusive)
- **clearHistory** - clears history



A **MutationsHistory** instance can be created using predefined committed history list via **MutationsHis** class constructor:

```ts
constructor(sourceIterable?: Iterable<HistoryUnitType>) {

    this.commitedMutations = sourceIterable ? [...sourceIterable]: [];
    this.canceledMutations = [];
    this.lastSavedChangeIndex = this.commitedMutations.length - 1;
}
```

**MutationsHistory** is able to store whatever you plan it to: from changed objects itself to actions that mutate certain data structure. But a whole template, that rules history rules, remains the same.

<a id="binarySearch"></a>

## Binary search procedure template

**Binary search** template procedure import:

```ts
import {
    binarySearch, 
    buildBinarySearch,
} from '@vyacheslav97/ct/algorithms/binarySearch';
```

**NOTE:** it is highly recommended to prefer **buildBinarySearch** over **binarySearch**. 

**binarySearch** implements well-known binary search algorithm for array of arbitrary content. It receives:

- **sourceList** - list of data for binary search (list cotains data of the same arbitrary type)

- **target** - binary search target

- **comparator** - function that compares array elements and has a result described via following interface: 

  ```ts
  interface ComparatorResult {
      equal?: boolean,
      less?: boolean,
      greater?: boolean,
  }
  ```

**binarySearch** returns target index, if target does exist on given array or **undefined** otherwise.

**buildBinarySearch** creates **binarySearch** instance with a given comparator:

```ts

const numbersComparator = (x: number, y: number): ComparatorResult => ({
    less: x < y,
    greater: x > y,
    equal: x === y,
});

const numericalBinarySearch = buildBinarySearch(numbersComparator);

numericalBinarySearch([], 5); // undefined
numericalBinarySearch([1, 2, 3, 4, 5], 2); // 1

```

<a id="duplicatesSearch"></a>

## Duplicates search procedure template

**Duplicates search** procedure template import:

```ts
import {
    duplicatesSearcher,
    buildDuplicatesSearcher,
} from '@vyacheslav97/ct/algorithms/duplicatesSearcher';
```

**duplicatesSearcher** function looks for duplicates within a given array of data. It accepts following arguments:

- **source** – duplications source iterable

- **valueExtractor** – optional function, derives a primitive according which two values are considered as duplicates

- Returns  **Map**, which keys are **valueExtractor** values, values are lists of **DuplicateData**: 

  ```ts
  interface DuplicateData<T> {
      duplicateIndex: number;
      duplicateValue: T;
  }
  ```

  

  **Note:** **duplicatesSearcher** returns empty **Map** only if source iterable is empty, otherwise it has maximum size equal to source iterable values amount. 



**buildDuplicatesSearcher** builds a **duplicatesSearcher** instance with a given**valueExtractor**:

```ts
interface SimpleObjectData {
    value: string,
}

const valueExtractor = (data: SimpleObjectData) => data.value;


const numericalDuplicatesSearcher = buildDuplicatesSearcher<number>();
numericalDuplicatesSearcher([1, 2, 3, 4, 5]);

export const objectDuplicatesSearcher = buildDuplicatesSearcher(valueExtractor);

objectDuplicatesSearcher([
    {
        value: 'a',
    },
    {
        value: 'a',
    },
    {
        value: 'c',
    },
]);



```

