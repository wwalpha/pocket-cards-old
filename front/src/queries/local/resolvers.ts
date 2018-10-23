import { UpdatePathVariables, ScreenInfo, UpdateUserVariables, UserInfo, StatusInfo, UpdateSetIdVariables, Newwords } from 'typings/local';
import { ApolloCache } from 'apollo-cache';
import { SCREEN_INFO, USER_INFO, STATUS_INFO, NEW_WORD_INFO } from '@gql';

/** パス情報更新 */
const updatePath = (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<ScreenInfo>({ query: SCREEN_INFO });
  if (!result) return;

  // パス更新
  result.screen = {
    __typename: 'Screen',
    path: args.path,
  };

  cache.writeQuery<ScreenInfo>({ query: SCREEN_INFO, data: result });

  console.log('ScreenInfo', result);

  return result.screen;
};

/** ユーザ情報更新 */
const updateUser = (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<UserInfo>({ query: USER_INFO });
  if (!result) return;

  result.user = {
    __typename: 'User',
    id, username,
  };

  // Cache更新
  cache.writeQuery<UserInfo>({
    query: USER_INFO, data: result,
  });

  console.log('UserInfo', result);
  return result.user;
};

/** セットIDを保存する */
const updateSetId = (_: any, { id }: UpdateSetIdVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<StatusInfo>({ query: STATUS_INFO });
  if (!result) return;

  result.status = {
    __typename: 'Status',
    setId: id,
  };

  // Cache更新
  cache.writeQuery<StatusInfo>({
    query: STATUS_INFO, data: result,
  });

  console.log('StatusInfo', result);

  return result.status;
};

const clearNewwords = (_: any, vars: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data = {
    __typename: 'Newwords',
    newwords: [],
  };
  // Cache更新
  cache.writeQuery<Newwords>({
    query: NEW_WORD_INFO, data,
  });

  console.log('Newwords', data);

  return data;
};

export const resolvers = {
  Mutation: {
    updateUser,
    updatePath,
    updateSetId,
    clearNewwords,
  },
};
