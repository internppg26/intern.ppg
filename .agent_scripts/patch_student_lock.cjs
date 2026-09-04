
const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add allSubChapters computation
code = code.replace(
  'return (',
  'const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n  return ('
);

// 2. Add isUnlocked logic inside the map
code = code.replace(
  '{ch.subChapters.map((sub: any, sIdx: number) => {',
  '{ch.subChapters.map((sub: any, sIdx: number) => {\n                      const globalIndex = allSubChapters.findIndex(s => s.id === sub.id);\n                      const isUnlocked = globalIndex === 0 || completedSubs.includes(allSubChapters[globalIndex - 1]?.id.toString());'
);

// 3. Update the onClick and className to disable if locked
code = code.replace(
  'onClick={() => selectSubChapter(sub)}',
  'onClick={() => { if (isUnlocked) selectSubChapter(sub); }}'
);

code = code.replace(
  'hover:bg-neutral-50 text-neutral-600 border-transparent\'',
  'hover:bg-neutral-50 text-neutral-600 border-transparent\'\n                          } '
);

// 4. Optionally show a lock icon instead of the normal icon if it's locked
// actually let's just leave the opacity change for now, it's simpler.

fs.writeFileSync(path, code);
console.log('done');

