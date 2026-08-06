# Product Requirements Document (PRD)
**Sistem Manajemen Pembelajaran (LMS) - PT. Performa Puncak Group**

## 1. Pendahuluan
Dokumen ini merupakan spesifikasi kebutuhan perangkat lunak untuk pengembangan Sistem Manajemen Pembelajaran (LMS). Sistem ini dirancang untuk memfasilitasi proses pelatihan berbasis kelas daring, evaluasi siswa oleh instruktur, manajemen aset kurikulum oleh administrator, serta portal informasi untuk publik.

## 2. Aktor Sistem (Target Pengguna)
Sistem ini memfasilitasi empat peran (Role) utama, yaitu:
*   **Admin**: Aktor yang bertugas mengelola data master (CRUD) mencakup program, modul, ujian, artikel, galeri, dan file.
*   **Instruktur**: Aktor yang bertugas memantau progres siswa dan memberikan evaluasi catatan khusus.
*   **Siswa**: Aktor yang mencari/mendaftar program pelatihan, mengakses materi belajar, dan mengerjakan ujian untuk mendapatkan sertifikat.
*   **Pengunjung Publik**: Aktor dari masyarakat umum yang dapat membaca profil perusahaan dan berita kegiatan (Blog).

## 3. Spesifikasi Fungsional (Functional Requirements)

### 3.1. Kebutuhan Sistem Umum (General)
*   **Autentikasi (Login)**: Sistem memungkinkan pengguna (Siswa, Instruktur, Admin) untuk masuk menggunakan kombinasi Email dan Password. Sistem akan memvalidasi data dengan database dan mengarahkan pengguna ke Halaman Dashboard sesuai *role* masing-masing. Alur ini merujuk pada diagram "Login dan autentikasi".
*   **Manajemen Akun**: Pengguna yang telah berhasil masuk dapat memperbarui informasi data diri dan kata sandi baru melalui Form Profil. Sistem akan memvalidasi kelengkapan form sebelum menyimpan data ke database. Alur ini merujuk pada diagram "kelola profil dan password".

### 3.2. Kebutuhan Modul Siswa (LMS)
*   **Enrollment (Pendaftaran Kelas)**: Siswa dapat mencari program pelatihan menggunakan kolom pencarian dan mendaftar ke kelas yang tersedia. Sistem harus memvalidasi agar siswa tidak mendaftar di kelas yang sama berulang kali. Alur ini dipetakan dalam diagram "Siswa Mendaftar Kelas".
*   **Pembelajaran (Akses Materi)**: Siswa yang telah terdaftar dapat mengakses Modul Materi berupa penampil Video/PDF materi. Saat siswa mengeklik tombol "Selesai Membaca", sistem otomatis mengkalkulasi persentase progres belajar dan memperbarui *progress bar*. Alur ini merujuk pada diagram "Siswa Akses Materi".
*   **Evaluasi (Ujian & Sertifikat)**: Siswa berhak mengerjakan ujian hanya jika telah menyelesaikan Modul Materi hingga 100%. Sistem akan mencocokkan jawaban dengan kunci jawaban, dan jika skor mencapai batas lulus, sistem otomatis membuat dan menampilkan *link* unduh File PDF Sertifikat kelulusan. Alur ini dipetakan dalam diagram "Siswa Ujian".

### 3.3. Kebutuhan Modul Instruktur
*   **Dashboard Pemantauan**: Instruktur dapat memantau data dari tabel Enrollment untuk melihat daftar nama siswa yang terdaftar di kelas mereka beserta persentase progres pembelajarannya. Instruktur juga dapat menggunakan fitur pencarian nama siswa.
*   **Sistem Evaluasi (Feedback)**: Melalui Form Dialog Evaluasi, instruktur dapat mengetikkan teks catatan evaluasi spesifik kepada siswa tertentu. Evaluasi manual ini akan disimpan ke database dan dapat dibaca oleh siswa yang bersangkutan. Alur ini merujuk pada diagram "Instruktur Evaluasi Manual".

### 3.4. Kebutuhan Modul Admin (Master Data)
Sistem menyediakan *Master Template CRUD* untuk mengelola 6 entitas utama. Operasi ini merujuk pada diagram "CRUD Admin" dan "Admin Upload MateriArtikel". Fitur ini mencakup:
*   **Kelola Data**: Admin berhak melakukan proses Tambah, Edit, dan Hapus data untuk Program, Modul, Ujian, Artikel, Galeri, dan File.
*   **Validasi**: Saat admin menyimpan data, sistem akan memvalidasi kelengkapan isi form serta menyesuaikan ukuran dan format file *upload*.
*   **Keamanan Penghapusan**: Setiap aksi penghapusan data akan memunculkan dialog konfirmasi untuk mencegah ketidaksengajaan.

### 3.5. Kebutuhan Portal Publik
*   **Akses Company Profile & Blog**: Masyarakat umum dapat mengakses URL *website* PT. Performa Puncak Group tanpa perlu otorisasi akun.
*   **Katalog Artikel**: Pengunjung dapat melihat daftar kartu artikel yang difilter oleh sistem khusus untuk artikel dengan status *Published*. Pengunjung dapat mengeklik judul artikel untuk membaca isi secara lengkap. Alur ini dipetakan dalam diagram "Pengunjung Publik Akses Artikel".