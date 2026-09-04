const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/page.tsx';
let code = fs.readFileSync(path, 'utf8');

const targetStr = `      if (Array.isArray(data)) {
        setCourses(data);
        
        // Hitung statistik
        let computedModuls = 0;
        let computedMins = 0;
        data.forEach(enr => {
          const stored = localStorage.getItem(\`completed_subs_\${enr.id}\`);`;

const replaceStr = `      if (Array.isArray(data)) {
        // Hitung statistik
        let computedModuls = 0;
        let computedMins = 0;
        data.forEach(enr => {
          const stored = localStorage.getItem(\`completed_subs_\${enr.id}\`);`;

code = code.replace(targetStr, replaceStr);
code = code.replace(targetStr.replace(/\r\n/g, '\n'), replaceStr.replace(/\r\n/g, '\n'));

const targetStr2 = `              if (Array.isArray(parsedDesc.chapters)) {
                parsedDesc.chapters.forEach((ch: any) => {
                  let isBabSelesai = true;
                  let hasSub = false;
                  if (Array.isArray(ch.subChapters)) {
                    ch.subChapters.forEach((s: any) => {
                      hasSub = true;
                      if (!subs.includes(s.id?.toString())) isBabSelesai = false;
                      if (subs.includes(s.id?.toString())) {
                        computedMins += parseInt(s.duration || '10');
                      }
                    });
                  }
                  if (hasSub && isBabSelesai) computedModuls++;
                });
              }`;

const replaceStr2 = `              let totalSubs = 0;
              if (Array.isArray(parsedDesc.chapters)) {
                parsedDesc.chapters.forEach((ch: any) => {
                  let isBabSelesai = true;
                  let hasSub = false;
                  if (Array.isArray(ch.subChapters)) {
                    totalSubs += ch.subChapters.length;
                    ch.subChapters.forEach((s: any) => {
                      hasSub = true;
                      if (!subs.includes(s.id?.toString())) isBabSelesai = false;
                      if (subs.includes(s.id?.toString())) {
                        computedMins += parseInt(s.duration || '10');
                      }
                    });
                  }
                  if (hasSub && isBabSelesai) computedModuls++;
                });
              }
              
              if (totalSubs > 0) {
                 const newProgress = Math.round((subs.length / totalSubs) * 100);
                 enr.progress = newProgress;
                 if (newProgress < 100) {
                   enr.status = 'active';
                   enr.isCompleted = false;
                 } else {
                   enr.status = 'completed';
                   enr.isCompleted = true;
                 }
              }`;

code = code.replace(targetStr2, replaceStr2);
code = code.replace(targetStr2.replace(/\r\n/g, '\n'), replaceStr2.replace(/\r\n/g, '\n'));

const targetStr3 = `        setTotalModul(computedModuls);
        setTotalJam(Math.round(computedMins / 60));`;

const replaceStr3 = `        setCourses([...data]);
        setTotalModul(computedModuls);
        setTotalJam(Math.round(computedMins / 60));`;

code = code.replace(targetStr3, replaceStr3);
code = code.replace(targetStr3.replace(/\r\n/g, '\n'), replaceStr3.replace(/\r\n/g, '\n'));

fs.writeFileSync(path, code);
console.log('done');
