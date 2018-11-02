import gql from 'graphql-tag';
import { ClearCardList } from 'typings/graphql';
import { ChildProps, graphql, MutationFn } from 'react-apollo';

export const GQL_CLEAR_CARD_LIST = gql`
  mutation ClearCardList {
    clearCardList @client
  }
`;

export interface ClearCardListProps {
  clearCardList: () => void;
}
type TChildProps = ChildProps<ClearCardListProps, ClearCardList, void>;

export const F_CLEAR_CARD_LIST = graphql<ClearCardListProps, ClearCardList, void, TChildProps>(GQL_CLEAR_CARD_LIST, {
  props: ({ mutate }) => ({
    clearCardList: () => (mutate as MutationFn<ClearCardList, void>)(),
  }),
});
