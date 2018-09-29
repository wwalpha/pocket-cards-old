import { CommonProps } from '../utils';
import { CognitoOutput } from '../cognito';
import { LambdaOutput } from '../lambda';
export { default as GraphQLApi } from './graphQLApi';
export { default as GraphQLSchema } from './graphQLSchema';
export { default as DataSource } from './datasource';
export { default as Resolver } from './resolver';

export interface ResolverProps {
  TypeName: string;
  DataSourceName: string;
  FieldName: string;
}

export interface Resolvers {
  [key: string]: ResolverProps;
}


export interface AppSyncInput extends CommonProps {
  lambda: LambdaOutput;
  cognito: CognitoOutput;
}

export interface AppSyncOutput {
  apiId: string;
  apiUrl: string;
}