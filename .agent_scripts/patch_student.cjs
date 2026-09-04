const fs = require('fs');
const f = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');
  
  if (!code.includes('StudentQuiz')) {
    // We need to build a simple quiz component for student
    const studentQuizComponent = 
const StudentQuiz = ({ chapterId, subChapter }: { chapterId: any, subChapter: any }) => {
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const questions = subChapter.quizQuestions || [];

  const handleSelectOption = (qIdx: number, optId: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIdx]: optId });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q: any, idx: number) => {
      const selectedId = answers[idx];
      const selectedOpt = q.options.find((o: any) => o.id === selectedId);
      if (selectedOpt && selectedOpt.isCorrect) correct++;
    });
    setScore(Math.round((correct / questions.length) * 100));
    setSubmitted(true);
  };

  if (!questions || questions.length === 0) {
    return <div className="text-neutral-500">Kuis ini belum memiliki soal.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
      <h3 className="text-xl font-bold text-[#0B2545] mb-6">Quiz: {subChapter.title}</h3>
      
      {submitted && (
        <div className={\p-6 rounded-xl mb-8 \\}>
          <h4 className="font-bold text-lg mb-2">Nilai Anda: {score}</h4>
          <p className="text-sm">{score >= 70 ? 'Selamat! Anda lulus kuis ini.' : 'Maaf, Anda belum lulus kuis ini.'}</p>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q: any, qIdx: number) => (
          <div key={q.id} className="border-b border-neutral-100 pb-8 last:border-0">
            <div className="font-bold text-sm text-[#0B2545] mb-4">SOAL {qIdx + 1}</div>
            
            {/* Render blocks (text/question) */}
            <div className="mb-6">
              {q.blocks.map((b: any) => (
                <p key={b.id} className="text-neutral-700">{b.content}</p>
              ))}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt: any) => {
                const isSelected = answers[qIdx] === opt.id;
                let optionStyle = 'border-neutral-200 hover:border-[#0B2545] text-neutral-700';
                
                if (submitted) {
                  if (opt.isCorrect) optionStyle = 'border-green-500 bg-green-50 text-green-700 font-bold';
                  else if (isSelected && !opt.isCorrect) optionStyle = 'border-red-500 bg-red-50 text-red-700';
                  else optionStyle = 'border-neutral-200 opacity-50';
                } else if (isSelected) {
                  optionStyle = 'border-[#0B2545] bg-[#0B2545] text-white';
                }

                return (
                  <button 
                    key={opt.id}
                    onClick={() => handleSelectOption(qIdx, opt.id)}
                    disabled={submitted}
                    className={\w-full text-left px-5 py-3 rounded-xl border transition-colors \\}
                  >
                    {opt.text}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button 
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="mt-8 w-full bg-[#00628B] hover:bg-[#004e6e] text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
        >
          SUBMIT JAWABAN
        </button>
      )}
    </div>
  );
};
;

    code = code.replace("export default function StudentCourseMaterialPage() {", studentQuizComponent + "\nexport default function StudentCourseMaterialPage() {");

    // Replace the placeholder
    const placeholder = <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
                <h3 className="text-xl font-bold text-[#0B2545] mb-4">Quiz: {activeSubChapter.title}</h3>
                <p className="text-neutral-500 mb-6">Fitur pengerjaan quiz akan tersedia di update berikutnya.</p>
              </div>;
    
    code = code.replace(placeholder, "<StudentQuiz chapterId={chapters.find(c => c.subChapters.some(s => s.id === activeSubChapter.id))?.id} subChapter={activeSubChapter} />");

    fs.writeFileSync(f, code);
    console.log('Patched student quiz');
  } else {
    console.log('Already patched');
  }
}
