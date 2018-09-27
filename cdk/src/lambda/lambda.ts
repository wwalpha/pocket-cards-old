import { Construct, ServicePrincipal, AwsAccountId } from '@aws-cdk/cdk';
import { ImageToWord, AddNewWords, LambdaInput, LambdaOutput } from '.';

export default (parent: Construct, props: LambdaInput): LambdaOutput => {
  // 画像から単語に変換する
  const imageToWord = ImageToWord(parent, props);
  imageToWord.addPermission('imageToWordInvoke', {
    principal: new ServicePrincipal('s3.amazonaws.com'),
    sourceAccount: `${new AwsAccountId()}`,
    sourceArn: props.bucket.bucketArn,
  });

  const addNewWords = AddNewWords(parent, props);

  return {
    'image-to-word': imageToWord.functionArn,
    'add-new-words': addNewWords.functionArn,
  }
};
