class ErrorRequest {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.statusCode = 400;
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}

export { ErrorRequest };
