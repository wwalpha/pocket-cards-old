import gql from 'graphql-tag';
import { ChildProps, graphql } from 'react-apollo';
import { UpdateSetId, UpdateSetIdVariables } from 'typings/graphql';

export const GQL_UPDATE_SET_ID = gql`
  mutation UpdateSetId($id: String!) {
    updateSetId(id: $id) @client {
      setId
    }
  }
`;

export interface UpdateSetIdProps {
  updateSetId: (id: string) => void;
}

type TChildProps = ChildProps<UpdateSetIdProps, UpdateSetId, UpdateSetIdVariables>;

export const F_UPDATE_SET_ID = graphql<UpdateSetIdProps, UpdateSetId, UpdateSetIdVariables, TChildProps>(GQL_UPDATE_SET_ID, {
  props: ({ mutate }) => ({
    updateSetId: (id: string) => {
      mutate && mutate({
        variables: { id },
      });
    },
  }),
});
