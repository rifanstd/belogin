export interface SuccessResult<T> {
  success: true;
  statusCode: number;
  message: string;
  data?: T;
}

export interface ErrorResult {
  success: false;
  statusCode: number;
  message: string;
}

export type ApiResult<T> = SuccessResult<T> | ErrorResult;

export class ResultBuilder {
  static success<T>({
    statusCode,
    data,
    message,
  }: {
    statusCode: number;
    data?: T;
    message: string;
  }): SuccessResult<T> {
    return {
      success: true,
      statusCode: statusCode,
      message,
      data,
    };
  }

  static error({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }): ErrorResult {
    return {
      success: false,
      statusCode,
      message,
    };
  }

  static internalServerError(): ErrorResult {
    return this.error({ statusCode: 500, message: "Internal Server Error" });
  }
}
