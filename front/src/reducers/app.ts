import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { App as Act } from '@actions';
import { UPDATE_PATH, UPDATE_SET_ID } from 'src/consts/Actions';

const app = handleActions(
  {
    [UPDATE_PATH]: (store: App, action: Action<Act.UpdatePathPayload>) => action.payload ? store.updatePath(action.payload.path) : store,

    [UPDATE_SET_ID]: (store: App, action: Action<Act.UpdateSetIdPayload>) => action.payload ? store.updateSetId(action.payload.setId) : store,

  },
  new App());

export default app;
