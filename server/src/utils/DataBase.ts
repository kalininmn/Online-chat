import mysql from 'mysql2';
import env from '../consts/env';

const dbInstance = mysql.createConnection({
  host: env.DB_HOST,
  database: 'OnlineChat',
  user: 'root',
  password: '123',
});

export default dbInstance;