
import { DynamoDB } from 'aws-sdk';
import { Request, Response } from '.';
import { Word } from 'typings/tables';
import { getWords, getNextDate } from './utils';

// クライアント
const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/** 次の学習セットを取得する */
export const app = async (event: Request): Promise<Response> => {
  const result = await getWords(client, event.setId, getNextDate());

  console.log('ConsumedCapacity', result.ConsumedCapacity);

  const ret: Response = {
    words: result.Items as Word[],
  };

  return ret;
};
