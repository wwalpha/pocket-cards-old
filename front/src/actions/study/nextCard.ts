import { createAction, Action, ActionFunctionAny } from 'redux-actions';
import { NEXT_CARD } from 'src/consts/Actions';

/** 次へ移動する */
export const nextCard = createAction(NEXT_CARD);

/** 次へ移動する */
export type NextCardPayload = {
};

export type NextCardAction = ActionFunctionAny<Action<NextCardPayload>>;
