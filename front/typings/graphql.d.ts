/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type RegistWordsInput = {
  setId: string,
  words: Array< string | null >,
};

export type StudySaveInput = {
  setId: string,
  words: Array< StudyRecord | null >,
};

export type StudyRecord = {
  word: string,
  correct?: boolean | null,
  times: number,
};

export type SetCreateMutationVariables = {
  userId: string,
  name: string,
};

export type SetCreateMutation = {
  // セット作成
  setCreate:  {
    __typename: "Set",
    // userId
    userId: string,
    // setId
    setId: string,
    // セット名
    name: string | null,
  } | null,
};

export type SetDeleteMutationVariables = {
  userId: string,
  setId: string,
};

export type SetDeleteMutation = {
  // セット削除
  setDelete:  {
    __typename: "Set",
    // userId
    userId: string,
    // setId
    setId: string,
    // セット名
    name: string | null,
  } | null,
};

export type Image2WordMutationVariables = {
  bucketKey: string,
};

export type Image2WordMutation = {
  // 画像から単語読み取り
  image2Word:  {
    __typename: "Newwords",
    // 新規単語
    words: Array< string | null > | null,
  },
};

export type RegistWordsMutationVariables = {
  input: RegistWordsInput,
};

export type RegistWordsMutation = {
  // 単語新規登録
  registWords:  Array< {
    __typename: "Word",
    // セットID
    setId: string,
    // 単語
    word: string,
    // 発音
    pronunciation: string | null,
    // 語彙
    vocabulary: string | null,
    // 学習時間
    studyDate: string | null,
    // 次回学習時間
    nextDate: string,
    // 学習回数
    times: number,
  } | null > | null,
};

export type StudySaveMutationVariables = {
  input: StudySaveInput,
};

export type StudySaveMutation = {
  // 単語検定を保存する
  studySave: boolean | null,
};

export type SetListQueryVariables = {
  userId: string,
};

export type SetListQuery = {
  // セットリスト一覧
  setList:  Array< {
    __typename: "Set",
    // userId
    userId: string,
    // setId
    setId: string,
    // セット名
    name: string | null,
  } | null >,
};

export type StudySetQueryVariables = {
  setId: string,
};

export type StudySetQuery = {
  // 学習セット
  studySet:  Array< {
    __typename: "Word",
    // セットID
    setId: string,
    // 単語
    word: string,
    // 発音
    pronunciation: string | null,
    // 語彙
    vocabulary: string | null,
    // 学習時間
    studyDate: string | null,
    // 次回学習時間
    nextDate: string,
    // 学習回数
    times: number,
  } | null >,
};

export type StudyHistoryQueryVariables = {
  userId: string,
  setId: string,
};

export type StudyHistoryQuery = {
  // 学習履歴
  studyHistory:  Array< {
    __typename: "Word",
    // セットID
    setId: string,
    // 単語
    word: string,
    // 発音
    pronunciation: string | null,
    // 語彙
    vocabulary: string | null,
    // 学習時間
    studyDate: string | null,
    // 次回学習時間
    nextDate: string,
    // 学習回数
    times: number,
  } | null >,
};

export type StudyPollyQueryVariables = {
  text: string,
};

export type StudyPollyQuery = {
  // テキストから音声に変更する
  studyPolly:  {
    __typename: "Speech",
    // Content-Type
    contentType: string,
    // 音声URL
    url: string,
  } | null,
};
