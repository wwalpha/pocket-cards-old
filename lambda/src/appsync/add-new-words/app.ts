import { Translate, DynamoDB, AWSError } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { defaultEmpty } from '../../utils/commons/utils';
import * as fs from 'fs';
import * as path from 'path';

const dict = fs.readFileSync(path.join(__dirname, './england.dict'), 'utf-8');
const dicts: string[] = dict.split('\n');

const client = new Translate({
  region: 'us-east-1',
});

const dbClient = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const handler = (event: Request, context: Context, callback: Callback<Response>) => {
  app(event)
    .then((value: Response) => callback(null, value))
    .catch((err) => {
      console.log(err);
      callback(err, {} as Response);
    });
};

const app = async (event: Request): Promise<Response> => {
  const ret: object[] = [];

  for (const idx in event.words) {
    const word = event.words[idx];
    // 発音
    const line: string | undefined = dicts.find(item => item.startsWith(word.toLowerCase()));
    const pronunciation = line && line.split(' ')[1];

    // 翻訳API
    const request: Translate.TranslateTextRequest = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'zh',
      Text: word,
    };

    const response = await client.translateText(request).promise();
    const item = {
      setId: event.setId,
      word,
      pronunciation,
      vocabulary: response.TranslatedText,
      times: 0,
      nextDate: '00000000',
    };

    try {
      // 単語情報をDBに登録する
      await dbClient.put({
        TableName: defaultEmpty(process.env.TABLE_NAME),
        Item: item,
        ConditionExpression: 'attribute_not_exists(word) and attribute_not_exists(setId)',
      }).promise();

      ret.push(item);
    } catch (error) {
      const code = (error as AWSError).code;

      if (code !== 'ConditionalCheckFailedException') {
        throw error;
      }
    }
  }

  return {
    words: ret,
  } as Response;
};

export interface Response {
  words: object[];
}
export interface Request {
  setId: string;
  words: string[];
}
