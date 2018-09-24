import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncProps } from '..';
import { dynamodbDataSourceRole } from '../../common/roles/appsync';
import { toUpper } from '../../utils';
import { DynamodbProps } from '.';
import { PROJECT_NAME } from '../../common/consts';

export default (parent: Construct, props: AppSyncProps, dynamodb: DynamodbProps, apiId: string): cloudformation.DataSourceResource => {
  const role = dynamodbDataSourceRole(
    parent,
    {
      account: props.account,
      envType: props.envType,
      region: props.region,
      roleName: `invoke-${toUpper(dynamodb.TableName)}`,
      principal: 'appsync.amazonaws.com',
    },
    dynamodb.TableName);

  const resource = new cloudformation.DataSourceResource(
    parent,
    toUpper(dynamodb.TableName),
    {
      dataSourceName: `dynamodb_${toUpper(dynamodb.TableName)}`,
      apiId,
      type: 'AMAZON_DYNAMODB',
      dynamoDbConfig: {
        tableName: `${props.envType}-${PROJECT_NAME}-${dynamodb.TableName}`,
        awsRegion: props.region,
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};
