import { SetCreate, SetCreateVariables } from 'typings/graphql';
import { ChildProps, graphql, FetchResult, MutationFn } from 'react-apollo';
import { SET_CREATE } from '@gql';

export interface SetCreateProps {
  setCreate: (userId: string, name: string) => Promise<void | FetchResult<SetCreate>>;
}

type TChildProps = ChildProps<SetCreateProps, SetCreate, SetCreateVariables>;

/** セット作成 */
export const F_SET_CREATE = graphql<SetCreateProps, SetCreate, SetCreateVariables, TChildProps>(SET_CREATE, {
  props: ({ mutate }) => ({
    setCreate: (userId: string, name: string) => (mutate as MutationFn<SetCreate, SetCreateVariables>)({
      variables: {
        userId, name,
      },
    }),
  }),
});
