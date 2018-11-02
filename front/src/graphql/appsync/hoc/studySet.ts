import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';
import { GQL_STUDY_SET } from '../queries';

export interface StudySetProps {
  studySet?: (StudySet_studySet | null)[];
}

type TChildProps = ChildProps<StudySetProps, StudySet, StudySetVariables>;

/** セット削除 */
export const F_STUDY_SET = graphql<StudySetProps, StudySet, StudySetVariables, TChildProps>(GQL_STUDY_SET, {
  props: ({ data }) => ({
    studySet: data && data.studySet,
  }),
});
