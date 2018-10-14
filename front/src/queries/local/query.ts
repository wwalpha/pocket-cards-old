import gql from 'graphql-tag';

export const USER_INFO = gql`
{
  user @client {
    id
  }
}
`;

export const APP_INFO = gql`
{
  app @client {
    path
  }
}
`;

export const NEW_WORD_INFO = gql`
{
  newword @client {
    word
  }
}
`;
