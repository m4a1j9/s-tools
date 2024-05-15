export type NumericalMutation = number;
export interface ObjectMutation {
    data: number,
}

export const generateNumericalMutations = (): NumericalMutation[] => [2, 3, 1, -10, 3.124, 325];
export const generateObjectMutations = (): ObjectMutation[] => [
    {
        data: 1,
    },
    {
        data: 2,
    },
    {
        data: 3,
    },
    {
        data: 4,
    },
];