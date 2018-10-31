import { createAction, Action, ActionFunctionAny } from 'redux-actions';
import { CLEAR_STUDY_LIST } from 'src/consts/Actions';

/** 学習情報をクリアする */
export const clearStudyList = createAction(CLEAR_STUDY_LIST);

/** 学習情報をクリアする */
export type ClearStudyListPayload = {
};

export type ClearStudyListAction = ActionFunctionAny<Action<ClearStudyListPayload>>;
