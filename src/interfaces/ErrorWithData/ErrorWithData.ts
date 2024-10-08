export interface ErrorBaseData {
  message: string;
}


export interface ErrorWithDataInterface<DataType extends ErrorBaseData> extends Error {
  errorData?: DataType;
}