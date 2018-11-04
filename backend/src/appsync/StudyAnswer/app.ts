
import { DynamoDB } from 'aws-sdk';
import * as moment from 'moment';
import { Response, Request } from './index';
import { getTimes, saveSuccess, saveFailure } from './utils';
import { Times } from 'typings/tables';

// クライアント
const client = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

/** 次の学習セットを取得する */
export const app = async (event: Request): Promise<Response> => {
  const timesArray = (await getTimes(client) as any) as Times[];

  const { setId, word, correct, times } = event;

  if (correct) {
    // 次の時間間隔
    const r = timesArray.find(time => time.times === times + 1);

    // 次なし
    if (!r) {
      // 次の日付を計算し、更新する
      saveSuccess(client, setId, word, '88888888');
      return {};
    }

    const nextDate = moment().add(r.dayDelay, 'day').format('YYYYMMDD');

    // 次の日付を計算し、更新する
    saveSuccess(client, setId, word, nextDate);
  } else {
    // リセットする
    saveFailure(client, setId, word, moment().add(1, 'day').format('YYYYMMDD'));
  }

  // 戻り値なし
  return {};
};
