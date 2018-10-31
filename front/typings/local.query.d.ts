export * from './local/queries';

// import { ChildProps } from "react-apollo";
import { UpdatePathVariables, UpdateSetIdVariables, ClearNewwords, WordInput } from "./local.generate";
import { Status, User, Newwords, Study, Status_status, Screen_screen, User_user, Newwords_newwords, Study_study } from './local/queries';

// /** パス更新 */
// export interface UpdatePathProps extends UpdatePathVariables {
//   updatePath: (path: number) => void;
// }

// export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen, UpdatePathVariables>;

// /** セット選択ID */
// export interface UpdateSetIdProps extends UpdateSetIdVariables {
//   updateSetId?: (id: string) => void;
// }

// export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, Status, UpdateSetIdVariables>;

// /** 新規登録単語をクリアする */
// export interface ClearNewwordsProps {
//   clearNewwords: () => void;
// }

// export type ClearNewwordsChildProps = ChildProps<ClearNewwordsProps, ClearNewwords, any>;

export interface App {
  __typename: 'App',
  status: Status_status;
  screen: Screen_screen;
  user: User_user;
  newwords?: Newwords_newwords;
  study?: Study_study;
}
