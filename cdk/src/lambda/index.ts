import { CommonProps } from '../common';

export { default as ImageToWord } from './image_to_word';
export { default as AddNewWords } from './add-new-words';

export const getHandler = (props: LambdaInput, functionName: string, handler: string): string => {
  if (props.envType === 'dev') {
    return `${functionName}/app.handler`;
  }

  return handler;
};


export interface LambdaInput extends CommonProps {
  bucketName: string,
}

export interface LambdaOutput {
  // Lambda Arns
  [key: string]: string;
}

