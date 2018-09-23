import { Construct } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
import * as fs from 'fs';

export default (parent: Construct, apiId: string) => {
  const graphql: string = fs.readFileSync('../front/schemas/schema.gql').toString();

  return new cloudformation.GraphQLSchemaResource(
    parent,
    'GraphQLSchemaResource',
    {
      apiId,
      definition: graphql,
    },
  );

};
