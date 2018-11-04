import gql from 'graphql-tag';
import { StatusInfo, StatusInfo_status } from 'typings/graphql';
import { ChildProps, graphql } from 'react-apollo';

export const GQL_STATUS_INFO = gql`
  query StatusInfo {
    status @client {
      path
      cardIndex
      setId
    }
  }
`;

export interface Props {
  status: StatusInfo_status;
}
type TChildProps = ChildProps<Props, StatusInfo, void>;

export default graphql<Props, StatusInfo, void, TChildProps>(GQL_STATUS_INFO, {
  props: ({ data }) => {
    if (!data || !data.status) {
      return {
        status: {
          __typename: 'Status',
          path: -1,
          cardIndex: -1,
          setId: null,
        },
      };
    }

    return {
      status: data.status,
    };
  },
});
