import testData from '../../testsData/uicsds/uicsdsTestsData';

runTransformerTests();

function runTransformerTests() {

    Object.keys(testData).forEach((testDataKey) => {
        describe(`${testDataKey} test`, () => {
            it(testData[testDataKey].description, function () {
                const {
                    transformers,
                    initialData,
                    referenceData,
                } = testData[testDataKey];

                transformers.forEach((transformer, index) => {

                    const certainInitialData = initialData.at(index);
                    const certainReferenceData = referenceData.at(index);

                    const certainReferenceDataLike = certainInitialData.map(transformer);

                    expect(certainReferenceDataLike).toEqual(certainReferenceData);
                });
            });
        });
    });
}
