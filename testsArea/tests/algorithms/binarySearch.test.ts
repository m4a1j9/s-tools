import {
    numericalBinarySearch,
    successfullyFindsValueData,
    noResultForEmptyArrayData,
    noResultData,
} from '../../testsData/algorithms/binarySearchTestsData';



describe('Binary search tests', () => {

    it('Should return undefined for empty array', () => {
       expect(
           numericalBinarySearch(noResultForEmptyArrayData.data, noResultForEmptyArrayData.target)
       ).toBeUndefined();
    });

    it('Should return undefined for non-existent target', () => {
        expect(
            numericalBinarySearch(noResultData.data, noResultData.target)
        ).toBeUndefined();
    });

    it('Should successfully return target index', () => {
       expect(
           numericalBinarySearch(successfullyFindsValueData.data, successfullyFindsValueData.target)
       ).toBe(successfullyFindsValueData.resultIndex);
    });
});