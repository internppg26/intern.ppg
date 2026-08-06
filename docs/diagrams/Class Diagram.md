classDiagram
    %% Inheritance (Pewarisan Role dari tabel User utama)
    User <|-- Admin
    User <|-- Instruktur
    User <|-- Siswa

    %% Relasi Antar Kelas
    Admin "1" --> "*" Artikel_Blog : Mengelola
    Admin "1" --> "*" Galeri_Dokumentasi : Mengelola
    Admin "1" --> "*" File_Unduhan : Mengelola
    Admin "1" --> "*" Program_Pelatihan : Membuat

    Instruktur "1" --> "*" Program_Pelatihan : Mengajar
    
    Program_Pelatihan "1" *-- "*" Modul_Materi : Memiliki
    Program_Pelatihan "1" *-- "*" Ujian_Asesmen : Memiliki
    
    Siswa "1" --> "*" Enrollment : Melakukan
    Program_Pelatihan "1" --> "*" Enrollment : Terdaftar pada
    
    Siswa "1" --> "*" Nilai_Sertifikat : Mendapatkan
    Program_Pelatihan "1" --> "*" Nilai_Sertifikat : Menerbitkan

    %% Definisi Kelas & Atribut
    class User {
        - id_user: String (PK)
        - nama_lengkap: String
        - email: String
        - password_hash: String
        + login() Boolean
        + updateProfile() Void
        + resetPassword() Void
    }

    class Admin {
        - departemen: String
        + kelolaSistem() Void
    }

    class Instruktur {
        - spesialisasi: String
        + beriNilai() Void
    }

    class Siswa {
        - instansi_asal: String
        + aksesKelas() Void
    }

    class Artikel_Blog {
        - id_artikel: String (PK)
        - id_admin: String (FK)
        - judul_artikel: String
        - konten: Text
        - tanggal_publish: Date
        - thumbnail_url: String
        + publishArtikel() Void
        + getDaftarArtikel() List
    }

    class Galeri_Dokumentasi {
        - id_galeri: String (PK)
        - kategori_kegiatan: String
        - url_foto: String
        - caption: String
        + tambahFoto() Void
    }

    class File_Unduhan {
        - id_file: String (PK)
        - id_admin: String (FK)
        - nama_dokumen: String
        - kategori: Enum
        - url_unduh: String
        + tambahFile() Void
        + hitungTotalUnduhan() Integer
    }

    class Program_Pelatihan {
        - id_program: String (PK)
        - id_instruktur: String (FK)
        - nama_program: String
        - kategori: Enum
        - deskripsi: Text
        - status_aktif: Boolean
        + tambahProgram() Void
        + getDetailProgram() Object
    }

    class Modul_Materi {
        - id_modul: String (PK)
        - id_program: String (FK)
        - judul_materi: String
        - tipe_file: Enum
        - urutan_materi: Integer
        + uploadMateri() Void
        + aksesMateri() File
    }

    class Ujian_Asesmen {
        - id_ujian: String (PK)
        - id_program: String (FK)
        - judul_ujian: String
        - durasi_menit: Integer
        - batas_lulus: Integer
        + buatUjian() Void
        + hitungNilaiOtomatis() Integer
    }

    class Enrollment {
        - id_enrollment: String (PK)
        - id_siswa: String (FK)
        - id_program: String (FK)
        - tanggal_daftar: Date
        - progres_belajar: Float
        + updateProgres() Void
    }

    class Nilai_Sertifikat {
        - id_sertifikat: String (PK)
        - id_user: String (FK)
        - id_program: String (FK)
        - skor_akhir: Integer
        - status_lulus: Boolean
        - nomor_sertifikat: String
        - url_file_sertifikat: String
        + generatePDF() URL
        + downloadSertifikat() File
    }
