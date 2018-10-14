import gql from 'graphql-tag';

export const WORD_REGIST = gql`
  mutation Image2Word($bucketKey: String!) {
    image2Word(bucketKey: $bucketKey) {
      words
    }
  }
`;
