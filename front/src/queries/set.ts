import gql from 'graphql-tag';

export const GET_LIST = gql`
  query GetSetList($userId: String!) {
    sets(userId: $userId) {
      setId
      name
    }
  }
`;

export const REGIST = gql`
  mutation SetRegist($userId: String!, $name: String!) {
    createSet(userId: $userId, name: $name) {
      setId
      name
    }
  }
`;

export const DELETE = gql`
  mutation SetRemove($userId: String!, $setId: String!) {
    deleteSet(userId: $userId, setId: $setId) {
      name
    }
  }
`;
