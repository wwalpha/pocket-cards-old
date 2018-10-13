import { UpdatePathVariables } from 'typings/local';

export const defaults = {
  user: null,
  app: {
    __typename: 'App',
    screen: 'HOME',
  },
};

const updatePath = (_: any, data: UpdatePathVariables, { cache }: any) => {
  console.log(11111);

};

export const resolvers = {
  Mutation: {
    updateUser: (_: any, { id, username }: any, { cache }: any) => {
      console.log(11111);

      console.log(id, username);
      const data = {
        user: {
          id, username,
          __typename: 'UserInfo',
        },
      };
      cache.writeData({ data });
      console.log(data);
      return data.user;
    },
    updatePath: (_: any, data: UpdatePathVariables, { cache }: any) => {
      console.log(11111);

      // console.log(id, username);
      // const data = {
      //   user: {
      //     id, username,
      //     __typename: 'UserInfo',
      //   },
      // };
      // cache.writeData({ data });
      // console.log(data);
      // return data.user;
    },
  },
};
