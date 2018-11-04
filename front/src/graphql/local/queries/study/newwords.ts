import gql from 'graphql-tag';
import { Newwords } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';

export const GQL_NEW_WORDS = gql`
  query Newwords {
    newwords @client {
      words
    }
  }
`;

export interface Props {
  newwords: string[];
  loading: boolean;
}
type TChildProps = ChildProps<Props, Newwords, void>;

export default graphql<Props, Newwords, void, TChildProps>(GQL_NEW_WORDS, {
  props: ({ data }) => {
    if (!data || !data.newwords || !data.newwords.words) {
      return {
        loading: true,
        newwords: [] as string[],
      };
    }

    return {
      loading: data.loading,
      newwords: data.newwords.words as string[],
    };
  },
});
