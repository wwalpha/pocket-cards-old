// import { graphql } from 'react-apollo';
// import { GQL_USER_INFO, GQL_SCREEN_INFO, GQL_STATUS_INFO, GQL_STUDY } from '@gql';
// import { Study, User, Status, Screen } from 'typings/local';

// /** ユーザ情報 */
// export const F_USER_INFO = graphql<any, User, any>(GQL_USER_INFO, {
//   props: ({ data }) => {
//     if (!data) return {} as any;

//     return data;
//   },
// });

// /** 画面情報 */
// export const F_SCREEN_INFO = graphql<any, Screen, any>(GQL_SCREEN_INFO, {
//   props: ({ data }) => {
//     if (!data) return {} as any;

//     return data;
//   },
// });

// /** ステータス情報 */
// export const F_STATUS_INFO = graphql<any, Status, any>(GQL_STATUS_INFO, {
//   props: ({ data }) => {
//     if (!data) return {} as any;

//     return data;
//   },
// });

// /** ステータス情報 */
// export const F_STUDY_INFO = graphql<any, Study, any>(GQL_STUDY, {
//   props: ({ data }) => {
//     if (!data) return {} as any;

//     return {
//       card: data.study && data.study.card,
//     };
//   },
// });
