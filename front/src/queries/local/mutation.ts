import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $username: String!) {
    updateUser(id: $id, username: $username) @client {
      id
    }
  }
`;

export const UPDATE_PATH = gql`
  mutation UpdatePath($path: Int) {
    updatePath(path: $path) @client {
      path
    }
  }
`;

export const REGIST_WORDS = gql`
  mutation RegistWords($path: Int) {
    registWords(path: $path) @client {
      path
    }
  }
`;
