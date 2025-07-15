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

export type UserRegister = UserLogin & {
  name: string;
};

export type UserLogout = {
  message: string;
};

export type UpdateProfileRequest = UserRegister & {
  _id: string;
};

export type UpdateProfileResponse = User;

export type UsersListItem = User & {
  createdAt: string;
  updatedAt: string;
};

export type AllUsersResponse = {
  page: string;
  pages: string;
  users: UsersListItem[];
};
