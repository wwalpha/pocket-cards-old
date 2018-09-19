import { Construct, Token } from '@aws-cdk/cdk';
import { BucketName } from '@aws-cdk/aws-s3';
import { CommonProps } from '@common';
import { Bucket } from '.';

export default (parent: Construct, props: S3Input): S3Output => {

  // バケット
  const bucket = Bucket(parent, props);

  const ret: S3Output = {
    domainName: bucket.domainName,
    arn: bucket.bucketArn,
    ref: bucket.bucketName,
  };

  return ret;
};

export interface S3Input extends CommonProps {
}

export interface S3Output {
  domainName: Token;
  arn: Token;
  ref: BucketName;
}
