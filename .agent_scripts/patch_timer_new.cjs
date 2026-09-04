const fs = require('fs');
const f = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(f, 'utf8');

const regex = /const StudentQuiz = \(\{ chapterId, subChapter \}: \{ chapterId: any, subChapter: any \}\) => \{/;

code = code.replace(regex, `const StudentQuiz = ({ chapterId, subChapter, onComplete }: { chapterId: any, subChapter: any, onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = React.useState((subChapter.duration || 15) * 60);
`);

code = code.replace('const [quizStarted, setQuizStarted] = React.useState(false);', 
`const [quizStarted, setQuizStarted] = React.useState(false);
  
  React.useEffect(() => {
    if (!quizStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, submitted]);

  // When auto-submitted by timer, calculate score
  React.useEffect(() => {
    if (submitted && timeLeft === 0) {
      let correct = 0;
      const questions = subChapter.quizQuestions || [];
      questions.forEach((q: any, idx: number) => {
        const selectedId = answers[idx];
        const selectedOpt = q.options.find((o: any) => o.id === selectedId);
        if (selectedOpt && selectedOpt.isCorrect) correct++;
      });
      setScore(Math.round((correct / questions.length) * 100));
      if (onComplete) onComplete();
    }
  }, [submitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
  };
`);

// Also call onComplete when manual submit
code = code.replace(
  'setSubmitted(true);',
  'setSubmitted(true);\n    if (onComplete) onComplete();'
);

// Display the timer
code = code.replace(
  '<div className="h-2 bg-neutral-100 rounded-full flex-1 overflow-hidden">',
  `<div className="font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full tabular-nums shrink-0 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {formatTime(timeLeft)}
        </div>
        <div className="h-2 bg-neutral-100 rounded-full flex-1 overflow-hidden">`
);

// Allow passing onComplete from parent component where StudentQuiz is instantiated
code = code.replace(
  '<StudentQuiz chapterId={chapters.find(c => c.subChapters.some((s:any) => s.id === activeSubChapter.id))?.id} subChapter={activeSubChapter} />',
  '<StudentQuiz chapterId={chapters.find(c => c.subChapters.some((s:any) => s.id === activeSubChapter.id))?.id} subChapter={activeSubChapter} onComplete={() => {\n                  // Mark as complete in local state so the checkmark updates immediately\n                  setCompletedSubs(prev => Array.from(new Set([...prev, activeSubChapter.id?.toString()])));\n                }} />'
);


fs.writeFileSync(f, code);
console.log('Patched timer');
