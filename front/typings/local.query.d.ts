import { ChildProps } from "react-apollo";
import { UpdatePathVariables } from "./local.generate";

export interface UpdatePathProps extends UpdatePathVariables {
  onPathChange?: (path: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, AppInfo, UpdatePathVariables>;


export interface App {
  __typename: 'App',
  status: Status;
  screen: Screen;
  user: User;
}

export interface AppInfo {
  app: App;
  newwords: NewwordInfo;
}

export interface NewwordInfo {
  words: string[];
}

export interface User {
  __typename: 'User';
  id: string;
  username: string;
}

export interface Screen {
  __typename: 'Screen';
  path: number;
}

export interface Status {
  __typename: 'Status';
  setId: string;
}