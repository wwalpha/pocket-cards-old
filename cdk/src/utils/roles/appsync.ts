import { Construct, ServicePrincipal, PolicyStatement, PolicyStatementEffect, AwsRegion, AwsAccountId } from '@aws-cdk/cdk';
import { Role, Policy } from '@aws-cdk/aws-iam';
import { RoleProps } from '.';
import { PROJECT_NAME } from '../consts';

const getRole = (parent: Construct, props: RoleProps): Role => new Role(parent, `${props.roleName}Resource`, {
  roleName: `${props.envType}-${PROJECT_NAME}-${props.roleName}Role`,
  assumedBy: new ServicePrincipal(props.principal),
});

export const lambdaDataSourceRole = (parent: Construct, props: RoleProps, functionName: string): Role => {
  const role = getRole(parent, props);

  const policy = new Policy(parent, `${props.roleName}-policy`, {
    statements: [
      new PolicyStatement(PolicyStatementEffect.Allow)
        .addAction('lambda:invokeFunction')
        .addResource(`arn:aws:lambda:${new AwsRegion()}:${new AwsAccountId()}:function:${props.envType}-${PROJECT_NAME}-${functionName}`)
        .addResource(`arn:aws:lambda:${new AwsRegion()}:${new AwsAccountId()}:function:${props.envType}-${PROJECT_NAME}-${functionName}:*`),
    ],
  });

  role.attachInlinePolicy(policy);

  return role;
};

export const dynamodbDataSourceRole = (parent: Construct, props: RoleProps, tableName: string): Role => {
  const role = getRole(parent, props);

  const policy = new Policy(parent, `${props.roleName}-policy`, {
    statements: [
      new PolicyStatement(PolicyStatementEffect.Allow)
        .addAction('dynamodb:DeleteItem')
        .addAction('dynamodb:GetItem')
        .addAction('dynamodb:PutItem')
        .addAction('dynamodb:Scan')
        .addAction('dynamodb:Query')
        .addAction('dynamodb:UpdateItem')
        .addResource(`arn:aws:dynamodb:${new AwsRegion()}:*:table/${props.envType}-${PROJECT_NAME}-${tableName}`)
        .addResource(`arn:aws:dynamodb:${new AwsRegion()}:*:table/${props.envType}-${PROJECT_NAME}-${tableName}/*`),
    ],
  });

  role.attachInlinePolicy(policy);

  return role;
};