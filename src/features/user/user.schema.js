import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../config/postgresDB.js";


const User = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
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


export default User;
