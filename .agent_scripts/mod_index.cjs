const fs = require('fs');
const file = 'backend/index.js';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /start\(\)\.catch\(err => console\.error\('Start failed:', err\)\);/,
  `
if (require.main === module) {
  start().catch(err => console.error('Start failed:', err));
} else {
  // Required for Vercel
  db.sequelize.sync({ alter: false }).catch(err => console.error('DB Sync Error:', err));
}
module.exports = app;
`
);

fs.writeFileSync(file, code);
console.log('Modified index.js for Vercel');
