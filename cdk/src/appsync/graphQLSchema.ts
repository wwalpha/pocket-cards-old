import { Construct, Token } from '@aws-cdk/cdk';
import { cloudformation } from '@aws-cdk/aws-appsync';

export default (parent: Construct, apiId: Token) => new cloudformation.GraphQLSchemaResource(
  parent,
  'GraphQLSchemaResource',
  {
    apiId,
    definition: `
    type Mutation {
      addMessage(
        bucket: String!,
        key: String!,
        region: String!,
        mimeType: String!
      ): RaspberryPi
      addTextMessage(message: String!): RaspberryPi
    }

    type Query {
      listMessage: S3Object
    }

    type RaspberryPi {
      signedURL: String
      message: String
    }

    type S3Object {
      bucket: String!
      key: String!
      region: String!
    }

    input S3ObjectInput {
      bucket: String!
      key: String!
      region: String!
      localUri: String!
      mimeType: String!
    }

    type Subscription {
      subscribeToRecvMessage: RaspberryPi
        @aws_subscribe(mutations: ["addMessage","addTextMessage"])
    }

    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }
    `,
  },
);
