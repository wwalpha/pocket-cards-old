import { CommonProps } from '../utils';
import { S3Output } from '../s3';

export { default as ImageToWord } from './image-to-word';
export { default as AddNewWords } from './add-new-words';

export const getHandler = (props: LambdaInput, functionName: string, handler: string): string => {
  if (props.envType === 'dev') {
    return `${functionName}/app.handler`;
  }

  return handler;
};

export interface LambdaInput extends CommonProps {
  bucket: S3Output,
}

export interface LambdaOutput {
  // Lambda FunctionArn
  [key: string]: string;
}
