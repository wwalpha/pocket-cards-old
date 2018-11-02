// import * as React from 'react';
// import { RouteComponentProps, withRouter } from 'react-router';
// import { Grid, List, ListItem, ListItemText, Theme, WithStyles, withStyles, Button } from '@material-ui/core';
// import { StyleRules } from '@material-ui/core/styles';
// import { PATH_INDEX, PATH } from '@const';

// class Regist extends React.Component<Props, State> {
//   state = {
//     words: [],
//   };

//   handleRegist = async () => {
//     const { history, setId, newwords: words, appActions, studyActions } = this.props;

//     // 単語登録
//     // await API.graphql({
//     //   query: REGIST_WORDS,
//     //   variables: {
//     //     input: {
//     //       setId, words,
//     //     },
//     //   } as RegistWordsVariables,
//     // });

//     // パス更新
//     appActions.updatePath(PATH_INDEX.WORD_ROOT);
//     // 新単語クリア
//     studyActions.clearNewwords();
//     // 単語ホーム画面に遷移する
//     history.push(PATH.WORD.ROOT);
//   }

//   render() {
//     const { classes, newwords } = this.props;

//     const items = newwords.map((item, idx) => (
//       <ListItem key={idx} divider button classes={{ root: classes.listItem }}>
//         <ListItemText primary={item} />
//       </ListItem>
//     ));

//     return (
//       <Grid container direction="column">
//         <Grid item>
//           <List component="nav" >
//             {items}
//           </List>
//         </Grid>
//         <Grid container justify="flex-end" classes={{ container: classes.command }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={this.handleRegist}
//           >
//             登録
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }
// }

// const styles = (theme: Theme): StyleRules => ({
//   listItem: {
//     backgroundColor: theme.palette.grey['200'],
//     width: 'inherit',
//   },
//   command: {
//     padding: `0px ${theme.spacing.unit * 2}px`,
//   },
// });

// export interface State {
//   [key: string]: any;
// }

// export interface Props extends RouteComponentProps, WithStyles<StyleRules> { }

// export default withStyles(styles)(withRouter(Regist));
