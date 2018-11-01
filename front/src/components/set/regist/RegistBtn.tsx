import * as React from 'react';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Api } from '@actions';
import { PATH } from '@const';

class RegistBtn extends React.Component<Props> {

  handleRegist = async () => {
    const { history, userId, name } = this.props;

    await Api.setCreate(userId, name);
    // メニュー画面に戻る
    history.push(PATH.SET.ROOT);
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleRegist}
      >
        登録
     </Button>
    );
  }
}

const styles = (): StyleRules => ({
});

export interface OwnProps {
  userId: string;
  name: string;
}

export interface Props extends OwnProps, WithStyles, RouteComponentProps { }

export default withStyles(styles)(withRouter(RegistBtn));
