import { CommonProps } from '../utils';
import { BucketRefProps } from '@aws-cdk/aws-s3';
export { default as NewBucket } from './bucket';


export interface S3Input extends CommonProps {
}

export interface S3Output {
  bucket: BucketRefProps,
  domainName: string,
}

export interface S3EventInput extends CommonProps {
  s3: S3Output,
}

export interface S3EventOutput {
}
