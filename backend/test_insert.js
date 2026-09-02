const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.run(`INSERT INTO articles (title, content, authorId, category, thumbnail, status, views, createdAt, updatedAt, isTopNews) VALUES ('Test', 'Test', 1, 'NEWS', '', 'draft', 0, '2026-09-02', '2026-09-02', 0)`, (err) => {
  if (err) console.log(err);
  else console.log('success');
});
