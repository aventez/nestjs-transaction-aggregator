import { Module } from '@nestjs/common';
import { TransactionAggregatorModule } from '../../logic/transaction-aggregator/transaction-aggregator.module';
import { RestTransactionController } from './rest-transaction.controller';
import { RestTransactionService } from './rest-transaction.service';

@Module({
  imports: [TransactionAggregatorModule],
  controllers: [RestTransactionController],
  providers: [RestTransactionService],
  exports: [RestTransactionService],
})
export class RestTransactionModule {}
