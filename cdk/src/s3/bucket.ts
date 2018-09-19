import { Construct } from '@aws-cdk/cdk';
import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { PROJECT_NAME } from '../common/consts';
import { S3Input } from './s3';

export default (parent: Construct, props: S3Input) => new Bucket(
  parent,
  'BucketResource',
  {
    bucketName: `${props.envType}-${PROJECT_NAME.toLowerCase()}`,
    encryption: BucketEncryption.S3Managed,
    versioned: true,
  },
);
