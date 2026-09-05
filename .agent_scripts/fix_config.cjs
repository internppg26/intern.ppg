const fs = require('fs');
let code = fs.readFileSync('backend/config/config.js', 'utf8');

code = code.replace(
  /dialect: 'postgres',/g,
  `dialect: 'postgres',
    dialectModule: require('pg'),`
);

fs.writeFileSync('backend/config/config.js', code);
console.log('Fixed config.js for Vercel pg require');
