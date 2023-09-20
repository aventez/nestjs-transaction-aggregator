import { DynamicModule, Logger, Module } from '@nestjs/common';
import { requireEnv } from '../../utils/env';
import { FakeDataService } from './fake-data.service';
import { RestMonzoMockController } from './rest-monzo-mock.controller';
import { RestRevolutMockController } from './rest-revolut-mock.controller';
import { RestSterlingBankMockController } from './rest-sterlingbank-mock.controller';

@Module({})
export class RestMockedApisModule {
  static registerIfNotProd(): DynamicModule {
    const env = requireEnv('NODE_ENV');
    if (env === 'production') {
      Logger.debug(`${env} env, MockedApisModule skipped`);
      return {
        module: RestMockedApisModule,
      };
    }
    Logger.warn(`${env} env, MockedApisModule loaded`);

    return {
      module: RestMockedApisModule,
      controllers: [
        RestMonzoMockController,
        RestRevolutMockController,
        RestSterlingBankMockController,
      ],
      providers: [FakeDataService],
    };
  }
}
