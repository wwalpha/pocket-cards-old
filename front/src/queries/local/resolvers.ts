import { UpdatePathVariables, AppInfo, UpdateUserVariables, RemoveWordVariables, SaveNewwordsVariables, NewwordInfo, SaveNewwords } from 'typings/local';
import { APP_INFO, NEW_WORD_INFO } from './query';
import { ApolloCache } from 'apollo-cache';

/** パス情報更新 */
const updatePath = (_: any, args: UpdatePathVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<AppInfo>({ query: APP_INFO });
  if (!result) return;

  console.log(args);
  // パス更新
  result.app.screen = {
    __typename: 'Screen',
    path: args.path,
  };

  console.log('updatePath', result);
  cache.writeQuery({ query: APP_INFO, data: result });

  return result.app;
};

/** ユーザ情報更新 */
const updateUser = (_: any, { id, username }: UpdateUserVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<AppInfo>({ query: APP_INFO });
  if (!result) return;
  console.log('updateUser', result);

  // 個人情報保存
  result.app.user = {
    __typename: 'User',
    id, username,
  };

  // Cache更新
  cache.writeQuery<AppInfo>({
    query: APP_INFO, data: result,
  });

  console.log(result);
  return result.app;
};

const saveNewwords = (_: any, { words }: SaveNewwordsVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<NewwordInfo>({ query: NEW_WORD_INFO });
  if (!result) return;

  // Cache更新
  cache.writeQuery<NewwordInfo>({
    query: NEW_WORD_INFO, data: {
      words: words.words as string[],
    },
  });

  return words;
};

const clearNewwords = (_: any, data: any, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  // Cache更新
  cache.writeQuery<NewwordInfo>({
    query: NEW_WORD_INFO, data: {
      words: [] as string[],
    },
  });

  return [];
};

// ローカルの単語リストから単語を削除する;
const removeWord = (_: any, { word }: RemoveWordVariables, context: any) => {
  const cache = context.cache as ApolloCache<any>;

  const result = cache.readQuery<NewwordInfo>({ query: NEW_WORD_INFO });
  if (!result) return;

  const newwords = result.words.filter(item => item !== word);

  // Cache更新
  cache.writeQuery<NewwordInfo>({
    query: NEW_WORD_INFO, data: {
      words: newwords,
    },
  });

  return newwords;
};

export const resolvers = {
  Mutation: {
    updateUser,
    updatePath,
    saveNewwords,
    clearNewwords,
    removeWord,
  },
};
