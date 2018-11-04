import { SetDelete, SetDeleteVariables } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';
import { GQL_SET_DELETE } from '@gql/appsync';

export interface Props {
  setDelete: (userId: string, setId: string) => void;
}

type TChildProps = ChildProps<Props, SetDelete, SetDeleteVariables>;

/** セット削除 */
export default graphql<Props, SetDelete, SetDeleteVariables, TChildProps>(GQL_SET_DELETE, {
  props: ({ mutate }) => ({
    setDelete: (userId: string, setId: string) => mutate && mutate({
      variables: {
        userId, setId,
      },
    }),
  }),
});
