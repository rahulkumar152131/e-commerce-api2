
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../config/postgresDB.js";


const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// try {
//     await sequelize.sync();
//     console.log('Model synced with the database.');
//   } catch (error) {
//     console.error('Error syncing model with the database:', error);
//   }

export default Category;