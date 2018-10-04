import { Construct, AwsRegion, ServicePrincipal } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { PROJECT_NAME } from '../utils/consts';
import { AppSyncInput } from '.';
import { Role } from '@aws-cdk/aws-iam';
import { cloudwatch } from '../utils/policy';

export default (parent: Construct, props: AppSyncInput) => {
  const role = new Role(parent, `AppsyncLogRole`, {
    roleName: `${props.envType}-${PROJECT_NAME}-Appsync-LogRole`,
    assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
  });

  role.attachInlinePolicy(cloudwatch(parent, `${props.envType}-${PROJECT_NAME}-Appsync-Log`));

  const resource = new cloudformation.GraphQLApiResource(parent, 'GraphQLApi',
    {
      authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      graphQlApiName: `${props.envType}-${PROJECT_NAME}`,
      userPoolConfig: {
        awsRegion: new AwsRegion(),
        userPoolId: props.cognito.userPoolId,
        defaultAction: 'ALLOW',
      },
      logConfig: {
        fieldLogLevel: 'ALL',
        cloudWatchLogsRoleArn: role.roleArn,
      },
    },
  );

  return resource;
};
