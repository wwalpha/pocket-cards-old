import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Word } from '../../../typings/tables';

// 環境変数
console.log(process.env);
const tablePronunciation = process.env.TABLE_PRONUNCIATION as string;
const tableWord = process.env.TABLE_WORD as string;

console.log(tablePronunciation);
console.log(tableWord);

/** 発音記号取得処理 */
export const getPronunciation = async (db: DocumentClient, word: string) => db.get({
  TableName: tablePronunciation,
  Key: {
    word: word.toLowerCase(),
  },
}).promise();

/** 単語新規登録処理 */
export const insertWord = async (db: DocumentClient, item: Word) => db.put({
  TableName: tableWord,
  Item: item,
  ConditionExpression: 'attribute_not_exists(word) and attribute_not_exists(setId)',
}).promise();
