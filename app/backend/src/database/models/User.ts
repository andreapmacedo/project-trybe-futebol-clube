// import * as Sequelize from 'sequelize';
import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

// type IUserCreation = Omit<IUser, 'id'>;

// type IUserReturned = Omit<IUser, 'password'>;

// class User extends Model<IUser, IUserCreation> {
class User extends Model<IUser> {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
export { IUser };
// export { IUser, IUserCreation, IUserReturned };