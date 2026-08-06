# Activity Diagram LMS

```mermaid
flowchart TD
    %% Styling untuk Start dan End Node
    classDef start fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef finish fill:#f8d7da,stroke:#dc3545,stroke-width:2px;

    %% KOLOM (Swimlanes)
    subgraph Publik [Pengguna Publik]
        Start((Mulai)):::start
        BukaWeb[Membuka Situs Website]
        LihatInfo[Melihat Berbagai Informasi Tersedia]
        CekTertarik{Tertarik Mengikuti Kursus?}
        EndPublik((Selesai)):::finish
        CekAkun{Sudah Punya Akun?}
        Daftar[Melakukan Registrasi]
        InputLogin[Menginput Username & Password]
    end

    subgraph Sistem [Sistem]
        TampilUtama[Menampilkan Halaman Utama]
        CekMenu{Pilih Menu Login?}
        TampilLogin[Menampilkan Form Login]
        Validasi[Memvalidasi Data]
        CekSiswa{Role = Siswa?}
        DashSiswa[Menampilkan Dashboard Siswa]
        SimpanKuis[Menyimpan Hasil Kuis]
        CekLulus{Apakah Lulus Ujian?}
        Sertifikat[Menerbitkan E-Sertifikat]
        CekInstruktur{Role = Instruktur?}
        DashInstruktur[Menampilkan Dashboard Instruktur]
        CekAdmin{Role = Administrator?}
        DashAdmin[Menampilkan Dashboard Administrator]
    end

    subgraph Siswa [Siswa]
        Profil[Melihat Profil dan Riwayat Belajar]
        Modul[Mengakses Modul Pelatihan]
        Kuis[Mengerjakan Kuis]
        EndSiswa((Selesai)):::finish
    end

    subgraph Instruktur [Instruktur]
        DaftarSiswa[Melihat Daftar Siswa/Peserta Kelas]
        CekJawaban[Mengecek Status Jawaban]
        Nilai[Memberikan Penilaian Hasil Jawaban Siswa]
        EndInstruktur((Selesai)):::finish
    end

    subgraph Admin [Administrator]
        KelolaAkun[Mengelola Data Akun Pengguna]
        KelolaKelas[Mengelola Daftar Kelas]
        KelolaSistem[Memelihara Data Sistem]
        EndAdmin((Selesai)):::finish
    end

    %% ALUR PROSES (Mapping Garis Panah)
    Start --> BukaWeb
    BukaWeb --> TampilUtama
    TampilUtama --> CekMenu
    
    CekMenu -- Tidak --> LihatInfo
    CekMenu -- Ya --> TampilLogin

    LihatInfo --> CekTertarik
    CekTertarik -- Tidak --> EndPublik
    CekTertarik -- Ya --> CekAkun

    CekAkun -- Belum --> Daftar
    CekAkun -- Sudah --> InputLogin
    Daftar --> InputLogin
    TampilLogin --> InputLogin

    InputLogin --> Validasi
    Validasi -- Tidak Valid --> InputLogin
    Validasi -- Valid --> CekSiswa

    CekSiswa -- Ya --> DashSiswa
    DashSiswa --> Profil
    Profil --> Modul
    Modul --> Kuis
    Kuis --> SimpanKuis
    SimpanKuis --> CekLulus
    
    CekLulus -- Tidak --> Modul
    CekLulus -- Ya --> Sertifikat
    Sertifikat -.-> EndSiswa

    CekSiswa -- Tidak --> CekInstruktur
    CekInstruktur -- Ya --> DashInstruktur
    DashInstruktur --> DaftarSiswa
    DaftarSiswa --> CekJawaban
    CekJawaban --> Nilai
    Nilai -.-> EndInstruktur

    CekInstruktur -- Tidak --> CekAdmin
    CekAdmin -- Ya --> DashAdmin
    DashAdmin --> KelolaAkun
    KelolaAkun --> KelolaKelas
    KelolaKelas --> KelolaSistem
    KelolaSistem -.-> EndAdmin