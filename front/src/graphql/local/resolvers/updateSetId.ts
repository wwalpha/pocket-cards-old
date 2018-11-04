import { ApolloCache } from 'apollo-cache';
import { UpdateSetIdVariables, StatusInfo } from 'typings/graphql';
import { GQL_STATUS_INFO, readStatus } from '@gql/local';

/** セットIDを保存する */
export default (_: any, { id }: UpdateSetIdVariables, context: any) => {
  console.log(context);
  const cache = context.cache as ApolloCache<any>;

  const statusInfo = readStatus(cache);

  statusInfo.status.setId = id;

  // Cache更新
  cache.writeQuery<StatusInfo>({
    query: GQL_STATUS_INFO, data: statusInfo,
  });

  console.log('UpdateSetId Resolver', statusInfo.status);
  return statusInfo.status;
};
