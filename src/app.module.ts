import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoveModule } from './move/move.module';
import { DbModule } from './db/db.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MoveModule,
    ProjectModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
