import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'Anupaksh@123#',
  database: 'porter_db'
});

console.log('✅ MySQL connected successfully');
export default db;