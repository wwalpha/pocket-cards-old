export * from './gql/mutations';
export * from './gql/queries';

import * as Image2Word from './mutations/image2Word';
import * as RegistWords from './mutations/registWords';
import * as SetCreate from './mutations/setCreate';
import * as SetDelete from './mutations/setDelete';
import * as StudyAnswer from './mutations/studyAnswer';

import * as StudySet from './queries/studySet';
// import * as SetList from './queries/setList';

export {
  Image2Word,
  RegistWords,
  // SetList,
  SetCreate,
  SetDelete,
  StudySet,
  StudyAnswer,
};
