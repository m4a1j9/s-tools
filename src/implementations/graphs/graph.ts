import {
    GraphConfig,
    GraphInterface,
    GraphNodeInterface,
    LevelingStepFunction,
    PathBuilder,
} from '@graphs/interfaces';

import {graphErrorsEmitters} from '@utils/errorEmitters';

/**
 * **Graph** class represents graph abstraction.
 *
 * **Graph** class contains graph itself as **Map**<string, GraphNodeInterface<**NodeData**>> and several methods to
 * handle it:
 *
 * - getNode
 * - getNodeData
 * - hasNode
 * - addNode
 * - removeNode
 * - flatten
 * - buildPath
 *
 * Also, some extra procedures builders are available:
 *
 * - setFlattenProcedure
 * - buildFlattenProcedure
 * - buildPathFinder
 *
 * All of them covered in details below
 */
class Graph<NodeData> implements GraphInterface<NodeData> {
    nodes: Map<string,GraphNodeInterface<NodeData>>;

    /**
     * Returns an iterable of graph nodes, starting with node of specified id. If graph has no node
     * of given id, error is thrown
     * @param startNodeId start node id, **string**
     * @returns Iterable<GraphNodeInterface<NodeData>>
     */
    flatten: (startNodeId: string) => Iterable<GraphNodeInterface<NodeData>>;

    /**
     * Returns a path from node of start id to node of end id if both are in graph and
     * a some path is between them
     * @param startNodeId start node id, **string**
     * @returns {GraphNodeInterface<NodeData>[] | undefined}
     */
    buildPath: (startNodeId: string, endNodeId: string) => GraphNodeInterface<NodeData>[] | undefined;

    /**
     * Builds a **Graph** class instance
     * @param sourceIterable source iterable for a graph **Map** data structure.
     * Its iterator value has to be an array [**string**, GraphNodeInterface<**NodeData**>], **optional**
     * @param config contains a function for flatten procedure and a pathfinder
     */
    constructor(
        sourceIterable?: Iterable<[string, GraphNodeInterface<NodeData>]>,
        config?: GraphConfig<NodeData>,
    ) {
        this.nodes = new Map<string, GraphNodeInterface<NodeData>>(sourceIterable);
        this.flatten  = this.buildFlattenProcedure(config?.levelingStepFunction);
        this.buildPath = this.buildPathFinder(config?.pathFinder) || (() => undefined);
    }

    /**
     * Returns graph node of specified id, if graph has node with such id
     * @param nodeId target node id, **string**
     */
    getNode(nodeId: string) {
        return this.nodes.get(nodeId);
    }

    /**
     * Returns data of node with specified id, if the node does exist
     * @param nodeId target node id, **string**
     */
    getNodeData(nodeId: string) {
        return this.getNode(nodeId)?.nodeData;
    }

    /**
     * **true** if node of specified id does exist in this graph, **false** otherwise
     * @param nodeId
     */
    hasNode(nodeId: string) {
        return this.nodes.has(nodeId);
    }

    /**
     * Adds node to graph. Throws error if node of the same id already exists
     * @param nodeToAdd node to add, GraphNodeInterface<**NodeData**>
     */
    addNode(nodeToAdd: GraphNodeInterface<NodeData>) {
        const {
            nodeId: nodeToAddId,
            incomingBoundaries,
            outgoingBoundaries,
        } = nodeToAdd;

        if(this.hasNode(nodeToAddId)) {
            graphErrorsEmitters.nodeAlreadyExists(nodeToAddId);
        }

        incomingBoundaries.forEach((nodeId) => {
            const node = this.getNode(nodeId);

            if(node) {
                node.outgoingBoundaries.set(nodeToAddId, nodeToAddId);
                return;
            }

            graphErrorsEmitters.nodeDoesntExist(nodeId);

        });

        outgoingBoundaries.forEach((nodeId) => {

            const node = this.getNode(nodeId);

            if(node) {
                node.incomingBoundaries.set(nodeToAddId, nodeToAddId);
                return;
            }

            graphErrorsEmitters.nodeDoesntExist(nodeId);

        });

        this.nodes.set(nodeToAddId, nodeToAdd);

    };

    /**
     * Removes node of given id. Does nothing if wrong id is provided
     * @param nodeId id of node to remove, **string**
     */
    removeNode(nodeId: string) {
        const nodeToRemove = this.getNode(nodeId);
        if(nodeToRemove) {

            const {
                nodeId: nodeToRemoveId,
                incomingBoundaries,
                outgoingBoundaries,
            } = nodeToRemove;

            incomingBoundaries.forEach((nodeId) => {

                const node = this.getNode(nodeId);

                if(node) {
                    node.outgoingBoundaries.delete(nodeToRemoveId);
                }

            });

            outgoingBoundaries.forEach((nodeId) => {
                const node = this.getNode(nodeId);

                if(node) {
                    node.incomingBoundaries.delete(nodeToRemoveId);
                }
            });


        }

        this.nodes.delete(nodeId);

        return nodeToRemove;
    }

    /**
     * Initializes **flatten** method
     * @param levelingStepFunction a function that defines a rule how to gain a graph node from another,
     * LevelingStepFunction<**NodeData**>
     */
    setFlattenProcedure(levelingStepFunction: LevelingStepFunction<NodeData>) {
        this.flatten = this.buildFlattenProcedure(levelingStepFunction);
    }

    /**
     * Initializes **buildPath** method
     * @param pathFinder a pathfinder algorithm implementing function
     */
    setPathFinderProcedure(pathFinder?: PathBuilder<NodeData>) {
        this.buildPath = this.buildPathFinder(pathFinder);
    }

    /**
     * Builds graph flatten procedure
     * @param levelingStepFunction a function that defines a rule how to gain a graph node from another,
     * LevelingStepFunction<**NodeData**>
     */
    buildFlattenProcedure(levelingStepFunction?: LevelingStepFunction<NodeData>) {

        let boundLevelingStepFunction = undefined;

        if(levelingStepFunction) {
            boundLevelingStepFunction = (currentNode: GraphNodeInterface<NodeData>) => levelingStepFunction(currentNode, this);
        }


        return (startNodeId: string) => {

            if(boundLevelingStepFunction) {

                const flattenedGraph: GraphNodeInterface<NodeData>[] = [];
                let currentNode = this.getNode(startNodeId) || null;

                if(!currentNode) {
                    graphErrorsEmitters.nodeDoesntExist(startNodeId);
                    return flattenedGraph;
                }


                const flattenedGraphIterable: Iterable<GraphNodeInterface<NodeData>> = {
                    [Symbol.iterator]: () => {
                        return {
                            next() {
                                if(currentNode) {
                                    const lastNode = currentNode;
                                    currentNode = boundLevelingStepFunction(currentNode);

                                    return {
                                        value: lastNode,
                                    }
                                }

                                return {
                                    done: true,
                                    value: undefined,
                                }
                            }
                        }
                    }
                }

                return flattenedGraphIterable;

            }

            return this.nodes.values();
        };
    }

    /**
     * Builds graph **buildPath** method
     * @param pathFinder pathfinder function, PathBuilder<**NodeData**>
     */
    buildPathFinder(pathFinder?: PathBuilder<NodeData>) {

        return (startNodeId: string, endNodeId: string) => {

            if(!pathFinder) {
                graphErrorsEmitters.noPathFinderSpecified();
                return;
            }

            const startNode = this.getNode(startNodeId);
            const endNode = this.getNode(endNodeId);

            if(!startNode) {
                graphErrorsEmitters.nodeDoesntExist(startNodeId);
                return;
            }
            if(!endNode) {
                graphErrorsEmitters.nodeDoesntExist(endNodeId);
                return;
            }


            return pathFinder(startNode, endNode, this);


        };
    }

}

export default Graph;