import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TaskService {
  constructor(private dbSvc: DbService) {}
  DB_TABLES = {
    // task: 'management_task',
    task: 'test-task',
  };
  async getTaskById(id, projection?) {
    const data = await this.dbSvc.getItemById(
      this.DB_TABLES.task,
      id,
      projection,
    );
    return data;
  }
  async getTaskByQuery(key, value, projection?) {
    const data = await this.dbSvc.getItemByQuery(
      this.DB_TABLES.task,
      key,
      value,
      projection,
    );
    console.log(data.Item);
    return data.Item;
  }
  async getAllTasks(projection?) {
    const data = await this.dbSvc.getAllItems(this.DB_TABLES.task, projection);
    return data;
  }
  async scanTasksSimple(filterFormula, projection?) {
    const data = await this.dbSvc.scanItemsSimple(
      this.DB_TABLES.task,
      filterFormula,
      projection,
    );
    console.log('task-service', data);
    return data;
  }
  async upsertTask(params) {
    const data = await this.dbSvc.updateItem(this.DB_TABLES.task, params);
    console.log(data);
    return data;
  }

  async deleteTask(id) {
    await this.dbSvc.deleteItem(this.DB_TABLES.task, id);
  }
}
