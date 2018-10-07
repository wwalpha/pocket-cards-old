
import { Callback, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Word } from '../../utils/types';

// 環境変数
const tableName = process.env.TABLE_NAME as string;

// クライアント
const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/**
 * 次の学習セットを取得する
 */
export const handler = (event: Request, context: Context, callback: Callback<Response>) => {
  // イベントログ
  console.log(event);

  app(event)
    .then((response: Response) => {
      // 終了ログ
      console.log(response);
      callback(null, response);
    })
    .catch((err) => {
      // エラーログ
      console.log(err);
      callback(err, {} as Response);
    });
};

const app = async (event: Request): Promise<Response> => {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: '#setId = :setId and #nextDate <= :nextDate',
    ExpressionAttributeNames: {
      '#setId': 'setId',
      '#nextDate': 'nextDate',
    },
    ExpressionAttributeValues: {
      ':setId': event.setId,
      ':nextDate': '20180105',
    },
    ReturnConsumedCapacity: 'TOTAL',
    IndexName: 'lsiIndex1',
    ScanIndexForward: false,
    Limit: 3,
  };

  const result = await client.query(params).promise();

  console.log('ConsumedCapacity', result.ConsumedCapacity);

  const ret: Response = {
    words: result.Items as Word[],
  };

  return ret;
};

export interface Request {
  setId: string;
  userId: string;
}

export interface Response {
  words?: Word[];
}
