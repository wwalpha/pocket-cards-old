import { graphql } from 'react-apollo';
import { GQL_USER_INFO, GQL_SCREEN_INFO, GQL_STATUS_INFO, GQL_STUDY } from '@gql';
import { UserInfo, ScreenInfo, StatusInfo, Study } from 'typings/local';

/** ユーザ情報 */
export const F_USER_INFO = graphql<any, UserInfo, any>(GQL_USER_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      user: data.user,
    };
  },
});

/** 画面情報 */
export const F_SCREEN_INFO = graphql<any, ScreenInfo, any>(GQL_SCREEN_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      screen: data.screen,
    };
  },
});

/** ステータス情報 */
export const F_STATUS_INFO = graphql<any, StatusInfo, any>(GQL_STATUS_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      status: data.status,
    };
  },
});

/** ステータス情報 */
export const F_STUDY_INFO = graphql<any, Study, any>(GQL_STUDY, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return {
      text: data.text,
    };
  },
});
