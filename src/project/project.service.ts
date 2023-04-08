import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ProjectService {
  constructor(private dbSvc: DbService) {}
  DB_TABLES = {
    project: 'management_project',
  };
  async getProjectById(id, projection?) {
    const data = await this.dbSvc.getItemById(
      this.DB_TABLES.project,
      id,
      projection,
    );
    return data;
  }
  async getProjectByQuery(key, value, projection?) {
    const data = await this.dbSvc.getItemByQuery(
      this.DB_TABLES.project,
      key,
      value,
      projection,
    );
    console.log(data.Item);
    return data.Item;
  }
  async getAllProjects(projection?) {
    const data = await this.dbSvc.getAllItems(
      this.DB_TABLES.project,
      projection,
    );
    console.log('ai cha');
    return data;
  }
  async scanProjectsSimple(filterFormula, projection?) {
    const data = await this.dbSvc.scanItemsSimple(
      this.DB_TABLES.project,
      filterFormula,
      projection,
    );
    console.log('project-service', data);
    return data;
  }
  async createProject(params) {
    const data = await this.dbSvc.putItem(this.DB_TABLES.project, params);
    console.log(data);
    return data;
  }
  async updateProject(params) {
    const data = await this.dbSvc.updateItem(this.DB_TABLES.project, params);
    console.log(data);
    return data;
  }

  async deleteProject(id) {
    await this.dbSvc.deleteItem(this.DB_TABLES.project, id);
  }
}
