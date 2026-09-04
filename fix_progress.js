const { Program, Enrollment } = require('./backend/models');
const recalculateProgress = async () => {
  const enrollments = await Enrollment.findAll({ include: ['program'] });
  for (const enr of enrollments) {
    if (!enr.program || !enr.program.description) continue;
    let totalSubs = 0;
    try {
      const desc = JSON.parse(enr.program.description);
      if (desc.chapters) {
        desc.chapters.forEach(ch => {
          if (Array.isArray(ch.subChapters)) {
            totalSubs += ch.subChapters.length;
          }
        });
      }
    } catch(e) {}
    
    // Check completed subs in frontend localStorage? No, we don't have access to frontend localStorage in backend.
    // Wait! The backend DOES NOT store completedSubs! 
    // It only stores progress (integer 0-100).
    // Oh my god. The original developer stored completedSubs in FRONTEND localStorage, and just sent progress: 100 to the backend.
  }
};
recalculateProgress();
