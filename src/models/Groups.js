import { DataTypes, Model } from 'sequelize';
import db from '../data-access/db';

class Groups extends Model {}

Groups.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
      allowNull: false
    }
  },
  { sequelize: db, modelName: 'groups' }
);

export default Groups;
