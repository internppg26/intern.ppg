const fs = require('fs');
const path = 'frontend/app/(admin)/admin/courses/[id]/[bidangId]/page.tsx';
let code = fs.readFileSync(path, 'utf8');

const mappingCode = `  const getParentProgramName = () => {
    const map: Record<string, string> = {
      '1': 'Corporate Program',
      '2': 'Government Program',
      '3': 'Educational Program',
      '4': 'Certification Program',
      '5': 'Entrepreneurial Program',
      '6': 'Public Training & In House Program'
    };
    return map[params?.id as string] || 'Corporate Program';
  };`;

code = code.replace(
  /const getParentProgramName = \(\) => \{[\s\S]*?return 'Corporate Program'; \/\/ fallback\n    \};/,
  mappingCode
);

fs.writeFileSync(path, code);
console.log('done');
