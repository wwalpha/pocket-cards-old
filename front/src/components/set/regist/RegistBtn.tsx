import * as React from 'react';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PATH, PATH_INDEX } from '@const';
import { compose } from 'react-apollo';
import { SetCreate } from '@gql/appsync';
import { UpdatePath } from '@gql/local';

class RegistBtn extends React.Component<Props> {

  handleRegist = async () => {
    const { history, userId, name, setCreate, updatePath } = this.props;

    // Graph API
    await setCreate(userId, name);
    // Local Graph API
    await updatePath(PATH_INDEX.SET_ROOT);
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

export interface Props extends SetCreate.Props, UpdatePath.Props, OwnProps, WithStyles, RouteComponentProps { }

export default compose(
  SetCreate.default,
  UpdatePath.default,
  withStyles(styles),
  withRouter,
)(RegistBtn) as React.ComponentType<OwnProps>;
