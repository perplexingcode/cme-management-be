import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { DbService } from './db.service';
@Controller('db')
export class DbController {
  constructor(private db: DbService) {}
  @Get('/id/:id/:projection?')
  async getItemById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.db.getItemById(id, projection);
    console.log('item-route', data);
    return data;
  }
  @Get('/query')
  async getItemByQuery(
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.db.getItemByQuery(key, value, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get('/all/:projection?')
  async getAllItems(@Param('projection') projection?) {
    const data = await this.db.getAllItems(projection);
    console.log('ban la nhat', new Date());
    return data;
  }
  @Get('/filter/:filterFormula/:projection?')
  async getItems(
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.db.scanItemsSimple(filterFormula, projection);
    console.log(data);
    return data;
  }

  @Post('/upsert')
  async upsertItem(@Body() params: any) {
    const data = await this.db.putItem(params);
    return data;
  }

  @Post('/delete')
  async deleteItem(@Body() idArray: any) {
    console.log(idArray);
    for (let i = 0; i < idArray.length; i++) {
      this.db.deleteItem(idArray[i]);
    }
  }
}
