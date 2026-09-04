const fs = require('fs');
const f = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');
  if (!code.includes('certificateUrl')) {
    code = code.replace(/const \[price, setPrice\] = useState\(''\);/, "const [price, setPrice] = useState('');\n  const [certificateUrl, setCertificateUrl] = useState('');");
    code = code.replace(/setPrice\(parsed\.price \|\| ''\);/, "setPrice(parsed.price || '');\n          setCertificateUrl(parsed.certificateUrl || '');");
    code = code.replace(/setPrice\(state\.price\);/, "setPrice(state.price);\n    setCertificateUrl(state.certificateUrl || '');");
    code = code.replace(/about, price, instructorName/, "about, price, certificateUrl, instructorName");
    code = code.replace(/about,\s*price,/, "about,\n      price,\n      certificateUrl,");
    
    const includesRegex = /(<div className=\"flex items-center gap-3 text-sm text-neutral-600\">\s*<svg.*?<\/svg>\s*E-Certificate\s*<\/div>\s*<\/div>)/;
    const uiInsert = "\n\n                <div className=\"mt-6 border-t border-neutral-100 pt-6\">\n                  <p className=\"text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wider\">Link Sertifikat Course</p>\n                  <input type=\"text\" placeholder=\"https://drive.google.com/...\" className=\"w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark\" value={certificateUrl} onChange={e => setCertificateUrl(e.target.value)} onBlur={commitHistory} />\n                  <p className=\"text-xs text-neutral-400 mt-2\">Link ini akan muncul di halaman E-Certificate peserta jika kursus sudah diselesaikan 100%.</p>\n                </div>";
    
    code = code.replace(includesRegex, "\" + uiInsert);
    fs.writeFileSync(f, code);
    console.log('Patched ' + f);
  } else {
    console.log('Already patched ' + f);
  }
}
