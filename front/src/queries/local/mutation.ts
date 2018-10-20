import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $username: String!) {
    updateUser(id: $id, username: $username) @client {
      id
      username
    }
  }
`;

export const UPDATE_PATH = gql`
  mutation UpdatePath($path: Int!) {
    updatePath(path: $path) @client {
      path
    }
  }
`;

export const UPDATE_SET_ID = gql`
  mutation UpdateSetId($id: String!) {
    updateSetId(id: $id) @client {
      setId
    }
  }
`;

// 新規単語をローカルに保存する
// export const SAVE_NEW_WORDS = gql`
//   mutation SaveNewwords($words: RegistWordInput!) {
//     saveNewwords(words: $words) {
//       words
//     }
//   }
// `;
// export const SAVE_NEW_WORDS = gql`
//   mutation SaveNewwords {
//     saveNewwords {
//       words
//     }
//   }
// `;

// // ローカルの新規単語リストをクリアする
// export const CLEAR_NEW_WORDS = gql`
//   mutation ClearNewwords {
//     clearNewwords {
//       words
//     }
//   }
// `;

// // ローカルの単語リストから単語を削除する
// export const REMOVE_WORD = gql`
//   mutation RemoveWord($word: String!) {
//     removeWord(word: $word) {
//       words
//     }
//   }
// `;
