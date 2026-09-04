const fs = require('fs');
const f = 'frontend/app/(instructor)/coach-course/[id]/material/page.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');
  
  code = code.replace(
    'const handleSaveQuiz = async (subId: number, questions: any[]) => {',
    'const handleSaveQuiz = async (subId: number, questions: any[], introDesc: string, instructions: string) => {'
  );

  code = code.replace(
    'return { ...s, quizQuestions: questions };',
    'return { ...s, quizQuestions: questions, quizIntroDesc: introDesc, quizInstructions: instructions };'
  );

  code = code.replace(
    'onSave={(questions) => handleSaveQuiz(activeSubChapter.id, questions)}',
    'initialIntroDesc={activeSubChapter.quizIntroDesc} initialInstructions={activeSubChapter.quizInstructions} onSave={(questions, introDesc, instructions) => handleSaveQuiz(activeSubChapter.id, questions, introDesc, instructions)}'
  );

  fs.writeFileSync(f, code);
  console.log('Patched Coach page');
}
