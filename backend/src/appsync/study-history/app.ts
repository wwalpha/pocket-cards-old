
import { Callback, Context } from 'aws-lambda';
import { Word } from '../../utils/types';
import { DynamoDB } from 'aws-sdk';

// 環境変数
const tableName = process.env.TABLE_NAME as string;

// クライアント
const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/**
 * 次の学習セットを取得する
 */
export const handler = async (event: Request, context: Context, callback: Callback<Response>) => {
  try {
    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      KeyConditionExpression: 'setId = :setId',
      ExpressionAttributeValues: {
        ':setId': event.setId,
      },
      Limit: 21,
    };

    const result = await client.query(params).promise();

    callback(null, {
      words: result.Items as Word[],
    });
  } catch (error) {
    console.log(error);
    return callback(error, (null as any));
  }
};

export interface Request {
  setId: String;
}

export interface Response {
  words: Word[];
}
