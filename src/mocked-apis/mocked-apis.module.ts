import { Module } from "@nestjs/common";
import { MonzoMockedApiService } from "./monzo-mock.service";
import { RevolutMockedApiService } from "./revolut-mock.service";
import { SterlingBankMockedApiService } from "./sterlingbank-mock.service";

@Module({
  providers: [
    RevolutMockedApiService,
    MonzoMockedApiService,
    SterlingBankMockedApiService,
  ],
})
export class MockedApisModule {}
