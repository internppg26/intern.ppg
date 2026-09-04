const fs = require('fs');
const files = [
  'frontend/app/(admin)/admin/courses/[id]/[bidangId]/[courseId]/page.tsx',
  'frontend/app/(instructor)/coach/course/[id]/page.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');

  // Ensure useRef is imported
  if (!code.includes('useRef')) {
    code = code.replace(/import React, \{([^\}]+)\} from 'react';/, "import React, { $1, useRef } from 'react';");
    if (!code.includes('useRef')) {
      code = code.replace(/import \{([^\}]+)\} from 'react';/, "import { $1, useRef } from 'react';");
    }
  }

  // Add the file input ref
  if (!code.includes('const fileInputRef = useRef')) {
    code = code.replace(/const \[instructorImage, setInstructorImage\] = useState[^\n]+\n/, 
      "const [instructorImage, setInstructorImage] = useState<string | null>(null);\n    const fileInputRef = useRef<HTMLInputElement>(null);\n");
  }

  // Replace handleImageUpload function
  code = code.replace(
    /const handleImageUpload = \(\) => \{[\s\S]*?\}\s*\};\s*return \(/,
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

    return (`
  );

  // Replace onClick={handleImageUpload} with handleTriggerUpload and add hidden input
  code = code.replace(
    /onClick=\{handleImageUpload\}/,
    `onClick={handleTriggerUpload}`
  );
  
  if (!code.includes('type="file"') && !code.includes('ref={fileInputRef}')) {
     code = code.replace(
      /(<button[^>]+onClick=\{handleTriggerUpload\}[^>]*>)/,
      "<input type=\"file\" ref={fileInputRef} onChange={handleImageUpload} accept=\"image/*\" className=\"hidden\" />\n                  $1"
    );
  }

  fs.writeFileSync(file, code);
}
console.log('done');
