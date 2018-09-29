import { Function } from '@aws-cdk/aws-lambda';

export interface CommonProps {
  envType: string;
}

export interface LambdaDef {
  [key: string]: Function,
}
