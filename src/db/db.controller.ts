import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Headers,
} from '@nestjs/common';
import { DbService } from './db.service';
@Controller('db')
export class DbController {
  constructor(private db: DbService) {}
  @Get('queryId/:table/:id/:projection?')
  async getItemById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.db.getItemById(id, projection);
    console.log('item-route', data);
    return data;
  }
  @Get('query')
  async getItemByQuery(
    @Headers() headers,
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.db.getItemByQuery(
      headers.table,
      key,
      value,
      projection,
    );
    console.log(
      new Date(),
      'Querying items from table: ' + headers.table + '\n',
      key + '=' + value + '\n',
      data,
    );
    console.log(data);
    return data;
  }
  @Get('all/:projection?')
  async getAllItems(@Headers() headers, @Param('projection') projection?) {
    const data = await this.db.getAllItems(headers.table, projection);
    console.log(new Date(), 'Getting all items from table: ' + headers.table);
    console.log(data);
    return data;
  }
  @Get('filter/:table/:filterFormula/:projection?')
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

  @Post('upsert/:table')
  async upsertItem(@Param('table') table, @Body() params: any) {
    console.log(new Date(), 'Upserting item to table: ' + table + '\n', params);
    const data = await this.db.putItem(table, params);
    return data;
  }

  @Post('/delete/:table')
  async deleteItem(@Param('table') table, @Body() idArray: any) {
    console.log(
      new Date(),
      'Deleting item from table: ' + table + '\n',
      idArray,
    );
    for (let i = 0; i < idArray.length; i++) {
      this.db.deleteItem(table, idArray[i]);
    }
  }
}
