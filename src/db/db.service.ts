import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  ScanCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { TaskDTO } from 'src/dtos/task.dto';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as moment from 'moment';
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
@Injectable()
export class DbService {
  TABLE_NAME = {
    tasks: 'management_move',
  };
  REGION = 'ap-southeast-1';
  DDB = this.getDDB();
  async asyWrap(request) {
    try {
      const data = await request;
      return data;
      // return unmarshall(data.Item);
    } catch (error) {
      console.log(error);
    }
  }
  getDDB() {
    return new DynamoDBClient({
      region: this.REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
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
      const data = batch1Data.Items.map((item) => unmarshall(item));
      return data;
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
    const data = items.map((item) => unmarshall(item));
    return data;
  }

  async getItemById(table, itemId, projection?): Promise<any> {
    const params = {
      TableName: table,
      Key: {
        id: { S: itemId },
      },
      ProjectionExpression: projection,
    };
    const data = this.asyWrap(await this.DDB.send(new GetItemCommand(params)));
    return data;
  }

  async getItemByQuery(table, key, value, projection?): Promise<any> {
    const params = {
      TableName: table,
      IndexName: key + '-index',
      KeyConditionExpression: '#key = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: value },
      },
      ExpressionAttributeNames: {
        '#key': key,
      },
      ProjectionExpression: projection,
    };
    const data = await this.asyWrap(this.DDB.send(new QueryCommand(params)));
    return data.Items.map((item) => unmarshall(item));
  }

  async getAllItems(table, projection?): Promise<any> {
    const params = {
      TableName: table,
      // ProjectionExpression: projection || '',
    };
    return await this.baseScan(params);
  }
  async scanItemsSimple(
    table,
    filterFormula,
    ProjectionExpression?,
  ): Promise<any> {
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
      TableName: table,
    };

    return await this.baseScan(params);
  }

  async scanItems(params) {
    const data = await this.asyWrap(this.baseScan(params));
    return data;
  }

  async putItem(table, itemParams) {
    const params = {
      TableName: table,
      Item: marshall(itemParams),
    };
    const data = await this.asyWrap(this.DDB.send(new PutItemCommand(params)));
  }
  async deleteItem(table, itemId) {
    const params = {
      TableName: table,
      Key: {
        id: { S: itemId },
      },
    };
    const data = await this.asyWrap(
      this.DDB.send(new DeleteItemCommand(params)),
    );
  }
}
