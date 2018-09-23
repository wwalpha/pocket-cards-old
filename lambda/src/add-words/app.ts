import { Translate, AWSError, DynamoDB } from 'aws-sdk';
import { Context, Callback } from "aws-lambda";
import * as fs from 'fs';
import { putItem } from '../commons/dynamodb';
import { defaultEmpty } from '../commons/utils';

const client = new Translate({
  region: 'us-east-1',
});

const dbClient = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
})

const translateText = async (request: Translate.TranslateTextRequest) => new Promise<string>((resolve, reject) => {
  client.translateText(request, (err: AWSError, data: Translate.TranslateTextResponse) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(data.TranslatedText);
  });
});

export const handler = (event: AddWords, context: Context, callback: Callback) => {
  console.log(event);

  const dicts: string[] = fs.readFileSync('./england.dict', 'utf-8').split('\n');

  event.words.forEach(async (word: any) => {
    const pronunciation: string | undefined = dicts.find((item) => item.startsWith(word.toLowerCase()));

    const request: Translate.TranslateTextRequest = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'zh',
      Text: word,
    };

    const vocabulary = await translateText(request);

    await putItem(dbClient, {
      TableName: defaultEmpty(process.env.TABLE_NAME),
      Item: {
        Word: word,
        Pronunciation: pronunciation,
        Vocabulary: vocabulary,
      }
    });
  });
};

export interface NewWord {
  word: string
}
export interface AddWords {
  setId: string;
  words: string[];
}