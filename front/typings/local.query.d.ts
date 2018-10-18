import { ChildProps } from "react-apollo";
import { UpdatePathVariables } from "./local.generate";

export interface UpdatePathProps extends UpdatePathVariables {
  onPathChange?: (path: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen, UpdatePathVariables>;

export interface App {
  __typename: 'App',
  status: Status;
  screen: Screen;
  user: User;
  newwords: Newwords;
}

export interface Newwords {
  newwords?: string[];
  user: User
}

export interface UserInfo {
  user: User
}

export interface User {
  __typename: 'User';
  id: string;
  username: string;
}

export interface ScreenInfo {
  screen: Screen
}

export interface Screen {
  __typename: 'Screen';
  path: number;
}

export interface StatusInfo {
  status: Status
}

export interface Status {
  __typename: 'Status';
  setId: string;
}