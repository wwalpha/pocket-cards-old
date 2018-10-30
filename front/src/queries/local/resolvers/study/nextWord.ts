import { ApolloCache } from 'apollo-cache';
import { Study } from 'typings/local';
import { GQL_STUDY } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, _var: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // Cache検索
  const study = cache.readQuery<Study>({
    query: GQL_STUDY,
  });

  console.log('nextword', study);
  if (!study) {
    return undefined;
  }

  const { index, list } = study;
  const nextIdx = index + 1;
  const text = list.length > nextIdx ? list[nextIdx] : undefined;

  // Cache更新
  cache.writeQuery<Study>({
    query: GQL_STUDY, data: {
      index: nextIdx,
      list,
      text,
    },
  });

  return text;
};
