import { createAction, ActionFunction1, Action } from 'redux-actions';
import { PATH_CHANGE } from 'src/consts/Actions';

export const pathChange = createAction(PATH_CHANGE, (path: number) => path);

export interface Actions {
  pathChange: ActionFunction1<number, Action<number>>;
}
