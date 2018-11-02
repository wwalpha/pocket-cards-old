import gql from 'graphql-tag';
import { RemoveNewwordVariables, RemoveNewword } from 'typings/graphql';
import { ChildProps, MutationFn, graphql } from 'react-apollo';

export const GQL_REMOVE_NEW_WORD = gql`
  mutation RemoveNewword($word: String!) {
    removeNewword(word: $word) @client
}
`;

export interface RemoveNewwordProps {
  removeNewword: (word: string) => void;
}
type TChildProps = ChildProps<RemoveNewwordProps, RemoveNewword, RemoveNewwordVariables>;

export const F_REMOVE_NEW_WORD = graphql<RemoveNewwordProps, RemoveNewword, RemoveNewwordVariables, TChildProps>(GQL_REMOVE_NEW_WORD, {
  props: ({ mutate }) => ({
    removeNewword: (word: string) => (mutate as MutationFn<RemoveNewword, RemoveNewwordVariables>)({
      variables: {
        word,
      },
    }),
  }),
});
