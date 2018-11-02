// import { ApolloCache } from 'apollo-cache';
// import { Study } from 'typings/local';
// import { GQL_STUDY } from 'src/graphql';

// // tslint:disable-next-line:variable-name
// export default (_: any, _vars: any, context: any): Boolean => {
//   const cache = context.cache as ApolloCache<any>;

//   const data: Study = {
//     study: {
//       __typename: 'Study',
//       index: -1,
//       list: [],
//     },
//   };

//   // Cache更新
//   cache.writeQuery<Study>({
//     query: GQL_STUDY, data,
//   });

//   console.log('saveWordList', data);

//   return true;
// };
