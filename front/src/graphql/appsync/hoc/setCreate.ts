import { SetCreate, SetCreateVariables, SetListVariables, SetList } from 'typings/graphql';
import { ChildProps, graphql, FetchResult, MutationFn } from 'react-apollo';
import { readUser } from '@gql/local';
import { GQL_SET_LIST, GQL_SET_CREATE } from '@gql/appsync';

export interface Props {
  setCreate: (userId: string, name: string) => Promise<void | FetchResult<SetCreate>>;
}

type TChildProps = ChildProps<Props, SetCreate, SetCreateVariables>;

/** セット作成 */
export default graphql<Props, SetCreate, SetCreateVariables, TChildProps>(GQL_SET_CREATE, {
  props: ({ mutate }) => ({
    setCreate: (userId: string, name: string) => (mutate as MutationFn<SetCreate, SetCreateVariables>)({
      variables: {
        userId, name,
      },
    }),
  }),
  options: {
    update: (proxy, result: FetchResult<SetCreate>) => {
      if (!result || !result.data || !result.data.setCreate) return;

      const { user: { id } } = readUser(proxy);

      const setListInfo = proxy.readQuery<SetList, SetListVariables>({
        query: GQL_SET_LIST,
        variables: {
          userId: id,
        },
      });

      if (!setListInfo) return;

      setListInfo.setList.push(result.data.setCreate);

      console.log('setList', setListInfo);

      proxy.writeQuery<SetList, SetListVariables>({
        query: GQL_SET_LIST,
        data: setListInfo,
        variables: {
          userId: id,
        },
      });
    },
  },
});
