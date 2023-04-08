import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
@Controller('project')
export class ProjectController {
  constructor(private projectSvc: ProjectService) {}
  @Get('/id/:id/:projection?')
  async getProjectById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.projectSvc.getProjectById(id, projection);
    console.log('project-route', data);
    return data;
  }
  @Get('/query')
  async getProjectByQuery(
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.projectSvc.getProjectByQuery(
      key,
      value,
      projection,
    );
    console.log(data.Item);
    return data.Item;
  }
  @Get('/all/:projection?')
  async getAllProjects(@Param('projection') projection?) {
    const data = await this.projectSvc.getAllProjects(projection);
    console.log('ban la nhat');
    return data;
  }
  @Get('/filter/:filterFormula/:projection?')
  async getProjects(
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.projectSvc.scanProjectsSimple(
      filterFormula,
      projection,
    );
    console.log(data);
    return data;
  }

  @Post('/create')
  async createProject(@Body() params: any) {
    const data = await this.projectSvc.createProject(params);
    return data;
  }
  @Post('/update')
  async updateProject(@Body() params: any) {
    const data = await this.projectSvc.updateProject(params);
    return data;
  }

  @Post('/delete')
  async deleteProject(@Body() idArray: any) {
    console.log(idArray);
    for (let i = 0; i < idArray.length; i++) {
      this.projectSvc.deleteProject(idArray[i]);
    }
  }
}
