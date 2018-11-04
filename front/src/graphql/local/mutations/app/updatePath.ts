import gql from 'graphql-tag';
import { ChildProps, graphql, MutationFn, FetchResult } from 'react-apollo';
import { UpdatePath, UpdatePathVariables } from 'typings/graphql';

/** パス変更 */
export const GQL_UPDATE_PATH = gql`
  mutation UpdatePath($path: Int!) {
    updatePath(path: $path) @client {
      path
    }
  }
`;

export interface Props {
  updatePath: (path: number) => Promise<void | FetchResult<UpdatePath>>;
}
type TChildProps = ChildProps<Props, UpdatePath, UpdatePathVariables>;

export default graphql<Props, UpdatePath, UpdatePathVariables, TChildProps>(GQL_UPDATE_PATH, {
  props: ({ mutate }) => ({
    updatePath: (path: number) => (mutate as MutationFn<UpdatePath, UpdatePathVariables>)({
      variables: {
        path,
      },
    }),
  }),
});
