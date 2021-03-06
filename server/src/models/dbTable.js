import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class DBTable extends Model {
    static associate(models) {
      DBTable.hasMany(models.Permission, {
        foreignKey: 'dbtable_id',
        otherKey: 'permission_id',
        onDelete: 'cascade',
        hooks: true,
      });
      DBTable.belongsTo(models.Database);
      DBTable.hasMany(models.Visualization, {
        foreignKey: { name: 'tableId', allowNull: false },
        otherKey: 'visualization_id',
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  DBTable.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'DBTable',
    }
  );

  return DBTable;
};
