import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { SetRegist, SetRegistVariables } from 'typings/graphql';
import { setRegist } from '@gql/set';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';

class Regist extends React.Component<Props, State> {
  state: State = {
    userId: 'wwalpha',
  };

  /** 入力変更 */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    this.setState({
      [name]: event.target.value,
    })

  render() {
    const { classes } = this.props;
    const { name = '', userId } = this.state;

    return (
      <Grid container>
        <SetRegistMutation mutation={setRegist} variables={{ name, userId }}>
          {(setRegist, { data }) => {

            if (data) {
              return (
                <Redirect to="/set" />
              );
            }

            return (
              <React.Fragment>
                <TextField
                  id="outlined-name"
                  label="セット名称"
                  className={classes.textField}
                  value={this.state['name']}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={setRegist as any}
                >
                  登録
                </Button>
              </React.Fragment>
            );
          }}
        </SetRegistMutation>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(withRouter(Regist));

export interface Props extends WithStyles<StyleRules>, SetRegistVariables, RouteComponentProps {
}

export interface State {
  [key: string]: any;
}

class SetRegistMutation extends Mutation<SetRegist, SetRegistVariables> { }
