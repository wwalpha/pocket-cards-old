import { RegistWords, RegistWordsVariables, RegistWordsInput } from 'typings/graphql';
import { ChildProps, graphql, MutationFn, FetchResult } from 'react-apollo';
import { GQL_REGIST_WORDS } from '@gql/appsync';

export interface Props {
  registWords: (input: RegistWordsInput) => Promise<void | FetchResult<RegistWords>>;
}

type TChildProps = ChildProps<Props, RegistWords, RegistWordsVariables>;

/** 新規単語登録 */
export default graphql<Props, RegistWords, RegistWordsVariables, TChildProps>(GQL_REGIST_WORDS, {
  props: ({ mutate }) => ({
    registWords: (input: RegistWordsInput) => (mutate as MutationFn<RegistWords, RegistWordsVariables>)({
      variables: {
        input,
      },
    }),
  }),
});
