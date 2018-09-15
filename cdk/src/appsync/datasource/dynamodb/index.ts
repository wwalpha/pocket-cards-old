import { Token, Construct } from '@aws-cdk/cdk';
import { AppSyncProps } from '../../appsync';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import createDataSource from './dataSource';

export default (parent: Construct, props: AppSyncProps, apiId: Token) => {
  const config: any = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

  config.DataSource.Configs.forEach((item: any) => {
    createDataSource(parent, props, {
      apiId,
      dataSourceName: item.dataSourceName,
      tableName: item.tableName,
    });
  });
};
