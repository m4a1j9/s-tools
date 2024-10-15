import {ErrorBaseData, ErrorWithData} from "../../../src";

interface TestErrorData extends ErrorBaseData {
  code: number;
}

describe('ErrorWithData class tests', () => {
  it('should throw an error with the correct message', () => {
    const errorData: TestErrorData = { message: 'Test error', code: 404 };
    const error = new ErrorWithData<TestErrorData>(errorData);

    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ErrorWithData');
  });

  it('should capture the stack trace correctly', () => {
    const errorData: TestErrorData = { message: 'Test error', code: 404 };
    const error = new ErrorWithData<TestErrorData>(errorData);

    expect(error.stack).toBeDefined();

    const stackLines = error.stack!.split('\n');
    expect(stackLines.length).toBeGreaterThan(1);

    expect(stackLines[0]).toContain('ErrorWithData');

    expect(stackLines[1]).toMatch(/ErrorWithData/);
  });

  it('should contain the error data', () => {
    const errorData: TestErrorData = { message: 'Test error', code: 404 };
    const error = new ErrorWithData<TestErrorData>(errorData);

    expect(error.errorData).toEqual(errorData);
  });

  it('should throw an ErrorWithData when thrown', () => {
    const errorData: TestErrorData = { message: 'Test error', code: 404 };

    const throwError = () => {
      throw new ErrorWithData<TestErrorData>(errorData);
    };

    expect(throwError).toThrow(ErrorWithData);
    expect(throwError).toThrow('Test error');

    try {
      throwError();
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorWithData);
      expect((err as ErrorWithData<TestErrorData>).errorData).toEqual(errorData);
    }
  });


});