export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo PPG" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-bold text-neutral-dark">PPG LMS</h1>
          </div>
          <nav className="flex space-x-8 items-center">
            <a href="/" className="text-neutral-dark hover:text-primary font-medium">Home</a>
            <a href="/about" className="text-neutral-dark hover:text-primary font-medium">Tentang</a>
            <a href="/programs" className="text-neutral-dark hover:text-primary font-medium">Program</a>
            <a href="/contact" className="text-neutral-dark hover:text-primary font-medium">Kontak</a>
            <a href="/login" className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark font-medium">Login</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
            Sistem Manajemen Pembelajaran <span className="text-primary">PPG</span>
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto mb-10">
            Platform pembelajaran daring untuk PT. Performa Puncak Group. Gabungkan company profile dengan sistem pelatihan terintegrasi.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a href="/register" className="bg-primary text-white px-8 py-4 rounded-xl text-xl hover:bg-primary-dark font-semibold">
              Daftar Sekarang
            </a>
            <a href="/programs" className="bg-secondary text-neutral-dark px-8 py-4 rounded-xl text-xl hover:bg-secondary-dark font-semibold">
              Lihat Program
            </a>
          </div>
        </section>

        <section className="bg-neutral-light py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-neutral-dark mb-12">Fitur Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-light">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <div className="text-3xl">👨‍🎓</div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">Siswa</h3>
                <p className="text-neutral-gray">
                  Daftar kelas, akses materi, kerjakan ujian, dapatkan sertifikat.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Materi interaktif</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Ujian online</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Sertifikat digital</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-light">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <div className="text-3xl">👨‍🏫</div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">Instruktur</h3>
                <p className="text-neutral-gray">
                  Pantau progress siswa, berikan evaluasi, kelola materi.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Dashboard instruktur</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Upload materi</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Evaluasi otomatis</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-light">
                <div className="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <div className="text-3xl">👨‍💼</div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">Admin</h3>
                <p className="text-neutral-gray">
                  Kelola data master: program, modul, artikel, galeri, file.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Super admin panel</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Kelola user</li>
                  <li className="flex items-center"><span className="text-success mr-2">✓</span> Analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-dark mb-6">Company Profile</h2>
              <p className="text-lg text-neutral-gray mb-6">
                PT. Performa Puncak Group adalah perusahaan konsultan dan pelatihan profesional yang berfokus pada pengembangan sumber daya manusia.
              </p>
              <p className="text-lg text-neutral-gray mb-8">
                Dengan pengalaman lebih dari 10 tahun, kami menyediakan solusi pembelajaran terintegrasi untuk perusahaan dan individu.
              </p>
              <a href="/about" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark">
                Selengkapnya <span className="ml-2">→</span>
              </a>
            </div>
            <div className="bg-neutral-light rounded-3xl p-8">
              <div className="aspect-video bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl"></div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Siap Bergabung?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Daftar sekarang dan dapatkan akses ke puluhan program pelatihan dengan sertifikat resmi.
            </p>
            <a href="/register" className="bg-white text-primary px-10 py-4 rounded-xl text-xl font-semibold hover:bg-neutral-light">
              Buat Akun Gratis
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PPG LMS</h3>
              <p className="text-neutral-gray">Platform pembelajaran daring PT. Performa Puncak Group.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-neutral-gray hover:text-white">Tentang Kami</a></li>
                <li><a href="/contact" className="text-neutral-gray hover:text-white">Kontak</a></li>
                <li><a href="/career" className="text-neutral-gray hover:text-white">Karir</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2">
                <li><a href="/programs" className="text-neutral-gray hover:text-white">Program Pelatihan</a></li>
                <li><a href="/lms" className="text-neutral-gray hover:text-white">LMS</a></li>
                <li><a href="/certificate" className="text-neutral-gray hover:text-white">Sertifikasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-neutral-gray hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-neutral-gray hover:text-white">Terms of Service</a></li>
                <li><a href="/faq" className="text-neutral-gray hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-gray/30 mt-12 pt-8 text-center text-neutral-gray">
            <p>© {new Date().getFullYear()} PT. Performa Puncak Group - Project PKL Internship</p>
            <p className="mt-2">Backend: Node.js + SQLite | Frontend: Next.js + Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}