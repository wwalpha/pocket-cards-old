import {
  Add, ArrowBack, CameraAlt,
} from '@material-ui/icons';
import { UploadImage } from '@hoc';
import { PATH, Header, HeaderInfo } from '.';

export const PATH_INDEX = {
  HOME_ROOT: 0,
  SET_ROOT: 1,
  SET_REGIST: 4,
  WORD_ROOT: 2,
  WORD_REGIST: 5,
  USER_ROOT: 3,
  WORD_STUDY: 6,
  WORD_TEST: 7,
  WORD_HISTORY: 8,
};

const home: Header = {
  [PATH_INDEX.HOME_ROOT]: {
    title: 'ホーム',
    path: '/home',
  } as HeaderInfo,
};

const set: Header = {
  [PATH_INDEX.SET_ROOT]: {
    title: 'セット一覧',
    path: '/set',
    right: [{
      icon: Add,
      path: PATH.SET.REGIST,
      index: PATH_INDEX.SET_REGIST,
    }],
  },
  [PATH_INDEX.SET_REGIST]: {
    title: '新規セット',
    path: PATH.SET.REGIST,
    left: [{
      icon: ArrowBack,
      path: PATH.SET.ROOT,
      index: PATH_INDEX.SET_ROOT,
    }],
  },
};

const word: Header = {
  [PATH_INDEX.WORD_ROOT]: {
    title: '学習メニュー',
    path: PATH.WORD.ROOT,
    left: [{
      icon: ArrowBack,
      path: PATH.SET.ROOT,
      index: PATH_INDEX.SET_ROOT,
    }],
  },
  [PATH_INDEX.WORD_REGIST]: {
    title: '新規単語',
    path: PATH.WORD.REGIST,
    left: [{
      icon: ArrowBack,
      path: PATH.WORD.ROOT,
      index: PATH_INDEX.WORD_ROOT,
    }],
    right: [{
      customize: UploadImage,
    }],
  },
  [PATH_INDEX.WORD_STUDY]: {
    title: '単語学習',
    path: PATH.WORD.STUDY,
    left: [{
      icon: ArrowBack,
      path: PATH.WORD.ROOT,
      index: PATH_INDEX.WORD_ROOT,
    }],
  },
};

export const HEADER: Header = {
  ...home,
  ...set,
  ...word,
};
