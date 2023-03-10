// import * as Sequelize from 'sequelize';
import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
// import { IUser } from '../interfaces/User.interface';
// import IUser from './entities/IUser';

// interface IUser {
//   id: number;
//   username: string;
//   role: string;
//   email: string;
//   password: string;
// }

// class User extends Model<IUser> {
class User extends Model {
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
    allowNull: true,
  },
  role: {
    type: STRING,
    allowNull: true,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db, // db é ums instancia de sequelize (está no arquivo index.ts). O sequelize é o que vai fazer a conexão com o banco de dados.
  modelName: 'users', // Nome da tabela.
  underscored: true, // Se os campos da tabela serão separados por underline (caso seja camelCase, o sequelize vai entender que é um campo separado).
  timestamps: false, // Se vai ter os campos de created_at e updated_at seria necessário colocar true.
});

export default User;
// export { IUser };
