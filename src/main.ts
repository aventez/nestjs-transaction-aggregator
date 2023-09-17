import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { configureApp } from "./app.main.config";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger: Logger = new Logger("app");
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get("port");

  configureApp(app);
  await app.listen(port, () => {
    logger.log(`* Listening on ::${port}`);
  });
}

bootstrap();
