
declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export default value;
}

interface User {
  id: string;
  username: string;
}

interface App {
  screen: string;
}

export interface AppInfo {
  app: App;
}

export interface UserInfo {
  user: User;
}