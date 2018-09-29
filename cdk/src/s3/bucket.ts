import { Construct } from '@aws-cdk/cdk';
import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { PROJECT_NAME } from '../utils/consts';
import { S3Input } from '.';

export default (parent: Construct, props: S3Input) => new Bucket(
  parent,
  'BucketResource',
  {
    bucketName: `${props.envType}-${PROJECT_NAME.toLowerCase()}`,
    encryption: BucketEncryption.S3Managed,
    versioned: true,
  },
);
