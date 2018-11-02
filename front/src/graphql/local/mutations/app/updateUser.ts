import gql from 'graphql-tag';

export const GQL_UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $username: String!) {
    updateUser(id: $id, username: $username) @client {
      id
      username
    }
  }
`;
