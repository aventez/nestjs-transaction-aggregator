import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MonzoApiService } from './monzo/monzo-api.service';
import { RevolutApiService } from './revolut/revolut-api.service';
import { SterlingBankApiService } from './sterlingbank/sterlingbank-api.service';
import { TransactionAggregatorService } from './transaction-aggregator.service';

@Module({
  imports: [HttpModule],
  providers: [
    TransactionAggregatorService,
    MonzoApiService,
    RevolutApiService,
    SterlingBankApiService,
  ],
  exports: [TransactionAggregatorService],
})
export class TransactionAggregatorModule {}
