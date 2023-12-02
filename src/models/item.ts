import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Item extends Model {
  public id!: number;
  public fullName!: string;
  public shortName!: string;
  public description!: string | null;
  public buyDate!: Date;
  public boughtFor!: number;
  public source!: string;
  public condition!: string;
  public suggestedValue!: number | null;
}

Item.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  shortName: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: new DataTypes.STRING(255),
    allowNull: true
  },
  buyDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  boughtFor: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  source: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  condition: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  suggestedValue: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'Item',
});

export default Item;