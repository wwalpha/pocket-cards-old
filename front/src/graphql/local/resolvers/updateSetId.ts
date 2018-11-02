import { ApolloCache } from 'apollo-cache';
import { UpdateSetIdVariables, UpdateSetId } from 'typings/graphql';
import { GQL_UPDATE_SET_ID } from '../mutations/index';

/** セットIDを保存する */
export default (_: any, { id }: UpdateSetIdVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const data: UpdateSetId = {
    updateSetId: {
      __typename: 'Status',
      setId: id,
    },
  };

  // Cache更新
  cache.writeQuery<UpdateSetId>({
    query: GQL_UPDATE_SET_ID, data,
  });

  console.log('Status', data);

  return data.updateSetId;
};
