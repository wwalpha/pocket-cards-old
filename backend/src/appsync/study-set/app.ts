
import { DynamoDB } from 'aws-sdk';
import { Word } from 'typings/tables';
import { getReview, getNow, getNew } from './utils';
import { Response, Request } from './index';

// クライアント
const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/** 次の学習セットを取得する */
export const app = async (event: Request): Promise<Response> => {
  const now = getNow();

  // 復習用単語を取得する
  const review = await getReview(client, event.setId, now);

  // not found
  if (review.Count && review.Count !== 0) {
    return {
      words: review.Items as Word[],
    };
  }

  const relearn = await getNew(client, event.setId, now);

  const reCount = relearn.Count ? relearn.Count : 0;
  const reItems = relearn.Items ? relearn.Items as Word[] : [];

  // 20件以上ある場合、そのまま返却
  if (reCount >= 20) {
    return {
      words: reItems.splice(0, 20) as Word[],
    };
  }

  // 20件未満の場合
  return {
    words: reItems,
  };
};
