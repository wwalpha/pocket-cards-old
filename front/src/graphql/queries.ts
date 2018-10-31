// tslint:disable
// this is an auto generated file. This will be overwritten

export const setList = `query SetList($userId: String!) {
  setList(userId: $userId) {
    userId
    setId
    name
  }
}
`;
export const studySet = `query StudySet($setId: String!) {
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
export const studyHistory = `query StudyHistory($userId: String!, $setId: String!) {
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
export const studyPolly = `query StudyPolly($text: String!) {
  studyPolly(text: $text) {
    contentType
    url
  }
}
`;
