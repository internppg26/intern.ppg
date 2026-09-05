const fs = require('fs');

const files = [
  'frontend/app/(admin)/admin/cms/page.tsx',
  'frontend/app/(admin)/admin/courses/[id]/[bidangId]/page.tsx',
  'frontend/app/(admin)/admin/profile/page.tsx',
  'frontend/app/(admin)/admin-cms/[id]/page.tsx',
  'frontend/app/(instructor)/coach/profile/page.tsx',
  'frontend/app/(student)/dashboard/payment/[id]/page.tsx',
  'frontend/app/(student)/dashboard/profile/page.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    
    const parts = file.split('frontend/')[1].split('/');
    const depth = parts.length - 1; 
    let relative = '';
    for(let i=0; i<depth; i++) relative += '../';
    relative += 'utils/supabaseUpload';
    
    code = code.replace(/import \{ uploadToSupabase \} from '.*?';/g, `import { uploadToSupabase } from '${relative}';`);
    
    fs.writeFileSync(file, code);
    console.log('Fixed import in', file);
  }
}
