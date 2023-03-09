import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DbModule } from './db/db.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TaskModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
