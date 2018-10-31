import { createAction, ActionFunction1, Action } from 'redux-actions';
import { PREV_CARD } from 'src/consts/Actions';

/** 前へ移動する */
export const prevCard = createAction(PREV_CARD);

/** 前へ移動する */
export type PrevCardPayload = {
};

export type PrevCardAction = ActionFunction1<string[], Action<PrevCardPayload>>;
