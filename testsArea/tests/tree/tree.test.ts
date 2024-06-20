import {Tree} from '@implementations';
import {treeErrorMessages} from '@utils/treeErrorsEmitters';
import {
    ROOT_NODE_ID,
    generateListOfTreeNodes,
    childNodeIdGenerator,
    nastyRootNode,
    nastyChildNode,
    naughtyChildNode,
} from '../../testsData/tree/treeTestsData';

describe('Tree Tests', () => {
   describe('addNode method tests', () => {
      const tree = new Tree();
      const nodesToAdd = generateListOfTreeNodes();
       nodesToAdd.forEach((node) => {
           tree.addNode(node);
       });
       const rootNode = tree.getNode(ROOT_NODE_ID)!;

       it('Should add all nodes', () => {
           expect(tree.nodes.size).toBe(nodesToAdd.length);
       });

       it('Should add root node correctly', () => {

           expect(() => tree.hasNode(ROOT_NODE_ID)).toBeTruthy();
           expect(rootNode!.nodeId).toBe(ROOT_NODE_ID);
           expect(!rootNode.nodeData?.parentNodeId).toBeTruthy();
           expect(tree.rootNodeId).toBe(ROOT_NODE_ID);

       });

       it('Should add nodes properly: result tree expected to be correct', () => {

           const nodesQueue = [rootNode.nodeId];

           while (nodesQueue.length) {
               const currentNodeId = nodesQueue.shift();
               if(currentNodeId) {
                   const node = tree.getNode(currentNodeId)!;
                   const parentNodeId = node.nodeData?.parentNodeId;
                   const childrenIds = [...node.outgoingBoundaries.values()]
                       .filter(nodeId => nodeId !== parentNodeId);

                   if (parentNodeId) {
                       if(childrenIds.length) {
                           expect(node.outgoingBoundaries.size).toBe(3);
                           expect(childrenIds.length).toBe(2);
                       } else {
                           expect(node.outgoingBoundaries.size).toBe(1);
                       }
                   } else {
                       expect(node.outgoingBoundaries.size).toBe(2);
                   }

                   nodesQueue.push(...childrenIds);
               }
           }

       });

       it('Should throw an error if one tries to add wrong root node', () => {
           const treeToBroke = new Tree();
           expect(() =>
               treeToBroke.addNode(nastyRootNode)
           ).toThrow(treeErrorMessages.noParentIdForRootMessage());
       });

       it('Should throw an error if node to add has more than two boundaries of each kind', () => {
           const treeToBroke = new Tree();
           expect(() =>
               treeToBroke.addNode(naughtyChildNode)
           ).toThrow(treeErrorMessages.wrongNodeToAddMessage(naughtyChildNode.nodeId));
       });

       it('Should throw an error if node to add has wrong parent node id', () => {
           const treeToBroke = new Tree();
           expect(() =>
               treeToBroke.addNode(nastyChildNode)
           ).toThrow(treeErrorMessages.wrongParentNodeIdMessage(nastyChildNode.nodeId));
       });
   });

   describe('removeNode method tests', () => {
       it('Should do nothing if id of non-existing node is passed', () => {
           const referenceTree = new Tree();
           const nodesReferenceList = generateListOfTreeNodes();
           nodesReferenceList.forEach((node) => {
               referenceTree.addNode(node);
           });

           const tree = new Tree();
           const nodesList = generateListOfTreeNodes();
           nodesList.forEach((node) => {
               tree.addNode(node);
           });

           tree.removeNode('SomeFantomNodeId');

           expect(tree.nodes).toEqual(referenceTree.nodes);

       });

       it('Should erase a subtree of a node to remove', () => {
           const tree = new Tree();
           const nodesList = generateListOfTreeNodes();
           nodesList.forEach((node) => {
               tree.addNode(node);
           });

           const nodeIdToRemove =  childNodeIdGenerator(1, 1);
           const removedSubtreeNodesIds = [
               childNodeIdGenerator(2, 1),
               childNodeIdGenerator(2, 2),
           ];

           tree.removeNode(nodeIdToRemove);

           expect(tree.hasNode(nodeIdToRemove)).toBe(false);

           removedSubtreeNodesIds.forEach((removedNodeId) => {
               expect(tree.hasNode(removedNodeId)).toBe(false);
           });

       });

       it('Should avoid to remove node subtree if its needed', () => {
           const tree = new Tree();
           const nodesList = generateListOfTreeNodes();
           nodesList.forEach((node) => {
               tree.addNode(node);
           });

           const expectedTreeNodesAmountAfterRemove = nodesList.length - 1;

           const nodeIdToRemove =  childNodeIdGenerator(1, 1);
           const subtreeNodesIds = [
               childNodeIdGenerator(2, 1),
               childNodeIdGenerator(2, 2),
           ];

           tree.removeNode(nodeIdToRemove, false);

           expect(tree.nodes.size).toBe(expectedTreeNodesAmountAfterRemove);

           subtreeNodesIds.forEach((subtreeNodeId) => {
               expect(tree.hasNode(subtreeNodeId)).toBe(true);
           });

       });
   });
});