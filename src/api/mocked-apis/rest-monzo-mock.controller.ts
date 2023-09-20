import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MonzoTransaction } from '../../logic/transaction-aggregator/monzo/monzo-transaction.model';
import { FakeDataService } from './fake-data.service';

@Controller('monzo')
@ApiTags('mock')
export class RestMonzoMockController {
  constructor(private readonly fakeGenerator: FakeDataService) {}

  @Get('')
  @ApiOperation({ summary: 'Mocked Monzo transactions' })
  @ApiOkResponse({
    description: 'Returned mocked Monzo transactions list',
  })
  async getTransactionsList(): Promise<MonzoTransaction[]> {
    const numTransactions = Math.floor(Math.random() * 10) + 1;
    const transactions = [];

    for (let i = 0; i < numTransactions; i++) {
      const transaction = this.fakeGenerator.generateMonzoTransaction();
      transactions.push(transaction);
    }

    return transactions;
  }
}
