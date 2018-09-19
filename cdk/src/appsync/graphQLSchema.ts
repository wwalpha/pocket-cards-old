import { Construct, Token } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';
const graphql = undefined;
// console.log(graphql);
export default (parent: Construct, apiId: Token) => new cloudformation.GraphQLSchemaResource(
  parent,
  'GraphQLSchemaResource',
  {
    apiId,
    definition: graphql,
  },
);
