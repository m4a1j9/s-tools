import {MutationsHistory} from '@implementations';

import {
    NumericalMutation,
    ObjectMutation,
    generateNumericalMutations,
    generateObjectMutations,
} from '../../testsData/MutationsHistory/MutationsHistoryTestsData';


describe('MutationsHistory tests', () => {
    it('Should create empty history', () => {
       const history = new MutationsHistory<NumericalMutation>();
       checkMutationsHistoryContent<NumericalMutation>(
           history,
           [],
           [],
           -1,
       );
    });
    it('Should create history from a preset array', () => {
        const numericalHistory =
            new MutationsHistory<NumericalMutation>(generateNumericalMutations());
        checkMutationsHistoryContent<NumericalMutation>(
          numericalHistory,
          generateNumericalMutations(),
          [],
          generateNumericalMutations().length - 1,
        );

        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations(),
            [],
            generateObjectMutations().length - 1,
        );
    });
    it('Should cancel one change', () => {

        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.cancelLastMutation();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations().slice(0, -1),
            [generateObjectMutations().at(-1)!],
            generateObjectMutations().length - 1,
        );

    });

    it('Should restore canceled change', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.backToSavedMutation();
        objectsHistory.restoreCanceledMutation();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations(),
            [],
            generateObjectMutations().length - 1,
        );
    });

    it('Should do nothing trying to restore from nothing', () => {

        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.restoreCanceledMutation();

        checkMutationsHistoryContent<ObjectMutation>(
          objectsHistory,
          generateObjectMutations(),
          [],
          generateObjectMutations().length - 1,
        );

    });

    
    it('Should do nothing trying to cancel nothing', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        while(objectsHistory.commitedMutations.length > 1) {
            objectsHistory.cancelLastMutation();
        }

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            [generateObjectMutations().at(0)!],
            generateObjectMutations().slice(1, ).reverse(),
            generateObjectMutations().length - 1,
        );

        objectsHistory.cancelLastMutation();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            [generateObjectMutations().at(0)!],
            generateObjectMutations().slice(1, ).reverse(),
            generateObjectMutations().length - 1,
        );

    });

    it('Should save mutation index', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.cancelLastMutation();

        objectsHistory.saveCurrentMutation();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations().slice(0, -1),
            [generateObjectMutations().at(-1)!],
            generateObjectMutations().length - 2,
        );

    });

    
    it('Should back to saved canceled mutation properly', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        while(objectsHistory.commitedMutations.length > 1) {
            objectsHistory.cancelLastMutation();
        }

        objectsHistory.backToSavedMutation();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations(),
            [],
            generateObjectMutations().length - 1,
        );

    });

    it('Should add new mutation', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.addMutation(generateObjectMutations().at(-1)!);

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            [...generateObjectMutations(), generateObjectMutations().at(-1)!],
            [],
            generateObjectMutations().length - 1,
        );

    });

    it('Should loose last saved change if it canceled and new change added', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.cancelLastMutation();

        objectsHistory.addMutation(generateObjectMutations().at(-1)!);

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            generateObjectMutations(),
            [],
             -1,
        );
    });

    it('Should save current mutation and clear the rest on saveAndClear call', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.saveAndClear();
        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            [generateObjectMutations().at(-1)!],
            [],
            0,
        );
    });

    it('Should clear history', () => {
        const objectsHistory =
            new MutationsHistory<ObjectMutation>(generateObjectMutations());

        objectsHistory.cancelLastMutation();

        objectsHistory.clearHistory();

        checkMutationsHistoryContent<ObjectMutation>(
            objectsHistory,
            [],
            [],
            -1,
        );

    });
});


function checkMutationsHistoryContent<T>(
    history: MutationsHistory<T>,
    commitedMutations: T[],
    canceledMutations: T[],
    lastSavedChangeIndex: number,
) {
    expect(history.commitedMutations).toEqual(commitedMutations);
    expect(history.canceledMutations).toEqual(canceledMutations);
    expect(history.lastSavedChangeIndex).toBe(lastSavedChangeIndex);
    expect(history?.getCurrentMutation()).toEqual(commitedMutations?.at(-1));
}