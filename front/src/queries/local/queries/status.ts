import gql from 'graphql-tag';

export const GQL_STATUS_INFO = gql`
  {
    status @client
  }
`;
