import { Injectable } from '@nestjs/common';
import { UnifiedTransaction } from '../../../models/transaction/unified-transaction.model';
import { RequestService } from '../request.service';
import { RevolutTransaction } from './revolut-transaction.model';

@Injectable()
export class RevolutApiService extends RequestService {
  async fetchTransactions(): Promise<UnifiedTransaction[]> {
    const apiUrl = this.configService.get('bankApis.revolutApiUrl');
    const data = await this.sendRequest<RevolutTransaction[]>(apiUrl);

    this.validateResponse(data);

    return data.map((transaction: RevolutTransaction) =>
      this.parseTransaction(transaction),
    );
  }

  private parseTransaction(
    transaction: RevolutTransaction,
  ): UnifiedTransaction {
    return {
      id: transaction.id,
      created: transaction.created_at,
      amount: {
        value: Number(transaction.amount.value).toFixed(2),
        currency: transaction.amount.currency,
      },
      type: transaction.amount.value > 0 ? 'CREDIT' : 'DEBIT',
      reference: transaction.reference,
      metadata: {
        source: 'Revolut',
      },
    };
  }
}
