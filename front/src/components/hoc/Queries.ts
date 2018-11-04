import { Query } from 'react-apollo';
import { StudySet, StudySetVariables, Newwords, StatusInfo, User } from 'typings/graphql';

/** 学習セット */
export class StudySetQuery extends Query<StudySet, StudySetVariables> { }
/** 画像変換後の単語一覧 */
export class NewwordsQuery extends Query<Newwords, void> { }
/** ステータス */
export class StatusInfoQuery extends Query<StatusInfo, any> { }
/** ユーザ情報 */
export class UserInfoQuery extends Query<User, any> { }
