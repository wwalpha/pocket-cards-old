import * as React from 'react';
import { Button, colors } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { SetDelete } from '@gql/appsync';
import { compose } from 'react-apollo';

class RemoveBtn extends React.Component<Props> {

  handleRemove = async () => {
    const { onRemove, setDelete, setId, userId } = this.props;

    // parent event
    onRemove();
    // delete set
    await setDelete(userId, setId);
  }

  render() {
    const { classes, show } = this.props;

    return (
      <Button
        variant="contained"
        classes={{ root: classes.button }}
        disableRipple
        onClick={this.handleRemove}
        style={{ display: show ? '' : 'none' }}
      >
        REMOVE
      </Button>
    );
  }
}

const styles = (): StyleRules => ({
  button: {
    borderRadius: '0px',
    color: '#fff',
    backgroundColor: colors.red[700],
    width: '80px',
    boxShadow: 'none',
    // transform: 'translateX(130)',
    transition: 'all 300ms 0s ease',
    // marginRight: '24px',
    '&:hover': {
      backgroundColor: colors.red[700],
    },
  },
});

export interface OwnProps {
  setId: string;
  userId: string;
  show: boolean;
  onRemove: () => void;
}

// React Props
export interface Props extends OwnProps, SetDelete.Props, WithStyles {
}

export default compose(
  SetDelete.default,
  withStyles(styles),
)(RemoveBtn) as React.ComponentType<OwnProps>;
