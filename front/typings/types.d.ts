import { DocumentNode } from 'graphql';
import { StudySet, StudySetVariables, Newwords } from './graphql';
import { Query } from 'react-apollo';

declare module "*.gql" {
  const value: DocumentNode;
  export default value;
}

declare module "*.yml" {
  const value: string;
  export default value;
}
