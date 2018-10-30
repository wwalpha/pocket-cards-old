import { ApolloCache } from 'apollo-cache';
import { SaveWordListVariables } from 'typings/local';
import { GQL_STUDY } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, { list }: SaveWordListVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  console.log(list);
  const data = {
    study: {
      index: -1,
      list,
    },
  };

  // Cache更新
  cache.writeQuery({
    query: GQL_STUDY, data,
  });
  console.log('saveWordList', data);
  return true;
};
