import gql from 'graphql-tag';
import { User } from 'typings/graphql';
import { graphql } from 'react-apollo';

export const GQL_USER_INFO = gql`
  query User {
    user @client {
      id
      username
    }
  }
`;

/** ユーザ情報 */
export const F_USER_INFO = graphql<any, User, any>(GQL_USER_INFO, {
  props: ({ data }) => {
    if (!data) return {} as any;

    return data;
  },
});
