export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}
