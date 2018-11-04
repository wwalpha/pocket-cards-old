import gql from 'graphql-tag';
import { User, User_user } from 'typings/graphql';
import { graphql, ChildProps } from 'react-apollo';

export const GQL_USER_INFO = gql`
  query User {
    user @client {
      id
      username
    }
  }
`;

export interface Props {
  user: User_user;
}
type TChildProps = ChildProps<Props, User, void>;

/** ユーザ情報 */
export default graphql<Props, User, TChildProps>(GQL_USER_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return data;
  },
});
