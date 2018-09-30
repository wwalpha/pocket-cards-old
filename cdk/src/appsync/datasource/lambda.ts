import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncInput } from '..';
import { LambdaProps } from '.';
import { toUpper } from '../../utils/exports';
import { LambdaDataSourceRole } from '../../utils/roles';
import { Function } from '@aws-cdk/aws-lambda';

export default (parent: Construct, props: AppSyncInput, lambdaDef: LambdaProps, apiId: string): cloudformation.DataSourceResource => {
  const role = LambdaDataSourceRole(
    parent,
    {
      envType: props.envType,
      roleName: `${toUpper(lambdaDef.FunctionName)}`,
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
        lambdaFunctionArn: (props.lambda[lambdaDef.FunctionName](parent, {
          envType: props.envType,
          s3: props.s3,
        }) as Function).functionArn,
      },
      serviceRoleArn: role.roleArn,
    },
  );

  return resource;
};
