const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.serialize(() => {
  db.run("ALTER TABLE users ADD COLUMN instansi VARCHAR(255);", (err) => {
    if (err) console.log("instansi col err:", err.message);
    else console.log("instansi col added");
  });
  db.run("ALTER TABLE users ADD COLUMN avatar TEXT;", (err) => {
    if (err) console.log("avatar col err:", err.message);
    else console.log("avatar col added");
  });
});
