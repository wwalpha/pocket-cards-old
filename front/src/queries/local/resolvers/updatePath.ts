import { ApolloCache } from 'apollo-cache';
import { GQL_SCREEN_INFO } from '@gql';
import { Screen, UpdatePathVariables } from 'typings/local';

/** パス情報更新 */
export default (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<Screen>({ query: GQL_SCREEN_INFO });
  if (!result) return;

  // パス更新
  result.screen = {
    __typename: 'Screen',
    path: args.path,
  };

  cache.writeQuery<Screen>({ query: GQL_SCREEN_INFO, data: result });

  console.log('Screen', result);

  return result.screen;
};
