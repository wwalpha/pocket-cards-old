import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncInput } from '..';
import { LambdaProps } from '.';
import { lambdaDataSourceRole } from '../../common/roles/appsync';
import { toUpper } from '../../utils';

export default (parent: Construct, props: AppSyncInput, lambdaDef: LambdaProps, apiId: string): cloudformation.DataSourceResource => {
  const role = lambdaDataSourceRole(
    parent,
    {
      envType: props.envType,
      roleName: `invoke-${toUpper(lambdaDef.FunctionName)}`,
      principal: 'appsync.amazonaws.com',
    },
    lambdaDef.FunctionName);

  const resource = new cloudformation.DataSourceResource(
    parent,
    toUpper(lambdaDef.FunctionName),
    {
      dataSourceName: `lambda_${toUpper(lambdaDef.FunctionName)}`,
      apiId,
      type: 'AWS_LAMBDA',
      lambdaConfig: {
        lambdaFunctionArn: props.lambda[lambdaDef.FunctionName].functionArn,
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};
