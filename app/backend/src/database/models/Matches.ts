// import * as Sequelize from 'sequelize';
import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';

class Matches extends Model {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, {
  sequelize: db, // db é ums instancia de sequelize (está no arquivo index.ts). O sequelize é o que vai fazer a conexão com o banco de dados.
  modelName: 'matches', // Nome da tabela.
  underscored: true, // Se os campos da tabela serão separados por underline (caso seja camelCase, o sequelize vai entender que é um campo separado).
  timestamps: false, // Se vai ter os campos de created_at e updated_at seria necessário colocar true.
});

export default Matches;

