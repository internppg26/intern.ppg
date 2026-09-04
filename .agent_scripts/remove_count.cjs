const fs = require('fs');
const path = 'frontend/app/(admin)/admin/courses/page.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  /<div className="flex items-center gap-2 text-\\[#E5832E\\] font-bold text-xs">[\s\S]*?\{prog\.count\} pelatihan\s*<\/div>/,
  ''
);
content = content.replace(
  /<div className="flex items-center justify-between pt-4 border-t border-neutral-200">/,
  '<div className="flex items-center justify-end pt-4 border-t border-neutral-200">'
);
fs.writeFileSync(path, content);
console.log('done');
