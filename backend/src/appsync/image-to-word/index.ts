import { Callback, Context } from 'aws-lambda';
import { app } from './app';

// イベント入口
export const handler = (event: Request, context: Context, callback: Callback<Response>) => {
  // イベントログ
  console.log(event);

  app(event)
    .then((response: Response) => {
      // 終了ログ
      console.log(response);
      callback(null, response);
    })
    .catch((err) => {
      // エラーログ
      console.log(err);
      callback(err, {} as Response);
    });
};

export interface Request {
  bucketKey: string;
}
export interface Response {
  words: string[];
}
