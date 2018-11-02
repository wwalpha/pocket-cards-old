import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import { NextCard } from 'typings/graphql';

export const GQL_NEXT_CARD = gql`
  mutation NextCard {
    nextCard @client {
      word
    }
  }
`;

export interface NextCardProps {
  nextCard: () => void;
}
type TChildProps = ChildProps<NextCardProps, NextCard, void>;

export const F_NEXT_CARD = graphql<NextCardProps, NextCard, void, TChildProps>(GQL_NEXT_CARD, {
  props: ({ mutate }) => ({
    nextCard: () => mutate && mutate(),
  }),
});
