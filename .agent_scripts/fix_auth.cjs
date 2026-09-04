const fs = require('fs');
const path = 'backend/routes/enrollment.js';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  /authorize\('admin'\)/g,
  "authorize('admin', 'superadmin')"
);

fs.writeFileSync(path, code);
console.log('done');
