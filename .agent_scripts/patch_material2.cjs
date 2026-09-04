const fs = require('fs');
const f = 'frontend/app/(instructor)/coach-course/[id]/material/page.tsx';
if (fs.existsSync(f)) {
  let code = fs.readFileSync(f, 'utf8');

  // Add handleSaveQuiz function right before handleSimpan
  if (!code.includes('const handleSaveQuiz')) {
    const handleSaveQuizFn = `
  const handleSaveQuiz = async (subId: number, questions: any[]) => {
    try {
      // First, update chapters state
      const updatedChapters = chapters.map(c => ({
        ...c,
        subChapters: c.subChapters.map(s => {
          if (s.id === subId) {
            return { ...s, quizQuestions: questions };
          }
          return s;
        })
      }));
      setChapters(updatedChapters);

      // Now prepare payload
      const chaptersToSave = updatedChapters.map(ch => ({
        id: ch.id,
        title: ch.title,
        isExpanded: ch.isOpen,
        subChapters: ch.subChapters
      }));
      const newDescription = { 
        ...rawDescription, 
        chapters: chaptersToSave,
        overviewBlocks: isOverviewActive ? blocks : rawDescription.overviewBlocks 
      };
      setRawDescription(newDescription);
      
      const payload = { description: JSON.stringify(newDescription) };
      const res = await fetch(\`/api/programs/\${params?.id}\`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${localStorage.getItem('token')}\`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) alert("Kuis berhasil disimpan!");
      else alert("Gagal menyimpan kuis.");
    } catch (e) {
      alert("Error saving: " + e);
    }
  };
`;
    code = code.replace("const handleSimpan = async () => {", handleSaveQuizFn + "\n  const handleSimpan = async () => {");
  }

  // Update QuizEditor usage
  if (!code.includes('onSave={')) {
    code = code.replace(
      "<QuizEditor duration={activeSubChapter.duration} />",
      "<QuizEditor key={activeSubChapter.id} duration={activeSubChapter.duration} initialQuestions={activeSubChapter.quizQuestions} onSave={(questions) => handleSaveQuiz(activeSubChapter.id, questions)} />"
    );
  }

  fs.writeFileSync(f, code);
  console.log('Patched material page');
}
