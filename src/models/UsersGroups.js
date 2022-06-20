import { DataTypes, Model } from 'sequelize';
import db from '../data-access/db';
import Users from './Users';
import Groups from './Groups';

class UsersGroups extends Model {}

UsersGroups.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true }
  },
  { sequelize: db, modelName: 'usersGroups' }
);

Users.belongsToMany(Groups, { through: UsersGroups, foreignKey: 'userId', otherKey: 'groupId' });
Groups.belongsToMany(Users, { through: UsersGroups, foreignKey: 'groupId', otherKey: 'userId' });

export default UsersGroups;
