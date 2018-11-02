import { DocumentNode } from 'graphql';
import { StudySet, StudySetVariables, Card } from './graphql';
import { Query } from 'react-apollo';

declare module "*.gql" {
  const value: DocumentNode;
  export default value;
}

declare module "*.yml" {
  const value: string;
  export default value;
}


export class StudySetQuery extends Query<StudySet, StudySetVariables> { }

export class CardQuery extends Query<Card, void> { }
