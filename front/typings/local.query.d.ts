import { ChildProps } from "react-apollo";
import { UpdatePathVariables } from "./local.generate";

export interface UpdatePathProps extends UpdatePathVariables {
  onPathChange: (path?: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, AppInfo, UpdatePathVariables>;


export interface User {
  id: string;
  username: string;
}

export interface App {
  path: number;
}

export interface AppInfo {
  app: App;
}

export interface UserInfo {
  user: User;
}