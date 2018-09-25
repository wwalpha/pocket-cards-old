import { Construct } from '@aws-cdk/cdk';
import { GraphQLApi, GraphQLSchema, DataSource, Resolver } from '.';
import { CommonProps } from '../common';
import { LambdaOutput } from '../lambda';

export default (parent: Construct, props: AppSyncInput): AppSyncOutput => {
  // API定義
  const api = GraphQLApi(parent, props);

  // スキーマ
  GraphQLSchema(parent, api.graphQlApiApiId);

  // DataSource
  DataSource(parent, props, api.graphQlApiApiId);

  // Resolver
  Resolver(parent, api.graphQlApiApiId);

  return {
    apiId: api.graphQlApiApiId,
    apiUrl: api.graphQlApiGraphQlUrl,
  }
};

export interface AppSyncInput extends CommonProps {
  userPoolId: string;
  lambdas: LambdaOutput;
}

export interface AppSyncOutput {
  apiId: string;
  apiUrl: string;
}