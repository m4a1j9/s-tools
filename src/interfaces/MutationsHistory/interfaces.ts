export interface MutationsHistoryInterface<HistoryUnitType> {

    lastSavedChangeIndex: number,

    commitedMutations: HistoryUnitType[],
    canceledMutations: HistoryUnitType[],

    getCurrentMutation: () => HistoryUnitType | undefined,

    addMutation: (mutation: HistoryUnitType) => void,
    cancelLastMutation: () => void,
    restoreCanceledMutation: () => void,
    saveCurrentMutation: () => void,
    backToSavedMutation: () => void,


    saveAndClear: () => void,
    clearHistory: () => void,

}