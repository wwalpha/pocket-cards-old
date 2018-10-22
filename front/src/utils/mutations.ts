import { graphql } from 'react-apollo';
import { UPDATE_PATH, CLEAR_NEW_WORDS } from '@gql';
import { UpdatePathProps, ScreenInfo, UpdatePathVariables, UpdatePathChildProps, ClearNewwordsProps, ClearNewwords, ClearNewwordsChildProps } from 'typings/local';

export const pathChange = graphql<UpdatePathProps, ScreenInfo, UpdatePathVariables, UpdatePathChildProps>(UPDATE_PATH, {
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    updatePath: (path: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
});

export const clearNewwords = graphql<ClearNewwordsProps, ClearNewwords, any, ClearNewwordsChildProps>(CLEAR_NEW_WORDS, {
  props: ({ mutate }) => ({
    clearNewwords: () => {
      mutate && mutate();
    },
  }),
});
