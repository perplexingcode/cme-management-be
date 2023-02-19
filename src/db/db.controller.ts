import { Controller, Get, Param, Query } from '@nestjs/common';
import { DbService } from './db.service';
@Controller('db')
export class DbController {
  constructor(private db: DbService) {}
  @Get('/task/:id/:projection?')
  async getTaskById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.db.getTaskById(id, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get('/task-query')
  async getTaskByQuery(
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.db.getTaskByQuery(key, value, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get('/all-tasks/:projection?')
  async getAllTasks(@Param('projection') projection?) {
    const data = await this.db.getAllTasks(projection);
    console.log(data);
    return data;
  }
  @Get('/tasks/:filterFormula/:projection?')
  async getTasks(
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.db.scanItemsSimple(filterFormula, projection);
    console.log(data);
    return data;
  }
}
