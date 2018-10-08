import * as React from 'react';
import { StyleRulesCallback, withStyles, Theme, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import red from '@material-ui/core/colors/red';
import MenuItem, { ItemProps } from './MenuItem';

class MenuList extends React.Component<Props, any> {
  state = {
    deleteOpened: false,
  };

  openMenu = () => this.setState({ menuOpened: true });
  closeMenu = () => this.setState({ menuOpened: false });

  handleTouchMove = (): void => {
    this.setState({ deleteOpened: !this.state.deleteOpened });
  }

  render() {
    const { classes, menuList = [] } = this.props;

    return (
      <Paper className={classes.root}>
        <List classes={{ root: classes.list }}>
          {(() => {
            const items: any[] = [];

            menuList.forEach((item, idx) => {
              // item
              items.push(
                <MenuItem key={idx} item={item} />,
              );

              // divider
              items.push(
                <li key={`divider${idx}`}>
                  <Divider inset />
                </li>,
              );
            });

            return items;
          })()}
        </List>
      </Paper>
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

export default withStyles(styles)(MenuList);

export interface Props extends WithStyles<StyleRulesCallback> {
  menuList?: ItemProps[];
}
