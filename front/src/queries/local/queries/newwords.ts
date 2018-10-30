import gql from 'graphql-tag';

export const GQL_NEW_WORDS = gql`
  {
    newwords @client
  }
`;
