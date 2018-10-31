import { createAction, ActionFunction1, Action } from 'redux-actions';
import { SAVE_STUDY_LIST } from 'src/consts/Actions';

/** 学習情報を保存する */
export const saveStudyList = createAction(SAVE_STUDY_LIST, (words: string[]) => ({ words }));

/** 学習情報を保存する */
export type SaveStudyListPayload = {
  words: string[];
};

export type SaveStudyListAction = ActionFunction1<string[], Action<SaveStudyListPayload>>;
