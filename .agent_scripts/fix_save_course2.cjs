const fs = require('fs');
const path = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';
let code = fs.readFileSync(path, 'utf8');

const regex = /const handleSimpanDetail = async \(\) => \{[\s\S]*?method: 'PUT',\s*headers: \{\s*(?=\/\/ Handle Image)/;

const newCode = `const handleSimpanDetail = async () => {
    try {
      const payload = {
        isPublished: isOpen,
        description: JSON.stringify({
          about, price, certificateUrl, instructorName, instructorRole, instructorImage, learnItems, chapters
        })
      };
      
      const res = await fetch(\`/api/programs/\${params?.id}\`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${localStorage.getItem('token')}\`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert("Detail Course berhasil disimpan!");
      } else {
        const errText = await res.text();
        console.error("Save error:", res.status, errText);
        alert("Gagal menyimpan detail course: " + res.status + " " + errText);
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan.");
    }
  };\n\n  `;

code = code.replace(regex, newCode);
fs.writeFileSync(path, code);
console.log('done');
