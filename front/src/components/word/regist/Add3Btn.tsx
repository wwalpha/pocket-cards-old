// import * as React from 'react';
// import { graphql, ChildProps } from 'react-apollo';
// import { Button } from '@material-ui/core';
// import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
// import { withRouter, RouteComponentProps } from 'react-router';
// import { RegistWordsVariables, RegistWords } from 'typings/graphql';
// import { WORDS_REGIST } from '@gql';
// import { PATH } from '@const';

// class AddBtn extends React.Component<Props> {

//   render() {
//     const { history } = this.props;

//     return (
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => mutate && mutate({
//           variables: {

//           },
//         }).then(() => history.push(PATH.WORD.ROOT))}
//       >
//         登  録
//     </Button>
//     );
//   }
// }

// const styles = (): StyleRules => ({
// });

// export interface IProps {

// }
// export interface Props extends ChildProps<RegistWordsVariables, RegistWords>, WithStyles, RouteComponentProps { }

// export default graphql<RegistWordsVariables, RegistWords>(WORDS_REGIST, {
//   props: ({ data, mutate, ownProps }) => ({
//     ...data,
//     mutate,
//     ...ownProps,
//   }),
// })(withStyles(styles)(withRouter(AddBtn)));
