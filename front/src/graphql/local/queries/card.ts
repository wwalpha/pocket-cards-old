import gql from 'graphql-tag';

export const GQL_CARD = gql`
  query Card {
    card @client {
      word
    }
  }
`;
