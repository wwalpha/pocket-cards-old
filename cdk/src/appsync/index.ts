export { default as GraphQLApi } from './graphQLApi';
export { default as GraphQLSchema } from './graphQLSchema';
export { default as DataSource } from './datasource';
export { default as Resolver } from './resolver';
export { AppSyncInput } from './appsync';

export interface ResolverProps {
  TypeName: string;
  DataSourceName: string;
  FieldName: string;
}

export interface Resolvers {
  [key: string]: ResolverProps;
}
