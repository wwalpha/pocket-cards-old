import { ApolloCache } from 'apollo-cache';
import { GQL_UPDATE_PATH } from '@gql';
import { UpdatePathVariables, UpdatePath } from 'typings/graphql';

/** パス情報更新 */
export default (_: any, { path }: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // パス更新
  const data: UpdatePath = {
    updatePath: {
      __typename: 'Status',
      path,
    },
  };

  cache.writeQuery<UpdatePath>({ query: GQL_UPDATE_PATH, data });

  console.log('Screen', data);

  return data.updatePath;
};
