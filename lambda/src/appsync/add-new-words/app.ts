import { Translate, AWSError, DynamoDB } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import * as fs from 'fs';
import { defaultEmpty } from '../../utils/commons/utils';

const client = new Translate({
  region: 'us-east-1',
});

const dbClient = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const translateText = async (request: Translate.TranslateTextRequest) => new Promise<string>((resolve, reject) => {
  client.translateText(request, (err: AWSError, data: Translate.TranslateTextResponse) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(data.TranslatedText);
  });
});

export const handler = async (event: AddWords, context: Context, callback: Callback) => {
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

    const vocabulary = await translateText(request);

    // 単語情報をDBに登録する
    await dbClient.put({
      TableName: defaultEmpty(process.env.TABLE_NAME),
      Item: {
        word,
        pronunciation,
        vocabulary,
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
export interface AddWords {
  setId: string;
  words: string[];
}
