import App from './App';
import Study from './Study';
import { Map, Record } from 'immutable';

export interface State {
  app: App;
  study: Study;
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}

export {
  App,
  Study,
};
