export const treeErrorMessages = {
    wrongNodeToAddMessage: (nodeId: string) =>
        `Node with id ${nodeId} must have 1 or 0 incoming boundaries, 1 or 0 outgoing boundaries. If both are present, they have to point to the same existing node`,
    wrongParentNodeIdMessage: (nodeId: string) => `Node with id ${nodeId} has wrong parentNodeId`,
    noParentIdForRootMessage: () => `Root can't have parentNodeId`,

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
};