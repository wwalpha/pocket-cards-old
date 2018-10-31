// import { ApolloCache } from 'apollo-cache';
// import { GQL_SCREEN_INFO } from '@gql';
// import { Screen, UpdatePathVariables } from 'typings/local';

// /** パス情報更新 */
// export default (_: any, { path }: UpdatePathVariables, context: any) => {
//   const cache = context.cache as ApolloCache<any>;

//   // パス更新
//   const data: Screen = {
//     screen: {
//       __typename: 'Screen',
//       path,
//     },
//   };

//   cache.writeQuery<Screen>({ query: GQL_SCREEN_INFO, data });

//   console.log('Screen', data);

//   return data.screen;
// };
