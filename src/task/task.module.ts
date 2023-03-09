import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from '../task/task.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [TaskService, DbService],
  controllers: [TaskController],
})
export class TaskModule {}
