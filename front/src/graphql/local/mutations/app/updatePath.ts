import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import { UpdatePath, UpdatePathVariables } from 'typings/graphql';
import { GQL_UPDATE_SET_ID } from '@gql';

/** パス変更 */
export const GQL_UPDATE_PATH = gql`
  mutation UpdatePath($path: Int!) {
    updatePath(path: $path) @client {
      path
    }
  }
`;

export interface UpdatePathProps {
  updatePath: (path: number) => void;
}
type TChildProps = ChildProps<UpdatePathProps, UpdatePath, UpdatePathVariables>;

export const F_UPDATE_PATH = graphql<UpdatePathProps, UpdatePath, UpdatePathVariables, TChildProps>(GQL_UPDATE_SET_ID, {
  props: ({ mutate }) => ({
    updatePath: (path: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
});
