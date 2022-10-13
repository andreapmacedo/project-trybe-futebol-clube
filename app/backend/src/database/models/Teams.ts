// import * as Sequelize from 'sequelize';
import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
// import Matches from './Matches';

class Teams extends Model {
  id?: number;
  teamName!: string;

  // homeTeam?: Array<Matches>;
  // awayTeam?: Array<Matches>;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db, // db é ums instancia de sequelize (está no arquivo index.ts). O sequelize é o que vai fazer a conexão com o banco de dados.
  modelName: 'teams', // Nome da tabela.
  underscored: true, // Se os campos da tabela serão separados por underline (caso seja camelCase, o sequelize vai entender que é um campo separado).
  timestamps: false, // Se vai ter os campos de created_at e updated_at seria necessário colocar true.
});

export default Teams;

