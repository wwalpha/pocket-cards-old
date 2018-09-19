import { PolicyStatement, PolicyStatementEffect, Arn } from '@aws-cdk/cdk';
import { CommonProps } from '.';

export const lambdaBasic = (props: CommonProps) => {
  return new PolicyStatement(PolicyStatementEffect.Allow)
    .addAction('logs:CreateLogGroup')
    .addAction('logs:CreateLogStream')
    .addAction('logs:PutLogEvents')
    .addResource(new Arn(`arn:aws:logs:${props.region}:*:*`));
};

export const lambdaDynamodb = (props: CommonProps): PolicyStatement[] => {
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
      .addResource(new Arn(`arn:aws:dynamodb:${props.region}:*:table/*`)),
    new PolicyStatement(PolicyStatementEffect.Allow)
      .addAction('dynamodb:Scan')
      .addAction('dynamodb:Query')
      .addResource(new Arn(`arn:aws:dynamodb:${props.region}:*:table/*/index/*`)),
  ];
};