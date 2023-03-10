import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { TaskService } from '../task/task.service';
@Controller('tasks')
export class TaskController {
  constructor(private taskSvc: TaskService) {}
  @Get('/id/:id/:projection?')
  async getTaskById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.taskSvc.getTaskById(id, projection);
    console.log('task-route', data);
    return data;
  }
  @Get('/query')
  async getTaskByQuery(
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.taskSvc.getTaskByQuery(key, value, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get('/all/:projection?')
  async getAllTasks(@Param('projection') projection?) {
    const data = await this.taskSvc.getAllTasks(projection);
    console.log('ban la nhat');
    return data;
  }
  @Get('/filter/:filterFormula/:projection?')
  async getTasks(
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.taskSvc.scanTasksSimple(filterFormula, projection);
    console.log(data);
    return data;
  }

  @Post('/create')
  async createTask(@Body() params: any) {
    console.log('botayroi');
    console.log('danchoi', params);
    const data = await this.taskSvc.createTask(params);
    return data;
  }

  @Post('/delete')
  async deleteTask(@Body() idArray: any) {
    console.log(idArray);
    for (let i = 0; i < idArray.length; i++) {
      this.taskSvc.deleteTask(idArray[i]);
    }
  }
}
