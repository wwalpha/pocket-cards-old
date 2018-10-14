import { UpdatePathVariables, AppInfo, UpdateUserVariables } from 'typings/local';
import { APP_INFO } from './query';
import { ApolloCache } from 'apollo-cache';

/** パス情報更新 */
const updatePath = (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<AppInfo>({ query: APP_INFO });
  if (!result) return;

  // パス更新
  result.app.path = args.path;

  cache.writeQuery({ query: APP_INFO, data: result });

  return result.app;
};

/** ユーザ情報更新 */
const updateUser = (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data = {
    user: {
      id, username,
      __typename: 'UserInfo',
    },
  };

  cache.writeData({ data });

  return data.user;
};

const registWords = (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data = {
    user: {
      id, username,
      __typename: 'UserInfo',
    },
  };

  cache.writeData({ data });

  return data.user;
};

export const resolvers = {
  Mutation: {
    updateUser,
    updatePath,
  },
};
