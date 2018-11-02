import { ApolloCache } from 'apollo-cache';
import { Study } from 'typings/local';
import { GQL_STUDY } from 'src/graphql';

// tslint:disable-next-line:variable-name
export default (_: any, _var: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // Cache検索
  const result = cache.readQuery<Study>({
    query: GQL_STUDY,
  });

  console.log('nextword', result);
  if (!result || !result.study) {
    return undefined;
  }

  const { study: { index, list } } = result;
  const nextIdx = index + 1;
  const text = list.length > nextIdx ? list[nextIdx] : undefined;

  // Index
  result.study.index = nextIdx;

  // Cardあり
  if (text) {
    result.study.card = {
      __typename: 'Card',
      word: text.word,
      pronunciation: text.pronunciation,
      times: text.times,
      vocabulary: text.vocabulary,
    };
  }

  // Cache更新
  cache.writeQuery<Study>({
    query: GQL_STUDY, data: result,
  });

  return result;
};
