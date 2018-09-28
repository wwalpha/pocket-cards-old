import { CommonProps } from '../common';
import { Bucket } from '@aws-cdk/aws-s3';
import { Function } from '@aws-cdk/aws-lambda';

export { default as ImageToWord } from './image-to-word';
export { default as AddNewWords } from './add-new-words';

export const getHandler = (props: LambdaInput, functionName: string, handler: string): string => {
  if (props.envType === 'dev') {
    return `${functionName}/app.handler`;
  }

  return handler;
};

export interface LambdaInput extends CommonProps {
  bucket: Bucket,
}

export interface LambdaOutput {
  // Lambda Instance
  [key: string]: Function;
}
