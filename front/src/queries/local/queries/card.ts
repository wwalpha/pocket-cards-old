import gql from 'graphql-tag';

export const GQL_CARD = gql`
  {
    study @client {
      card
    }
  }
`;
