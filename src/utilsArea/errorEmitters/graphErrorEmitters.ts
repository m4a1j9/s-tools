export const graphErrorMessages = {
    nodeAlreadyExistsMessage: (nodeId: string) => `Node with ID ${nodeId} already exists on this graph`,
    nodeDoesntExistMessage: (nodeId: string) => `Node with ID ${nodeId} doesn't exist on this graph`,
    noPathfinderMessage: () => 'No path finder specified',
};

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