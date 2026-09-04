const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);')) {
  code = code.replace(
    '{ch.subChapters.map((sub: any, sIdx: number) => {',
    'const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n                    {ch.subChapters.map((sub: any, sIdx: number) => {'
  );
}

fs.writeFileSync(path, code);
console.log('done');
