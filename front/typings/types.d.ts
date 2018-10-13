// declare module '*.gql' {
//   const value: string;

//   export default value;
// }
import { DocumentNode } from 'graphql';

declare module "*.gql" {

  const value: DocumentNode;
  export default value;
}

export interface User {
  id: string;
  username: string;
}

export interface App {
  screen: string;
}

export interface AppInfo {
  app: App;
}

export interface UserInfo {
  user: User;
}