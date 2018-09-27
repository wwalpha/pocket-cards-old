import { CommonProps } from '../common';
import { Bucket } from '@aws-cdk/aws-s3';
import { LambdaOutput } from '../lambda';
export { default as NewBucket } from './bucket';


export interface S3Input extends CommonProps {
}

export interface S3Output {
  bucket: Bucket,
}

export interface S3EventInput extends CommonProps {
  bucket: Bucket,
  lambdaArn: LambdaOutput
}

export interface S3EventOutput {
}
