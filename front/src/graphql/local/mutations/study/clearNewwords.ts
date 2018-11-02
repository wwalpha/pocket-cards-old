import gql from 'graphql-tag';
import { ChildProps, MutationFn, graphql, FetchResult } from 'react-apollo';
import { ClearNewwords } from 'typings/graphql';

export const GQL_CLEAR_NEW_WORDS = gql`
  mutation ClearNewwords {
    clearNewwords @client
  }
`;

export interface ClearNewwordsProps {
  clearNewwords: () => Promise<void | FetchResult<ClearNewwords>>;
}
type TChildProps = ChildProps<ClearNewwordsProps, ClearNewwords, void>;

export const F_CLEAR_NEW_WORDS = graphql<ClearNewwordsProps, ClearNewwords, void, TChildProps>(GQL_CLEAR_NEW_WORDS, {
  props: ({ mutate }) => ({
    clearNewwords: () => (mutate as MutationFn<ClearNewwords, void>)({}),
  }),
});
