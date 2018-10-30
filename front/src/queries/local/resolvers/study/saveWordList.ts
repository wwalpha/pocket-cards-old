import { ApolloCache } from 'apollo-cache';
import { SaveWordListVariables, Study } from 'typings/local';
import { GQL_STUDY } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, { list }: SaveWordListVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const first = list[0];

  const data: Study = {
    study: {
      __typename: 'Study',
      index: 0,
      list,
      card: {
        __typename: 'Card',
        word: first.word,
        pronunciation: first.pronunciation,
        times: first.times,
        vocabulary: first.vocabulary,
      },
    },
  };

  // Cache更新
  cache.writeData({
    data,
    id: 'Card',
  });
  cache.writeQuery<Study>({
    query: GQL_STUDY, data,
  });

  console.log('saveWordList', data);

  return true;
};
