const fs = require('fs');
const f = 'frontend/app/(student)/dashboard/my-courses/page.tsx';
let code = fs.readFileSync(f, 'utf8');

// Replace {enrollment.progress || 0}% with dynamic calculation if available
code = code.replace(
  /\{enrollment\.progress \|\| 0\}%/g,
  '{(() => { const ls = typeof window !== "undefined" ? localStorage.getItem("completed_subs_" + enrollment.id) : null; if (ls && enrollment.program?.description) { try { const parsed = JSON.parse(ls); const desc = JSON.parse(enrollment.program.description); let total = 0; if (desc.chapters) { desc.chapters.forEach((c:any) => { total += c.subChapters?.length || 0 }); } if (total > 0) return Math.round((parsed.length / total) * 100) + "%"; } catch(e) {} } return (enrollment.progress || 0) + "%"; })()}'
);

// Also replace the style width
code = code.replace(
  /width: \\$\{\{enrollment\.progress \|\| 0\}\}%\/g, // wait the template string is ${enrollment.progress || 0}%
  'width: (() => { const ls = typeof window !== "undefined" ? localStorage.getItem("completed_subs_" + enrollment.id) : null; if (ls && enrollment.program?.description) { try { const parsed = JSON.parse(ls); const desc = JSON.parse(enrollment.program.description); let total = 0; if (desc.chapters) { desc.chapters.forEach((c:any) => { total += c.subChapters?.length || 0 }); } if (total > 0) return Math.round((parsed.length / total) * 100) + "%"; } catch(e) {} } return (enrollment.progress || 0) + "%"; })()'
);

fs.writeFileSync(f, code);
console.log("Patched my-courses page");
