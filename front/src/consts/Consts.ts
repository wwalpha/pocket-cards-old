export const PATH = {
  SET_MENU: '/set',
  SET_NEW_WORD: '/newword',
  SET_STUDY: '/study',
  SET_HISTORY: '/history',
  SET_TEST: '/test',
};

export const HEADER: Header = {
  HOME: {
    title: 'ホーム',
  } as HeaderInfo,
  SET: {
    title: 'セット一覧',
  } as HeaderInfo,
  WORD: {
    title: '単語一覧',
  } as HeaderInfo,
};

export interface Header {
  [key: string]: HeaderInfo;
}

export interface HeaderInfo {
  title: string;
}
