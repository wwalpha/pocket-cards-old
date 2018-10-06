
import { Callback, Context } from 'aws-lambda';
import { Polly, S3 } from 'aws-sdk';
import * as moment from 'moment';

// 環境変数
const bucket = process.env.S3_BUCKET as string;
const prefix = process.env.S3_PREFIX as string;

// クライアント
const s3Client = new S3({
  region: process.env.AWS_REGION,
});

const client = new Polly({
  region: process.env.AWS_REGION,
});

/**
 * 単語リストを音声に変換し、S3保存する、S3のSignURLを返却する
 */
export const handler = async (event: Request, context: Context, callback: Callback<Response>) => {
  app(event)
    .then((value: Response) => callback(null, value))
    .catch(err => callback(err, {} as Response));
};

const app = async (event: Request): Promise<Response> => {
  /**  */
  const request: Polly.SynthesizeSpeechInput = {
    Text: `<speak>${event.words.join('<break time="0.5s"/>')}</speak>`,
    TextType: 'ssml',
    VoiceId: 'Joanna',
    OutputFormat: 'mp3',
    LanguageCode: 'en-US',
  };

  // 音声に変換
  const result = await client.synthesizeSpeech(request).promise();

  // ファイル名
  const filename: string = `${moment().format('YYYYMMDDHHmmssSSS')}.mp3`;

  const s3Request: S3.Types.PutObjectRequest = {
    Bucket: bucket,
    Key: `${prefix}/${filename}`,
    Body: result.AudioStream,
  };

  // S3に保存する
  await s3Client.putObject(s3Request).promise();

  // SignedURLを取得する
  const url = s3Client.getSignedUrl('getObject', {
    Bucket: bucket,
    Key: `${prefix}/${filename}`,
    Expires: 60,
  });

  const ret: Response = {
    audioUrl: url,
  };

  return ret;
};

export interface Request {
  words: String[];
}

export interface Response {
  audioUrl: String;
}
