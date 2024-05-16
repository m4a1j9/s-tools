import {
    numericalDuplicatesSearcher,
    objectDuplicatesSearcher,

    generateListOfUniqueNumbers,
    generateListOfNumbersWithDuplicates,

    generateListOfUniqueObjects,
    generateListOfObjectsWithDuplicates,
} from '../../testsData/algorithms/duplicatesSearcherTestsData';



describe('Duplicates Searcher tests', () => {
   it('Should find no duplicates for empty array', () => {
       expect(numericalDuplicatesSearcher([])).toEqual(new Map());
       expect(objectDuplicatesSearcher([])).toEqual(new Map());
   });
   it('Should find no duplicates for array of unique items', () => {
      expect(numericalDuplicatesSearcher(generateListOfUniqueNumbers()).size)
          .toBe(generateListOfUniqueNumbers().length);
      expect(objectDuplicatesSearcher(generateListOfUniqueObjects()).size)
          .toBe(generateListOfUniqueObjects().length);
   });
   it('Should find duplicates if they really exist', () => {

       const numericalReducer = <T>(acc: number, value: T[]) => acc + value.length;

       const totalNumericalElements =
           [...numericalDuplicatesSearcher(generateListOfNumbersWithDuplicates()).values()]
               .reduce(numericalReducer, 0);

       const totalObjectElements =
           [...objectDuplicatesSearcher(generateListOfObjectsWithDuplicates()).values()]
               .reduce(numericalReducer, 0);

       expect(totalNumericalElements).toBe(generateListOfNumbersWithDuplicates().length);
       expect(totalObjectElements).toBe(generateListOfObjectsWithDuplicates().length);
   });
});