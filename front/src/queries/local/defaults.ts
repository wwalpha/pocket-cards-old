import { App } from 'typings/local';

export default {
  user: {
    __typename: 'User',
    id: 'dummy',
    username: 'dummy',
  },
  status: {
    __typename: 'Status',
    setId: 'dummy',
  },
  screen: {
    __typename: 'Screen',
    path: -1,
  },
} as App;
