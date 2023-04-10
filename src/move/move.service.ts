import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class MoveService {
  constructor(private dbSvc: DbService) {}
  DB_TABLES = {
    // move: 'management_move',
    move: 'test-task',
  };
  async getMoveById(id, projection?) {
    const data = await this.dbSvc.getItemById(
      this.DB_TABLES.move,
      id,
      projection,
    );
    return data;
  }
  async getMoveByQuery(key, value, projection?) {
    const data = await this.dbSvc.getItemByQuery(
      this.DB_TABLES.move,
      key,
      value,
      projection,
    );
    console.log(data.Item);
    return data.Item;
  }
  async getAllMoves(projection?) {
    const data = await this.dbSvc.getAllItems(this.DB_TABLES.move, projection);
    return data;
  }
  async scanMovesSimple(filterFormula, projection?) {
    const data = await this.dbSvc.scanItemsSimple(
      this.DB_TABLES.move,
      filterFormula,
      projection,
    );
    console.log('move-service', data);
    return data;
  }
  async upsertMove(params) {
    const data = await this.dbSvc.putItem(this.DB_TABLES.move, params);
    console.log(data);
    return data;
  }

  async deleteMove(id) {
    await this.dbSvc.deleteItem(this.DB_TABLES.move, id);
  }
}
