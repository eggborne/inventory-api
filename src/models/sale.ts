import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Sale extends Model {
  public id!: number;
  public saleDate!: Date;
  public salePrice!: number;
  public buyerContact!: string;
}

Sale.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  saleDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  salePrice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  buyerContact: {
    type: new DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Sale',
});

export default Sale;
