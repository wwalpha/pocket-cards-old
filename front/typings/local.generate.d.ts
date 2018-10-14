/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: "User";
  id: string;
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
  __typename: "App";
  path: string;
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
// GraphQL mutation operation: RegistWords
// ====================================================

export interface RegistWords_registWords {
  __typename: "Newwords";
  words: (string | null)[] | null;
}

export interface RegistWords {
  registWords: RegistWords_registWords | null;
}

export interface RegistWordsVariables {
  words: RegistWordInput;
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
