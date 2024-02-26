import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL);

async function connectUsingSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { connectUsingSequelize, sequelize };

// try {
//     let category = [
//         { name: 'electronics' },
//         { name: 'men-s-wear' },
//         { name: 'women-s-wear' },
//         { name: 'jewellery' },
//     ]
//     const insertedProducts = await Category.bulkCreate(category);
// } catch (err) {
//     console.error('Error inserting products:', err);

// }


// async function insertProducts() {
//     try {
//         // Create an array of 10 product data
//         const productsData = Array.from({ length: 10 }, (_, index) => ({
//             name: `Product ${index + 1}`,
//             desc: `Description for Product ${index + 1}`,
//             price: Math.floor(Math.random() * 1000),  // Random price for each product
//             available: Math.floor(Math.random() * 20),  // Random availability for each product
//         }));

//         // Bulk insert the products into the database
//         console.log(productsData);
//         const insertedProducts = await Product.bulkCreate(productsData);

//         console.log('Products inserted successfully:', insertedProducts.map(product => product.toJSON()));
//     } catch (error) {
//         console.error('Error inserting products:', error);
//     }
// }

// Call the function to insert products
