import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgresDB.js";

const Order = sequelize.define('Order', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    items: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
    },
});

// try {
//     await sequelize.sync();
//     console.log('Model synced with the database.');
// } catch (error) {
//     console.error('Error syncing model with the Carts table:', error);
// }


export default Order;