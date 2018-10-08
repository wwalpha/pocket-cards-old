export const defaults = {
  user: null,
};

export const resolvers = {
  Mutation: {
    updateUser: (_: any, { id, username }: any, { cache }: any) => {
      console.log(id, username);
      const data = {
        user: {
          id, username,
          __typename: 'userInfo',
        },
      };
      cache.writeData({ data });
      console.log(data);
      return data.user;
    },
  },
};
