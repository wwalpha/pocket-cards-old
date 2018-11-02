// import { ApolloCache } from 'apollo-cache';

// // tslint:disable-next-line:variable-name
// export default (_: any, _vars: any, context: any) => {
//   const cache = context.cache as ApolloCache<any>;

//   const data: Newwords = {
//     newwords: {
//       __typename: 'Newwords',
//       words: [] as string[],
//     },
//   };
//   // Cache更新
//   cache.writeQuery<Newwords>({
//     query: GQL_NEW_WORDS, data,
//   });

//   console.log('Newwords', data);

//   return data;
// };
