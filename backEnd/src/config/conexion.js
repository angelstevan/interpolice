import mysql2 from 'mysql2/promise';

const conexion = await mysql2.createConnection({

    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD

});

export default conexion;