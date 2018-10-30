import gql from 'graphql-tag';

export const GQL_USER_INFO = gql`
  query User {
    user {
      id
    }
  }
`;

export const GQL_STATUS_INFO = gql`
  query Status {
    status {
      setId
    }
  }
`;

export const GQL_SCREEN_INFO = gql`
  query Screen {
    screen {
      path
    }
  }
`;

export const GQL_NEW_WORDS = gql`
  query Newwords {
    newwords {
      words
    }
  }
`;

// export const GQL_STUDY_INFO = gql`
//   {
//     study
//   }
// `;

// export const GQL_CARD = gql`
//   {
//     study  {
//       text
//     }
//   }
// `;
