import { Rekognition } from 'aws-sdk';
import { Callback, Context } from 'aws-lambda';
import { defaultEmpty } from '../../utils/commons/utils';

const excludeWord = ['Unit', 'Lesson', 'New words and expressions'];
const excludeMark = ['\'', '(', ')', '/', '.', ',', 'ˌ', 'ˈ'];
const excludeId: number[] = [];

const client = new Rekognition({
  region: process.env.AWS_REGION,
});

const bucket: string | undefined = process.env.S3_BUCKET;

export interface Request {
  bucketKey: string;
}
export interface Response {
  words: string[];
}

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

const app = async (event: Request): Promise<Response> => {

  const request: Rekognition.Types.DetectTextRequest = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: event.bucketKey,
      },
    },
  };

  const result = await client.detectText(request).promise();

  const results: string[] = [];

  result.TextDetections && result.TextDetections.forEach((item) => {
    // 対象外を除く
    if (!filter(item)) {
      return;
    }

    results.push(defaultEmpty(item.DetectedText));
  });

  return {
    words: results,
  } as Response;
};

// 単語以外のデータを除く
const filter = (item: Rekognition.TextDetection): boolean => {
  // 確信度９０以下を除く
  if (item.Confidence && item.Confidence < 90) {
    return false;
  }

  const text = defaultEmpty(item.DetectedText);

  // 行の場合、対象外単語を含めた場合
  if (item.Type === 'LINE') {
    if (excludeWord.find(word => text.includes(word))) {
      if (item.Id !== undefined) {
        excludeId.push(item.Id);
      }

      return false;
    }
  }

  // 対象外のLineの子供も対象外
  if (item.ParentId !== undefined && excludeId.includes(item.ParentId)) {
    return false;
  }

  // 2桁以下の対象外
  if (text.length <= 2) return false;

  // 記号を含むのは単語ではない
  const target = excludeMark.find(mark => text.indexOf(mark) !== -1);
  // 記号がある場合
  if (target) return false;

  return true;
};
