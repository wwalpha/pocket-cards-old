import * as React from 'react';
import { Grid, WithStyles, withStyles, ListItemText, ListItem as MListItem, Button } from '@material-ui/core';
import { StyleRules, Theme } from '@material-ui/core/styles';
import { Remove } from '@material-ui/icons';
import { compose } from 'react-apollo';

class ListItem extends React.Component<Props, void> {

  render() {
    const { classes, word, onRemove } = this.props;

    return (
      <Grid container classes={{ container: classes.container }} alignItems="center" >
        <Button
          disableFocusRipple
          disableRipple
          disableTouchRipple
          classes={{ root: classes.button }}
          variant="fab"
          onClick={() => onRemove(word)}
        >
          <Remove fontSize="large" />
        </Button>

        <MListItem button classes={{ root: classes.item }}>
          <ListItemText primary={word} />
        </MListItem>
      </Grid>
    );
  }
}

const styles = ({ palette, spacing: { unit } }: Theme): StyleRules => ({
  button: {
    backgroundColor: '#950000',
    color: 'white',
    width: `${unit * 4.5}px`,
    height: `${unit * 4.5}px`,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#950000',
    },
  },
  icon: {
    fontSize: '48px',
  },
  item: {
    border: 'solid',
    borderWidth: '1px',
    borderColor: palette.grey['400'],
    flexGrow: 1,
    marginLeft: `${unit}px`,
    width: 'auto',
  },
  container: {
    padding: `${unit / 4}px 0px`,
  },
});

export interface OwnProps {
  // 単語
  word: string;
  // 削除イベント
  onRemove: (word: string) => void;
}

export interface Props extends OwnProps, WithStyles<StyleRules> { }

export default compose(
  withStyles(styles),
)(ListItem) as React.ComponentType<OwnProps>;
