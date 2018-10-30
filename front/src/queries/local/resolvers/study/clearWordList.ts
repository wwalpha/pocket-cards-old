import { ApolloCache } from 'apollo-cache';
import { WordInput, Study } from 'typings/local';
import { GQL_STUDY } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, _vars: any, context: any): Boolean => {
  const cache = context.cache as ApolloCache<any>;

  const data: Study = {
    index: -1,
    list: [] as WordInput[],
  };

  // Cache更新
  cache.writeQuery<Study>({
    query: GQL_STUDY, data,
  });

  return true;
};
