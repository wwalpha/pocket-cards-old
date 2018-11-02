import gql from 'graphql-tag';

export const GQL_STATUS_INFO = gql`
  query StatusInfo {
    status @client {
      path
      cardIndex
      setId
    }
  }
`;
