export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserLogout = {
  message: string;
};
