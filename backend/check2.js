const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.all('SELECT email, length(avatar) as avatar_len FROM users WHERE email="ruzqifahrudieen@student.ub.ac.id"', (err, rows) => {
  console.log(rows);
});
