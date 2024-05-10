export interface GraphNodeInterface<NodeData = void> {
    nodeId: string,
    incomingBoundaries: Map<string, string>,
    outgoingBoundaries: Map<string, string>,
    nodeData?: NodeData,
}

export interface GraphInterface<NodeData = void> {

    nodes: Map<string, GraphNodeInterface<NodeData>>,

    getNode: (nodeId: string) => GraphNodeInterface<NodeData> | undefined,
    getNodeData: (nodeId: string) => NodeData | undefined,


    hasNode: (nodeId: string) => boolean,
    addNode: (node: GraphNodeInterface<NodeData>) => void,
    removeNode: (nodeId: string) => GraphNodeInterface<NodeData> | undefined,

    flatten: (startNodeId: string) => Iterable<GraphNodeInterface<NodeData>>,
    buildPath: (startNodeId: string, endNodeId: string) => GraphNodeInterface<NodeData>[] | undefined,
}

export type LevelingStepFunction<NodeData = void> = (
    currentNode: GraphNodeInterface<NodeData>,
    sourceGraph: GraphInterface<NodeData>,
) => GraphNodeInterface<NodeData> | null;

export type PathBuilder<NodeData = void> = (
    startNode: GraphNodeInterface<NodeData>,
    endNode: GraphNodeInterface<NodeData>,
    sourceGraph: GraphInterface<NodeData>,
) => GraphNodeInterface<NodeData>[];

export interface GraphConfig<NodeData = void> {
    levelingStepFunction?: LevelingStepFunction<NodeData>,
    pathFinder?: PathBuilder<NodeData>,
}

export interface TreeNodeExtraData {
    parentNodeId: string,
}