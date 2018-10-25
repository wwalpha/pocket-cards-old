import { Translate, AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getPronunciation, insertWord } from './utils';
import { Request, Response } from '.';
import { Pronunciation, Word } from 'typings/tables';

// Translate Client
const client = new Translate({
  region: 'us-east-1',
});

// Dynamodb Client
const dbClient = new DocumentClient({
  region: process.env.AWS_REGION,
});

/** ロジック */
export const app = async (event: Request): Promise<Response> => {
  const ret: object[] = [];

  for (const idx in event.words) {
    const word = event.words[idx];

    // 発音記号を取得する
    const pronunciation = await getPronunciation(dbClient, word);

    // 翻訳API
    const request: Translate.TranslateTextRequest = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'zh',
      Text: word,
    };

    const response = await client.translateText(request).promise();
    const item: Word = {
      setId: event.setId,
      word,
      pronunciation: pronunciation.Item && (pronunciation.Item as Pronunciation).ENG,
      vocabulary: response.TranslatedText,
      times: 0,
      nextDate: '00000000',
    };

    try {
      // 単語情報をDBに登録する
      await insertWord(dbClient, item);

      ret.push(item);
    } catch (error) {
      const code = (error as AWSError).code;

      // キー既存チェック以外エラーとする
      if (code !== 'ConditionalCheckFailedException') {
        throw error;
      }

      ret.push(item);
    }
  }

  return {
    words: ret,
  } as Response;
};
