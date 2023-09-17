import { Injectable } from "@nestjs/common";
import { UnifiedTransaction } from "src/models/transaction/unified-transaction.model";
import { RequestService } from "../request.service";

@Injectable()
export class MonzoApiService extends RequestService {
  async fetchTransactions(): Promise<UnifiedTransaction[]> {
    const apiUrl = this.configService.get("bankApis.monzoApiUrl");
    const data = await this.sendRequest<MonzoTransaction[]>(apiUrl);

    this.validateResponse(data);

    return data.map((transaction: MonzoTransaction) =>
      this.parseTransaction(transaction)
    );
  }

  private parseTransaction(transaction: MonzoTransaction): UnifiedTransaction {
    return {
      id: transaction.id,
      created: transaction.created,
      description: transaction.description,
      amount: {
        value: (transaction.amount / 100).toFixed(2),
        currency: transaction.currency,
      },
      type: transaction.amount > 0 ? "CREDIT" : "DEBIT",
      reference: transaction.metadata.reference,
      metadata: {
        source: "Monzo",
      },
    };
  }
}
