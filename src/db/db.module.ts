import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { DbController } from './db.controller';

@Module({
  providers: [DbService],
  exports: [DbService],
  controllers: [DbController],
})
export class DbModule {}
