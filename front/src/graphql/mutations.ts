// tslint:disable
// this is an auto generated file. This will be overwritten

export const setCreate = `mutation SetCreate($userId: String!, $name: String!) {
  setCreate(userId: $userId, name: $name) {
    userId
    setId
    name
  }
}
`;
export const setDelete = `mutation SetDelete($userId: String!, $setId: String!) {
  setDelete(userId: $userId, setId: $setId) {
    userId
    setId
    name
  }
}
`;
export const image2Word = `mutation Image2Word($bucketKey: String!) {
  image2Word(bucketKey: $bucketKey) {
    words
  }
}
`;
export const registWords = `mutation RegistWords($input: RegistWordsInput!) {
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
export const studySave = `mutation StudySave($input: StudySaveInput!) {
  studySave(input: $input)
}
`;
