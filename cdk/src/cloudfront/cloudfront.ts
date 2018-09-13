import { Construct, Token } from '@aws-cdk/cdk';
import { CommonProps } from '../common';
import { CloudFrontOriginAccessIdentity, Distribution, BucketPolicy } from '.';
import { BucketName } from '@aws-cdk/aws-s3';

export default (parent: Construct, props: CloudFrontInput): CloudFrontOutput => {
  const identity = CloudFrontOriginAccessIdentity(parent, props);

  Distribution(parent, props, identity.ref);

  BucketPolicy(parent, props, '');
  return {};
};

export interface CloudFrontInput extends CommonProps {
  bucketDomainName: Token;
  bucketArn: Token;
  bucketRef: BucketName;
}

export interface CloudFrontOutput {
}
