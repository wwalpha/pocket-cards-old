import { ApolloCache } from 'apollo-cache';
import { queryStudySet, queryStatus } from '../utils';
import { Card, StatusInfo } from 'typings/graphql';
import { GQL_CARD } from '../../queries/card';
import { GQL_STATUS_INFO } from '@gql';

// tslint:disable-next-line:variable-name
export default (_: any, _var: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // Cache検索
  const queryResult = queryStudySet(cache);

  if (!queryResult || !queryResult.studySet) {
    return null;
  }

  // Cache検索
  const statusInfo = queryStatus(cache);
  const setList = queryResult.studySet;

  const prevIdx = statusInfo.status.cardIndex - 1;
  const text = prevIdx > 0 ? setList[prevIdx] : setList[0];

  // 情報なし
  if (!text) return null;

  // Index
  statusInfo.status.cardIndex = prevIdx;

  // Cardあり
  const card: Card = {
    card: {
      __typename: 'Card',
      word: text.word,
      pronunciation: text.pronunciation,
      vocabulary: text.vocabulary,
      times: text.times,
    },
  };

  // Card更新
  cache.writeQuery<Card>({
    query: GQL_CARD, data: card,
  });

  // Card更新
  cache.writeQuery<StatusInfo>({
    query: GQL_STATUS_INFO, data: statusInfo,
  });

  return text;
};
