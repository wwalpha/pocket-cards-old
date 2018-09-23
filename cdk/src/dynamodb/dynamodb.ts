import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-dynamodb';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { CommonProps } from '../common';
import createTable from './table';

const configs: any = yaml.safeLoad(fs.readFileSync(path.join('./configs', 'dynamodb-tables.yml'), 'utf8'));

export default (parent: Construct, props: DynamodbInput): DynamodbOutput => {

  Object.keys(configs).forEach((key) => {
    const tableProps: cloudformation.TableResourceProps = configs[key];

    createTable(parent, {
      ...props,
      table: tableProps,
    });
  });

  return {};
};

export interface DynamodbInput extends CommonProps {
}

export interface DynamodbOutput {
}
