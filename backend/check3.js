const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.get('SELECT * FROM users WHERE email="ruzqifahrudieen@student.ub.ac.id"', (err, row) => {
  console.log(Object.keys(row));
  console.log("Avatar string starts with:", row.avatar ? row.avatar.substring(0, 50) : "null");
});
