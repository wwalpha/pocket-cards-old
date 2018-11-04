import { ApolloCache } from 'apollo-cache';
import { UpdateUserVariables, User } from 'typings/graphql';
import { GQL_USER_INFO } from '@gql/local';

/** ユーザ情報更新 */
export default (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<User>({
    query: GQL_USER_INFO,
  });
  console.log(result);
  const data: User = {
    user: {
      __typename: 'User',
      id,
      username,
    },
  };
  // Cache更新
  cache.writeQuery<User>({
    query: GQL_USER_INFO, data,
  });

  console.log('User', data);
  return data.user;
};
