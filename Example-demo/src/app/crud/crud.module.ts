export interface User {
  id: number;
  name: string;
  location: string;
}

export interface Users extends Array<User> {}
