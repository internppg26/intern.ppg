# Use Case Specifications: Sistem Manajemen Pembelajaran (LMS)

## 1. Kelompok General (Semua Aktor)

### Use Case: Login dan Autentikasi
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Pengguna dapat masuk ke dalam sistem sesuai dengan hak akses (Role) masing-masing. |
| **Actors** | Siswa, Instruktur, Admin |
| **Pre-condition** | Pengguna memiliki akun yang terdaftar dan berada di Halaman Utama. |
| **Main flow** | 1. Pengguna memilih menu Login.<br>2. Sistem menampilkan Form Login.<br>3. Pengguna memasukkan Email dan Password.<br>4. Pengguna mengeklik tombol Masuk.<br>5. Sistem memvalidasi kecocokan data dengan database.<br>6. Sistem mengarahkan pengguna ke Halaman Dashboard sesuai role. |
| **Alternative flows** | **5a. Email atau Password salah/tidak terdaftar**<br>5a.1. Sistem menampilkan pesan error "Kredensial tidak valid".<br>5a.2. Kembali ke alur 2. |
| **Post-condition** | Pengguna masuk ke dalam sistem. |

### Use Case: Kelola Profil & Password
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Pengguna dapat memperbarui informasi data diri dan kata sandi. |
| **Actors** | Siswa, Instruktur, Admin |
| **Pre-condition** | Pengguna sudah login dan berada di Dashboard. |
| **Main flow** | 1. Pengguna mengeklik menu Profil.<br>2. Sistem menampilkan Form Profil.<br>3. Pengguna mengubah data diri atau mengisi kata sandi baru.<br>4. Pengguna mengeklik tombol Simpan.<br>5. Sistem memvalidasi kelengkapan form.<br>6. Sistem memperbarui data di database.<br>7. Sistem menampilkan pesan "Profil berhasil diperbarui". |
| **Alternative flows** | **5a. Form tidak lengkap atau format salah**<br>5a.1. Sistem menampilkan pesan error "Data tidak lengkap".<br>5a.2. Kembali ke alur 3. |
| **Post-condition** | Data profil pengguna berhasil diperbarui. |

## 2. Kelompok Siswa (LMS)

### Use Case: Melakukan Pendaftaran Kelas (Enrollment)
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Siswa dapat mencari dan mendaftar ke program pelatihan yang tersedia. |
| **Actors** | Siswa |
| **Pre-condition** | Siswa sudah login dan berada di Dashboard Siswa. |
| **Main flow** | 1. Siswa memilih menu Pendaftaran Kelas.<br>2. Sistem menampilkan daftar program pelatihan.<br>3. Siswa memasukkan judul kelas di kolom pencarian lalu menekan Cari.<br>4. Sistem menampilkan program yang dicari.<br>5. Siswa mengeklik tombol Daftar pada kelas yang dipilih.<br>6. Sistem memvalidasi status pendaftaran siswa.<br>7. Sistem menyimpan data pendaftaran ke database.<br>8. Sistem menampilkan pesan "Pendaftaran Kelas Berhasil". |
| **Alternative flows** | **4a. Kelas tidak ditemukan**<br>4a.1. Sistem menampilkan pesan "Program tidak terdaftar".<br>4a.2. Kembali ke alur 3.<br><br>**6a. Siswa sudah pernah mendaftar di kelas tersebut**<br>6a.1. Sistem menampilkan pesan "Anda sudah terdaftar di kelas ini".<br>6a.2. Kembali ke alur 2. |
| **Post-condition** | Siswa resmi terdaftar pada kelas tersebut. |

### Use Case: Mengakses Modul Materi & Update Progres
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Siswa dapat membaca dokumen/menonton video dan sistem mencatat progres belajarnya. |
| **Actors** | Siswa |
| **Pre-condition** | Siswa telah terdaftar pada Program Pelatihan terkait. |
| **Main flow** | 1. Siswa memilih menu Kelas Saya dan mengeklik salah satu kelas.<br>2. Sistem menampilkan daftar Modul Materi.<br>3. Siswa mengeklik salah satu judul materi.<br>4. Sistem menampilkan penampil Video/PDF materi.<br>5. Siswa mengeklik tombol "Selesai Membaca".<br>6. Sistem mengkalkulasi ulang persentase progres belajar.<br>7. Sistem memperbarui progress bar di layar Siswa. |
| **Alternative flows** | **4a. File materi rusak atau sistem gagal terkoneksi**<br>4a.1. Sistem menampilkan pesan "Connection Error". |
| **Post-condition** | Progres belajar siswa bertambah. |

### Use Case: Mengerjakan Ujian & Mengunduh Sertifikat
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Siswa mengerjakan ujian untuk mendapatkan skor dan sertifikat otomatis. |
| **Actors** | Siswa |
| **Pre-condition** | Siswa telah menyelesaikan seluruh Modul Materi hingga 100%. |
| **Main flow** | 1. Siswa mengeklik tombol Mulai Ujian.<br>2. Sistem menampilkan soal ujian.<br>3. Siswa mengisi seluruh jawaban dan mengeklik tombol Kumpulkan.<br>4. Sistem mencocokkan jawaban dengan kunci jawaban.<br>5. Sistem menghitung skor akhir (Skor >= Batas Lulus).<br>6. Sistem meng-generate File PDF Sertifikat.<br>7. Sistem menampilkan animasi lulus dan link Unduh Sertifikat. |
| **Alternative flows** | **5a. Skor kurang dari batas lulus (Gagal)**<br>5a.1. Sistem mencatat status tidak lulus di database.<br>5a.2. Sistem menampilkan pesan "Maaf, skor Anda belum memenuhi syarat".<br>5a.3. Siswa diarahkan kembali ke halaman awal kelas. |
| **Post-condition** | Siswa mendapatkan sertifikat kelulusan. |

## 3. Kelompok Instruktur

### Use Case: Memantau Daftar & Progres Siswa
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Instruktur dapat melihat siapa saja siswa yang mendaftar dan progres belajarnya. |
| **Actors** | Instruktur |
| **Pre-condition** | Instruktur login dan berada di Dashboard. |
| **Main flow** | 1. Instruktur mengeklik menu Kelas Saya.<br>2. Sistem mengambil data dari database (Tabel Enrollment).<br>3. Sistem menampilkan tabel daftar siswa beserta persentase progres masing-masing.<br>4. Instruktur dapat mengetikkan nama di kolom pencarian untuk mencari siswa tertentu. |
| **Alternative flows** | **2a. Belum ada siswa yang mendaftar**<br>2a.1. Sistem menampilkan tabel kosong dengan pesan "Belum ada siswa di kelas ini". |
| **Post-condition** | Tidak ada (Proses Read-Only). |

### Use Case: Memberikan Evaluasi Manual
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Instruktur dapat memberikan catatan feedback khusus kepada siswa tertentu. |
| **Actors** | Instruktur |
| **Pre-condition** | Instruktur sedang melihat tabel Daftar Siswa. |
| **Main flow** | 1. Instruktur mengeklik tombol "Beri Evaluasi" pada baris nama Siswa tertentu.<br>2. Sistem memunculkan Form Dialog Evaluasi.<br>3. Instruktur memasukkan teks catatan.<br>4. Instruktur mengeklik Simpan.<br>5. Sistem memperbarui data catatan di database.<br>6. Sistem menampilkan pesan "Evaluasi berhasil disimpan". |
| **Alternative flows** | **4a. Batal menyimpan**<br>4a.1. Instruktur mengeklik tombol Batal.<br>4a.2. Sistem menutup form dialog tanpa menyimpan. |
| **Post-condition** | Catatan evaluasi tersimpan dan dapat dilihat oleh siswa yang bersangkutan. |

## 4. Kelompok Admin (Master Data CRUD)

> *Catatan: Bagian ini merupakan implementasi dari Master Template CRUD untuk 6 entitas data utama: Program, Modul, Ujian, Artikel, Galeri, dan File sesuai permintaan.*

### Use Case: Mengelola Program
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus Program. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola Program. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data Program pada sistem berhasil diperbarui. |

### Use Case: Mengelola Modul
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus Modul. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola Modul. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data Modul pada sistem berhasil diperbarui. |

### Use Case: Mengelola Ujian
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus Ujian. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola Ujian. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data Ujian pada sistem berhasil diperbarui. |

### Use Case: Mengelola Artikel
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus Artikel. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola Artikel. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data Artikel pada sistem berhasil diperbarui. |

### Use Case: Mengelola Galeri
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus Galeri. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola Galeri. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data Galeri pada sistem berhasil diperbarui. |

### Use Case: Mengelola File
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Admin dapat menambah, mengubah, dan menghapus File. |
| **Actors** | Admin |
| **Pre-condition** | Admin login dan masuk ke menu Kelola File. |
| **Main flow (Tambah/Edit)** | 1. Admin mengeklik tombol Tambah/Edit Data.<br>2. Sistem menampilkan Form Data.<br>3. Admin mengisi form (teks dan/atau memilih file upload).<br>4. Admin mengeklik tombol Simpan.<br>5. Sistem memvalidasi form dan ukuran file.<br>6. Sistem menyimpan data ke database.<br>7. Sistem menampilkan pesan "Data berhasil disimpan". |
| **Alternative flows** | **5a. Form kosong atau File tidak sesuai format/kebesaran**<br>5a.1. Sistem menampilkan pesan error "Format file ditolak / form tidak lengkap".<br>5a.2. Kembali ke alur 3.<br><br>**Main Flow (Hapus Data)**<br>1b. Admin mengeklik tombol Hapus pada baris data tabel.<br>2b. Sistem memunculkan dialog konfirmasi "Apakah Anda yakin?".<br>3b. Admin mengeklik "Ya, Hapus".<br>4b. Sistem menghapus data dari database. |
| **Post-condition** | Data File pada sistem berhasil diperbarui. |

## 5. Kelompok Pengunjung Publik

### Use Case: Melihat Halaman Publik (Company Profile & Artikel)
| Komponen | Deskripsi |
| :--- | :--- |
| **Objective** | Masyarakat umum dapat membaca profil perusahaan dan berita kegiatan (Blog). |
| **Actors** | Pengunjung Publik |
| **Pre-condition** | Pengunjung mengakses URL website PT. Perfoma Puncak Group. |
| **Main flow** | 1. Pengunjung memilih menu Blog/Artikel.<br>2. Sistem melakukan query ke database untuk mencari artikel berstatus Published.<br>3. Sistem menampilkan daftar kartu artikel beserta thumbnail.<br>4. Pengunjung mengeklik salah satu judul artikel.<br>5. Sistem menampilkan halaman isi lengkap artikel tersebut. |
| **Alternative flows** | **2a. Tidak ada artikel yang berstatus Published**<br>2a.1. Sistem menampilkan antarmuka kosong dengan pesan "Belum ada artikel saat ini". |
| **Post-condition** | Tidak ada (Hanya membaca / Read-Only). |
