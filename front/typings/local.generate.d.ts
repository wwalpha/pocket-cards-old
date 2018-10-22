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
  words: (string | null)[] | null;
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
  words: (string | null)[] | null;
}

export interface RemoveWord {
  removeWord: RemoveWord_removeWord | null;
}

export interface RemoveWordVariables {
  word: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
