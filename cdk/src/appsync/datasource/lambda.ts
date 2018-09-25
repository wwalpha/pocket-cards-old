import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncProps } from '..';
import { LambdaProps } from '.';
import { lambdaDataSourceRole } from '../../common/roles/appsync';
import { toUpper } from '../../utils';

export default (parent: Construct, props: AppSyncProps, lambda: LambdaProps, apiId: string): cloudformation.DataSourceResource => {
  const role = lambdaDataSourceRole(
    parent,
    {
      envType: props.envType,
      roleName: `invoke-${toUpper(lambda.FunctionName)}`,
      principal: 'appsync.amazonaws.com',
    },
    lambda.FunctionName);

  const resource = new cloudformation.DataSourceResource(
    parent,
    toUpper(lambda.FunctionName),
    {
      dataSourceName: `lambda_${toUpper(lambda.FunctionName)}`,
      apiId,
      type: 'AWS_LAMBDA',
      lambdaConfig: {
        lambdaFunctionArn: props.lambdas[lambda.FunctionName],
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};
