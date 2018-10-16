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
  mutation UpdatePath($path: Int!) {
    updatePath(path: $path) @client {
      screen {
        path
      }
    }
  }
`;

// 新規単語をローカルに保存する
export const SAVE_NEW_WORDS = gql`
  mutation SaveNewwords($words: RegistWordInput!) {
    saveNewwords(words: $words) @client {
      words
    }
  }
`;

// ローカルの新規単語リストをクリアする
export const CLEAR_NEW_WORDS = gql`
  mutation ClearNewwords {
    clearNewwords @client {
      words
    }
  }
`;

// ローカルの単語リストから単語を削除する
export const REMOVE_WORD = gql`
  mutation RemoveWord($word: String!) {
    removeWord(word: $word)  @client {
      words
    }
  }
`;
