import { UpdatePathVariables, ScreenInfo, UpdateUserVariables, UserInfo } from 'typings/local';
import { ApolloCache } from 'apollo-cache';
import { SCREEN_INFO, USER_INFO } from './query';

/** パス情報更新 */
const updatePath = (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<ScreenInfo>({ query: SCREEN_INFO });
  if (!result) return;

  console.log(args);
  // パス更新
  result.screen = {
    __typename: 'Screen',
    path: args.path,
  };

  console.log('updatePath', result);
  cache.writeQuery<ScreenInfo>({ query: SCREEN_INFO, data: result });

  return result.screen;
};

/** ユーザ情報更新 */
const updateUser = (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<UserInfo>({ query: USER_INFO });
  if (!result) return;
  console.log('updateUser', result);

  result.user = {
    __typename: 'User',
    id, username,
  };

  // Cache更新
  cache.writeQuery<UserInfo>({
    query: USER_INFO, data: result,
  });

  console.log(result);
  return result.user;
};

export const resolvers = {
  Mutation: {
    updateUser,
    updatePath,
  },
};
