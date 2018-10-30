import { ChildProps } from "react-apollo";
import { UpdatePathVariables, UpdateSetIdVariables, ClearNewwords, WordInput, Status_status, Screen_screen, User_user, Newwords_newwords, Study_study } from "./local.generate";

/** パス更新 */
export interface UpdatePathProps extends UpdatePathVariables {
  updatePath: (path: number) => void;
}

export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen_screen, UpdatePathVariables>;

/** セット選択ID */
export interface UpdateSetIdProps extends UpdateSetIdVariables {
  updateSetId?: (id: string) => void;
}

export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, Status_status, UpdateSetIdVariables>;

/** 新規登録単語をクリアする */
export interface ClearNewwordsProps {
  clearNewwords: () => void;
}

export type ClearNewwordsChildProps = ChildProps<ClearNewwordsProps, ClearNewwords, any>;

export interface App {
  __typename: 'App',
  status: Status_status;
  screen: Screen_screen;
  user: User_user;
  newwords: Newwords_newwords;
  study: Study_study;
}

/** 学習コントロール */
// export interface Study {
//   list: WordInput[];
//   index: number;
//   text?: WordInput;
// }

// export interface Newwords {
//   newwords?: string[];
// }

// export interface UserInfo {
//   user: User
// }

// export interface User {
//   __typename: 'User';
//   id: string;
//   username: string;
// }

// export interface ScreenInfo {
//   screen: Screen
// }

// export interface Screen {
//   __typename: 'Screen';
//   path: number;
// }

// export interface StatusInfo {
//   status: Status
// }

// export interface Status {
//   __typename: 'Status';
//   setId: string;
// }