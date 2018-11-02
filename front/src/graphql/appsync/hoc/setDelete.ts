import { SetDelete, SetDeleteVariables } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';
import { GQL_SET_DELETE } from '../mutations';

export interface SetDeleteProps {
  setDelete: (userId: string, setId: string) => void;
}

type TChildProps = ChildProps<SetDeleteProps, SetDelete, SetDeleteVariables>;

/** セット削除 */
export const F_SET_DELETE = graphql<SetDeleteProps, SetDelete, SetDeleteVariables, TChildProps>(GQL_SET_DELETE, {
  props: ({ mutate }) => ({
    setDelete: (userId: string, setId: string) => mutate && mutate({
      variables: {
        userId, setId,
      },
    }),
  }),
});
