
/** Query User */
export interface User {
  user: User_user;
}

export interface User_user {
  __typename: 'User';
  id: string;
  username: string;
}
