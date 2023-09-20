import { Injectable } from '@nestjs/common';
import { TransactionAggregatorService } from '../../logic/transaction-aggregator/transaction-aggregator.service';
import { UnifiedTransaction } from '../../models/transaction/unified-transaction.model';

/**
 * Frontend-facing service for initiating transaction operations
 */
@Injectable()
export class RestTransactionService {
  constructor(
    private readonly transactionAggregator: TransactionAggregatorService,
  ) {}

  public async getTransactionsList(
    source?: string,
  ): Promise<UnifiedTransaction[]> {
    return await this.transactionAggregator.fetchTransactions(source);
  }
}
