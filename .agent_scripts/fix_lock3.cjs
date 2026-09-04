const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  'return `<div class="p-4 bg-neutral-100 rounded-lg text-sm text-neutral-500 break-all"><a href="${content}" target="_blank" class="text-blue-500 hover:underline">Buka Tautan: ${content}</a></div>`;\n  };',
  'return `<div class="p-4 bg-neutral-100 rounded-lg text-sm text-neutral-500 break-all"><a href="${content}" target="_blank" class="text-blue-500 hover:underline">Buka Tautan: ${content}</a></div>`;\n  };\n\n  const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);'
);

fs.writeFileSync(path, code);
console.log('done');
