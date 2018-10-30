import { handleActions, Action } from 'redux-actions';

const auth = handleActions(
  {

    [SIGN_IN_SUCCESS]: (store: Auth, action: Action<{}>) => action.payload && store.signIn(action.payload),

  },
  new Auth());

export default auth;
