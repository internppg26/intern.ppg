const fs = require('fs');
const files = [
  'frontend/app/(admin)/admin-course/[id]/[bidangId]/[courseId]/material/page.tsx',
  'frontend/app/(instructor)/coach-course/[id]/material/page.tsx'
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Find all cases of the input className for sub.title
  code = code.replace(
    /className=\{\`font-bold w-full bg-transparent focus:outline-none \$\{[^\}]+\}\`\}/g,
    "className={`font-bold w-full bg-transparent focus:outline-none ${(!isOverviewActive && sub.isActive) ? 'text-white' : 'text-[#0B2545]'}`}"
  );

  // Let's also check the wrapper div to ensure it sets text-white
  code = code.replace(
    /className=\{\`border rounded-lg p-3 flex justify-between items-center text-xs cursor-pointer transition-colors group \$\{[^\}]+\}\`\}/g,
    "className={`border rounded-lg p-3 flex justify-between items-center text-xs cursor-pointer transition-colors group ${(!isOverviewActive && sub.isActive) ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-white border-neutral-200 text-[#0B2545] hover:bg-neutral-50'}`}"
  );
  
  fs.writeFileSync(file, code);
}
console.log('done');
