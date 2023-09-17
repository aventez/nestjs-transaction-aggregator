import { Module } from "@nestjs/common";
import { BankApiModule } from "src/logic/bank-api/bank-api.module";
import { RestTransactionController } from "./rest-transaction.controller";
import { RestTransactionService } from "./rest-transaction.service";

@Module({
  imports: [BankApiModule], // all logic
  controllers: [RestTransactionController],
  providers: [RestTransactionService],
  exports: [RestTransactionService],
})
export class RestTransactionModule {}
