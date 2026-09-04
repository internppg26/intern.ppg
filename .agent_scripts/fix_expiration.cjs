const fs = require('fs');
const path = 'frontend/app/(student)/dashboard/my-courses/[id]/material/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// Add courseDuration state
code = code.replace(
  "const [isSubmitting, setIsSubmitting] = useState(false);",
  "const [isSubmitting, setIsSubmitting] = useState(false);\n  const [courseDuration, setCourseDuration] = useState<number | null>(null);"
);

// Set course duration
code = code.replace(
  "setCourseTitle(data.title);",
  "setCourseTitle(data.title);\n      if (data.duration) setCourseDuration(parseInt(data.duration));"
);

// Check if expired and show message in render
const expiredCheck = `
  const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);

  const isExpired = React.useMemo(() => {
    if (!enrollment || !enrollment.createdAt || !courseDuration) return false;
    const enrollDate = new Date(enrollment.createdAt).getTime();
    const expiryDate = enrollDate + (courseDuration * 24 * 60 * 60 * 1000);
    return Date.now() > expiryDate;
  }, [enrollment, courseDuration]);

  if (isExpired) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-neutral-200 max-w-lg text-center">
          <div className="w-20 h-20 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h2 className="text-2xl font-black text-[#0B2545] mb-4">Akses Pelatihan Berakhir</h2>
          <p className="text-neutral-600 mb-8">
            Batas waktu pengerjaan pelatihan ini ({courseDuration} hari) telah berakhir sejak tanggal pendaftaran Anda. Anda tidak dapat lagi mengakses materi ini.
          </p>
          <Link href="/dashboard/my-courses" className="inline-block bg-[#0B2545] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0B2545]/90 transition-colors">
            Kembali ke Pelatihan Saya
          </Link>
        </div>
      </div>
    );
  }
`;

code = code.replace(
  "const allSubChapters = chapters.flatMap(ch => ch.subChapters || []);",
  expiredCheck
);

fs.writeFileSync(path, code);
console.log('done');
