import gql from 'graphql-tag';

export const GQL_PATH_INFO = gql`
  query PathInfo {
    status @client {
      path
    }
  }
`;
