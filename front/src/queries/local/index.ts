export * from './mutation';
export * from './query';

import { createLinkWithCache } from 'aws-appsync';
import { withClientState } from 'apollo-link-state';
import { resolvers } from './resolvers';
import { DocumentNode } from 'graphql';
import { default as defaults } from './defaults';

const typeDefs: DocumentNode = require('./schema.gql');

export const stateLink = createLinkWithCache(cache => withClientState({ cache, resolvers, defaults, typeDefs }));
