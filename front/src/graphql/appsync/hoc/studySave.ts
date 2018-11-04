import { StudySet, StudySetVariables, StudySaveVariables, StudySave, StudySaveInput } from 'typings/graphql';
import { ChildProps, graphql, FetchResult, MutationFn } from 'react-apollo';
import { GQL_STUDY_SAVE } from '@gql/appsync';

export interface Props {
  studySave: (input: StudySaveInput) => Promise<void | FetchResult<StudySave>>;
}

type TChildProps = ChildProps<Props, StudySave, StudySaveVariables>;

/** セット削除 */
export default graphql<Props, StudySet, StudySetVariables, TChildProps>(GQL_STUDY_SAVE, {
  props: ({ mutate }) => ({
    studySave: (input: StudySaveInput) => (mutate as MutationFn<StudySet, StudySetVariables>)({
      variables: {
        setId: input.setId,
      },
    }),
  }),
});
