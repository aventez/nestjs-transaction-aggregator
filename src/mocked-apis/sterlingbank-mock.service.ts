import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nock from "nock";

@Injectable()
export class SterlingBankMockedApiService implements OnModuleInit {
  private readonly logger = new Logger(SterlingBankMockedApiService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const apiUrl = this.configService.get("bankApis.sterlingBankApiUrl");
    const nodeEnv = this.configService.get("nodeEnv");
    if (nodeEnv != "development") return;

    this.logger.log(
      `Initializing SterlingBankMockedApiService. Mocking API on ${apiUrl}`
    );

    nock(apiUrl)
      .persist()
      .get(/.*/)
      .reply(200, [
        {
          id: "6d4c34fc-94e7-4e52-8a36-9c40b102ecfc",
          currency: "EUR",
          amount: "-25.00",
          direction: "OUT",
          narrative: "Payment to Jane Smith",
          created: "2022-03-21T14:16:32.000Z",
          reference: "SEPA-1234567890",
        },
      ]);
  }
}
