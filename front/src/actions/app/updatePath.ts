import { createAction, ActionFunction1, Action } from 'redux-actions';
import { UPDATE_PATH } from 'src/consts/Actions';

/** パス変更保存 */
export const updatePath = createAction(UPDATE_PATH, (path: number) => ({ path }));

/** パス変更保存 */
export type UpdatePathPayload = {
  path: number;
};

export type UpdatePathAction = ActionFunction1<number, Action<UpdatePathPayload>>;
