const fs = require('fs');
const f = 'backend/routes/program.js';
let code = fs.readFileSync(f, 'utf8');
code = code.replace(/req\.user\.role !== 'admin'/g, "req.user.role !== 'admin' && req.user.role !== 'superadmin'");
fs.writeFileSync(f, code);
