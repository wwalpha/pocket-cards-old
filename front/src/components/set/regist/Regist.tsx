import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { TextField, Grid } from '@material-ui/core';
import { AddBtn } from '.';

class Regist extends React.Component<Props, State> {
  state: State = {
    userId: 'wwalpha',
    name,
  };

  /** 入力変更 */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    this.setState({
      [name]: event.target.value,
    })

  render() {
    const { classes } = this.props;
    const { name = '', userId } = this.state;

    console.log(this.props);
    return (
      <Grid container>
        <TextField
          id="outlined-name"
          label="セット名称"
          className={classes.textField}
          value={this.state['name']}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <AddBtn name={name} userId={userId} />
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

export interface Props extends WithStyles<StyleRules> { }

export interface State {
  [key: string]: any;
}

export default withStyles(styles)(Regist);
