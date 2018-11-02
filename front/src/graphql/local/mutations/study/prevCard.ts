import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import { PrevCard } from 'typings/graphql';

export const GQL_PREV_CARD = gql`
  mutation PrevCard {
    prevCard @client {
      word
    }
  }
`;

export interface PrevCardProps {
  prevCard: () => void;
}
type TChildProps = ChildProps<PrevCardProps, PrevCard, void>;

export const F_PREV_CARD = graphql<PrevCardProps, PrevCard, void, TChildProps>(GQL_PREV_CARD, {
  props: ({ mutate }) => ({
    prevCard: () => mutate && mutate(),
  }),
});
