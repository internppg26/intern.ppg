const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.serialize(() => {
  db.run("ALTER TABLE articles ADD COLUMN isTopNews BOOLEAN DEFAULT 0;", (err) => {
    if (err) console.log("isTopNews col err:", err.message);
    else console.log("isTopNews col added successfully.");
  });
});
