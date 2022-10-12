export interface IUser {
  email: string;
  password: string;
}

export interface IUserCreate extends IUser {
  id?: number;
  username: string;
  role: string;
}



