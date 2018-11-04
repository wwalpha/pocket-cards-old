import { GraphQLApi, AppSyncInput, AppSyncOutput, GraphQLSchema, Resolver, } from '.';
import { Construct } from '@aws-cdk/cdk';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from './datasource';

const filePath = path.join(__dirname, '../../configs/appsync-datasource.yml');

const config: DataSource = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

export default (parent: Construct, props: AppSyncInput): AppSyncOutput => {
  // API定義
  const api = GraphQLApi(parent, props);

  // スキーマ
  GraphQLSchema(parent, api.graphQlApiApiId);

  // DataSource
  // DataSource(parent, props, api.graphQlApiApiId);

  // // Resolver
  // Resolver(parent, api.graphQlApiApiId);

  return {
    apiId: api.graphQlApiApiId,
    apiUrl: api.graphQlApiGraphQlUrl,
  }
};
