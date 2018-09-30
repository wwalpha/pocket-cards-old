import { GraphQLApi, AppSyncInput, AppSyncOutput, GraphQLSchema, DataSource, Resolver } from '.';
import { Construct } from '@aws-cdk/cdk';

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
