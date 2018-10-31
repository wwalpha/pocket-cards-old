import { createAction, ActionFunction1, Action, ActionFunctionAny } from 'redux-actions';
import { SAVE_NEW_WORDS, CLEAR_NEW_WORDS, PREV_CARD, NEXT_CARD, CLEAR_STUDY_LIST, SAVE_STUDY_LIST } from 'src/consts/Actions';

/** 新規単語を保存する */
export const saveNewwords = createAction(SAVE_NEW_WORDS, (words: string[]) => words);
/** 新規単語をクリアする */
export const clearNewwords = createAction(CLEAR_NEW_WORDS);
/** 学習情報を保存する */
export const saveStudyList = createAction(SAVE_STUDY_LIST, (words: string[]) => words);
/** 学習情報をクリアする */
export const clearStudyList = createAction(CLEAR_STUDY_LIST);
/** 前へ移動する */
export const prevCard = createAction(PREV_CARD);
/** 次へ移動する */
export const nextCard = createAction(NEXT_CARD);

export interface Actions {
  saveNewwords: ActionFunction1<string[], Action<string[]>>;
  clearNewwords: ActionFunctionAny<Action<any>>;
  saveStudyList: ActionFunction1<string[], Action<string[]>>;
  clearStudyList: ActionFunctionAny<Action<any>>;
  prevCard: ActionFunctionAny<Action<any>>;
  nextCard: ActionFunctionAny<Action<any>>;
}
