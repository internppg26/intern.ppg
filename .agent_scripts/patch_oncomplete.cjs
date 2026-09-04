const fs = require('fs');
const f = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(f, 'utf8');

code = code.replace(
  /onComplete=\{\(\) => \{\s*\/\/[^\n]*\s*setCompletedSubs\(prev => Array\.from\(new Set\(\[\.\.\.prev, activeSubChapter\.id\?\.toString\(\)\]\)\)\);\s*\}\}/g,
  'onComplete={() => handleComplete(activeSubChapter.id?.toString())}'
);

fs.writeFileSync(f, code);
console.log('Patched onComplete');
