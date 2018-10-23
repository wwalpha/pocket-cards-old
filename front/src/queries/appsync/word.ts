import gql from 'graphql-tag';

export const IMAGE_TO_WORDS = gql`
  mutation Image2Word($bucketKey: String!) {
    image2Word(bucketKey: $bucketKey) {
      words
    }
  }
`;

export const WORDS_REGIST = gql`
  mutation RegistWords($setId: String!, $words: [String!]) {
    registWords(setId: $setId, words: $words) {
      word
    }
  }
`;
