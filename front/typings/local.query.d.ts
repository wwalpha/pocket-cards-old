import { ChildProps } from "react-apollo";
import { UpdatePathVariables } from "./local.generate";

export interface UpdatePathProps extends UpdatePathVariables {
  onPathChange?: (path: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, AppInfo, UpdatePathVariables>;


export interface App {
  status: Status;
  screen: Screen;
  user: User;
}

export interface AppInfo {
  app: App;
}

export interface NewwordInfo {
  words: string[];
}

export interface User {
  id: string;
  username: string;
}

export interface Screen {
  path: number;
}

export interface Status {
  setId: string;
}