import { graphqlOperation, API } from 'aws-amplify';
import { STUDY_SET } from '@queries';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';

/** 学習情報を保存する */
export const studySet = async (setId: string) => {
  const result = await API.graphql(graphqlOperation(STUDY_SET, {
    setId,
  } as StudySetVariables)) as GraphQLResult;

  if (!result.data || !(result.data as StudySet).studySet) return [] as StudySet_studySet[];

  return (result.data as StudySet).studySet as StudySet_studySet[];
};

export type StudySetAction = (setId: string) => Promise<StudySet_studySet[]>;
