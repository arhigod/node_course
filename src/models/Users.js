import { DataTypes, Model } from 'sequelize';
import db from '../data-access/db';

class Users extends Model {}

Users.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: { args: true, msg: 'This login is already taken' }
    },
    password: { type: DataTypes.STRING(255), allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize: db, modelName: 'users' }
);

export default Users;
