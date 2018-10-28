import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { scan } from '../..//utils/dynamodb';

// 環境変数
const tableWord = process.env.TABLE_WORD as string;
const tableTimes = process.env.TABLE_TIMES as string;

/**
 * 成功した場合
 *
 * @param db DBクライアント
 * @param setId セットID
 * @param word 単語
 * @param nextDate 勉強日付
 */
export const saveSuccess = async (db: DocumentClient, setId: string, word: string, nextDate: string) => db.update({
  TableName: tableWord,
  Key: {
    setId,
    word,
  },
  UpdateExpression: 'set nextDate = :nextDate, times = times + :increase',
  ExpressionAttributeValues: {
    ':nextDate': nextDate,
    ':increase': 1,
  },
  ReturnValues: 'UPDATED_NEW',
}).promise();

/**
 * 失敗した場合
 *
 * @param db クライアント
 * @param setId セットID
 * @param word 単語
 * @param nextDate 保存日付
 */
export const saveFailure = async (db: DocumentClient, setId: string, word: string, nextDate: string) => db.update({
  TableName: tableWord,
  Key: {
    setId,
    word,
  },
  UpdateExpression: 'set nextDate = :nextDate, times = :times',
  ExpressionAttributeValues: {
    ':nextDate': nextDate,
    ':times': 0,
  },
  ReturnValues: 'UPDATED_NEW',
}).promise();

/**
 * 次の回数を計算する用データを検索する
 *
 * @param db クライアント
 */
export const getTimes = async (db: DocumentClient) => scan(db, tableTimes);

export const getNow = () => {
  const date = new Date();

  return `${date.getFullYear}${date.getMonth() + 1}${date.getDate()}`;
};
