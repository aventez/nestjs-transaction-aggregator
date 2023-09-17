import { HttpService } from "@nestjs/axios";
import { HttpException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { TransactionFetchingFailedException } from "src/exception/transaction-fetching-failed.exception";
import { UnifiedTransaction } from "src/models/transaction/unified-transaction.model";

export abstract class RequestService {
  constructor(
    @Inject(ConfigService)
    protected readonly configService: ConfigService,

    @Inject(HttpService)
    protected readonly httpService: HttpService
  ) {}

  protected async sendRequest<T>(apiUrl: string): Promise<T> {
    try {
      const { data, status } = await firstValueFrom(
        this.httpService.get(apiUrl).pipe(
          catchError((error: AxiosError) => {
            throw new TransactionFetchingFailedException(error.message);
          })
        )
      );

      if (status !== 200) {
        throw new TransactionFetchingFailedException(`HTTP Status: ${status}`);
      }

      return data;
    } catch (error) {
      if (
        error instanceof HttpException ||
        error instanceof TransactionFetchingFailedException
      ) {
        throw error;
      } else {
        throw new TransactionFetchingFailedException(
          "An unexpected error occurred"
        );
      }
    }
  }

  protected validateResponse(data: any): void {
    if (!Array.isArray(data)) {
      throw new TransactionFetchingFailedException("Invalid response format");
    }
  }

  abstract fetchTransactions(): Promise<UnifiedTransaction[]>;
}
