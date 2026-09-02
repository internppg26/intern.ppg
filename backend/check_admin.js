const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.all('SELECT email, password FROM users WHERE email="admin@gmail.com"', (err, rows) => {
  console.log(rows);
});
