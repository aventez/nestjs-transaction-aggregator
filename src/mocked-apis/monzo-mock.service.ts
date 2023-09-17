import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nock from "nock";

@Injectable()
export class MonzoMockedApiService implements OnModuleInit {
  private readonly logger = new Logger(MonzoMockedApiService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const apiUrl = this.configService.get("bankApis.monzoApiUrl");
    const nodeEnv = this.configService.get("nodeEnv");
    if (nodeEnv != "development") return;

    this.logger.log(
      `Initializing MonzoMockedApiService. Mocking API on ${apiUrl}`
    );

    nock(apiUrl)
      .persist()
      .get(/.*/)
      .reply(200, [
        {
          id: "tx_00009XvJjKUW8gQssn4b4L",
          created: "2022-03-21T14:16:32.000Z",
          description: "Payment to Jane Smith",
          amount: -2500,
          currency: "EUR",
          metadata: {
            reference: "SEPA-1234567890",
          },
        },
      ]);
  }
}
