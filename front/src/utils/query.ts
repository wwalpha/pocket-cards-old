import ApolloClient from 'apollo-client';
import { UserInfo } from 'typings/local';
import { USER_INFO } from '@gql';

export const getUserInfo = (client: ApolloClient<any>): UserInfo => {
  const userInfo = client.readQuery<UserInfo>({ query: USER_INFO });

  if (!userInfo) throw Error('UserInfo not exist.');

  return userInfo;
};

export const getScreenInfo = (client: ApolloClient<any>): UserInfo => {
  const userInfo = client.readQuery<UserInfo>({ query: USER_INFO });

  if (!userInfo) throw Error('UserInfo not exist.');

  return userInfo;
};
