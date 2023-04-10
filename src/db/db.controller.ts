import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { DbService } from './db.service';
@Controller('db')
export class DbController {
  constructor(private db: DbService) {}
  @Get(':table/:id/:projection?')
  async getItemById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.db.getItemById(id, projection);
    console.log('item-route', data);
    return data;
  }
  @Get(':table/query')
  async getItemByQuery(
    @Param('table') table,
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.db.getItemByQuery(table, key, value, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get(':table/all/:projection?')
  async getAllItems(@Param('table') table, @Param('projection') projection?) {
    const data = await this.db.getAllItems(table, projection);
    console.log('ban la nhat', new Date());
    return data;
  }
  @Get(':table/filter/:filterFormula/:projection?')
  async getItems(
    @Param('table') table,
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.db.scanItemsSimple(
      table,
      filterFormula,
      projection,
    );
    console.log(data);
    return data;
  }

  @Post(':table/upsert')
  async upsertItem(@Param('table') table, @Body() params: any) {
    const data = await this.db.putItem(table, params);
    return data;
  }

  @Post(':table/delete')
  async deleteItem(@Param('table') table, @Body() idArray: any) {
    console.log(idArray);
    for (let i = 0; i < idArray.length; i++) {
      this.db.deleteItem(table, idArray[i]);
    }
  }
}
