import { Injectable } from "@nestjs/common";
import { BankApiService } from "src/logic/bank-api/bank-api.service";
import { UnifiedTransaction } from "src/models/transaction/unified-transaction.model";
import { BankName } from "./query/get-transactions-list.query";

/**
 * Frontend-facing service for initiating transaction operations
 */
@Injectable()
export class RestTransactionService {
  constructor(private readonly bankApiService: BankApiService) {}

  public async getTransactionsList(
    source?: BankName
  ): Promise<UnifiedTransaction[]> {
    return await this.bankApiService.getTransactions(source);
  }
}
