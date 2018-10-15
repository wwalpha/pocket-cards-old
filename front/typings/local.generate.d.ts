/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "User";
  id: string;
}

export interface UpdateUser_updateUser {
  __typename: "App";
  user: UpdateUser_updateUser_user | null;
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

export interface UpdatePath_updatePath_screen {
  __typename: "Screen";
  path: number;
}

export interface UpdatePath_updatePath {
  __typename: "App";
  screen: UpdatePath_updatePath_screen | null;
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
// GraphQL mutation operation: SaveNewwords
// ====================================================

export interface SaveNewwords_saveNewwords {
  __typename: "Newwords";
  words: (string | null)[] | null;
}

export interface SaveNewwords {
  saveNewwords: SaveNewwords_saveNewwords | null;
}

export interface SaveNewwordsVariables {
  words: RegistWordInput;
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

export interface RegistWordInput {
  words?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
