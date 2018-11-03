/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetCreate
// ====================================================

export interface SetCreate_setCreate {
  __typename: "Set";
  /**
   *   userId
   */
  userId: string;
  /**
   *   setId
   */
  setId: string;
  /**
   *   セット名
   */
  name: string | null;
}

export interface SetCreate {
  /**
   *   セット作成
   */
  setCreate: SetCreate_setCreate | null;
}

export interface SetCreateVariables {
  userId: string;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetDelete
// ====================================================

export interface SetDelete_setDelete {
  __typename: "Set";
  /**
   *   userId
   */
  userId: string;
  /**
   *   setId
   */
  setId: string;
  /**
   *   セット名
   */
  name: string | null;
}

export interface SetDelete {
  /**
   *   セット削除
   */
  setDelete: SetDelete_setDelete | null;
}

export interface SetDeleteVariables {
  userId: string;
  setId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Image2Word
// ====================================================

export interface Image2Word_image2Word {
  __typename: "ImageWord";
  /**
   *   新規単語
   */
  words: (string | null)[] | null;
}

export interface Image2Word {
  /**
   *   画像から単語読み取り
   */
  image2Word: Image2Word_image2Word;
}

export interface Image2WordVariables {
  bucketKey: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegistWords
// ====================================================

export interface RegistWords_registWords {
  __typename: "Word";
  /**
   *   セットID
   */
  setId: string;
  /**
   *   単語
   */
  word: string;
  /**
   *   発音
   */
  pronunciation: string | null;
  /**
   *   語彙
   */
  vocabulary: string | null;
  /**
   *   学習時間
   */
  studyDate: string | null;
  /**
   *   次回学習時間
   */
  nextDate: string;
  /**
   *   学習回数
   */
  times: number;
}

export interface RegistWords {
  /**
   *   単語新規登録
   */
  registWords: (RegistWords_registWords | null)[] | null;
}

export interface RegistWordsVariables {
  input: RegistWordsInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StudySave
// ====================================================

export interface StudySave {
  /**
   *   単語検定を保存する
   */
  studySave: boolean | null;
}

export interface StudySaveVariables {
  input: StudySaveInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SetList
// ====================================================

export interface SetList_setList {
  __typename: "Set";
  /**
   *   userId
   */
  userId: string;
  /**
   *   setId
   */
  setId: string;
  /**
   *   セット名
   */
  name: string | null;
}

export interface SetList {
  /**
   *   セットリスト一覧
   */
  setList: (SetList_setList | null)[];
}

export interface SetListVariables {
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StudySet
// ====================================================

export interface StudySet_studySet {
  __typename: "Word";
  /**
   *   セットID
   */
  setId: string;
  /**
   *   単語
   */
  word: string;
  /**
   *   発音
   */
  pronunciation: string | null;
  /**
   *   語彙
   */
  vocabulary: string | null;
  /**
   *   学習時間
   */
  studyDate: string | null;
  /**
   *   次回学習時間
   */
  nextDate: string;
  /**
   *   学習回数
   */
  times: number;
}

export interface StudySet {
  /**
   *   学習セット
   */
  studySet: (StudySet_studySet | null)[];
}

export interface StudySetVariables {
  setId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StudyHistory
// ====================================================

export interface StudyHistory_studyHistory {
  __typename: "Word";
  /**
   *   セットID
   */
  setId: string;
  /**
   *   単語
   */
  word: string;
  /**
   *   発音
   */
  pronunciation: string | null;
  /**
   *   語彙
   */
  vocabulary: string | null;
  /**
   *   学習時間
   */
  studyDate: string | null;
  /**
   *   次回学習時間
   */
  nextDate: string;
  /**
   *   学習回数
   */
  times: number;
}

export interface StudyHistory {
  /**
   *   学習履歴
   */
  studyHistory: (StudyHistory_studyHistory | null)[];
}

export interface StudyHistoryVariables {
  userId: string;
  setId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StudyPolly
// ====================================================

export interface StudyPolly_studyPolly {
  __typename: "Speech";
  /**
   *   Content-Type
   */
  contentType: string;
  /**
   *   音声URL
   */
  url: string;
}

export interface StudyPolly {
  /**
   *   テキストから音声に変更する
   */
  studyPolly: StudyPolly_studyPolly | null;
}

export interface StudyPollyVariables {
  text: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePath
// ====================================================

export interface UpdatePath_updatePath {
  __typename: "Status";
  path: number;
}

export interface UpdatePath {
  updatePath: UpdatePath_updatePath;
}

export interface UpdatePathVariables {
  path: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSetId
// ====================================================

export interface UpdateSetId_updateSetId {
  __typename: "Status";
  setId: string | null;
}

export interface UpdateSetId {
  updateSetId: UpdateSetId_updateSetId;
}

export interface UpdateSetIdVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
  username: string | null;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser;
}

export interface UpdateUserVariables {
  id: string;
  username: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClearNewwords
// ====================================================

export interface ClearNewwords {
  clearNewwords: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveNewword
// ====================================================

export interface RemoveNewword {
  removeNewword: boolean | null;
}

export interface RemoveNewwordVariables {
  word: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StatusInfo
// ====================================================

export interface StatusInfo_status {
  __typename: "Status";
  path: number;
  cardIndex: number;
  setId: string | null;
}

export interface StatusInfo {
  status: StatusInfo_status;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  username: string | null;
}

export interface User {
  user: User_user;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Newwords
// ====================================================

export interface Newwords_newwords {
  __typename: "Newwords";
  words: (string | null)[];
}

export interface Newwords {
  newwords: Newwords_newwords;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface RegistWordsInput {
  setId: string;
  words: (string | null)[];
}

export interface StudyRecord {
  word: string;
  correct?: boolean | null;
  times: number;
}

export interface StudySaveInput {
  setId: string;
  words: (StudyRecord | null)[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
