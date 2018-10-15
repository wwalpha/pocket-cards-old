import gql from 'graphql-tag';

export const IMAGE_TO_WORDS = gql`
  mutation Image2Word($bucketKey: String!) {
    image2Word(bucketKey: $bucketKey) {
      words
    }
  }
`;

export const REGIST_WORDS = gql`
  mutation RegistWords($userId: String!, $setId: String!, $words: NewwordsInput) {
    registWords(userId: $userId, setId: $setId, words: $words) {
      word
    }
  }
`;
