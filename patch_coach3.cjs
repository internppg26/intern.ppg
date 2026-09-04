const fs = require('fs');
const f = 'frontend/app/(instructor)/coach/course/[id]/page.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');
  if (!code.includes('Link Sertifikat Course')) {
    const uiInsert = "\n\n                <div className=\"mt-6 border-t border-neutral-100 pt-6\">\n                  <p className=\"text-xs font-bold text-[#0B2545] mb-2 uppercase tracking-wider\">Link Sertifikat Course</p>\n                  <input type=\"text\" placeholder=\"https://drive.google.com/...\" className=\"w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#0B2545] focus:ring-1 focus:ring-[#0B2545]\" value={certificateUrl} onChange={e => setCertificateUrl(e.target.value)} onBlur={commitHistory} />\n                  <p className=\"text-xs text-neutral-400 mt-2\">Link ini akan muncul di halaman E-Certificate peserta jika kursus sudah diselesaikan 100%.</p>\n                </div>";
    
    // find {pdfCount} PDF </div>
    const regex = /({pdfCount} PDF\s*<\/div>\s*<\/div>\s*<\/div>)/;
    code = code.replace(regex, "{pdfCount} PDF\n                  </div>" + uiInsert + "\n                </div>\n              </div>");
    fs.writeFileSync(f, code);
    console.log('Patched Coach UI');
  } else {
    console.log('Already patched');
  }
}
