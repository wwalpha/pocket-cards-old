import gql from 'graphql-tag';

export const GQL_USER_INFO = gql`
  {
    user @client {
      id
      username
    }
  }
`;
