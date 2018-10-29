import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// 環境変数
const tableWord = process.env.TABLE_WORD as string;

/**
 * 復習用単語を取得する
 *
 * @param db DBクライアント
 * @param setId セットID
 * @param nextDate 勉強日付
 */
export const getReview = async (db: DocumentClient, setId: string, nextDate: string) => db.query({
  TableName: tableWord,
  KeyConditionExpression: '#setId = :setId and #nextDate <= :nextDate',
  FilterExpression: '#times <> :times',
  ExpressionAttributeNames: {
    '#setId': 'setId',
    '#nextDate': 'nextDate',
    '#times': 'times',
  },
  ExpressionAttributeValues: {
    ':setId': setId,
    ':nextDate': nextDate,
    ':times': 0,
  },
  ReturnConsumedCapacity: 'TOTAL',
  IndexName: 'lsiIndex1',
  ScanIndexForward: false,
}).promise();

/**
 * 忘れた単語一覧
 *
 * @param db DBクライアント
 * @param setId セットID
 * @param nextDate 勉強日付
 */
export const getForgot = async (db: DocumentClient, setId: string, nextDate: string) => db.query({
  TableName: tableWord,
  KeyConditionExpression: '#setId = :setId and #nextDate <= :nextDate',
  FilterExpression: '#times = :times',
  ExpressionAttributeNames: {
    '#setId': 'setId',
    '#nextDate': 'nextDate',
    '#times': 'times',
  },
  ExpressionAttributeValues: {
    ':setId': setId,
    ':nextDate': nextDate,
    ':times': 0,
  },
  ReturnConsumedCapacity: 'TOTAL',
  IndexName: 'lsiIndex1',
}).promise();

/**
 * 新規単語一覧を取得する
 * 
 * @param db DBクライアント
 * @param setId セットID
 * @param limit 取得上限
 */
export const getNew = async (db: DocumentClient, setId: string, limit: number) => db.query({
  TableName: tableWord,
  KeyConditionExpression: '#setId = :setId and #nextDate = :nextDate',
  FilterExpression: '#times = :times',
  ExpressionAttributeNames: {
    '#setId': 'setId',
    '#nextDate': 'nextDate',
    '#times': 'times',
  },
  ExpressionAttributeValues: {
    ':setId': setId,
    ':nextDate': '88888888',
    ':times': 0,
  },
  ReturnConsumedCapacity: 'TOTAL',
  IndexName: 'lsiIndex1',
  Limit: limit,
}).promise();

export const getNow = () => {
  const date = new Date();

  return `${date.getFullYear}${date.getMonth() + 1}${date.getDate()}`;
};
