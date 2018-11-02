// import gql from 'graphql-tag';

// export const UPDATE_PATH = gql`
//   mutation UpdatePath($path: Int!) {
//     updatePath(path: $path) @client {
//       path
//     }
//   }
// `;

// // ローカルの新規単語リストをクリアする
// export const GQL_CLEAR_NEW_WORDS = gql`
//   mutation ClearNewwords {
//     clearNewwords @client {
//       words
//     }
//   }
// `;

// // ローカルの単語リストから単語を削除する
// export const REMOVE_WORD = gql`
//   mutation RemoveWord($word: String!) {
//     removeWord(word: $word) @client {
//       words
//     }
//   }
// `;

// // 学習リストをローカルに保存する
// export const GQL_SAVE_WORD_LIST = gql`
//   mutation SaveWordList($list: [WordInput!]!) {
//     saveWordList(list: $list) @client
//   }
// `;

// // 学習リストをクリアする
// export const GQL_CLEAR_WORD_LIST = gql`
//   mutation ClearWordList {
//     clearWordList @client
//   }
// `;

// // 前の学習単語
// export const GQL_PREV_WORD = gql`
//   mutation PrevWord {
//     prevWord @client {
//       word
//     }
//   }
// `;

// // 次の学習単語
// export const GQL_NEXT_WORD = gql`
//   mutation NextWord {
//     nextWord @client {
//       word
//     }
//   }
// `;
