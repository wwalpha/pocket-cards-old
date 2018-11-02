import { ChildProps, graphql, MutationFn, FetchResult } from 'react-apollo';
import { GQL_IMAGE_2_WORD } from '@gql';
import { Image2WordVariables, Image2Word } from 'typings/graphql';

export interface Image2WordProps {
  image2Word: (bucketKey: string) => Promise<void | FetchResult<Image2Word>>;
}

type TChildProps = ChildProps<Image2WordProps, Image2Word, Image2WordVariables>;

/** セット作成 */
export const F_IMAGE_2_WORD = graphql<Image2WordProps, Image2Word, Image2WordVariables, TChildProps>(GQL_IMAGE_2_WORD, {
  props: ({ mutate }) => ({
    image2Word: (bucketKey: string) => (mutate as MutationFn<Image2Word, Image2WordVariables>)({
      variables: {
        bucketKey,
      },
    }),
  }),
  options: {
    // update: (proxy, result) => {
    //   if (!result.data || !result.data.image2Word) return;

    //   const words = result.data.image2Word.words;

    //   const cache = proxy.readQuery<Newwords>({ query: GQL_NEW_WORDS });
    //   if (!cache) return;

    //   // ローカルに保存する
    //   proxy.writeQuery<Newwords>({
    //     query: GQL_NEW_WORDS,
    //     data: {
    //       ...cache,
    //       newwords: words,
    //     },
    //   });
    // },
  },
});
