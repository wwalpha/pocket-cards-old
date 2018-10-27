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
  region: process.env.AWS_DEFAULT_REGION,
});

/** ロジック */
export const app = async (event: Request): Promise<Response> => {
  const words = event.words.map(word => fixWord(event.setId, word));

  // 一括実行
  const result = await Promise.all(words);

  console.log(result);
  return {
    words: result,
  } as Response;
};

const fixWord = async (setId: string, word: string): Promise<Word> => {
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
    setId,
    word,
    pronunciation: pronunciation.Item && (pronunciation.Item as Pronunciation).ENG,
    vocabulary: response.TranslatedText,
    times: 0,
    nextDate: '00000000',
  };

  try {
    // 単語情報をDBに登録する
    await insertWord(dbClient, item);
  } catch (error) {
    const code = (error as AWSError).code;

    // キー既存チェック以外エラーとする
    if (code !== 'ConditionalCheckFailedException') {
      throw error;
    }
  }

  return item;
};
