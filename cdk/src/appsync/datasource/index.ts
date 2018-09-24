import { Construct } from '@aws-cdk/cdk';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { AppSyncProps } from '..';
import lambdaResource from './lambda'
import dynamodbResource from './dynamodb'

export default (parent: Construct, props: AppSyncProps, apiId: string) => {
  const config: DataSource = yaml.safeLoad(fs.readFileSync(path.join('./configs', 'appsync-datasource.yml'), 'utf8'));

  if (config.Dynamodb) {
    config.Dynamodb.forEach((item) => {
      dynamodbResource(parent, props, item, apiId);
    });
  }

  if (config.Lambda) {
    config.Lambda.forEach((item) => {
      lambdaResource(parent, props, item, apiId);
    });
  }
};

export interface DynamodbProps {
  TableName: string;
}

export interface LambdaProps {
  FunctionName: string;
}

export interface DataSource {
  Dynamodb?: DynamodbProps[];
  Lambda?: LambdaProps[];
}
