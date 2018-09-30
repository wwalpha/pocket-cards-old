import { CommonProps } from '../utils';
import { CognitoOutput } from '../cognito';
import { LambdaOutput } from '../lambda';
import { S3Output } from '../s3';
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
  s3: S3Output;
  lambda: LambdaOutput;
  cognito: CognitoOutput;
}

export interface AppSyncOutput {
  apiId: string;
  apiUrl: string;
}