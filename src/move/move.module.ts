import { Module } from '@nestjs/common';
import { MoveService } from './move.service';
import { MoveController } from './move.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [MoveService, DbService],
  controllers: [MoveController],
})
export class MoveModule {}
