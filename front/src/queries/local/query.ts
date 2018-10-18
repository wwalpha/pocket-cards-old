import gql from 'graphql-tag';

export const USER_INFO = gql`
  {
    user @client
  }
`;

export const SCREEN_INFO = gql`
  {
    screen @client
  }
`;

export const NEW_WORD_INFO = gql`
  {
    newwords @client
    user @client
  }
`;

export const STATUS_INFO = gql`
  {
    status @client
  }
`;
