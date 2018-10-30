import { UpdateUserVariables, User } from 'typings/local';
import { ApolloCache } from 'apollo-cache';
import { GQL_USER_INFO } from '@gql';

/** ユーザ情報更新 */
export default (_: any, { id }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<User>({ query: GQL_USER_INFO });
  if (!result) return;

  result.user = {
    __typename: 'User',
    id,
    // username,
  };

  // Cache更新
  cache.writeQuery<User>({
    query: GQL_USER_INFO, data: result,
  });

  console.log('User', result);
  return result.user;
};
