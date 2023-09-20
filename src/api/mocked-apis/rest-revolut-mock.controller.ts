import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RevolutTransaction } from '../../logic/transaction-aggregator/revolut/revolut-transaction.model';
import { FakeDataService } from './fake-data.service';

@Controller('revolut')
@ApiTags('mock')
export class RestRevolutMockController {
  constructor(private readonly fakeGenerator: FakeDataService) {}

  @Get('')
  @ApiOperation({ summary: 'Mocked Revolut transactions' })
  @ApiOkResponse({
    description: 'Returned mocked Revolut transactions list',
  })
  async getTransactionsList(): Promise<RevolutTransaction[]> {
    const numTransactions = Math.floor(Math.random() * 10) + 1;
    const transactions = [];

    for (let i = 0; i < numTransactions; i++) {
      const transaction = this.fakeGenerator.generateRevolutTransaction();
      transactions.push(transaction);
    }

    return transactions;
  }
}
