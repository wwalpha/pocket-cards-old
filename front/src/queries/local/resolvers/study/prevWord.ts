// import { ApolloCache } from 'apollo-cache';
// import { Study } from 'typings/local';
// import { GQL_STUDY } from '@gql';

// // tslint:disable-next-line:variable-name
// export default (_: any, _var: any, context: any) => {
//   const cache = context.cache as ApolloCache<any>;

//   // Cache検索
//   const result = cache.readQuery<Study>({
//     query: GQL_STUDY,
//   });

//   console.log('prev word', result);
//   if (!result || !result.study) {
//     return undefined;
//   }

//   const { study: { index, list } } = result;
//   const prevIdx = index - 1;
//   const text = prevIdx > 0 ? list[prevIdx] : undefined;
//   // Index
//   result.study.index = prevIdx;

//   // Cardあり
//   if (text) {
//     result.study.card = {
//       __typename: 'Card',
//       word: text.word,
//       pronunciation: text.pronunciation,
//       times: text.times,
//       vocabulary: text.vocabulary,
//     };
//   }

//   // Cache更新
//   cache.writeQuery<Study>({
//     query: GQL_STUDY, data: result,
//   });

//   return text;
// };
