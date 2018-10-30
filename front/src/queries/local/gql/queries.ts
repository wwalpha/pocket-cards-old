import gql from 'graphql-tag';

export const GQL_USER_INFO = gql`
  query User @client {
    user {
      id
    }
  }
`;

export const GQL_STATUS_INFO = gql`
  query Status @client {
    status {
      setId
    }
  }
`;

export const GQL_SCREEN_INFO = gql`
  query Screen @client {
    screen {
      path
    }
  }
`;

export const GQL_NEW_WORDS = gql`
  query Newwords @client {
    newwords {
      words
    }
  }
`;

export const GQL_STUDY = gql`
  query Study @client {
    study {
      list {
        word
        pronunciation
        vocabulary
        times
      }
      index
    }
  }
`;

export const GQL_CARD = gql`
  query Card @client {
    card {
      word
      pronunciation
      vocabulary
      times
    }
  }
`;
