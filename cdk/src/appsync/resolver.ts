import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { ResolverProps, Resolvers } from '.';

export default (parent: Construct, apiId: string) => {
  const config: Resolvers = yaml.safeLoad(fs.readFileSync(path.join('./configs', 'appsync-resolver.yml'), 'utf8'));

  Object.keys(config).forEach((key) => {
    const resolver: ResolverProps = config[key];

    createResolver(parent, resolver, apiId);
  });

};

const createResolver = (parent: Construct, props: ResolverProps, apiId: string) => {
  new cloudformation.ResolverResource(parent, `${props.FieldName}`, {
    apiId,
    typeName: props.TypeName,
    dataSourceName: props.DataSourceName,
    fieldName: props.FieldName,
    requestMappingTemplate: 'dummy',
    responseMappingTemplate: 'dummy',
  });
};
