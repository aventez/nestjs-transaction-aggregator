import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { BankApiService } from "./bank-api.service";
import { MonzoApiService } from "./monzo/monzo-api.service";
import { RevolutApiService } from "./revolut/revolut-api.service";
import { SterlingBankApiService } from "./sterlingbank/sterlingbank-api.service";

@Module({
  imports: [HttpModule],
  providers: [
    BankApiService,
    MonzoApiService,
    RevolutApiService,
    SterlingBankApiService,
  ],
  exports: [BankApiService],
})
export class BankApiModule {}
