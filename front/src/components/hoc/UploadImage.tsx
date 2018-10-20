import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { IconButton, Theme } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { Storage } from 'aws-amplify';
import { IMAGE_TO_WORDS, NEW_WORD_INFO } from '@gql';
import { Image2Word, Image2WordVariables, Image2Word_image2Word } from 'typings/graphql';
import { Newwords } from 'typings/local';

class UploadImage extends React.Component<Props> {

  onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;

    const file = e.target.files[0];

    await Storage.put(file.name, file, {
      contentType: file.type,
    });

    await this.props.onWordRegist(`private/ap-northeast-1:ca61500a-e732-4cb6-a0f4-cddf75336eb9/${file.name}`);
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
            <CameraAlt />
          </IconButton>
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

export interface TProps {
  onWordRegist: (key: string) => void;
}

export type TChildProps = ChildProps<TProps, Image2Word_image2Word, Image2WordVariables>;

export interface Props extends TProps, WithStyles { }

export default graphql<TProps, Image2Word, Image2WordVariables, TChildProps>(IMAGE_TO_WORDS, {
  options: {
    // refetchQueries: [{
    //   query: NEW_WORD_INFO,
    // }],
    update: (proxy, result) => {
      if (!result.data || !result.data.image2Word) return;

      const words = result.data.image2Word.words;

      const cache = proxy.readQuery<Newwords>({ query: NEW_WORD_INFO });
      if (!cache) return;

      // ローカルに保存する
      proxy.writeQuery<Newwords>({
        query: NEW_WORD_INFO,
        data: {
          ...cache,
          newwords: words,
        },
      });
    },
  },
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    onWordRegist: (key: string) => {
      mutate && mutate({
        variables: {
          bucketKey: key,
        },
      });
    },
  }),
})(withStyles(styles)(UploadImage));
