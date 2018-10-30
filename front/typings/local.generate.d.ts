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
  updateUser: UpdateUser_updateUser | null;
}

export interface UpdateUserVariables {
  id: string;
  username: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePath
// ====================================================

export interface UpdatePath_updatePath {
  __typename: "Screen";
  path: number;
}

export interface UpdatePath {
  updatePath: UpdatePath_updatePath | null;
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
  updateSetId: UpdateSetId_updateSetId | null;
}

export interface UpdateSetIdVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClearNewwords
// ====================================================

export interface ClearNewwords_clearNewwords {
  __typename: "Newwords";
  words: string[];
}

export interface ClearNewwords {
  clearNewwords: ClearNewwords_clearNewwords | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveWord
// ====================================================

export interface RemoveWord_removeWord {
  __typename: "Newwords";
  words: string[];
}

export interface RemoveWord {
  removeWord: RemoveWord_removeWord | null;
}

export interface RemoveWordVariables {
  word: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveWordList
// ====================================================

export interface SaveWordList {
  saveWordList: boolean | null;
}

export interface SaveWordListVariables {
  list: WordInput[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClearWordList
// ====================================================

export interface ClearWordList {
  clearWordList: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PrevWord
// ====================================================

export interface PrevWord_prevWord {
  __typename: "Word";
  word: string;
}

export interface PrevWord {
  prevWord: PrevWord_prevWord | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NextWord
// ====================================================

export interface NextWord_nextWord {
  __typename: "Word";
  word: string;
}

export interface NextWord {
  nextWord: NextWord_nextWord | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
}

export interface User {
  user: User_user;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Status
// ====================================================

export interface Status_status {
  __typename: "Status";
  setId: string | null;
}

export interface Status {
  status: Status_status;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Screen
// ====================================================

export interface Screen_screen {
  __typename: "Screen";
  path: number;
}

export interface Screen {
  screen: Screen_screen;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Newwords
// ====================================================

export interface Newwords_newwords {
  __typename: "Newwords";
  words: string[];
}

export interface Newwords {
  newwords: Newwords_newwords | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Study
// ====================================================

export interface Study_study_list {
  __typename: "Word";
  word: string;
  pronunciation: string | null;
  vocabulary: string | null;
  times: number;
}

export interface Study_study {
  __typename: "Study";
  list: (Study_study_list | null)[];
  index: number;
}

export interface Study {
  study: Study_study | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Card
// ====================================================

export interface Card_card {
  __typename: "Word";
  word: string;
  pronunciation: string | null;
  vocabulary: string | null;
  times: number;
}

export interface Card {
  card: Card_card | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface WordInput {
  word: string;
  pronunciation?: string | null;
  vocabulary?: string | null;
  times: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
