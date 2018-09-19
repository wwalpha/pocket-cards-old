import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { PROJECT_NAME } from '@consts';
import { AppSyncProps } from './appsync';

export default (parent: Construct, props: AppSyncProps) => new cloudformation.GraphQLApiResource(
  parent,
  'GraphQLApiResource',
  {
    authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    graphQlApiName: `${props.envType}-${PROJECT_NAME}`,
    userPoolConfig: {
      awsRegion: 'ap-northeast-1',
      userPoolId: props.userPoolId,
      defaultAction: 'ALLOW',
    },
  },
);
