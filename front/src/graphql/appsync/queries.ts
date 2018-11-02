import gql from 'graphql-tag';

// this is an auto generated file. This will be overwritten

export const GQL_SET_LIST = gql`
query SetList($userId: String!) {
  setList(userId: $userId) {
    userId
    setId
    name
  }
}
`;

export const STUDY_SET = gql`
query StudySet($setId: String!) {
  studySet(setId: $setId) {
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

export const STUDY_HISTORY = gql`
query StudyHistory($userId: String!, $setId: String!) {
  studyHistory(userId: $userId, setId: $setId) {
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

export const STUDY_POLLY = gql`
query StudyPolly($text: String!) {
  studyPolly(text: $text) {
    contentType
    url
  }
}
`;
