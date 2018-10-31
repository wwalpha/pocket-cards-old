import { DocumentNode } from 'graphql';

declare module "*.gql" {
  const value: DocumentNode;
  export default value;
}

declare module "*.yml" {
  const value: string;
  export default value;
}
