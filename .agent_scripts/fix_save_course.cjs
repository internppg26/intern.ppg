const fs = require('fs');
const path = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// I need to add back the deleted lines exactly where they belong
const target = `      const res = await fetch(\`/api/programs/\${params?.id}\`, {
        method: 'PUT',
        headers: {`;

const insertStr = `      const res = await fetch(\`/api/programs/\${params?.id}\`, {
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
  };`;

code = code.replace(target, insertStr);

fs.writeFileSync(path, code);
console.log('done');
