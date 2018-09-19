import { Construct, Token, ServicePrincipal, PolicyStatement, PolicyStatementEffect, Arn } from '@aws-cdk/cdk';
import { Role, Policy } from '@aws-cdk/aws-iam';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncProps } from '@src/appsync';

export default (parent: Construct, props: AppSyncProps, config: DynamoDBConfig): cloudformation.DataSourceResource => {

  const role = new Role(parent, `${config.dataSourceName}Role`, {
    roleName: `${props.envType}-${config.dataSourceName}Role`,
    assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
  });

  const policy = new Policy(parent, `${config.dataSourceName}Role-policy`, {
    statements: [
      new PolicyStatement(PolicyStatementEffect.Allow)
        .addAction('dynamodb:DeleteItem')
        .addAction('dynamodb:GetItem')
        .addAction('dynamodb:PutItem')
        .addAction('dynamodb:Scan')
        .addAction('dynamodb:Query')
        .addAction('dynamodb:UpdateItem')
        .addResource(new Arn(`arn:aws:dynamodb:${props.region}:*:table/${props.envType}-${config.tableName}`))
        .addResource(new Arn(`arn:aws:dynamodb:${props.region}:*:table/${props.envType}-${config.tableName}/*`)),
    ],
  });

  role.attachInlinePolicy(policy);

  const resource = new cloudformation.DataSourceResource(
    parent,
    config.dataSourceName,
    {
      dataSourceName: config.dataSourceName,
      apiId: config.apiId,
      type: 'AMAZON_DYNAMODB',
      dynamoDbConfig: {
        tableName: `${props.envType}-${config.tableName}`,
        awsRegion: props.region,
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};

export interface DynamoDBConfig {
  apiId: Token;
  dataSourceName: string;
  tableName: string;
}
