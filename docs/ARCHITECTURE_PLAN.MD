# LMS Performa Puncak Group — Rencana Arsitektur & Setup Repo (v1.1)

> Selaras dengan `PRD.md`. **PRD adalah sumber kebenaran** untuk requirement fungsional;
> dokumen ini adalah keputusan teknis & workflow repository.
>
> Produk: Enterprise Learning Management System (LMS) B2B — portal pembelajaran komprehensif
> dengan pemisahan peran yang tegas (Admin, Instruktur, Siswa, Publik), UI/UX korporat yang konsisten, 
> alur pembayaran transfer manual terverifikasi, serta evaluasi kualitatif tersentralisasi.
>
> **Konteks tim:** 3 orang (FE · BE · PM), metode **Agile**. Arsitektur difokuskan pada skalabilitas
> enterprise dan keamanan akses aset materi (PDF/Video).

---

## 1. Tech Stack Final

| Layer | Teknologi | Catatan Teknis |
|---|---|---|
| **Struktur Repo**| Split Directory (`frontend` & `backend`) | Memisahkan *codebase* klien dan server secara lugas di dalam satu repositori proyek utama. |
| **Frontend** | React.js (Next.js App Router) + Tailwind CSS | SSR/SSG untuk portal publik (SEO); CSR/SPA untuk dashboard internal. |
| **UI Components**| shadcn/ui + lucide-react | Palet ketat: Primary `#023546`, Accent `#C97C03`, Neutral `#FEEBCD`. |
| **Backend** | **NestJS** (Node.js) | Arsitektur modular bawaan sangat cocok untuk skalabilitas B2B. |
| **Database** | PostgreSQL | Relasional penuh, esensial untuk menjaga konsistensi nilai ujian & status enrollment. |
| **ORM** | Prisma | Tipe data kuat, mempercepat interaksi dengan *database*. |
| **Storage** | AWS S3 (atau kompatibel seperti MinIO) | File materi (Video/PDF), bukti transfer, dan portofolio siswa. |
| **Pembayaran** | **Manual Transfer** (BCA/Mandiri) | Validasi admin diwajibkan untuk menjamin rekonsiliasi data korporat. |
| **Auth & ACL** | JWT + Role-Based Access Control (RBAC) | 4 *Role* absolut: `ADMIN`, `INSTRUCTOR`, `STUDENT`, `PUBLIC`. |
| **File Security**| S3 Presigned URLs | File materi tidak boleh diakses langsung tanpa token sesi aktif. |
| **Generative AI**| OpenAI API (opsional) | Untuk fitur "AI Feedback Assistant" di portal Instruktur. |
| **Deploy** | FE → Vercel · BE → Railway / AWS ECS | Infrastruktur stabil untuk trafik internal B2B. |

---

## 2. Struktur Repositori (INTERN.PPG)

Sesuai dengan standardisasi proyek *internship*, repositori dibagi menjadi dua blok utama (`frontend` dan `backend`) dengan direktori `docs` yang terpusat.

```text
INTERN.PPG/
├── backend/                # NestJS — REST API, RBAC Guards, S3 Uploader, AI Integrations
├── docs/                   # Dokumentasi sentral proyek
│   ├── diagrams/           # Kumpulan file desain sistem
│   │   ├── Activity Diagram.md
│   │   ├── Class Diagram.md
│   │   ├── Sequence Diagram.md
│   │   ├── Use Case.md
│   │   └── Usecase Diagram.md
│   └── PRD.md              # Product Requirements Document utama (Sumber Kebenaran)
├── frontend/               # Next.js — Company profile, Student Portal, Instructor Portal, Admin CMS
├── .gitignore              # Konfigurasi abaikan file dari pelacakan git
└── README.md               # Dokumentasi awal repositori (Cara instalasi & menjalankan proyek)
```

---

## 3. Clean Architecture — Backend (`backend/`)

Pendekatan modular NestJS (Controller → Service → Repository). Logika bisnis wajib terisolasi, dengan *Guards* global untuk memvalidasi JWT dan *Role* pada setiap *endpoint*.

### 3a. Peta Modul API
| Modul | Cakupan (Functional Requirements) | Aturan Akses (RBAC) |
|---|---|---|
| `auth` | Login multi-role, validasi kredensial, *generate* JWT. | Publik |
| `users` | Kelola profil, ubah *password*, avatar. | Semua Role Login |
| `master-data` | CRUD Program, Modul, Ujian (termasuk *upload* file ke S3). | **ADMIN** murni |
| `cms` | Publikasi Artikel (Blog) dan Galeri perusahaan. | **ADMIN** (Write), Publik (Read) |
| `finance` | *Upload* bukti transfer, verifikasi *approve/reject* pembayaran manual. | Siswa (Write), **ADMIN** (Review) |
| `enrollment`| Pendaftaran kelas (setelah bayar diverifikasi), kalkulasi persentase progres. | Siswa, Sistem |
| `learning` | *Presigned URL* untuk materi Video/PDF, pencatatan *completion* per modul. | Siswa Terdaftar |
| `evaluation`| Algoritma kelulusan otomatis (*scoring* Ujian), *generate* sertifikat PDF. | Siswa, Sistem |
| `grading` | Evaluasi kualitatif/manual oleh Instruktur, integrasi AI *Feedback Draft*. | **INSTRUCTOR** |

### 3b. Tiga Aturan Integritas Bisnis yang WAJIB (System Constraints)
1. **Enrollment Gate (Validasi Pembayaran):** Siswa yang mendaftar kelas berbayar statusnya *Pending*. Status hanya berubah menjadi *Active* setelah Admin mengeklik "Approve" pada modul `finance`. Jangan pernah membuat jalur pintas pendaftaran.
2. **Sequential Learning (Kalkulasi Progres):** Tombol "Mulai Ujian" harus dikunci di level API, bukan hanya disembunyikan di UI. API ujian akan mengembalikan *error* 403 jika total progres `< 100%`.
3. **Asset Protection:** *Path file* materi di *database* (misal: `s3://bucket/modul-1.pdf`) tidak boleh dikirim langsung ke *frontend*. API harus membungkusnya menjadi *Presigned URL* berdurasi pendek (misal: 1 jam) agar *link* tidak bisa disebar ke luar platform.

---

## 4. Struktur Frontend (`frontend/`)

Memanfaatkan **Route Groups** Next.js App Router agar tata letak (*layout*) dan *sidebar* tidak saling bercampur antar peran.

```text
src/app/
├── (public)/          # Halaman depan, Katalog Kelas, Company Profile, Blog Artikel
├── (student)/         # Dashboard Siswa, Checkout Manual, "My Courses", Course Player, Ujian
├── (instructor)/      # Dashboard Instruktur, Jadwal Sesi (Google Calendar API), Grading Form
├── (admin)/           # Master Data CMS, Verifikasi Pembayaran, Manajemen Pengguna
└── api/               # Next.js API routes (jika butuh BFF/BFF layer)
```

---

## 5. Struktur Backend (NestJS + Prisma)

Struktur ini menggunakan pendekatan **Domain-Driven Design (DDD)** ringan yang direkomendasikan oleh NestJS. Setiap fitur bisnis diisolasi ke dalam modulnya masing-masing.

```text
INTERN.PPG/backend/
├── prisma/                         # Konfigurasi Database & ORM
│   ├── migrations/                 # File riwayat migrasi database otomatis
│   ├── seed/                       # Skrip untuk mengisi data awal (Admin default, Role, dll)
│   └── schema.prisma               # File utama pendefinisian entitas/tabel database
├── src/
│   ├── common/                     # Utilitas yang dipakai lintas modul
│   │   ├── decorators/             # Custom decorators (misal: @Roles(), @CurrentUser())
│   │   ├── filters/                # Global exception handlers (format error JSON standar)
│   │   ├── guards/                 # Global guards (misal: JwtAuthGuard, RolesGuard)
│   │   └── interceptors/           # Global interceptors (misal: Response formatting)
│   ├── config/                     # Konfigurasi environment (Load .env variables via @nestjs/config)
│   ├── modules/                    # Modul-modul Logika Bisnis (Sesuai Peta Modul API)
│   │   ├── auth/                   # Modul Autentikasi & JWT
│   │   │   ├── dto/                # Data Transfer Objects (LoginDto, RegisterDto)
│   │   │   ├── auth.controller.ts  # Endpoint HTTP (POST /auth/login)
│   │   │   ├── auth.service.ts     # Logika validasi dan token generation
│   │   │   └── auth.module.ts      # Registrasi modul
│   │   ├── users/                  # Modul Kelola Profil
│   │   ├── master-data/            # Modul CRUD Program, Kelas, dan Modul Materi
│   │   ├── cms/                    # Modul Artikel dan Galeri
│   │   ├── finance/                # Modul Pembayaran & Upload Bukti Transfer
│   │   ├── enrollment/             # Modul Pendaftaran Kelas & Status Siswa
│   │   ├── learning/               # Modul Akses Materi (Generate S3 Presigned URL)
│   │   ├── evaluation/             # Modul Ujian Otomatis & Sertifikat
│   │   └── grading/                # Modul Evaluasi Instruktur & Integrasi AI
│   ├── app.module.ts               # Root module yang mengimpor semua modul di atas
│   └── main.ts                     # Entry point aplikasi NestJS (Setup port, CORS, global prefix)
├── .env                            # Variabel lingkungan lokal (Kredensial DB, Secret JWT, S3 Keys) - JANGAN DI-COMMIT
├── .env.example                    # Template variabel lingkungan untuk referensi tim
├── nest-cli.json                   # Konfigurasi build NestJS
├── package.json                    # Daftar dependencies backend
└── tsconfig.json                   # Konfigurasi aturan TypeScript backend
```

---

## 6. Strategi Branch Git (Trunk-Based)

`main` adalah *branch* produksi yang stabil. Setiap fitur menggunakan *branch* pendek.

| Roadmap Rilis | Branch Utama | Cakupan Fitur |
|---|---|---|
| Fase 1 — Fondasi & CMS | `feat/auth-rbac` · `feat/public-cms` | Setup JWT, CRUD Artikel/Galeri, Landing Page |
| Fase 2 — Master Data | `feat/admin-curriculum` | CRUD Program, Upload S3 Modul & Soal Ujian |
| Fase 3 — Transaksi | `feat/manual-payment` · `feat/enrollment` | Katalog, Checkout Transfer, Bukti Upload, Approval Admin |
| Fase 4 — Pembelajaran | `feat/course-player` · `feat/auto-exam` | Nonton materi, update *progress bar*, kalkulasi ujian & Sertifikat |
| Fase 5 — Evaluasi Manual| `feat/instructor-grading` · `feat/calendar-sync` | Form *feedback* Instruktur, AI Assistant, Jadwal *Mentoring* |

Konvensi commit wajib mengikuti: `feat:`, `fix:`, `refactor:`, `chore:`.

---

## 7. CI/CD & Deployment

*   **CI (`.github/workflows/ci.yml`):** Menjalankan linting (ESLint), format check (Prettier), dan type-checking (TypeScript) pada masing-masing folder (`frontend` & `backend`) pada setiap *Pull Request*.
*   **CD Frontend:** *Push* ke `main` otomatis memicu *build deployment* di Vercel, dengan mengatur *Root Directory* ke `frontend`. Variabel lingkungan (ENV) diatur secara terpisah untuk staging dan produksi.
*   **CD Backend:** Di-*deploy* melalui Docker container ke infrastruktur *cloud* (misal: Railway) yang telah terhubung ke Managed PostgreSQL DB dan AWS S3. *Root Directory* diset ke `backend`.

---

## 8. Agile Working Model (Tim 3: FE · BE · PM)

### 8a. Contract-first Development
*   Skema respon API dan antarmuka (*interface*) **wajib** disepakati bersama terlebih dahulu. 
*   **FE** dapat langsung membangun UI menggunakan data *mock* (dummy JSON) berdasarkan kesepakatan struktur data.
*   **BE** mengimplementasikan logika dengan memastikan struktur *JSON response* sesuai dengan kesepakatan tersebut.

### 8b. Pembagian Peran
*   **BE:** Menyusun modul di dalam direktori `backend/`, merancang skema Prisma, mengamankan S3 URL, dan membangun logika *scoring*.
*   **FE:** Membangun antarmuka di dalam direktori `frontend/`, mengintegrasikan Google Calendar (untuk Instruktur), dan menyusun *Course Player* interaktif.
*   **PM:** Mengelola tiket/isu GitHub, merapikan dokumen di direktori `docs/`, memastikan *Use Case* terpenuhi, dan melakukan *Quality Assurance* sebelum rilis.

---

## 9. Langkah Selanjutnya

1.  Lakukan *commit* pertama untuk kerangka folder `backend`, `frontend`, dan `docs` yang sudah dibuat.
2.  Di dalam direktori `backend/`, susun `schema.prisma` berdasarkan *Class Diagram* dan lakukan migrasi awal.
3.  Di dalam direktori `frontend/`, inisialisasi Next.js dengan Tailwind CSS dan shadcn/ui.
4.  Mulai eksekusi **Fase 1 — Fondasi & CMS**.