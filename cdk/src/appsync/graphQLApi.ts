import { Construct, AwsRegion } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { PROJECT_NAME } from '../common/consts';
import { AppSyncProps } from './appsync';

export default (parent: Construct, props: AppSyncProps) => new cloudformation.GraphQLApiResource(
  parent,
  'GraphQLApiResource',
  {
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    graphQlApiName: `${props.envType}-${PROJECT_NAME}`,
    userPoolConfig: {
      awsRegion: new AwsRegion(),
      userPoolId: props.userPoolId,
      defaultAction: 'ALLOW',
    },
  },
);
