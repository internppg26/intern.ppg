const fs = require('fs');
let config = fs.readFileSync('frontend/next.config.ts', 'utf8');
config = config.replace(
  'destination: "http://localhost:5000/api/:path*",',
  'destination: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` : "http://localhost:5000/api/:path*",'
);
fs.writeFileSync('frontend/next.config.ts', config);
console.log('Updated next.config.ts');
