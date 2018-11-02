import { queryStatus, queryStudySet } from '../utils';
import { GQL_CARD, GQL_STATUS_INFO } from '@gql';
import { StatusInfo, Card } from 'typings/graphql';
import { ApolloCache } from 'apollo-cache';

// tslint:disable-next-line:variable-name
export default (_: any, _var: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // 学習データ検索
  const queryResult = queryStudySet(cache);
  // ステータス検索
  const statusInfo = queryStatus(cache);

  if (!queryResult || !queryResult.studySet) {
    return null;
  }

  const setList = queryResult.studySet;

  const nextIdx = statusInfo.status.cardIndex + 1;
  const text = setList.length > nextIdx ? setList[nextIdx] : setList[setList.length - 1];

  // 情報なし
  if (!text) return null;

  // Index
  statusInfo.status.cardIndex = nextIdx;

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

  return card.card;
};
