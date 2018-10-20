import { graphql } from 'react-apollo';
import { USER_INFO, SCREEN_INFO, STATUS_INFO } from '@gql';
import { UserInfo, ScreenInfo, StatusInfo } from 'typings/local';

/** ユーザ情報 */
export const user = graphql<any, UserInfo, any>(USER_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      user: data.user,
    };
  },
});

/** 画面情報 */
export const screen = graphql<any, ScreenInfo, any>(SCREEN_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      screen: data.screen,
    };
  },
});

/** ステータス情報 */
export const status = graphql<any, StatusInfo, any>(STATUS_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      status: data.status,
    };
  },
});
