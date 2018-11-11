import { ApolloCache } from 'apollo-cache';
import { UpdateUserVariables, User } from 'typings/graphql';
import { GQL_USER_INFO, readUser } from '@gql/local';

/** ユーザ情報更新 */
export default (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const userInfo = readUser(cache);

  userInfo.user.id = id;
  userInfo.user.username = username;

  // Cache更新
  cache.writeQuery<User>({
    query: GQL_USER_INFO, data: userInfo,
  });

  console.log('UpdateSetId Resolver', userInfo.user);
  return userInfo.user;
};
