import { UpdateSetIdVariables, Status } from 'typings/local';
import { ApolloCache } from 'apollo-cache';
import { GQL_STATUS_INFO } from '@gql';

/** セットIDを保存する */
export default (_: any, { id }: UpdateSetIdVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<Status>({ query: GQL_STATUS_INFO });
  if (!result) return;

  result.status = {
    __typename: 'Status',
    setId: id,
  };

  // Cache更新
  cache.writeQuery<Status>({
    query: GQL_STATUS_INFO, data: result,
  });

  console.log('Status', result);

  return result.status;
};
