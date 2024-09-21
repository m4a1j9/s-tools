import {Graph} from '@implementations';
import {graphErrorMessages, graphErrorsEmitters} from '@utils/graphErrorsEmitters';

import {
    nodesWithNoData,
    nodesWithData,
    nodesWithWrongRootData,
    levelingStepFunction,
    pathFinder,
    cloneDeepNodesList,
    SomeUserData,
} from '../../testsData/graph/graphTestsData';


describe('Graph Tests', () => {

    describe('Graph constructor tests', () => {
        it('should create a graph with correct nodes set', () => {
           const deepClonedNodesList =  cloneDeepNodesList(nodesWithNoData);
           const graph = new Graph<unknown>(deepClonedNodesList);
            deepClonedNodesList.forEach((node) => {
               expect(graph.getNode(node.nodeId)).toEqual(node);
           });
        });
        it('should throw an error attempting to create a graph with wrong nodes', () => {
            const singleNodeId = nodesWithWrongRootData[0].incomingBoundaries.get('some strange node')!;
            expect(() => new Graph(nodesWithWrongRootData)).toThrow(graphErrorMessages.nodeDoesntExistMessage(singleNodeId));
        });
    });

    describe('addNode method tests', () => {
        const linkedListWithNoData = new Graph();
        cloneDeepNodesList(nodesWithNoData).forEach(node => {
           linkedListWithNoData.addNode(node);
        });
        it('Should add nodes', () => {
            nodesWithNoData.forEach(node => {
               expect(node.nodeId).toEqual(linkedListWithNoData.getNode(node.nodeId)!.nodeId);
            });
        });
        it('Should add nodes with correct edges handling', () => {
            const {
                incomingBoundaries: firstIncomingBoundaries,
                outgoingBoundaries: firstOutgoingBoundaries,
            } = linkedListWithNoData.getNode('firstNode')!;

            const {
                incomingBoundaries: secondIncomingBoundaries,
                outgoingBoundaries: secondOutgoingBoundaries,
            } = linkedListWithNoData.getNode('secondNode')!;

            const {
                incomingBoundaries: thirdIncomingBoundaries,
                outgoingBoundaries: thirdOutgoingBoundaries,
            } = linkedListWithNoData.getNode('thirdNode')!;

            expect(firstOutgoingBoundaries.size).toEqual(1);
            expect(firstIncomingBoundaries.size).toEqual(0);
            expect(firstOutgoingBoundaries.get('secondNode')).toEqual('secondNode');

            expect(secondIncomingBoundaries.size).toEqual(1);
            expect(secondOutgoingBoundaries.size).toEqual(1);
            expect(secondIncomingBoundaries.get('firstNode')).toEqual('firstNode');
            expect(secondOutgoingBoundaries.get('thirdNode')).toEqual('thirdNode');

            expect(thirdIncomingBoundaries.size).toEqual(1);
            expect(thirdOutgoingBoundaries.size).toEqual(0);
            expect(thirdIncomingBoundaries.get('secondNode')).toEqual('secondNode');

        });
        it('Should throw an error on attempt to add a node with existing ID', () => {
            const nodeToAddAgain = nodesWithNoData.at(0)!;
            expect(
                () => linkedListWithNoData.addNode(nodeToAddAgain)
            ).toThrow(graphErrorMessages.nodeAlreadyExistsMessage(nodeToAddAgain.nodeId));
        });
    });
    describe('removeNode method tests', () => {
        const linkedListWithNoData = new Graph();
        cloneDeepNodesList(nodesWithNoData).forEach(node => {
            linkedListWithNoData.addNode(node);
        });

        it('Should remove node', () => {
            linkedListWithNoData.removeNode('secondNode');
            expect(linkedListWithNoData.getNode('secondNode')).toEqual(undefined);
        });

        it('Should remove node with correct edges handling', () => {
            const {
                incomingBoundaries: firstIncomingBoundaries,
                outgoingBoundaries: firstOutgoingBoundaries,
            } = linkedListWithNoData.getNode('firstNode')!;

            const {
                incomingBoundaries: thirdIncomingBoundaries,
                outgoingBoundaries: thirdOutgoingBoundaries,
            } = linkedListWithNoData.getNode('thirdNode')!;

            expect(
                [
                    firstIncomingBoundaries,
                    firstOutgoingBoundaries,
                    thirdIncomingBoundaries,
                    thirdOutgoingBoundaries,
                ]
                    .every(x => x.size === 0)
            ).toEqual(true);

        });

    });

    describe('flatten method tests',  () => {
        const linkedListWithNoData = new Graph();
        const nodeWithNoDataImplicitlyModified = cloneDeepNodesList(nodesWithNoData);
        nodeWithNoDataImplicitlyModified.forEach(node => {
            linkedListWithNoData.addNode(node);
        });

        it('Should execute default flatten procedure', () => {
            expect(
                [...linkedListWithNoData.flatten('firstNode')]
            ).toEqual(nodeWithNoDataImplicitlyModified);
        });

        it('Should execute predefined flatten procedure', () => {
            linkedListWithNoData.setFlattenProcedure(levelingStepFunction);

            expect(
                [...linkedListWithNoData.flatten('firstNode')]
            ).toEqual(nodeWithNoDataImplicitlyModified);

            expect(
                [...linkedListWithNoData.flatten('secondNode')]
            ).toEqual(nodeWithNoDataImplicitlyModified.slice(1));

            expect(
                [...linkedListWithNoData.flatten('thirdNode')]
            ).toEqual(nodeWithNoDataImplicitlyModified.slice(2));

        });
    });

    describe('buildPath method tests', () => {
        const linkedListWithNoData = new Graph();
        const nodeWithNoDataImplicitlyModified = cloneDeepNodesList(nodesWithNoData);
        nodeWithNoDataImplicitlyModified.forEach(node => {
            linkedListWithNoData.addNode(node);
        });

        it('Should throw an error if no pathFinder assigned', () => {
            expect(
                () => linkedListWithNoData.buildPath('no', 'noNo')
            ).toThrow(graphErrorMessages.noPathfinderMessage());
        });

        it('Should correctly apply custom pathfinder', () => {
            linkedListWithNoData.setPathFinderProcedure(pathFinder);
            expect(linkedListWithNoData.buildPath('firstNode', 'thirdNode')).toEqual(nodeWithNoDataImplicitlyModified);
            expect(linkedListWithNoData.buildPath('secondNode', 'thirdNode')).toEqual(nodeWithNoDataImplicitlyModified.slice(1));
            expect(linkedListWithNoData.buildPath('thirdNode', 'thirdNode')).toEqual(nodeWithNoDataImplicitlyModified.slice(2));
        });
    });

    describe('adding user specific data tests',  () => {
       const deepClonedNodesWithData = cloneDeepNodesList(nodesWithData);
       const linkedListWithData = new Graph<SomeUserData>();
       deepClonedNodesWithData.forEach(node => {
          linkedListWithData.addNode(node);
       });
       it('Should add nodes with user specific data', () => {
           deepClonedNodesWithData.forEach(node => {
              expect(node).toEqual(linkedListWithData.getNode(node.nodeId));
           });
       });

    });

    describe('clear method clears graph instance', () => {
        it('should clear graph instance', () => {
            const graph = new Graph(cloneDeepNodesList(nodesWithNoData));
            graph.clear();
            expect(graph.nodes.size).toBe(0);
        });
    });


});