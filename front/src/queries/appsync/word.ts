import gql from 'graphql-tag';

export const WORD_REGIST = gql`
  mutation WordRegist($bucketKey: String!) {
    wordWithImage(bucketKey: $bucketKey) {
      word
    }
  }
`;
