import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`;

export const USER_INFO = gql`
  {
    user @client {
      id
    }
  }
`;
