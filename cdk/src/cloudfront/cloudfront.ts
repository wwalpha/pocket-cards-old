import { Construct, Token } from '@aws-cdk/cdk';
import { BucketName } from '@aws-cdk/aws-s3';
import { CloudFrontOriginAccessIdentity, Distribution, BucketPolicy } from '.';
import { CommonProps } from '../common';

export default (parent: Construct, props: CloudFrontInput): CloudFrontOutput => {
  const identity = CloudFrontOriginAccessIdentity(parent);

  Distribution(parent, props, identity.ref);

  BucketPolicy(parent, props);
  return {};
};

export interface CloudFrontInput extends CommonProps {
  bucketDomainName: Token;
  bucketArn: Token;
  bucketRef: BucketName;
}

export interface CloudFrontOutput {
}
