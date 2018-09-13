import { Construct, Token } from '@aws-cdk/cdk';
import { CommonProps } from '../common';
import { Bucket } from '.';
import { BucketName } from '@aws-cdk/aws-s3';

export default (parent: Construct, props: S3Input): S3Output => {

  // バケット
  const bucket = Bucket(parent, props);

  const ret: S3Output = {
    domainName: bucket.bucketDomainName,
    arn: bucket.bucketArn,
    ref: bucket.ref,
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
