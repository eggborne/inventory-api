import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Listing extends Model {
  public id!: number;
  public sellVenue!: string;
  public listDate!: Date;
  public listPrice!: number;
  public sellPrice!: number | null;
  public sellDate!: Date | null;
}

Listing.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  sellVenue: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  listDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  listPrice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  sellPrice: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  sellDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Listing',
});

export default Listing;
