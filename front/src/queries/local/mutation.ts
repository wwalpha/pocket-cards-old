import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $username: String!) {
    updateUser(id: $id, username: $username) @client {
      user {
        id
      }
    }
  }
`;

export const UPDATE_PATH = gql`
  mutation UpdatePath($path: Int!) @client {
    updatePath(path: $path) {
      screen {
        path
      }
    }
  }
`;

// 新規単語をローカルに保存する
export const SAVE_NEW_WORDS = gql`
  mutation SaveNewwords($words: RegistWordInput!) @client {
    saveNewwords(words: $words) {
      words
    }
  }
`;

// ローカルの新規単語リストをクリアする
export const CLEAR_NEW_WORDS = gql`
  mutation ClearNewwords @client {
    clearNewwords {
      words
    }
  }
`;

// ローカルの単語リストから単語を削除する
export const REMOVE_WORD = gql`
  mutation RemoveWord($word: String!) @client {
    removeWord(word: $word) {
      words
    }
  }
`;
