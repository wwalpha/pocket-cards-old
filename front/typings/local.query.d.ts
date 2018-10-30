import { ChildProps } from "react-apollo";
import { UpdatePathVariables, UpdateSetIdVariables, ClearNewwords, WordInput } from "./local.generate";

/** パス更新 */
export interface UpdatePathProps extends UpdatePathVariables {
  updatePath: (path: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen, UpdatePathVariables>;

/** セット選択ID */
export interface UpdateSetIdProps extends UpdateSetIdVariables {
  updateSetId?: (id: string) => void;
}

export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, Status, UpdateSetIdVariables>;

/** 新規登録単語をクリアする */
export interface ClearNewwordsProps {
  clearNewwords: () => void;
}

export type ClearNewwordsChildProps = ChildProps<ClearNewwordsProps, ClearNewwords, any>;

export interface App {
  __typename: 'App',
  status: Status;
  screen: Screen;
  user: User;
  newwords: Newwords;
  study: Study;
}

/** 学習コントロール */
export interface Study {
  list: WordInput[];
  index: number;
  text?: WordInput;
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