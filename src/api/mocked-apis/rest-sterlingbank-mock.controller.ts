import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SterlingBankTransaction } from '../../logic/transaction-aggregator/sterlingbank/sterlingbank-transaction.model';
import { FakeDataService } from './fake-data.service';

@Controller('sterlingbank')
@ApiTags('mock')
export class RestSterlingBankMockController {
  constructor(private readonly fakeGenerator: FakeDataService) {}

  @Get('')
  @ApiOperation({ summary: 'Mocked SterlingBank transactions' })
  @ApiOkResponse({
    description: 'Returned mocked SterlingBank transactions list',
  })
  async getTransactionsList(): Promise<SterlingBankTransaction[]> {
    const numTransactions = Math.floor(Math.random() * 10) + 1;
    const transactions = [];

    for (let i = 0; i < numTransactions; i++) {
      const transaction = this.fakeGenerator.generateSterlingBankTransaction();
      transactions.push(transaction);
    }

    return transactions;
  }
}
