import { ApolloCache } from 'apollo-cache';
import { SaveWordListVariables, Study, Study_study_list } from 'typings/local';
import { GQL_STUDY } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, { list }: SaveWordListVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data: Study = {
    study: {
      __typename: 'Study',
      index: -1,
      list: list as Study_study_list[],
      card: null,
    },
  };

  // Cache更新
  cache.writeQuery<Study>({
    query: GQL_STUDY, data,
  });

  console.log('saveWordList', data);

  return true;
};
