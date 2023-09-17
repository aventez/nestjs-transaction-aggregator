import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import bankApisConfiguration from "./config/bank-apis.config";
import serverConfiguration from "./config/server.config";
import { MockedApisModule } from "./mocked-apis/mocked-apis.module";
import { RestTransactionModule } from "./rest/transactions/rest-transaction.module";
import configValidator from "./validators/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidator,
      validationOptions: {
        allonUnknown: true,
      },
      load: [serverConfiguration, bankApisConfiguration],
      isGlobal: true,
    }),
    MockedApisModule,
    RestTransactionModule,
  ],
})
export class AppModule {}
