import { GQL_STATUS_INFO, GQL_STUDY_SET } from '@gql';
import { ApolloCache } from 'apollo-cache';
import { StudySet, StatusInfo } from 'typings/graphql';

export const readStudySet = (cache: ApolloCache<any>) => {
  const result = cache.readQuery<StudySet>({
    query: GQL_STUDY_SET,
  });

  console.log('QueryStudySet', result);

  return result;
};

/** ステータスを取得する */
export const readStatus = (cache: ApolloCache<any>) => {
  const result = cache.readQuery<StatusInfo>({
    query: GQL_STATUS_INFO,
  });

  if (!result) throw new Error('Status is null.');

  console.log('queryStatus', result);

  return result;
};
