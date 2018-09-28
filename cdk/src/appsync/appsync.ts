import { Construct } from '@aws-cdk/cdk';
import { GraphQLApi, GraphQLSchema, DataSource, Resolver, AppSyncInput, AppSyncOutput } from '.';

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
