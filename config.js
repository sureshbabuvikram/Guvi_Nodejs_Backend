import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const connection=mysql.createPool({    
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME 
})

  export default connection;