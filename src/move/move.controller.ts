import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { MoveService } from './move.service';
@Controller('move')
export class MoveController {
  constructor(private moveSvc: MoveService) {}
  @Get('/id/:id/:projection?')
  async getMoveById(@Param('id') id, @Param('projection') projection?) {
    const data = await this.moveSvc.getMoveById(id, projection);
    console.log('move-route', data);
    return data;
  }
  @Get('/query')
  async getMoveByQuery(
    @Query('key') key,
    @Query('value') value,
    @Query('projection') projection,
  ) {
    const data = await this.moveSvc.getMoveByQuery(key, value, projection);
    console.log(data.Item);
    return data.Item;
  }
  @Get('/all/:projection?')
  async getAllMoves(@Param('projection') projection?) {
    const data = await this.moveSvc.getAllMoves(projection);
    console.log('ban la nhat', new Date());
    return data;
  }
  @Get('/filter/:filterFormula/:projection?')
  async getMoves(
    @Param('filterFormula') filterFormula,
    @Param('projection') projection?,
  ) {
    const data = await this.moveSvc.scanMovesSimple(filterFormula, projection);
    console.log(data);
    return data;
  }

  @Post('/upsert')
  async updateMove(@Body() params: any) {
    const data = await this.moveSvc.upsertMove(params);
    return data;
  }

  @Post('/delete')
  async deleteMove(@Body() idArray: any) {
    console.log(idArray);
    for (let i = 0; i < idArray.length; i++) {
      this.moveSvc.deleteMove(idArray[i]);
    }
  }
}
