const fs = require('fs');
const f = 'frontend/app/(instructor)/coach-course/[id]/material/QuizEditor.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');
  
  // 1. Update QuizEditorProps
  code = code.replace(
    'onSave?: (questions: Question[]) => void;',
    'initialIntroDesc?: string;\n  initialInstructions?: string;\n  onSave?: (questions: Question[], introDesc: string, instructions: string) => void;'
  );

  // 2. Update QuizEditor signature and state
  code = code.replace(
    'export default function QuizEditor({ duration, initialQuestions, onSave }: QuizEditorProps) {',
    'export default function QuizEditor({ duration, initialQuestions, initialIntroDesc, initialInstructions, onSave }: QuizEditorProps) {'
  );

  code = code.replace(
    "const [quizIntroDesc, setQuizIntroDesc] = useState('');",
    "const [quizIntroDesc, setQuizIntroDesc] = useState(initialIntroDesc || '');\n  const [quizInstructions, setQuizInstructions] = useState(initialInstructions || '');"
  );

  // 3. Update the Petunjuk Pengerjaan input
  code = code.replace(
    '<input type="text" placeholder="cth: Terdapat 10 pertanyaan pilihan ganda." className="w-full bg-transparent focus:outline-none text-sm text-neutral-500 placeholder:text-neutral-400" />',
    '<input type="text" value={quizInstructions} onChange={(e) => setQuizInstructions(e.target.value)} placeholder="cth: Terdapat 10 pertanyaan pilihan ganda." className="w-full bg-transparent focus:outline-none text-sm text-neutral-500 placeholder:text-neutral-400" />'
  );

  // 4. Update onSave call
  code = code.replace(
    'onSave(questions);',
    'onSave(questions, quizIntroDesc, quizInstructions);'
  );

  fs.writeFileSync(f, code);
  console.log('Patched QuizEditor');
}
