import {MutationsHistoryInterface} from '@mutationsHistory/interfaces';

/**
 * **MutationsHistory** class implements changes history abstraction
 *
 * **MutationsHistory** has in store:
 *
 * <u>Data</u>:
 *
 * - **commitedMutations** stack - stack of commited changes
 * - **canceledMutations** stack - stack of canceled changes
 * - **lastSavedChangeIndex** - index of last saved change
 *
 * <u>Methods</u>:
 *
 * - **getCurrentMutation** - returns the most recent commited change
 * - **addMutation** - adds a fresh mutation to **commitedMutations** stack.
 * Devastates filled **canceledMutations** stack.
 * - **cancelLastMutation** - removes the most recent mutation from **commitedMutations** stack and
 * places it in **canceledMutations** stack
 * - **restoreCanceledMutation** - if there are canceled mutations, then removes fresh mutation from
 * **canceledMutations** stack and moves it to **commitedMutations** stack
 * - **saveCurrentMutation** - updates **lastSavedChangeIndex** with **commitedMutations**.length - 1
 * - **backToSavedMutation** - cancels or restores all mutations up to the last saved
 * - **saveAndClear** - saves the most recent commited mutation and demolishes the rest (canceled inclusive)
 * - **clearHistory** - clears history
 */
class MutationsHistory<HistoryUnitType> implements MutationsHistoryInterface<HistoryUnitType>{
    lastSavedChangeIndex: number;
    commitedMutations: HistoryUnitType[];
    canceledMutations: HistoryUnitType[];

    constructor(sourceIterable?: Iterable<HistoryUnitType>) {

        this.commitedMutations = sourceIterable ? [...sourceIterable]: [];
        this.canceledMutations = [];
        this.lastSavedChangeIndex = this.commitedMutations.length - 1;
    }

    getCurrentMutation() {
        return this.commitedMutations.at(-1);
    }


    addMutation(mutation: HistoryUnitType) {

        if(this.canceledMutations.length) {

            this.canceledMutations = [];

            if(this.lastSavedChangeIndex >= this.commitedMutations.length) {
                this.lastSavedChangeIndex = -1;
            }
        }

        this.commitedMutations.push(mutation);
    }

    cancelLastMutation() {
        if(this.commitedMutations.length > 1) {
            this.canceledMutations.push(this.commitedMutations.pop()!);
        }
    }
    restoreCanceledMutation() {
        if(this.canceledMutations.length > 0) {
            this.commitedMutations.push(this.canceledMutations.pop()!);
        }
    }
    saveCurrentMutation() {
        this.lastSavedChangeIndex = this.commitedMutations.length - 1;
    }

    backToSavedMutation() {

        const totalChangesAmount = this.canceledMutations.length + this.commitedMutations.length;

        if(this.lastSavedChangeIndex >= 0 && this.lastSavedChangeIndex < totalChangesAmount) {

            const targetLength = this.lastSavedChangeIndex + 1;

            while(this.commitedMutations.length > targetLength) {
                this.cancelLastMutation();
            }

            while(this.commitedMutations.length < targetLength ) {
                this.restoreCanceledMutation();
            }


        }
    }

    saveAndClear() {
        const mutationToSave = this.getCurrentMutation();
        if(mutationToSave) {
            this.clearHistory();
            this.addMutation(mutationToSave);
            this.saveCurrentMutation();
        }
    }

    clearHistory() {
        this.commitedMutations = [];
        this.canceledMutations = [];
        this.lastSavedChangeIndex = this.commitedMutations.length - 1;
    }
}

export default MutationsHistory;