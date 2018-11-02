import gql from 'graphql-tag';

export const GQL_NEXT_CARD = gql`
  mutation NextCard {
    nextCard @client {
      word
    }
  }
`;
