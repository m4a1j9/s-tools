import {Graph} from './graph';
import {GraphConfig, GraphNodeInterface, TreeNodeExtraData} from '@interfaces';
import {treeErrorsEmitters} from '@utils/treeErrorsEmitters';
/**
 * **Tree** class represents tree abstraction extending **Graph** class.
 *
 * Extension changes:
 * - rootNodeId represents tree root node id
 * - **addNode** and **removeNode** methods of original class are overloaded to deal with tree peculiarities well
 * - Each node has to carry nodeData that extends **TreeNodeExtraData** interface
 */
export class Tree<NodeData  extends TreeNodeExtraData> extends Graph<NodeData> {
    rootNodeId: string;
    constructor(
        rootNodeId: string = '',
        sourceIterable?: Iterable<[string, GraphNodeInterface<NodeData>]>,
        config?: GraphConfig<NodeData>,
    ) {
        super(sourceIterable, config);
        this.rootNodeId = rootNodeId;
    }


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
    addNode(nodeToAdd: GraphNodeInterface<NodeData>) {
        const {
            nodeId: nodeToAddId,
            incomingBoundaries,
            outgoingBoundaries,
        } = nodeToAdd;


        if(incomingBoundaries.size <= 1 && outgoingBoundaries.size <= 1) {


            if(this.nodes.size === 0) {
                if([incomingBoundaries, outgoingBoundaries].every(x => x.size === 0)) {

                    const parentNodeId = nodeToAdd.nodeData?.parentNodeId;

                    const isLeaf = nodeToAdd?.nodeData?.isLeaf;

                    if(parentNodeId) {
                        treeErrorsEmitters.noParentNodeForRoot();
                    }

                    if(isLeaf) {
                        treeErrorsEmitters.rootCantBeALeaf(); // ATTENTION: 1.0.2 version update
                    }

                    this.rootNodeId = nodeToAdd.nodeId;
                    super.addNode(nodeToAdd);
                    return;
                }
            }

            if(incomingBoundaries.size === 1 && outgoingBoundaries.size === 1) {
                if([...incomingBoundaries].every(([key, value]) => outgoingBoundaries.get(key) === value)) {
                    const parentNodeId = nodeToAdd.nodeData?.parentNodeId || '';

                    if(!incomingBoundaries.get(parentNodeId)) {
                        treeErrorsEmitters.wrongParentNodeId(nodeToAdd.nodeId);
                    }

                    super.addNode(nodeToAdd);

                    delete this.getNode(parentNodeId)?.nodeData?.isLeaf; // 1.0.2 update, needs to be tested
                    nodeToAdd.nodeData!.isLeaf = true;  // 1.0.2 update, needs to be tested

                    return;
                }
            }

            if(incomingBoundaries.size || outgoingBoundaries.size) {
                const parentNodeId = nodeToAdd.nodeData?.parentNodeId || '';
                if(!incomingBoundaries.get(parentNodeId) || !outgoingBoundaries.get(parentNodeId)) {
                    treeErrorsEmitters.wrongParentNodeId(nodeToAdd.nodeId);
                }
                super.addNode(nodeToAdd);

                delete this.getNode(parentNodeId)?.nodeData?.isLeaf; // 1.0.2 update, needs to be tested
                nodeToAdd.nodeData!.isLeaf = true;  // 1.0.2 update, needs to be tested

                return;
            }

        }

        treeErrorsEmitters.wrongNodeToAdd(nodeToAddId);
    }


    /**
     * Removes a node from a tree instance (and the node whole subtree by default)
     * Doesn't remove a node if it doesn't exist on the tree instance
     * @param nodeId id of node to remove
     */
    removeNode(nodeId: string) {
        const nodeToRemove = super.removeNode(nodeId);

        if(!nodeToRemove) {
            return;
        }


        const parentId = nodeToRemove.nodeData!.parentNodeId!;

        const parentNode = this.getNode(parentId);
        const grandParentNodeId = parentNode!.nodeData!.parentNodeId!;
        /*
        * isLeaf node property auto handle during node deletion
        * parent node has to be considered as a tree leaf
        *
        * ATTENTION: 1.0.2 version update, needs to be tested
        * */
        if(parentNode) {
            if(
              (parentNode.outgoingBoundaries.has(grandParentNodeId) && parentNode.outgoingBoundaries.size === 1)
              ||
              (parentNode.incomingBoundaries.has(grandParentNodeId) && parentNode.incomingBoundaries.size === 1)
            ) {
                parentNode.nodeData!.isLeaf = true;
            }
        }

        const subtreeNodesIds: string[] = [
            ...nodeToRemove.incomingBoundaries.values(),
            ...nodeToRemove.outgoingBoundaries.values(),
        ].filter(nodeId => nodeId !== parentId);

        // In future updates will be optimized
        // Need custom queue based on a graph child class
        while(subtreeNodesIds.length) {
            const anotherNodeToDeleteId = subtreeNodesIds.shift()!;
            const anotherNodeToDelete = super.removeNode(anotherNodeToDeleteId);

            if(anotherNodeToDelete) {

                subtreeNodesIds.push(
                    ...anotherNodeToDelete.incomingBoundaries.values(),
                    ...anotherNodeToDelete.outgoingBoundaries.values(),
                );
            }
        }


        return nodeToRemove;
    }

    /**
     * Removes all nodes from a tree instance
     * and erases root node id
     * ATTENTION: 1.0.2 version update, needs to be tested
     */
    clear() {
        super.clear();
        this.rootNodeId = '';
    }

}