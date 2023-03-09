import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TaskService {
  constructor(private dbSvc: DbService) {}
  DB_TABLES = {
    tasks: 'management_tasks',
  };
  async getTaskById(id, projection?) {
    const data = await this.dbSvc.getItemById(
      this.DB_TABLES.tasks,
      id,
      projection,
    );
    return data;
  }
  async getTaskByQuery(key, value, projection?) {
    const data = await this.dbSvc.getItemByQuery(
      this.DB_TABLES.tasks,
      key,
      value,
      projection,
    );
    console.log(data.Item);
    return data.Item;
  }
  async getAllTasks(projection?) {
    const data = await this.dbSvc.getAllItems(this.DB_TABLES.tasks, projection);
    return data;
  }
  async scanTasksSimple(filterFormula, projection?) {
    const data = await this.dbSvc.scanItemsSimple(
      this.DB_TABLES.tasks,
      filterFormula,
      projection,
    );
    console.log('task-service', data);
    return data;
  }
  async createTask(params) {
    const data = await this.dbSvc.putItem(this.DB_TABLES.tasks, params);
    console.log(data);
    return data;
  }

  async deleteTask(id) {
    await this.dbSvc.deleteItem(this.DB_TABLES.tasks, id);
  }
}
