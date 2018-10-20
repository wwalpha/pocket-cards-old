// import * as React from 'react';
// import { ChildProps, graphql, ChildDataProps } from 'react-apollo';
// import gql from 'graphql-tag';

// const HERO_QUERY = gql`
//   query GetCharacter($episode: Episode!) {
//     hero(episode: $episode) {
//       name
//       id
//       friends {
//         name
//         id
//         appearsIn
//       }
//     }
//   }
// `;

// type Hero = {
//   name: string;
//   id: string;
//   appearsIn: string[];
//   friends: Hero[];
// };

// type Response = {
//   hero: Hero;
// };

// type InputProps = {
//   episode: string,
// };

// type Variables = {
//   episode: string,
// };

// type ChildProps = ChildDataProps<InputProps, Response, Variables>;

// const withCharacter = graphql<InputProps, Response, Variables, ChildProps>(HERO_QUERY, {
//   props: ({ data }) => ({
//     episode: 'test',
//     data: data & {
//     },
//   }),
// });

// // export default withCharacter(({ loading, hero, error }) => {
// //   if (loading) return <div>Loading < /div>;
// //   if (error) return <h1>ERROR < /h1>;
// //   return null;
// // });
