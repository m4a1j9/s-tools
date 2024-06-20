import {
    GraphInterface,
    GraphNodeInterface,
    LevelingStepFunction,
    PathBuilder,
} from '@interfaces';

export interface SomeUserData {
    someData: number,
}

export const nodesWithNoData: GraphNodeInterface<unknown>[] = [
    {
        nodeId: 'firstNode',
        incomingBoundaries: new Map<string, string>(),
        outgoingBoundaries: new Map<string, string>()
    },
    {
        nodeId: 'secondNode',
        incomingBoundaries: new Map<string, string>([['firstNode', 'firstNode']]),
        outgoingBoundaries: new Map<string, string>()
    },
    {
        nodeId: 'thirdNode',
        incomingBoundaries: new Map<string, string>([['secondNode', 'secondNode']]),
        outgoingBoundaries: new Map<string, string>()
    }
];

export const nodesWithData: GraphNodeInterface<SomeUserData>[] = [
    {
        nodeId: 'firstNode',
        incomingBoundaries: new Map<string, string>(),
        outgoingBoundaries: new Map<string, string>(),
        nodeData: {
            someData: 1
        }
    },
    {
        nodeId: 'secondNode',
        incomingBoundaries: new Map<string, string>([['firstNode', 'firstNode']]),
        outgoingBoundaries: new Map<string, string>(),
        nodeData: {
            someData: 2
        }
    },
    {
        nodeId: 'thirdNode',
        incomingBoundaries: new Map<string, string>([['secondNode', 'secondNode']]),
        outgoingBoundaries: new Map<string, string>(),
        nodeData: {
            someData: 3
        }
    }
];

export const levelingStepFunction: LevelingStepFunction<unknown> = (
    currentNode: GraphNodeInterface<unknown>,
    graph: GraphInterface<unknown>,
) => {
    const {
        outgoingBoundaries,
    } = currentNode;
    const firstOutgoingBoundary = [...outgoingBoundaries]?.[0]?.[0];

    return graph?.getNode(firstOutgoingBoundary) || null;

};

export const pathFinder: PathBuilder<unknown> = (
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

export const cloneDeepNodesList = <T>(nodesList: GraphNodeInterface<T>[]): GraphNodeInterface<T>[] => {
    return nodesList.map((node) => {
       return {
           ...node,
           incomingBoundaries: new Map<string, string>(node.incomingBoundaries.entries()),
           outgoingBoundaries: new Map<string, string>(node.outgoingBoundaries.entries()),
       };
    });
}