import { Injectable } from "@nestjs/common";
import { UnifiedTransaction } from "src/models/transaction/unified-transaction.model";
import { RequestService } from "../request.service";

@Injectable()
export class SterlingBankApiService extends RequestService {
  async fetchTransactions(): Promise<UnifiedTransaction[]> {
    const apiUrl = this.configService.get("bankApis.sterlingBankApiUrl");
    const data = await this.sendRequest<SterlingBankTransaction[]>(apiUrl);

    this.validateResponse(data);

    return data.map((transaction: SterlingBankTransaction) =>
      this.parseTransaction(transaction)
    );
  }

  private parseTransaction(
    transaction: SterlingBankTransaction
  ): UnifiedTransaction {
    return {
      id: transaction.id,
      created: transaction.created,
      amount: {
        value: Number(transaction.amount).toFixed(2),
        currency: transaction.currency,
      },
      type: transaction.amount > 0 ? "CREDIT" : "DEBIT",
      reference: transaction.reference,
      metadata: {
        source: "Sterling Bank",
      },
    };
  }
}
