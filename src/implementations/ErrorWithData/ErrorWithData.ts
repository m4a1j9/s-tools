import {ErrorBaseData, ErrorWithDataInterface} from "@interfaces";

export class ErrorWithData<ErrorData extends ErrorBaseData> extends Error implements ErrorWithDataInterface<ErrorData> {

  public errorData;

  constructor(data?: ErrorData) {
    super(data?.message);

    this.name = this.constructor.name;
    this.errorData = data;

    Error.captureStackTrace(this, this.constructor);
  }
}