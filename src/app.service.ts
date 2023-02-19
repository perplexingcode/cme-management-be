import { Injectable } from '@nestjs/common';
import { DbService } from './db/db.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
