const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.all('SELECT email FROM users', (err, rows) => {
  console.log(rows);
});
