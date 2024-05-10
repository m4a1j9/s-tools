export const graphErrorMessages = {
    nodeAlreadyExistsMessage: (nodeId: string) => `Node with ID ${nodeId} already exists on this graph`,
    nodeDoesntExistMessage: (nodeId: string) => `Node with ID ${nodeId} doesn't exist on this graph`,
    noPathfinderMessage: () => 'No path finder specified',
};

export const treeErrorMessages = {
    wrongNodeToAddMessage: (nodeId: string) =>
        `Node with id ${nodeId} must have 1 or 0 incoming boundaries, 1 or 0 outgoing boundaries. If both are present, they have to point to the same existing node`,
    wrongParentNodeIdMessage: (nodeId: string) => `Node with id ${nodeId} has wrong parentNodeId`,
    noParentIdForRootMessage: () => `Root can't have parentNodeId`,

}

export const graphErrorsEmitters = {
    nodeAlreadyExists(nodeId: string) {
        throw Error(graphErrorMessages.nodeAlreadyExistsMessage(nodeId));
    },
    nodeDoesntExist(nodeId: string) {
        throw Error(graphErrorMessages.nodeDoesntExistMessage(nodeId));
    },
    noPathFinderSpecified() {
        throw Error(graphErrorMessages.noPathfinderMessage());
    },
};

export const treeErrorsEmitters = {
    wrongNodeToAdd(nodeId: string) {
        throw Error(treeErrorMessages.wrongNodeToAddMessage(nodeId));
    },
    wrongParentNodeId(nodeId: string) {
        throw Error(treeErrorMessages.wrongParentNodeIdMessage(nodeId));
    },
    noParentNodeForRoot() {
        throw Error(treeErrorMessages.noParentIdForRootMessage());
    }
}