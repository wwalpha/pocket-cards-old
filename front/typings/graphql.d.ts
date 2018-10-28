/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSetList
// ====================================================

export interface GetSetList_sets {
  __typename: "Set";
  setId: string;
  name: string | null;
}

export interface GetSetList {
  sets: (GetSetList_sets | null)[];
}

export interface GetSetListVariables {
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetRegist
// ====================================================

export interface SetRegist_createSet {
  __typename: "Set";
  setId: string;
  name: string | null;
}

export interface SetRegist {
  createSet: SetRegist_createSet | null;
}

export interface SetRegistVariables {
  userId: string;
  name: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetRemove
// ====================================================

export interface SetRemove_deleteSet {
  __typename: "Set";
  name: string | null;
}

export interface SetRemove {
  deleteSet: SetRemove_deleteSet | null;
}

export interface SetRemoveVariables {
  userId: string;
  setId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Image2Word
// ====================================================

export interface Image2Word_image2Word {
  __typename: "Newwords";
  words: (string | null)[] | null;
}

export interface Image2Word {
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
  word: string | null;
}

export interface RegistWords {
  registWords: RegistWords_registWords[];
}

export interface RegistWordsVariables {
  setId: string;
  words: string[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
