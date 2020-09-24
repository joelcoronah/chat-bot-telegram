import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotsModule } from './modules/bots/bots.module';

@Module({
  imports: [BotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
