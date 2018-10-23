import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// 環境変数
const tableWord = process.env.TABLE_WORD as string;

/** 学習単語を取得する */
export const getWords = (db: DocumentClient, setId: string, nextDate: string) => db.query({
  TableName: tableWord,
  KeyConditionExpression: '#setId = :setId and #nextDate <= :nextDate',
  ExpressionAttributeNames: {
    '#setId': 'setId',
    '#nextDate': 'nextDate',
  },
  ExpressionAttributeValues: {
    ':setId': setId,
    ':nextDate': nextDate,
  },
  ReturnConsumedCapacity: 'TOTAL',
  IndexName: 'lsiIndex1',
  ScanIndexForward: false,
  Limit: 3,
}).promise();

export const getNextDate = () => {
  const date = new Date();

  return `${date.getFullYear}${date.getMonth() + 1}${date.getDate()}`;
};
