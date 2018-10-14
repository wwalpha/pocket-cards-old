import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-s3';
import { CloudFrontInput } from './cloudfront';
import { PolicyDocument, PolicyStatement, PolicyStatementEffect } from '@aws-cdk/aws-iam';

const getPolicyDocument = (bucketArn: string): object => {
  const policy = new PolicyDocument();

  const stmt = new PolicyStatement(PolicyStatementEffect.Allow);

  stmt
    .addAction('s3:GetObject')
    .addResource(bucketArn);
  stmt.addAwsPrincipal('*');

  policy.addStatement(stmt);

  return policy;
};

export default (parent: Construct, props: CloudFrontInput) => new cloudformation.BucketPolicyResource(
  parent,
  'BucketPolicyResource',
  {
    bucket: props.bucketRef,
    policyDocument: getPolicyDocument(props.bucketArn),
  },
);

// TakumiBucketPolicy:
// Type: AWS::S3::BucketPolicy
// Properties:
//   Bucket: !Ref TakumiBucket
//   PolicyDocument:
//     Statement:
//       - Action: s3:GetObject
//         Effect: Allow
//         Resource: !Sub arn:aws:s3:::${TakumiBucket}/*
//         Principal:
//           AWS: !Sub arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${CloudFrontOriginAccessIdentity}
