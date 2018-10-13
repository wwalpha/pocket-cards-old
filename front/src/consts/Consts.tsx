import * as React from 'react';
import {
  Add as AddIcon, ArrowBack as BackIcon,
} from '@material-ui/icons';

export const PATH = {
  SET: {
    ROOT: 'set',
    NEW_WORD: 'newword',
    STUDY: 'study',
    HISTORY: 'history',
    TEST: 'test',
  },
  HOME: {
    ROOT: '/home',
  },
};

export const BUTTON = {
  ADD: 'Add',
  BACK: 'Back',
};

const TITLE = {
  HOME: 'ホーム',
  SET: 'セット一覧',
  WORD: '単語一覧',
};

export const HEADER_INDEX = {
  HOME: 0,
  SET: 1,
  WORD: 2,
};

export const HEADER: Header = {
  HOME: {
    left: [],
    right: [],
    title: TITLE.HOME,
  } as HeaderInfo,
  SET: {
    left: [{
      [BUTTON.BACK]: <BackIcon />,
    }],
    right: [{
      [BUTTON.ADD]: <AddIcon />,
      path: 'regist',
    }],
    title: TITLE.SET,
  },
  WORD: {
    left: [{
      [BUTTON.BACK]: <BackIcon />,
    }],
    right: [{
      [BUTTON.ADD]: <AddIcon />,
    }],
    title: TITLE.WORD,
  } as HeaderInfo,
};

export interface Header {
  [key: string]: HeaderInfo;
}
export interface IconButton {
  [key: string]: any;
}

export interface HeaderInfo {
  title: string;
  left: IconButton[];
  right: IconButton[];
}
