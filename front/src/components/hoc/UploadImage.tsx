import * as React from 'react';
import { IconButton, Theme } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import Storage from '@aws-amplify/storage';
import { Image2Word } from '@gql/appsync';

class UploadImage extends React.Component<Props> {

  onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;

    const file = e.target.files[0];

    console.log('put');
    await Storage.put(file.name, file, {
      contentType: file.type,
    });

    console.log('image2word');
    await this.props.image2Word(`private/ap-northeast-1:ca61500a-e732-4cb6-a0f4-cddf75336eb9/${file.name}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <input
          accept="image/*"
          className={classes.input}
          id="upload-image-file"
          multiple
          type="file"
          onChange={this.onFileSelected}
        />
        <label htmlFor="upload-image-file">
          <IconButton component="span" >
            <CameraAlt classes={{ root: classes.icon }} />
          </IconButton>
        </label>
      </React.Fragment>
    );
  }
}

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
  button: {
    margin: unit,
  },
  input: {
    display: 'none',
  },
  icon: {
    color: 'white',
  },
});

export interface Props extends Image2Word.Props, WithStyles<StyleRules> { }

export default compose(
  Image2Word.default,
  withStyles(styles),
)(UploadImage);
