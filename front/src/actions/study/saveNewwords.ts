import { createAction, ActionFunction1, Action } from 'redux-actions';
import { SAVE_NEW_WORDS } from 'src/consts/Actions';

/** 新規単語を保存する */
export const saveNewwords = createAction(SAVE_NEW_WORDS, (words: string[]) => ({ words }));

/** パス変更保存 */
export type SaveNewwordsPayload = {
  words: string[];
};

export type SaveNewwordsAction = ActionFunction1<string[], Action<SaveNewwordsPayload>>;
