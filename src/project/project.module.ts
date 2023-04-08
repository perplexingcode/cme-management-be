import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from '../project/project.controller';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [ProjectService, DbService],
  controllers: [ProjectController],
})
export class ProjectModule {}
