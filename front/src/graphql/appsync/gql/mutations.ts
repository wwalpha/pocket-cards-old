import gql from 'graphql-tag';

// this is an auto generated file. This will be overwritten

export const GQL_SET_CREATE = gql`
mutation SetCreate($userId: String!, $name: String!) {
  setCreate(userId: $userId, name: $name) {
    userId
    setId
    name
  }
}
`;

export const GQL_SET_DELETE = gql`
mutation SetDelete($userId: String!, $setId: String!) {
  setDelete(userId: $userId, setId: $setId) {
    userId
    setId
    name
  }
}
`;

export const GQL_IMAGE_2_WORD = gql`
mutation Image2Word($bucketKey: String!) {
  image2Word(bucketKey: $bucketKey) {
    words
  }
}
`;

export const GQL_REGIST_WORDS = gql`
mutation RegistWords($input: RegistWordsInput!) {
  registWords(input: $input) {
    setId
    word
    pronunciation
    vocabulary
    studyDate
    nextDate
    times
  }
}
`;

export const GQL_STUDY_ANSWER = gql`
mutation StudyAnswer($input: StudyAnswerInput!) {
  studyAnswer(input: $input)
}
`;
