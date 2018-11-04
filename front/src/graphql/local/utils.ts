import { ApolloCache, DataProxy } from 'apollo-cache';
import { StudySet, StatusInfo, User } from 'typings/graphql';
import { GQL_STUDY_SET } from '@gql/appsync';
import { GQL_STATUS_INFO, GQL_USER_INFO } from '@gql/local';

export const readStudySet = (cache: ApolloCache<any>) => {
  const result = cache.readQuery<StudySet>({
    query: GQL_STUDY_SET,
  });

  console.log('QueryStudySet', result);

  return result;
};

/** ステータスを取得する */
export const readStatus = (cache: ApolloCache<any>): StatusInfo => {
  const result = cache.readQuery<StatusInfo>({
    query: GQL_STATUS_INFO,
  });

  if (!result) throw new Error('Status is null.');

  console.log('readStatus', result);

  return result;
};

/** ステータスを取得する */
export const readUser = (cache: ApolloCache<any> | DataProxy): User => {
  const result = cache.readQuery<User>({
    query: GQL_USER_INFO,
  });

  if (!result) throw new Error('User is null.');

  console.log('readUser', result);

  return result;
};
