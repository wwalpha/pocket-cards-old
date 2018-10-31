import { Record } from 'immutable';

export interface AppProps {
  isLoggedIn: boolean;
  userId: string;
  setId?: string;
  path: number;
}

export default class App extends Record<AppProps>({
  isLoggedIn: true,
  userId: 'wwalpha',
  path: 0,
  setId: undefined,
}) {

  /** Set Id 更新 */
  updateSetId(setId?: string) {
    return this.set('setId', setId);
  }

  /** Path 更新 */
  updatePath(path: number) {
    return this.set('path', path);
  }

}
