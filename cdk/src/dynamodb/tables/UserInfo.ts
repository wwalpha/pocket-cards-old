import { Construct } from '@aws-cdk/cdk';
import { Table, KeyAttributeType } from '@aws-cdk/aws-dynamodb';
import { DynamodbInput } from '@src/dynamodb';

export default (parent: Construct, props: DynamodbInput) => new Table(
  parent,
  'UserInfoTableResource',
  {
    tableName: `${props.envType}-UserInfo`,
    readCapacity: 1,
    writeCapacity: 1,
  },
).addPartitionKey('User', KeyAttributeType.String);
