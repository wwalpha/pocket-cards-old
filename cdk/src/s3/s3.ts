import { Construct } from '@aws-cdk/cdk';
import { NewBucket, S3Input, S3Output } from '.';
import { cloudformation } from '@aws-cdk/aws-s3';

export default (parent: Construct, props: S3Input): S3Output => {
  // バケット
  const bucket = NewBucket(parent, props);

  const ret: S3Output = {
    bucket: bucket.findChild('Resource') as cloudformation.BucketResource,
    bucketArn: bucket.bucketArn,
    bucketName: bucket.bucketName,
  };

  return ret;
};

