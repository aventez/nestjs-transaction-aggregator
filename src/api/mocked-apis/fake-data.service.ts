import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MonzoTransaction } from '../../logic/transaction-aggregator/monzo/monzo-transaction.model';
import { RevolutTransaction } from '../../logic/transaction-aggregator/revolut/revolut-transaction.model';
import { SterlingBankTransaction } from '../../logic/transaction-aggregator/sterlingbank/sterlingbank-transaction.model';

@Injectable()
export class FakeDataService {
  generateMonzoTransaction(): MonzoTransaction {
    return {
      id: randomUUID(),
      created: new Date().toISOString(),
      description: 'Fake Monzo Transaction',
      amount: 100.0,
      currency: 'GBP',
      metadata: {
        reference: 'MONZO-123456',
      },
    };
  }

  generateRevolutTransaction(): RevolutTransaction {
    return {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      state: 'completed',
      amount: {
        value: 50.0,
        currency: 'EUR',
      },
      merchant: null,
      counterparty: {
        id: 'counterparty-id',
        name: 'Fake Counterparty',
      },
      reference: 'REVOLUT-789012',
    };
  }

  generateSterlingBankTransaction(): SterlingBankTransaction {
    return {
      id: randomUUID(),
      currency: 'USD',
      amount: 100,
      direction: 'OUT',
      narrative: 'Fake Sterling Bank Transaction',
      created: new Date().toISOString(),
      reference: 'STERLING-345678',
    };
  }
}
