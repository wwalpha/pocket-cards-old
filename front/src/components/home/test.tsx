import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, ChildDataProps } from 'react-apollo';

const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`;

type Hero = {
  name: string;
  id: string;
  appearsIn: string[];
  friends: Hero[];
};

type Response = {
  hero: Hero;
};

type InputProps = {
  episode: string,
};

type Variables = {
  episode: string,
};

type ChildProps = ChildDataProps<InputProps, Response, Variables>;

const withCharacter = graphql<InputProps, Response, Variables, ChildProps>(HERO_QUERY, {
  options: ({ episode }) => ({
    variables: { episode },
  }),
});

export default withCharacter(({ }) => {
  return (<div>1111</div>);
});
