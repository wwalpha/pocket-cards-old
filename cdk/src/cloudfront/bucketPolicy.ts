import { Construct, PolicyDocument, PolicyStatement, Arn, PolicyStatementEffect, Token } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-s3';
import { CloudFrontInput } from './cloudfront';

const getPolicyDocument = (bucketArn: Token): object => {
  const policy = new PolicyDocument();

  const stmt = new PolicyStatement(PolicyStatementEffect.Allow);

  stmt
    .addAction('s3:GetObject')
    .addResource(new Arn(bucketArn));
  stmt.addAwsPrincipal(new Arn('*'));

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
