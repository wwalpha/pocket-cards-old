import gql from 'graphql-tag';

export const APP_INFO = gql`
{
  app @client {
    user
    screen
    status
  }
}
`;

export const NEW_WORD_INFO = gql`
{
  newwords @client {
    words
  }
}
`;
