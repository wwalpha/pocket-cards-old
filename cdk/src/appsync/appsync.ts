import { Construct } from '@aws-cdk/cdk';
import { GraphQLApi, GraphQLSchema, DataSource, Resolver } from '.';
import { CommonProps } from '../common';
import { LambdaOutput } from '../lambda';

export default (parent: Construct, props: AppSyncProps) => {
  // API定義
  const api = GraphQLApi(parent, props);

  // スキーマ
  GraphQLSchema(parent, api.graphQlApiApiId);

  // DataSource
  DataSource(parent, props, api.graphQlApiApiId);

  // Resolver
  Resolver(parent, props, api.graphQlApiApiId);
};

export interface AppSyncProps extends CommonProps {
  userPoolId: string;
  lambdas: LambdaOutput;
}
