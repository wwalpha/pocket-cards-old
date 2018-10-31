// import * as React from 'react';
// import { Button } from '@material-ui/core';
// import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
// import { RouteComponentProps, withRouter } from 'react-router-dom';
// import { API } from 'aws-amplify';
// import { PATH, PATH_INDEX } from '@const';
// import { RegistWordsMutationVariables } from 'typings/graphql';
// import { registWords } from '@mutations';

// class RegistBtn extends React.Component<Props> {

//   handleRegist = async () => {
//     const { history, setId, words, updatePath, clearNewwords } = this.props;

//     // 単語登録
//     await API.graphql({
//       query: registWords,
//       variables: {
//         input: {
//           setId, words,
//         },
//       } as RegistWordsMutationVariables,
//     });

//     // パス更新
//     updatePath(PATH_INDEX.WORD_ROOT);
//     // 新単語クリア
//     clearNewwords();

//     // 単語ホーム画面に遷移する
//     history.push(PATH.WORD.ROOT);
//   }

//   render() {
//     return (
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={this.handleRegist}
//       >
//         登録
//      </Button>
//     );
//   }
// }

// const styles = (): StyleRules => ({
// });

// /** OwnProps */
// export interface OwnProps {
//   setId: string;
//   updatePath: (path: number) => void;
//   clearNewwords: () => void;
//   words: string[];
// }
// // React Props
// export interface Props extends OwnProps, RouteComponentProps, WithStyles { }

// export default withRouter(withStyles(styles)(RegistBtn));
