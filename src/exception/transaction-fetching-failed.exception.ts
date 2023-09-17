import { HttpException } from "@nestjs/common";

export class TransactionFetchingFailedException extends HttpException {
  constructor(message: string) {
    super(message, 500);
  }
}
