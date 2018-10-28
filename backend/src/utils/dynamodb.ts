import { DocumentClient, Key, ItemList } from 'aws-sdk/clients/dynamodb';

/**
 * 全件カウントを取得する
 *
 * @param db DB
 * @param table テーブル
 * @param startKey 検索用キー
 */
export const scanCount = async (db: DocumentClient, table: string, startKey?: Key): Promise<number> => {
  let sub = 0;

  const result = await db.scan({
    TableName: table,
    ExclusiveStartKey: startKey,
  }).promise();

  // キーが存在すれば、再検索
  if (result.LastEvaluatedKey) {
    sub = await scanCount(db, table, result.LastEvaluatedKey);
  }

  if (result.Count) {
    return result.Count + sub;
  }

  return 0;
};

/**
 * 全件を取得する
 *
 * @param db DB
 * @param table テーブル
 * @param startKey 検索用キー
 */
export const scan = async (db: DocumentClient, table: string, startKey?: Key): Promise<ItemList> => {
  let items: ItemList = [];
  let subItems: ItemList = [];

  // データ検索
  const result = await db.scan({
    TableName: table,
    ExclusiveStartKey: startKey,
  }).promise();

  // キーが存在すれば、再検索
  if (result.LastEvaluatedKey) {
    subItems = await scan(db, table, result.LastEvaluatedKey);
  }

  // データありの場合
  if (result.Items) {
    items = result.Items;
  }

  return items.concat(subItems);
};
