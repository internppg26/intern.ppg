const fs = require('fs');
const file = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';

let code = fs.readFileSync(file, 'utf8');

// Replace handleImageUpload function properly
code = code.replace(
  /const handleImageUpload = \(\) => \{[\s\S]*?\}\s*\};\s*/,
  `const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructorImage(reader.result as string);
        commitHistory();
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  `
);

fs.writeFileSync(file, code);
console.log('done');
