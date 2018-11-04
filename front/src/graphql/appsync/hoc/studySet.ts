import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';
import { GQL_STUDY_SET } from '@gql/appsync';

export interface Props {
  studySet?: (StudySet_studySet | null)[];
}

type TChildProps = ChildProps<Props, StudySet, StudySetVariables>;

/** セット削除 */
export default graphql<Props, StudySet, StudySetVariables, TChildProps>(GQL_STUDY_SET, {
  props: ({ data }) => ({
    studySet: data && data.studySet,
  }),
});
