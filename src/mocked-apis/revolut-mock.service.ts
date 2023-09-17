import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nock from "nock";

@Injectable()
export class RevolutMockedApiService implements OnModuleInit {
  private readonly logger = new Logger(RevolutMockedApiService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const apiUrl = this.configService.get("bankApis.revolutApiUrl");
    const nodeEnv = this.configService.get("nodeEnv");
    if (nodeEnv != "development") return;

    this.logger.log(
      `Initializing RevolutMockedApiService. Mocking API on ${apiUrl}`
    );

    nock(apiUrl)
      .persist()
      .get(/.*/)
      .reply(200, [
        {
          id: "tr_1234567890",
          created_at: "2022-03-21T14:16:32.000Z",
          completed_at: "2022-03-21T14:18:32.000Z",
          state: "COMPLETED",
          amount: {
            value: "-25.00",
            currency: "EUR",
          },
          merchant: null,
          counterparty: {
            id: "acc_1234567890",
            name: "Jane Smith",
          },
          reference: "SEPA-1234567890",
        },
      ]);
  }
}
