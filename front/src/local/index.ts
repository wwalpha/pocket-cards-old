import { createLinkWithCache } from 'aws-appsync';
import { withClientState } from 'apollo-link-state';
import { resolvers, defaults } from './resolvers';
// import typeDefs from './schema.gql';

const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    user: User
  }

  type Mutation {
    updateUser(user: UserInput!): User
  }

  input UserInput {
    id: ID!
    username: String!
  }

  type User {
    id: ID!
    username: String!
  }
`;

export const stateLink = createLinkWithCache(cache => withClientState({ cache, resolvers, defaults, typeDefs }));
