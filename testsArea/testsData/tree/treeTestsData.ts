import {
    GraphNodeInterface,
    TreeNodeExtraData,
} from '@interfaces';


type TreeNodeInterface = GraphNodeInterface<TreeNodeExtraData>;

export const ROOT_NODE_ID = 'root';

// root node has parent node id case
export const nastyRootNode: TreeNodeInterface = {
    nodeId: ROOT_NODE_ID,
    incomingBoundaries: new Map<string, string>(),
    outgoingBoundaries: new Map<string, string>(),
    nodeData: {
        parentNodeId: 'cunning node',
    },
};


export const childNodeIdGenerator = (level: number, inLevelNumber: number) => `${level}-${inLevelNumber}`;

// too many incoming boundaries case
export const naughtyChildNode: TreeNodeInterface = {
    nodeId: 'naughty child',
    incomingBoundaries: new Map<string, string>([['nasty', 'naughty'], ['tricky', 'cunning']]),
    outgoingBoundaries: new Map<string, string>([['nasty', 'naughty'], ['tricky', 'cunning']]),
    nodeData: {
        parentNodeId: childNodeIdGenerator(1, 1),
    },
};
// wrong parent node id case
export const nastyChildNode: TreeNodeInterface = {
    nodeId: 'nasty child',
    incomingBoundaries: new Map<string, string>([[ROOT_NODE_ID, ROOT_NODE_ID]]),
    outgoingBoundaries: new Map<string, string>(),
    nodeData: {
        parentNodeId: 'tricky node',
    },
}
// binary tree nodes list generator
export const generateListOfTreeNodes= (): TreeNodeInterface[] => ([
    {
        nodeId: 'root',
        incomingBoundaries: new Map<string, string>(),
        outgoingBoundaries: new Map<string, string>(),
    },
    {
        nodeId: childNodeIdGenerator(1, 1),
        incomingBoundaries: new Map<string, string>([[ROOT_NODE_ID, ROOT_NODE_ID]]),
        outgoingBoundaries: new Map<string, string>([[ROOT_NODE_ID, ROOT_NODE_ID]]),
        nodeData: {
            parentNodeId: ROOT_NODE_ID,
        },
    },
    {
        nodeId: childNodeIdGenerator(1, 2),
        incomingBoundaries: new Map<string, string>([[ROOT_NODE_ID, ROOT_NODE_ID]]),
        outgoingBoundaries: new Map<string, string>([[ROOT_NODE_ID, ROOT_NODE_ID]]),
        nodeData: {
            parentNodeId: ROOT_NODE_ID,
        },
    },
    {
        nodeId: childNodeIdGenerator(2, 1),
        incomingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 1),
                childNodeIdGenerator(1, 1)
            ]]
        ),
        outgoingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 1),
                childNodeIdGenerator(1, 1)
            ]]
        ),
        nodeData: {
            parentNodeId: childNodeIdGenerator(1, 1),
        },
    },
    {
        nodeId: childNodeIdGenerator(2, 2),
        incomingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 1),
                childNodeIdGenerator(1, 1)
            ]]
        ),
        outgoingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 1),
                childNodeIdGenerator(1, 1)
            ]]
        ),
        nodeData: {
            parentNodeId: childNodeIdGenerator(1, 1),
        },
    },
    {
        nodeId: childNodeIdGenerator(2, 3),
        incomingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 2),
                childNodeIdGenerator(1, 2)
            ]]
        ),
        outgoingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 2),
                childNodeIdGenerator(1, 2)
            ]]
        ),
        nodeData: {
            parentNodeId: childNodeIdGenerator(1, 2),
        },
    },
    {
        nodeId: childNodeIdGenerator(2, 4),
        incomingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 2),
                childNodeIdGenerator(1, 2)
            ]]
        ),
        outgoingBoundaries: new Map<string, string>(
            [[
                childNodeIdGenerator(1, 2),
                childNodeIdGenerator(1, 2)
            ]]
        ),
        nodeData: {
            parentNodeId: childNodeIdGenerator(1, 2),
        },
    },
]);
