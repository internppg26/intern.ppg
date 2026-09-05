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
  let code = fs.readFileSync(file, 'utf8');

  // Insert import if not exists
  if (!code.includes('uploadToSupabase')) {
    // Some pages might not have a relative path correctly, so we'll use an absolute-ish or relative based on depth
    const depth = file.split('/').length - 3; // 'frontend/app/' is 2
    let relativePrefix = '';
    for(let i=0; i<depth; i++) relativePrefix += '../';
    
    code = code.replace(
      /^import\s+.*?(from|')/m,
      `import { uploadToSupabase } from '${relativePrefix}utils/supabaseUpload';\n$&`
    );
  }

  // Replace FileReader pattern
  // Usually it looks like:
  // const reader = new FileReader();
  // reader.onloadend = () => {
  //   setSomething(reader.result as string);
  // };
  // reader.readAsDataURL(file);
  
  // We need to replace it with:
  // try {
  //   const url = await uploadToSupabase(file, 'uploads', 'some_folder');
  //   setSomething(url);
  // } catch(e) { alert('Upload failed') }

  // Since each file has a different state setter, we can regex it carefully
  code = code.replace(
    /const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*(set[A-Za-z0-9_]+)\(reader\.result as string\);\s*\}\s*;\s*reader\.readAsDataURL\(file\);/g,
    `try {
        const url = await uploadToSupabase(file, 'uploads', 'general');
        $1(url);
      } catch (err: any) {
        alert('Gagal mengupload file: ' + err.message);
      }`
  );
  
  // Some files might not have "as string"
  code = code.replace(
    /const reader = new FileReader\(\);\s*reader\.onloadend = \(\) => \{\s*(set[A-Za-z0-9_]+)\(reader\.result\);\s*\}\s*;\s*reader\.readAsDataURL\(file\);/g,
    `try {
        const url = await uploadToSupabase(file, 'uploads', 'general');
        $1(url);
      } catch (err: any) {
        alert('Gagal mengupload file: ' + err.message);
      }`
  );

  fs.writeFileSync(file, code);
  console.log('Modified', file);
}
