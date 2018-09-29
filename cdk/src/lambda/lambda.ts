import { Construct } from '@aws-cdk/cdk';
import { ImageToWord, AddNewWords, LambdaInput, LambdaOutput } from '.';

export default (parent: Construct, props: LambdaInput): LambdaOutput => {
  // 画像から単語に変換する
  const imageToWord = ImageToWord(parent, props);
  const addNewWords = AddNewWords(parent, props);

  return {
    'ImageToWord': imageToWord.functionArn,
    'AddNewWords': addNewWords.functionArn,
  }
};
