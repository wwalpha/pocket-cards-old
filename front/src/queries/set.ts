import gql from 'graphql-tag';

export const getSetList = gql`
  query GetSetList($userId: String!) {
    sets(userId: $userId) {
      setId
      name
    }
  }
`;

export const setRegist = gql`
  mutation SetRegist($userId: String!, $name: String!) {
    createSet(userId: $userId, name: $name) {
      name
    }
  }
`;

export const setRemove = gql`
  mutation SetRemove($userId: String!, $setId: String!) {
    deleteSet(userId: $userId, setId: $setId) {
      name
    }
  }
`;
