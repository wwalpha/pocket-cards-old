// import { graphql } from 'react-apollo';
// import { UPDATE_PATH, GQL_CLEAR_NEW_WORDS } from '@gql';
// import { UpdatePathProps, Screen, UpdatePathVariables, UpdatePathChildProps, ClearNewwordsProps, ClearNewwords, ClearNewwordsChildProps } from 'typings/local';

// export const pathChange = graphql<UpdatePathProps, Screen, UpdatePathVariables, UpdatePathChildProps>(UPDATE_PATH, {
//   props: ({ mutate, ownProps }) => ({
//     ...ownProps,
//     updatePath: (path: number) => {
//       mutate && mutate({
//         variables: { path },
//       });
//     },
//   }),
// });

// export const F_CLEAR_NEW_WORDS = graphql<ClearNewwordsProps, ClearNewwords, any, ClearNewwordsChildProps>(GQL_CLEAR_NEW_WORDS, {
//   props: ({ mutate }) => ({
//     clearNewwords: () => {
//       mutate && mutate();
//     },
//   }),
// });
