import { AppInfo } from 'typings/local';

export default {
  app: {
    __typename: 'App',
    user: {
      __typename: 'User',
    },
    screen: {
      __typename: 'Screen',
    },
    status: {
      __typename: 'Status',
    },
  },
  newwords: null as any,
} as AppInfo;
