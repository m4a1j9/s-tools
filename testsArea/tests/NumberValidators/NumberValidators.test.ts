import * as NumberRegExp from '@implementations';
import {isNumber} from "@implementations";
import * as NumberValidatorsTestData from '../../testsData/NumberValidators/NumberValidatorsTestsData';


describe('Number validators tests', () => {
   describe('isNumber function tests series', () => {
      it('Should correctly distinguish between numeric and non-numeric values', () => {
         NumberValidatorsTestData.isNumberTestsData.forEach((testData) => {
            expect(isNumber(testData.data)).toBe(testData.result);
         });
      });
   });
   describe('Integer number regexp tests series', () => {
      it('Should correctly distinguish integer numbers', () => {
          const integerNumberRegex = NumberRegExp.integerNumberRegex;
          NumberValidatorsTestData.integerNumberRegexpTestsData.forEach((testData) => {
              expect(integerNumberRegex.test(testData.data)).toBe(testData.result);
          });
      });
   });
   describe('Float number regexp tests series', () => {
       it('Should correctly distinguish float numbers', () => {
            const floatNumberRegex = NumberRegExp.floatNumberRegex
            NumberValidatorsTestData.floatNumberRegexpTestsData.forEach((testData) => {
                expect(floatNumberRegex.test(testData.data)).toBe(testData.result);
            });
        });
    });
    describe('Exponential number format regexp tests series', () => {
        it('Should correctly distinguish exponential format numbers', () => {
            const exponentialNumberFormatRegex = NumberRegExp.exponentialNumberFormatRegex;
            NumberValidatorsTestData.exponentialNumberFormatRegexpTestsData.forEach((testData) => {
                expect(exponentialNumberFormatRegex.test(testData.data)).toBe(testData.result);
            });
        });
    });
});


