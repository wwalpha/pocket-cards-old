import { ChildProps, graphql, MutationFn, FetchResult } from 'react-apollo';
import { Image2WordVariables, Image2Word, Newwords } from 'typings/graphql';
import { GQL_IMAGE_2_WORD } from '@gql/appsync';
import { GQL_NEW_WORDS } from '@gql/local';

export interface Props {
  image2Word: (bucketKey: string) => Promise<void | FetchResult<Image2Word>>;
}

type TChildProps = ChildProps<Props, Image2Word, Image2WordVariables>;

/** セット作成 */
export default graphql<Props, Image2Word, Image2WordVariables, TChildProps>(GQL_IMAGE_2_WORD, {
  props: ({ mutate }) => ({
    image2Word: (bucketKey: string) => (mutate as MutationFn<Image2Word, Image2WordVariables>)({
      variables: {
        bucketKey,
      },
    }),
  }),
  options: {
    update: (proxy, result: FetchResult<Image2Word>) => {
      if (!result.data || !result.data.image2Word.words) return;

      const words = result.data.image2Word.words;

      const cache = proxy.readQuery<Newwords>({ query: GQL_NEW_WORDS });
      if (!cache) return;

      // ローカルに保存する
      proxy.writeQuery<Newwords>({
        query: GQL_NEW_WORDS,
        data: {
          ...cache,
          newwords: {
            __typename: 'Newwords',
            words,
          },
        },
      });
    },
  },
});
