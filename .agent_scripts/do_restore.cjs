const fs = require('fs');
const f = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(f, 'utf8');

const studentQuizComponent = 
const StudentQuiz = ({ chapterId, subChapter, onComplete }: { chapterId: any, subChapter: any, onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = React.useState((subChapter.duration || 15) * 60);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const questions = subChapter.quizQuestions || [];
  const introDesc = subChapter.quizIntroDesc || 'Sesi ini dirancang untuk mengukur pemahaman Anda mengenai materi ini.';
  const instructions = subChapter.quizInstructions || 'Terdapat beberapa pertanyaan pilihan ganda.';

  React.useEffect(() => {
    if (!quizStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit
          setSubmitted(true);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, submitted, onComplete]);

  // When auto-submitted by timer, calculate score
  React.useEffect(() => {
    if (submitted) {
      let correct = 0;
      questions.forEach((q: any, idx: number) => {
        const selectedId = answers[idx];
        const selectedOpt = q.options.find((o: any) => o.id === selectedId);
        if (selectedOpt && selectedOpt.isCorrect) correct++;
      });
      setScore(Math.round((correct / questions.length) * 100));
    }
  }, [submitted, answers, questions]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \\\\:\\\\;
  };

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [activeIndex]: optId });
  };

  const handleNext = () => {
    if (activeIndex < questions.length - 1) setActiveIndex(activeIndex + 1);
  };
  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) onComplete();
  };

  if (!questions || questions.length === 0) {
    return <div className="text-neutral-500 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">Kuis ini belum memiliki soal.</div>;
  }

  if (!quizStarted) {
    return (
      <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-sm border border-neutral-200">
        <h2 className="text-3xl font-black text-[#0B2545] mb-6">Selamat Datang di Sesi {subChapter.title}</h2>
        <p className="text-neutral-600 mb-10 text-lg leading-relaxed">{introDesc}</p>

        <div className="border border-neutral-200 rounded-3xl p-8 bg-neutral-50/50 mb-12">
          <div className="flex items-center gap-3 font-bold text-[#D47225] mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Petunjuk Pengerjaan:
          </div>
          <ul className="text-neutral-600 space-y-4 list-disc list-outside ml-5">
            <li>{instructions}</li>
            <li>Waktu pengerjaan: {subChapter.duration} menit.</li>
            <li>Klik tombol "Mulai Quiz" untuk memulai pengerjaan.</li>
          </ul>
        </div>

        <div className="flex justify-between items-center border-t border-neutral-100 pt-8">
          <div className="flex gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D47225]/10 flex items-center justify-center text-[#D47225]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Durasi</div>
                <div className="font-bold text-[#0B2545]">{subChapter.duration} Menit</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D47225]/10 flex items-center justify-center text-[#D47225]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Jumlah Soal</div>
                <div className="font-bold text-[#0B2545]">{questions.length} Soal</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setQuizStarted(true)}
            className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-4 px-10 rounded-full transition-colors flex items-center gap-2"
          >
            MULAI QUIZ <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    );
  }

  const q = questions[activeIndex];
  const progressPercent = ((activeIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-sm border border-neutral-200">
      
      {/* Progress Bar & Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="text-sm font-bold text-[#0B2545] shrink-0 uppercase tracking-widest">
          SOAL {activeIndex + 1} DARI {questions.length}
        </div>
        <div className="font-bold text-red-500 bg-red-50 px-4 py-2 rounded-full tabular-nums shrink-0 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {formatTime(timeLeft)}
        </div>
        <div className="h-2 bg-neutral-100 rounded-full flex-1 overflow-hidden">
          <div className="h-full bg-[#003855] transition-all duration-300" style={{ width: \\\\%\\\ }}></div>
        </div>
      </div>
      
      {submitted && (
        <div className={\\\p-6 rounded-2xl mb-12 border-2 \\\\}>
          <h4 className="font-black text-2xl mb-2 text-center">Nilai Anda: {score}</h4>
          <p className="text-center font-medium">{score >= 70 ? '🎉 Selamat! Anda lulus kuis ini.' : 'Maaf, Anda belum lulus kuis ini. Tetap semangat!'}</p>
        </div>
      )}

      <div className="min-h-[400px]">
        {/* Render blocks (text/question) */}
        <div className="mb-10">
          {q.blocks.map((b: any) => (
            <p key={b.id} className="text-xl lg:text-2xl font-bold text-[#0B2545] leading-relaxed mb-6">{b.content}</p>
          ))}
        </div>

        {/* Options */}
        <div className="space-y-4">
          {q.options.map((opt: any) => {
            const isSelected = answers[activeIndex] === opt.id;
            let optionStyle = 'border-neutral-200 hover:border-[#0B2545] text-neutral-700';
            
            if (submitted) {
              if (opt.isCorrect) optionStyle = 'border-green-500 bg-green-50 text-green-700 font-bold shadow-[0_0_0_1px_rgba(34,197,94,1)]';
              else if (isSelected && !opt.isCorrect) optionStyle = 'border-red-500 bg-red-50 text-red-700 shadow-[0_0_0_1px_rgba(239,68,68,1)]';
              else optionStyle = 'border-neutral-200 opacity-50';
            } else if (isSelected) {
              optionStyle = 'border-[#0B2545] bg-[#0B2545] text-white shadow-[0_0_0_1px_rgba(11,37,69,1)]';
            }

            return (
              <button 
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={submitted}
                className={\\\w-full text-left px-8 py-5 rounded-full border-2 transition-all flex items-center gap-5 \\\\}
              >
                <div className={\\\w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors \\\\}>
                  {(isSelected || (submitted && opt.isCorrect)) && <div className="w-3 h-3 rounded-full bg-current"></div>}
                </div>
                <span className="text-lg leading-snug">{opt.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-neutral-100 pt-8 mt-12">
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="border-2 border-[#0B2545] text-[#0B2545] font-bold py-4 px-8 rounded-full hover:bg-neutral-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg> SEBELUMNYA
        </button>

        {!submitted ? (
          activeIndex === questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-4 px-10 rounded-full transition-colors disabled:opacity-50"
            >
              SUBMIT JAWABAN
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center gap-2"
            >
              SELANJUTNYA <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          )
        ) : (
          activeIndex < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="bg-[#003855] hover:bg-[#00273c] text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center gap-2"
            >
              SELANJUTNYA <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          ) : (
            <div className="text-sm font-bold text-green-600 bg-green-50 px-6 py-3 rounded-full">KUIS SELESAI</div>
          )
        )}
      </div>
    </div>
  );
};
;

// Inject StudentQuiz at top
code = code.replace(
  'export default function StudentCourseMaterialPage() {',
  studentQuizComponent + '\nexport default function StudentCourseMaterialPage() {'
);

// Replace placeholder
const placeholderRegex = /<\div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">\s*<h3 className="text-xl font-bold text-\[\#0B2545\] mb-4">Quiz: \{activeSubChapter\.title\}<\/h3>\s*<p className="text-neutral-500 mb-6">Fitur pengerjaan quiz akan tersedia di update berikutnya\.<\/p>\s*<\/div>/ms;

const replacement = <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                  <StudentQuiz 
                    chapterId={chapters.find((c:any) => c.subChapters.some((s:any) => s.id === activeSubChapter.id))?.id} 
                    subChapter={activeSubChapter} 
                    onComplete={() => handleComplete(activeSubChapter.id?.toString())} 
                  />
                </div>;

code = code.replace(placeholderRegex, replacement);

fs.writeFileSync(f, code);
console.log('Restored correctly');
