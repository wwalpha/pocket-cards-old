// import * as React from 'react';
// import { withStyles, StyleRules } from '@material-ui/core/styles';
// import Auth from '@aws-amplify/auth';
// import { ApolloConsumer } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { UPDATE_USER } from '@gql';

// class Login extends React.Component<Props, {}> {

//   login = async (client: ApolloClient<any>) => {
//     await Auth.signIn('wwalpha', 'session10');

//     await client.mutate({
//       mutation: UPDATE_USER,
//       variables: {
//         id: 'wwalpha',
//         username: 'test',
//       },
//     });
//   }

//   render() {
//     const { } = this.props;

//     return (
//       <ApolloConsumer>
//         {(client) => {
//           this.login(client);

//           return null;
//         }}
//       </ApolloConsumer>
//     );
//   }
// }

// const styles = (): StyleRules => ({
// });

// export interface Props { }

// export default withStyles(styles)(Login);
