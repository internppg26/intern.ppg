const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Remove the wrongly placed line
code = code.replace('    const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n    return () => clearInterval(timer);', '    return () => clearInterval(timer);');

// 2. Put it in the correct place, right before the main return statement
code = code.replace(
  '  return (\n    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">',
  '  const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n  return (\n    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">'
);

fs.writeFileSync(path, code);
console.log('done');
