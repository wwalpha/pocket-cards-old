import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-cloudfront';
import { CloudFrontInput } from './cloudfront';

export default (parent: Construct, props: CloudFrontInput) => new cloudformation.CloudFrontOriginAccessIdentityResource(
  parent,
  'CloudFrontOriginAccessIdentityResource',
  {
    cloudFrontOriginAccessIdentityConfig: {
      comment: ''
    }
  }
);
