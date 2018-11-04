import { StudyAnswer, StudyAnswerVariables, StudyAnswerInput } from 'typings/graphql';
import { ChildProps, graphql, FetchResult, MutationFn } from 'react-apollo';
import { GQL_STUDY_ANSWER } from '@gql/appsync';

export interface Props {
  studyAnswer: (input: StudyAnswerInput) => Promise<void | FetchResult<StudyAnswer>>;
}

type TChildProps = ChildProps<Props, StudyAnswer, StudyAnswerVariables>;

/** 単語の回答 */
export default graphql<Props, StudyAnswer, StudyAnswerVariables, TChildProps>(GQL_STUDY_ANSWER, {
  props: ({ mutate }) => ({
    studyAnswer: (input: StudyAnswerInput) => (mutate as MutationFn<StudyAnswer, StudyAnswerVariables>)({
      variables: {
        input,
      },
    }),
  }),
});
