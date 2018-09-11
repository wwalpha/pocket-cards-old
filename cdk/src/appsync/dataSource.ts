import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import { AppSyncProps } from './appsync';

export default (parent: Construct, props: AppSyncProps) => new cloudformation.DataSourceResource(
  parent,
  'DataSourceResource',
  {
    dataSourceName: props.dataSourceName,
    apiId: props.apiId,
    type: props.type,
  },
);
