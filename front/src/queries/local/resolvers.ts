import { UpdatePathVariables } from 'typings/local';
import { APP_INFO } from './query';
import { ApolloCache } from 'apollo-cache';
import { AppInfo } from 'typings/types';
import { PATH_INDEX } from '@const';

export const defaults = {
  user: null,
  app: {
    __typename: 'App',
    path: PATH_INDEX.HOME_ROOT,
  },
};

const updatePath = (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<AppInfo>({ query: APP_INFO });
  if (!result) return;

  // パス更新
  result.app.path = args.path;

  cache.writeQuery({ query: APP_INFO, data: result });
};

export const resolvers = {
  Mutation: {
    updateUser: (_: any, { id, username }: any, { cache }: any) => {
      const data = {
        user: {
          id, username,
          __typename: 'UserInfo',
        },
      };
      cache.writeData({ data });

      return data.user;
    },
    updatePath,
  },
};
