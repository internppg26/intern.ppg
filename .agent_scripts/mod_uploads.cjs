const fs = require('fs');

const coachFile = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';
const adminFile = 'frontend/app/(admin)/admin/courses/[id]/[bidangId]/[courseId]/page.tsx';

function modifyFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Insert import at the top
  if (!code.includes('createClient')) {
    code = code.replace(
      /^import\s+.*?(from|')/m,
      "import { createClient } from '@supabase/supabase-js';\n$&"
    );
  }
  
  // Replace handleImageUpload
  code = code.replace(
    /const handleImageUpload = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{[\s\S]*?reader\.readAsDataURL\(file\);\s*\}\s*\};/,
    `const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = \`\${Math.random()}.\${fileExt}\`;
      const filePath = \`instructor-profiles/\${fileName}\`;

      try {
        const { error } = await supabase.storage
          .from('uploads')
          .upload(filePath, file);

        if (error) {
          throw error;
        }

        const { data } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath);

        setInstructorImage(data.publicUrl);
        commitHistory();
        alert('Foto berhasil diunggah ke Supabase!');
      } catch (error: any) {
        alert('Gagal mengunggah foto: ' + error.message);
      }
    };`
  );

  fs.writeFileSync(filePath, code);
  console.log('Modified', filePath);
}

modifyFile(coachFile);
modifyFile(adminFile);
