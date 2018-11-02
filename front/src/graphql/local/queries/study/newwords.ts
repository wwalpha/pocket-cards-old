import gql from 'graphql-tag';

export const GQL_NEW_WORDS = gql`
  query Newwords {
    newwords @client {
      words
    }
  }
`;
