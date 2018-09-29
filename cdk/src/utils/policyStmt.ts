import { PolicyStatement, PolicyStatementEffect, AwsRegion } from '@aws-cdk/cdk';

export const lambdaBasic = () => {
  return new PolicyStatement(PolicyStatementEffect.Allow)
    .addAction('logs:CreateLogGroup')
    .addAction('logs:CreateLogStream')
    .addAction('logs:PutLogEvents')
    .addResource(`arn:aws:logs:${new AwsRegion()}:*:*`);
};

export const dynamodb = (): PolicyStatement[] => {
  return [
    new PolicyStatement(PolicyStatementEffect.Allow)
      .addAction('dynamodb:PutItem')
      .addAction('dynamodb:DeleteItem')
      .addAction('dynamodb:GetItem')
      .addAction('dynamodb:Scan')
      .addAction('dynamodb:Query')
      .addAction('dynamodb:UpdateItem')
      .addAction('dynamodb:DescribeStream')
      .addAction('dynamodb:GetRecords')
      .addAction('dynamodb:GetShardIterator')
      .addAction('dynamodb:ListStreams')
      .addResource(`arn:aws:dynamodb:${new AwsRegion()}:*:table/*`),
    new PolicyStatement(PolicyStatementEffect.Allow)
      .addAction('dynamodb:Scan')
      .addAction('dynamodb:Query')
      .addResource(`arn:aws:dynamodb:${new AwsRegion()}:*:table/*/index/*`),
  ];
};

export const s3 = (bucketName: string): PolicyStatement[] => {
  return [
    new PolicyStatement(PolicyStatementEffect.Allow)
      .addAction('s3:HeadBucket')
      .addAction('s3:ListBucket')
      .addResource(`arn:aws:s3:::*`),
    new PolicyStatement(PolicyStatementEffect.Allow)
      .addAction('s3:PutObject')
      .addAction('s3:GetObject')
      .addAction('s3:DeleteObject')
      .addAction('s3:ReplicateObject')
      .addAction('s3:RestoreObject')
      .addResource(`arn:aws:s3:::${bucketName}`)
      .addResource(`arn:aws:s3:::${bucketName}/*`),
  ];
};