import { DataTypes } from "sequelize";

import { sequelize } from "../../config/postgresDB.js";

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// try {
//   await sequelize.sync();
//   console.log('Model synced with the database.');
// } catch (error) {
//   console.error('Error syncing model with the database:', error);
// }

export default Product;