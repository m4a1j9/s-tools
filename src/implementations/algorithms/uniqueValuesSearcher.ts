import {
  buildDuplicatesSearcher,
  createMapToArray,
} from "@implementations";
import {DuplicateData} from "@interfaces";

export type UniqueFeatureValueExtractor<SourceItem, ReturnedValue> = (item: SourceItem) => ReturnedValue;


/**
 * Extracts all unique values from **sourceArray** according **uniqueFeatureValueExtractor** function.
 * Forms a new array of unique values
 * @param sourceArray source array of unique values
 * @param uniqueFeatureValueExtractor function, accepts a single source array item. This function extracts a value of uniqueness feature
 *
 * @returns array of unique items
 */
export const uniqueValuesSearcher = <SourceArrayItem, UniqueFeatureItem>(
  sourceArray: SourceArrayItem[],
  uniqueFeatureValueExtractor: UniqueFeatureValueExtractor<SourceArrayItem, UniqueFeatureItem>
): SourceArrayItem[] => {

  const mapToArrayTransformer = createMapToArray<UniqueFeatureItem, DuplicateData<SourceArrayItem>[], SourceArrayItem>(
    ([key, value]) => value.at(0)!.duplicateValue,
  );

  const duplicatesSearcher = buildDuplicatesSearcher(uniqueFeatureValueExtractor);

  return mapToArrayTransformer(duplicatesSearcher(sourceArray));

};


/**
 * Creates an instance of **<u>uniqueValuesSearcher</u>** function with given **<u>uniqueFeatureValueExtractor</u>**
 * @param uniqueFeatureValueExtractor
 */
export const createUniqueValuesSearcher = <SourceArrayItem, UniqueFeatureItem>(
  uniqueFeatureValueExtractor: UniqueFeatureValueExtractor<SourceArrayItem, UniqueFeatureItem>
) => {
  return (sourceArray: SourceArrayItem[]) => uniqueValuesSearcher(sourceArray, uniqueFeatureValueExtractor);
};


