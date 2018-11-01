export * from './queries/studySet';
export * from './mutations/setCreate';

import { StudySetAction } from './queries/studySet';

export interface Actions {
  studySet: StudySetAction;
}
