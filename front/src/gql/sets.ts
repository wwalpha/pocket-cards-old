import gql from 'graphql-tag';

export default gql`
query () {
  setlist() {
    id
    name
  }
}`;
