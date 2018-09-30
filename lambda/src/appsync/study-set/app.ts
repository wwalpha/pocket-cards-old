import { Translate, DynamoDB } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import * as fs from 'fs';
import { defaultEmpty } from '../../utils/commons/utils';

const client = new Translate({
  region: 'us-east-1',
});

const dbClient = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const handler = async (event: Request, context: Context, callback: Callback) => {
  console.log(event);

  const dicts: string[] = fs.readFileSync('./england.dict', 'utf-8').split('\n');

  for (const word in event.words) {
    // 発音
    const pronunciation: string | undefined = dicts.find(item => item.startsWith(word.toLowerCase()));

    // 翻訳API
    const request: Translate.TranslateTextRequest = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'zh',
      Text: word,
    };

    const result = await client.translateText(request).promise();

    // 単語情報をDBに登録する
    await dbClient.put({
      TableName: defaultEmpty(process.env.TABLE_NAME),
      Item: {
        word,
        pronunciation,
        vocabulary: result.TranslatedText,
        times: 0,
        nextTime: '00000000',
      },
      ConditionExpression: 'attribute_not_exists(word)',
    }).promise();
  }
};

export interface NewWord {
  word: string;
}
export interface Request {
  setId: string;
  words: string[];
}
