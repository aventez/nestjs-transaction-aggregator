import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestMockedApisModule } from './api/mocked-apis/rest-mocked-apis.module';
import { RestTransactionModule } from './api/transactions/rest-transaction.module';
import bankApisConfiguration from './config/bank-apis.config';
import serverConfiguration from './config/server.config';
import configValidator from './validators/config';

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
    RestTransactionModule,
    RestMockedApisModule.registerIfNotProd(),
  ],
})
export class AppModule {}
