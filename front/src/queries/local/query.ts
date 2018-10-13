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
    screen
  }
}
`;
