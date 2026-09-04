const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Remove all instances of the wrong placement
code = code.replace(/\s*const allSubChapters = chapters\.flatMap\(ch => ch\.subChapters \|\| \[\]\);/g, '');

// 2. Put it right before the main return statement
code = code.replace(
  '  return (\n    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">',
  '  const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n  return (\n    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">'
);

fs.writeFileSync(path, code);
console.log('done');
