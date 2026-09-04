const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  '    return (\n      <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">\n        \n        {/* Sidebar - Read Only */}',
  '    const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\n    return (\n      <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">\n        \n        {/* Sidebar - Read Only */}'
);

code = code.replace(
  '    return (\r\n      <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">\r\n        \r\n        {/* Sidebar - Read Only */}',
  '    const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);\r\n    return (\r\n      <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">\r\n        \r\n        {/* Sidebar - Read Only */}'
);

fs.writeFileSync(path, code);
console.log('done');
