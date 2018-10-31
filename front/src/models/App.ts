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
  path: -1,
}) {

}
