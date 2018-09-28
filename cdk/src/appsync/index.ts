import { CommonProps } from '../common';
import { LambdaOutput } from '../lambda';
import { CognitoOutput } from '../cognito';
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
  cognito: CognitoOutput;
  lambda: LambdaOutput;
}

export interface AppSyncOutput {
  apiId: string;
  apiUrl: string;
}