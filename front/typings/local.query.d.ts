import { ChildProps } from "react-apollo";
import { UpdatePathVariables, UpdateSetIdVariables } from "./local.generate";

// export interface UpdatePathProps extends UpdatePathVariables {
//   updatePath?: (path: number) => void;
// }

// export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen, UpdatePathVariables>;

export interface UpdateSetIdProps extends UpdateSetIdVariables {
  updateSetId?: (id: string) => void;
}

export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, Status, UpdateSetIdVariables>;


export interface App {
  __typename: 'App',
  status: Status;
  screen: Screen;
  user: User;
  newwords: Newwords;
}

export interface Newwords {
  newwords?: string[];
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