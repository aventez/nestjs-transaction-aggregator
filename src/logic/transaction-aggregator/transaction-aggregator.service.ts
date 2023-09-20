import { Injectable } from '@nestjs/common';
import { BankName } from '../../api/transactions/dto/get-transactions-list.dto';
import { UnifiedTransaction } from '../../models/transaction/unified-transaction.model';
import { MonzoApiService } from './monzo/monzo-api.service';
import { RevolutApiService } from './revolut/revolut-api.service';
import { SterlingBankApiService } from './sterlingbank/sterlingbank-api.service';

@Injectable()
export class TransactionAggregatorService {
  constructor(
    private readonly revolutApiService: RevolutApiService,
    private readonly monzoApiService: MonzoApiService,
    private readonly sterlingBankApiService: SterlingBankApiService,
  ) {}

  private readonly servicesMap = new Map<string, any>([
    [BankName.REVOLUT, this.revolutApiService],
    [BankName.MONZO, this.monzoApiService],
    [BankName.STERLINGBANK, this.sterlingBankApiService],
  ]);

  async fetchTransactions(bankName?: string): Promise<UnifiedTransaction[]> {
    const service = this.servicesMap.get(bankName);
    if (service) {
      return await service.fetchTransactions();
    } else {
      const result = await Promise.all([
        this.monzoApiService.fetchTransactions(),
        this.revolutApiService.fetchTransactions(),
        this.sterlingBankApiService.fetchTransactions(),
      ]);

      return result.flat();
    }
  }
}
