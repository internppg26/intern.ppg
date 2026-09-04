
const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);')) {
  // Let's insert it inside the sidebar div if nothing else works. Actually we just need to put it inside the render
  // Let's find exactly this line:
  // {ch.subChapters.map((sub: any, sIdx: number) => {
  // and insert it right before that.
  code = code.replace(
    /\\{ch\\.subChapters\\.map\\(\\(sub: any, sIdx: number\\) => \\{/g,
    'const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n                    {ch.subChapters.map((sub: any, sIdx: number) => {'
  );
}

fs.writeFileSync(path, code);
console.log('done');

