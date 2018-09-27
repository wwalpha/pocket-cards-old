import { Construct } from '@aws-cdk/cdk';
import { NewBucket, S3Input, S3Output } from '.';

export default (parent: Construct, props: S3Input): S3Output => {
  // バケット
  const bucket = NewBucket(parent, props);

  const ret: S3Output = {
    bucket
  };

  return ret;
};

