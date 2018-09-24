import * as React from 'react';
import { StyleRulesCallback, withStyles, Theme, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import red from '@material-ui/core/colors/red';
import Slide from '@material-ui/core/Slide';
import SetMenu from '@comp/set/Menu';
import { Route } from 'react-router-dom';

class MenuItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, item } = this.props;

    return (
      <Grid container>
        <ListItem
          button
          disableRipple
          classes={{ root: classes.listitem }}
          onClick={this.handleTouchMove}
        >
          <Avatar classes={{ root: classes.avatar }}>
            <FolderIcon />
          </Avatar>
          <ListItemText primary={item.primaryText} secondary={item.secondaryText} />
        </ListItem>
        <Slide direction="left" in={this.state.delOpened} mountOnEnter unmountOnExit>
          <Button
            variant="contained"
            classes={{ root: classes.button }}
            disableRipple
          >
            DELETE
          </Button>
        </Slide>
        <Route path="/menu" components={SetMenu} />
        <Route path="/word" components={SetMenu} />
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
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

export default withStyles(styles)(MenuItem);

export type ItemProps = {
  primaryText: string,
  secondaryText: string,
};

export interface Props extends WithStyles<StyleRulesCallback> {
  item: ItemProps;
}
