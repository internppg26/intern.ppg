const fs = require('fs');
const f = 'frontend/app/(instructor)/coach-course/[id]/material/page.tsx';
let code = fs.readFileSync(f, 'utf8');
code = code.replace(/alert\("Gagal menyimpan kuis\."\);/g, 'alert("Gagal menyimpan kuis. Status: " + res.status + " " + await res.text());');
fs.writeFileSync(f, code);
