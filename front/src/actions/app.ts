import { createAction, ActionFunction1, Action } from 'redux-actions';
import { PATH_CHANGE, SET_ID_CHANGE } from 'src/consts/Actions';

/** パス変更保存 */
export const pathChange = createAction(PATH_CHANGE, (path: number) => path);
/** セットID変更 */
export const setIdChange = createAction(SET_ID_CHANGE, (setId?: string) => setId);

export interface Actions {
  updatePath: ActionFunction1<number, Action<number>>;
  updateSetId: ActionFunction1<string | undefined, Action<string | undefined>>;
}
