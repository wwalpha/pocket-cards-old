import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs = `
type Query {
  # セットリスト一覧
  sets(userId: ID!): [Set]
  # 単語一覧
  words(setId: ID!): [Word]
}

type Mutation {
  # セット作成
  createSet(name: String!): Set
  # セット削除
  deleteSet(setId: ID!): Set
  # 単語一括登録
  importWords(setId: ID!): Set
}

type Set {
  # id
  setId: ID!
  # セット名
  name: String
  # 単語一覧
  words: [Word]
}

type User {
  userId: ID!
  username: String
  sets: [Set]
}

type Word {
  id: ID!
  # 単語
  word: String
  # 発音
  pronounce: String
  # 語彙
  vocabulary: String
  # 学習時間
  studyDate: String
  # 次回学習時間
  nextDate: String
  # 学習回数
  times: Int
  # 音声
  sound: String
}

`;

export const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF

};

// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks });

console.log(1111);
