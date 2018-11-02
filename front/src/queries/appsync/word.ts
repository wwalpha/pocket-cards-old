// import gql from 'graphql-tag';

// // 画像から単語読み取り
// export const IMAGE_TO_WORDS = gql`
//   mutation Image2Word($bucketKey: String!) {
//     image2Word(bucketKey: $bucketKey) {
//       words
//     }
//   }
// `;

// // 単語新規登録
// export const WORDS_REGIST = gql`
//   mutation RegistWords($setId: String!, $words: [String!]!) {
//     registWords(setId: $setId, words: $words) {
//       word
//     }
//   }
// `;

// // 単語検定を保存する
// export const STUDY_SAVE = gql`
//   mutation StudySave($setId: String!, $input: [StudySaveInput!]!) {
//     studySave(setId: $setId, input: $input)
//   }
// `;

// // 学習セット
// export const STUDY_SET = gql`
//   query StudySet($setId: String!) {
//     studySet(setId: $setId) {
//       word
//       pronunciation
//       vocabulary
//       times
//     }
//   }
// `;
