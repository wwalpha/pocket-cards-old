import { ApolloCache } from 'apollo-cache';
import { Newwords } from 'typings/local';
import { GQL_NEW_WORDS } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, _vars: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data = {
    __typename: 'Newwords',
    newwords: [],
  };
  // Cache更新
  cache.writeQuery<Newwords>({
    query: GQL_NEW_WORDS, data,
  });

  console.log('Newwords', data);

  return data;
};
