import { Query } from 'react-apollo';
import { StudySet, StudySetVariables, Newwords, Card, StatusInfo } from 'typings/graphql';

/** 学習セット */
export class StudySetQuery extends Query<StudySet, StudySetVariables> { }
/** 画像変換後の単語一覧 */
export class NewwordsQuery extends Query<Newwords, void> { }
/** カードデータ */
export class CardQuery extends Query<Card, void> { }
/** ステータス */
export class StatusInfoQuery extends Query<StatusInfo, any> { }
