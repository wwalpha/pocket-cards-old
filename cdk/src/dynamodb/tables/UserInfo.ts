import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-dynamodb';
import { DynamodbInput } from '../dynamodb';

export default (parent: Construct, props: DynamodbInput) => new cloudformation.TableResource(
  parent,
  'UserInfoTableResource',
  {
    tableName: `${props.envType}-UserInfo`,
    keySchema: [
      {
        attributeName: 'User',
        keyType: 'HASH',
      },
    ],
    attributeDefinitions: [
      {
        attributeName: 'User',
        attributeType: 'S',
      },
    ],
    provisionedThroughput: {
      readCapacityUnits: 1,
      writeCapacityUnits: 1,
    },
  },
);
