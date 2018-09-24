import { Construct } from '@aws-cdk/cdk';
import { CommonProps } from '../common';
import { ImageToWord, AddNewWords } from '.';

export default (parent: Construct, props: LambdaInput): LambdaOutput => {
  // 画像から単語に変換する
  const imageToWord = ImageToWord(parent, props);
  const addNewWords = AddNewWords(parent, props);

  return {
    'image-to-word': imageToWord.functionArn,
    'add-new-words': addNewWords.functionArn,
  }
};

export interface LambdaInput extends CommonProps {
  bucketName: string,
}

export interface LambdaOutput {
  // Lambda Arns
  [key: string]: string;
}

