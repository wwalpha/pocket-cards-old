import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { execSync } from 'child_process';

const resolvers: Resolvers = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../cdk/configs/appsync-resolver.yml'), 'utf8'));

const apiId: string = process.argv[2];

Object.keys(resolvers).forEach((key) => {
  const resolver: ResolverProps = resolvers[key];

  const request = path.join(__dirname, `./${resolver.TypeName}/${resolver.FieldName}/request.vtl`);
  const response = path.join(__dirname, `./${resolver.TypeName}/${resolver.FieldName}/response.vtl`);

  try {
    fs.accessSync(request);
    fs.accessSync(response);
  } catch (err) {
    return;
  }

  const tplRequest = fs.readFileSync(request, 'utf-8').split('"').join('\\"').split('\n').join('');
  const tplResponse = fs.readFileSync(response, 'utf-8').split('"').join('\\"').split('\n').join('');

  const awsCmd = 'aws appsync update-resolver';
  const typeName = `--type-name ${resolver.TypeName}`;
  const fieldName = `--field-name ${resolver.FieldName}`;
  const dataSourceName = `--data-source-name ${resolver.DataSourceName}`;
  const txtRequest = `--request-mapping-template "${tplRequest}"`;
  const txtResponse = `--response-mapping-template "${tplResponse}"`;

  const cmd = `${awsCmd} --api-id ${apiId} ${typeName} ${fieldName} ${dataSourceName} ${txtRequest} ${txtResponse}`;

  execSync(cmd, {
    encoding: 'utf-8',
  });
});


export interface ResolverProps {
  TypeName: string;
  DataSourceName: string;
  FieldName: string;
}

export interface Resolvers {
  [key: string]: ResolverProps;
}