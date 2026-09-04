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
  /width: `\$\{enrollment\.progress \|\| 0\}%`/g,
  'width: (() => { const ls = typeof window !== "undefined" ? localStorage.getItem("completed_subs_" + enrollment.id) : null; if (ls && enrollment.program?.description) { try { const parsed = JSON.parse(ls); const desc = JSON.parse(enrollment.program.description); let total = 0; if (desc.chapters) { desc.chapters.forEach((c:any) => { total += c.subChapters?.length || 0 }); } if (total > 0) return Math.round((parsed.length / total) * 100) + "%"; } catch(e) {} } return (enrollment.progress || 0) + "%"; })()'
);

// Also, the list of finished courses should be filtered properly!
// Wait, my-courses page separates them by enrollment.progress === 100
code = code.replace(
  /const activeCourses = enrollments\.filter\(\(e: any\) => e\.progress < 100\);/g,
  `const activeCourses = enrollments.filter((e: any) => { const ls = typeof window !== "undefined" ? localStorage.getItem("completed_subs_" + e.id) : null; if (ls && e.program?.description) { try { const parsed = JSON.parse(ls); const desc = JSON.parse(e.program.description); let total = 0; if (desc.chapters) { desc.chapters.forEach((c:any) => { total += c.subChapters?.length || 0 }); } if (total > 0) return parsed.length < total; } catch(err) {} } return e.progress < 100; });`
);

code = code.replace(
  /const completedCourses = enrollments\.filter\(\(e: any\) => e\.progress === 100\);/g,
  `const completedCourses = enrollments.filter((e: any) => { const ls = typeof window !== "undefined" ? localStorage.getItem("completed_subs_" + e.id) : null; if (ls && e.program?.description) { try { const parsed = JSON.parse(ls); const desc = JSON.parse(e.program.description); let total = 0; if (desc.chapters) { desc.chapters.forEach((c:any) => { total += c.subChapters?.length || 0 }); } if (total > 0) return parsed.length >= total; } catch(err) {} } return e.progress === 100; });`
);

fs.writeFileSync(f, code);
console.log("Patched my-courses page");
