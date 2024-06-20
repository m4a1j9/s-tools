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
                    if(nodeToAdd.nodeData?.parentNodeId) {
                        treeErrorsEmitters.noParentNodeForRoot();
                    }
                    this.rootNodeId = nodeToAdd.nodeId;
                    super.addNode(nodeToAdd);
                    return;
                }
            }

            if(incomingBoundaries.size === 1 && outgoingBoundaries.size === 1) {
                if([...incomingBoundaries].every(([key, value]) => outgoingBoundaries.get(key) === value)) {
                    const parentNode = nodeToAdd.nodeData?.parentNodeId || '';
                    if(!incomingBoundaries.get(parentNode)) {
                        treeErrorsEmitters.wrongParentNodeId(nodeToAdd.nodeId);
                    }
                    super.addNode(nodeToAdd);
                    return;
                }
            }

            if(incomingBoundaries.size || outgoingBoundaries.size) {
                const parentNode = nodeToAdd.nodeData?.parentNodeId || '';
                if(!incomingBoundaries.get(parentNode) || !outgoingBoundaries.get(parentNode)) {
                    treeErrorsEmitters.wrongParentNodeId(nodeToAdd.nodeId);
                }
                super.addNode(nodeToAdd);
                return;
            }

        }

        treeErrorsEmitters.wrongNodeToAdd(nodeToAddId);
    }


    /**
     * Removes a node from a tree instance (and the node whole subtree by default)
     * Doesn't remove a node if it doesn't exist on the tree instance
     * @param nodeId id of node to remove
     * @param deleteSubTree if true (by default) node and its subtree are removed
     */
    removeNode(nodeId: string, deleteSubTree = true) {
        const nodeToRemove = super.removeNode(nodeId);

        if(!nodeToRemove) {
            return;
        }


        if(deleteSubTree) {

            const parentId = nodeToRemove.nodeData!.parentNodeId;

            const subtreeNodesIds: string[] = [
                ...nodeToRemove.incomingBoundaries.values(),
                ...nodeToRemove.outgoingBoundaries.values(),
            ].filter(nodeId => nodeId !== parentId);

            // In future updates will be optimized
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

        }

        return nodeToRemove;
    }

}