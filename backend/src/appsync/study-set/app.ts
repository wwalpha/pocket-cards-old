
import { DynamoDB } from 'aws-sdk';
import { Word } from 'typings/tables';
import { getReview, getNow, getForgot, getNew } from './utils';
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

  // 忘れた単語一覧
  const reviewItems = review.Items ? review.Items as Word[] : [];

  // 結果あり　かつ　２０件以上
  if (reviewItems.length >= 20) {
    return {
      words: reviewItems.splice(0, 20),
    };
  }

  // 忘れた単語一覧を取得する
  const forgot = await getForgot(client, event.setId, now);

  // 忘れた単語一覧
  const forgotItems = forgot.Items ? forgot.Items as Word[] : [];

  // 20件以上ある場合、そのまま返却
  if (forgotItems.length >= (20 - reviewItems.length)) {
    return {
      words: reviewItems.concat(forgotItems).splice(0, 20),
    };
  }

  // 復習と忘れ単語が２０件未満の場合、新規単語を取得する
  const limit = 20 - reviewItems.length - forgotItems.length;

  // 新規単語一覧を取得する
  const newList = await getNew(client, event.setId, limit);
  // 新規単語一覧
  const newItems = newList.Items ? newList.Items as Word[] : [];

  return {
    words: reviewItems.concat(forgotItems).concat(newItems),
  };
};
