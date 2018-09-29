import { Construct } from '@aws-cdk/cdk';
import { CloudFrontOriginAccessIdentity, Distribution, BucketPolicy } from '.';
import { CommonProps } from '../utils';

export default (parent: Construct, props: CloudFrontInput): CloudFrontOutput => {
  const identity = CloudFrontOriginAccessIdentity(parent);

  Distribution(parent, props, identity.ref);

  BucketPolicy(parent, props);
  return {};
};

export interface CloudFrontInput extends CommonProps {
  bucketDomainName: string;
  bucketArn: string;
  bucketRef: string;
}

export interface CloudFrontOutput {
}
