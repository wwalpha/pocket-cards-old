import * as React from 'react';
import {
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
  Slide,
  Grid,
  Avatar,
  ListItem as MListItem,
  ListItemText,
  Button,
  Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import red from '@material-ui/core/colors/red';
import { Link } from 'react-router-dom';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, primaryText, secondaryText } = this.props;

    return (
      <Grid container>
        <Paper
          elevation={1}
          classes={{
            elevation1: classes.paper,
          }}>
          <MListItem
            button
            disableRipple
            classes={{ root: classes.listitem }}
            component={(props: any) => (<Link to="/menu" {...props} />)}
          >
            <Avatar classes={{ root: classes.avatar }}>
              <FolderIcon />
            </Avatar>
            <ListItemText
              primary={primaryText}
              secondary={secondaryText}
            />
          </MListItem>
          <Slide direction="left" in={this.state.delOpened} mountOnEnter unmountOnExit>
            <Button
              variant="contained"
              classes={{ root: classes.button }}
              disableRipple
            >
              DELETE
            </Button>
          </Slide>
        </Paper>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    margin: '4px 16px',
    width: '100%',
    borderRadius: '2px',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
  list: { padding: '0px' },
  listitem: {
    flex: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  button: {
    borderRadius: '0px',
    color: '#fff',
    backgroundColor: red[700],
    width: '120px',
    transform: 'translateX(130)',
    transition: 'all 300ms 0s ease',
  },
});

export default withStyles(styles)(ListItem);

export interface Props extends WithStyles<StyleRulesCallback> {
  primaryText: string;
  secondaryText?: string;
}
