import { Context, Callback } from 'aws-lambda';
import { app } from './app';
import { Word } from 'typings/tables';

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

export interface Response {
  words: Word[];
}

export interface Request {
  setId: string;
}
