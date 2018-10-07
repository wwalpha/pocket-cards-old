/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSetList
// ====================================================

export interface getSetList_sets {
  __typename: "Set";
  setId: string;
}

export interface getSetList {
  sets: (getSetList_sets | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStudySet
// ====================================================

export interface getStudySet_studySet {
  __typename: "Word";
  setId: string;
  word: string | null;
  pronounce: string | null;
  vocabulary: string | null;
  studyDate: string | null;
  nextDate: string | null;
  times: number | null;
}

export interface getStudySet {
  studySet: (getStudySet_studySet | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
