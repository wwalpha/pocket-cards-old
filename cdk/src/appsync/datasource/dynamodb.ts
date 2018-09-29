import { Construct, AwsRegion } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncInput } from '..';
import { dynamodbDataSourceRole } from '../../utils/roles/appsync';
import { toUpper } from '../../utils/exports';
import { PROJECT_NAME } from '../../utils/consts';
import { DynamodbProps } from '.';

export default (parent: Construct, props: AppSyncInput, dynamodb: DynamodbProps, apiId: string): cloudformation.DataSourceResource => {
  const role = dynamodbDataSourceRole(
    parent,
    {
      envType: props.envType,
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
        awsRegion: new AwsRegion(),
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};
