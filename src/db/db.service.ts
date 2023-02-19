import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { TaskDTO } from 'src/dtos/task.dto';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as moment from 'moment';

@Injectable()
export class DbService {
  TABLE_NAME = {
    tasks: 'management_tasks',
  };
  REGION = 'ap-southeast-1';
  DDB = this.getDDB();
  async asyWrap(request) {
    try {
      const data = await request;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  getDDB() {
    return new DynamoDBClient({
      region: this.REGION,
      credentials: {
        accessKeyId: 'AKIAZO67ZV6JVDCT2BVJ',
        secretAccessKey: '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',
      },
    });
  }

  async baseScan(params) {
    let lastPage = false;
    let items = [];
    let batchId = null;

    const batch1Data = await this.asyWrap(
      this.DDB.send(new ScanCommand(params)),
    );
    items = items.concat(batch1Data.Items);
    if (!batch1Data.LastEvaluatedKey) {
      lastPage = true;
      return batch1Data;
    }
    batchId = batch1Data.LastEvaluatedKey;
    while (!lastPage) {
      params.LastEvaluatedKey = batchId;
      const batchData = await this.asyWrap(
        this.DDB.send(new ScanCommand(params)),
      );
      items = items.concat(batchData.Items);
      if (!batchData.LastEvaluatedKey) lastPage = true;
      params.LastEvaluatedKey = batchData.LastEvaluatedKey;
    }
    return items;
  }

  async getTaskById(taskId, projection?): Promise<any> {
    const params = {
      TableName: this.TABLE_NAME.tasks,
      Key: {
        id: { S: taskId },
      },
      ProjectionExpression: projection,
    };
    const data = this.asyWrap(await this.DDB.send(new GetItemCommand(params)));
    return data;
  }

  async getTaskByQuery(key, value, projection?): Promise<any> {
    const params = {
      TableName: this.TABLE_NAME.tasks,
      Key: {
        [key]: { S: value },
      },
      ProjectionExpression: projection,
    };
    const data = await this.asyWrap(this.DDB.send(new GetItemCommand(params)));
    return data;
  }

  async getAllTasks(projection?): Promise<any> {
    const params = {
      TableName: this.TABLE_NAME.tasks,
      ProjectionExpression: projection,
    };
    return await this.baseScan(params);
  }
  async scanItemsSimple(filterFormula, ProjectionExpression?): Promise<any> {
    const urlParams = new URLSearchParams(filterFormula);
    const paramsObj = Object.fromEntries(urlParams);
    let FilterExpression = '';
    let ExpressionAttributeValues = {};
    for (const [key, type_value] of Object.entries(paramsObj)) {
      let type = type_value.split('-')[0];
      let value = type_value.split('-')[1];
      let attrId = v4().replaceAll('-', '');
      FilterExpression += `${key} = :${attrId} AND `;
      ExpressionAttributeValues[`:${attrId}`] = { [type]: value };
    }
    FilterExpression = FilterExpression.slice(0, -5);

    const params = {
      FilterExpression,

      ExpressionAttributeValues,
      ProjectionExpression,
      TableName: this.TABLE_NAME.tasks,
    };

    return await this.baseScan(params);
  }
  updateTask = async function (taskParams) {
    const params = {
      TableName: 'TABLE_NAME',
      Item: taskParams,
      // Item: {
      //   CUSTOMER_ID: { N: '001' },
      //   CUSTOMER_NAME: { S: 'Richard Roe' },
      // },
    };
    const data = await this.asyWrap(this.DDB.send(new PutItemCommand(params)));
  };
}
