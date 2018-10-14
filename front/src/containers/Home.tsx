import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  CameraAlt,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

class Home extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <input
          accept="image/*"
          className={classes.input}
          id="outlined-button-file"
          multiple
          type="file"
        />
        <label htmlFor="outlined-button-file">
          <IconButton component="span" >
            <CameraAlt />
          </IconButton>
          {/* <Button variant="outlined" component="span" className={classes.button}>
            Upload
          </Button> */}
        </label>
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export default withRouter(withStyles(styles)(Home));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
