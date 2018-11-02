import gql from 'graphql-tag';

export const GQL_PREV_CARD = gql`
  mutation PrevCard {
    prevCard @client {
      word
    }
  }
`;
