import { SetDelete, SetDeleteVariables, SetList, SetListVariables } from 'typings/graphql';
import { graphql, ChildProps, MutationFn, FetchResult } from 'react-apollo';
import { GQL_SET_DELETE, GQL_SET_LIST } from '@gql/appsync';
import { readUser } from '@gql/local';

export interface Props {
  setDelete: (userId: string, setId: string) => Promise<void | FetchResult<SetDelete>>;
}

type TChildProps = ChildProps<Props, SetDelete, SetDeleteVariables>;

/** セット削除 */
export default graphql<Props, SetDelete, SetDeleteVariables, TChildProps>(GQL_SET_DELETE, {
  props: ({ mutate }) => ({
    setDelete: (userId: string, setId: string) => (mutate as MutationFn<SetDelete>)({
      variables: {
        userId, setId,
      },
    }),
  }),
  options: {
    update: (proxy, result: FetchResult<SetDelete>) => {
      if (!result || !result.data || !result.data.setDelete) return;

      const { setId } = result.data.setDelete;

      const { user: { id } } = readUser(proxy);

      // メモリ読み取り
      const setListInfo = proxy.readQuery<SetList, SetListVariables>({
        query: GQL_SET_LIST,
        variables: { userId: id },
      });

      if (!setListInfo) return;

      // 画面項目削除する
      const newList = setListInfo.setList.filter(item => item && (item.setId !== setId));

      console.log('setList', setListInfo, id);

      // メモリ書き込み
      proxy.writeQuery<SetList, SetListVariables>({
        query: GQL_SET_LIST,
        data: { setList: newList },
        variables: { userId: id },
      });
    },
  },
});
