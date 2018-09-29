import { CommonProps } from '../utils';
import { cloudformation } from '@aws-cdk/aws-s3';
export { default as NewBucket } from './bucket';


export interface S3Input extends CommonProps {
}

export interface S3Output {
  bucket: cloudformation.BucketResource,
  bucketArn: string
  bucketName: string
}

export interface S3EventInput extends CommonProps {
  bucket: S3Output,
}

export interface S3EventOutput {
}
