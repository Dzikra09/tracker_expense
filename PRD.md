# Product Requirements Document (PRD)
## Proyek: Expense Tracker App (expense-tracker-starter-project)

---

### 1. Development Methodology & Tools

#### 1.1. Pendekatan Pengembangan
Proyek ini dibangun menggunakan metodologi kolaboratif antara developer dan AI Agent (Claude, Gemini, dan ChatGPT). Dalam pendekatan ini, AI Agent berperan sebagai asisten pengembang yang membantu mempercepat implementasi teknis seperti penulisan blok kode backend/frontend, proses debugging, dan penyusunan dokumentasi proyek. Sementara itu, developer memegang kendali penuh atas keputusan arsitektural, perencanaan fitur, validasi hasil kerja agen kecerdasan buatan, serta pelaksanaan pengujian fungsional secara ketat di setiap fase pengembangan.

#### 1.2. Pembagian Tanggung Jawab
Guna menjaga kualitas dan keandalan aplikasi, peran dan tanggung jawab dibagi secara jelas sebagai berikut:
- **Tanggung Jawab Developer**:
  - Perencanaan kebutuhan fungsional dan non-fungsional fitur.
  - Perancangan skema database relasional (tabel, kolom, dan relasi *foreign keys*).
  - Pengambilan keputusan *tech stack* utama (seperti MySQL, Express, dan otentikasi berbasis JWT).
  - Pengujian manual pada setiap tahap implementasi melalui REST Client (untuk endpoint backend) dan browser (untuk antarmuka frontend).
  - Investigasi mendalam dan penyelesaian masalah nyata (*debugging*) yang ditemukan selama proses pengujian.
  - Validasi akhir atas fungsionalitas dan kelayakan fitur sebelum dianggap selesai.
- **Bantuan AI Agent**:
  - Penulisan sintaksis kode program (backend router, controller, integrasi DOM frontend) berdasarkan instruksi spesifikasi yang ditentukan oleh developer.
  - Penjelasan konsep teknis dan penyediaan referensi dokumentasi pustaka perangkat lunak.
  - Penyusunan draft dokumentasi teknis seperti panduan instalasi dan dokumentasi API.
  - Pemberian saran alternatif solusi atau perbaikan saat developer menemui kendala bug kode.

#### 1.3. Alasan Penggunaan Pendekatan Ini
Pendekatan hibrida ini dipilih untuk mengoptimalkan efisiensi proses pembelajaran dan kecepatan implementasi sistem. Dengan mendelegasikan penulisan kode repetitif dan pencarian dokumentasi kepada AI Agent, developer dapat lebih fokus pada perancangan logika bisnis dan arsitektur aplikasi. Keamanan dan integritas pemahaman tetap terjaga secara menyeluruh karena setiap baris kode yang dihasilkan oleh AI Agent wajib diuji, dipahami, dan diverifikasi secara manual oleh developer sebelum diintegrasikan ke basis kode utama.

---

### 2. Problem Statement

Pencatatan keuangan pribadi merupakan langkah awal yang krusial untuk mencapai kesehatan finansial. Namun, banyak individu kesulitan melacak arus masuk dan keluar uang secara konsisten karena tidak adanya alat pencatat yang praktis, aman, dan dapat diakses dari berbagai perangkat.

Versi awal dari aplikasi **Expense Tracker App** dirancang sebagai proyek sederhana berbasis client-side dengan memanfaatkan *Web Local Storage* sebagai media penyimpanan data serta mengabaikan aspek otentikasi (single-user statis). Pendekatan ini memiliki keterbatasan krusial yang membuatnya tidak memadai untuk penggunaan nyata jangka panjang:
- **Kerentanan Kehilangan Data**: Data yang disimpan di *localStorage* akan terhapus secara permanen jika pengguna membersihkan *cache* browser, melakukan reset browser, atau jika penyimpanan lokal tersebut rusak.
- **Ketiadaan Akses Multi-Device**: Karena data disimpan secara lokal pada browser perangkat tertentu, pengguna tidak dapat melihat atau memperbarui catatan keuangan mereka dari perangkat lain (misalnya, mencatat pengeluaran di ponsel saat bepergian, lalu memantaunya di laptop).
- **Masalah Privasi dan Keamanan**: Tidak adanya mekanisme *login* berarti siapapun yang memiliki akses fisik ke perangkat dan browser tersebut dapat melihat, mengubah, bahkan menghapus seluruh data keuangan pengguna.
- **Keterbatasan Kapasitas dan Struktur Data**: *Local Storage* membatasi kapasitas penyimpanan hingga maksimal ~5MB dan menyimpan data dalam bentuk string datar. Hal ini mempersulit pengelolaan relasi data yang lebih kompleks, seperti pemetaan kategori kustom per pengguna, pencarian performan tinggi, serta agregasi tren bulanan secara efisien.

Oleh karena itu, diperlukan peningkatan aplikasi menjadi sistem **full-stack** menggunakan database relasional **MySQL** untuk persistensi data yang andal, backend **Node.js/Express** untuk pemrosesan bisnis yang aman, otentikasi multi-user yang terisolasi, serta fitur visualisasi dan filter data yang dinamis.

---

### 3. Goals

Tujuan utama yang ingin dicapai melalui pengembangan produk ini adalah:
1. **Keamanan & Isolasi Data**: Menyediakan sistem autentikasi pengguna yang aman, memastikan setiap pengguna hanya dapat melihat dan mengelola data keuangan milik mereka sendiri.
2. **Aksesibilitas Multi-Device & Persistensi Data**: Menjamin data transaksi tersimpan dengan aman di database terpusat sehingga dapat diakses secara *real-time* dari browser di perangkat apa pun tanpa risiko kehilangan data akibat pembersihan *browser cache*.
3. **Fleksibilitas Pencatatan**: Memungkinkan pengguna untuk menyesuaikan kategori pengeluaran dan pemasukan mereka sendiri agar relevan dengan profil finansial individu.
4. **Wawasan Finansial yang Visual (Visual Insights)**: Membantu pengguna memahami pola pengeluaran mereka secara instan melalui dasbor ringkasan angka dan grafik visual yang interaktif.
5. **Kemudahan Audit**: Membantu pengguna mencari dan menyaring transaksi historis secara cepat berdasarkan teks, rentang tanggal, maupun kategori khusus.

---

### 4. Target Users

Aplikasi ini ditujukan bagi kelompok pengguna berikut:
1. **Pekerja Muda Mandiri / First-Jobbers**  
   - *Karakteristik*: Individu berumur 21-30 tahun yang baru mulai mengelola penghasilan bulanan sendiri.  
   - *Kebutuhan*: Memerlukan aplikasi yang praktis untuk mencatat pengeluaran harian, melacak ke mana saja uang mereka mengalir, serta mengidentifikasi kategori pengeluaran terbesar agar tidak bersikap konsumtif.
2. **Mahasiswa / Pelajar**  
   - *Karakteristik*: Individu dengan anggaran bulanan atau mingguan yang terbatas dari orang tua atau beasiswa.  
   - *Kebutuhan*: Memerlukan sistem pencatatan yang sederhana dan cepat lewat perangkat seluler atau laptop untuk memantau sisa saldo yang aman digunakan (*safe-to-spend*).

---

### 5. User Stories

Berikut adalah daftar *User Stories* yang mendefinisikan kebutuhan interaksi pengguna dengan sistem:

- **Registrasi & Login**  
  > Sebagai **Pengguna Baru**, saya ingin **membuat akun dengan email dan password unik** supaya **saya bisa memiliki ruang penyimpanan data keuangan pribadi yang aman**.  
  > Sebagai **Pengguna Terdaftar**, saya ingin **masuk ke dalam aplikasi menggunakan kredensial saya** supaya **saya dapat mengakses kembali data keuangan saya dari perangkat mana pun**.

- **Tambah/Edit/Hapus Transaksi**  
  > Sebagai **Pengguna**, saya ingin **mencatat transaksi baru (nominal, tanggal, deskripsi, kategori, tipe pemasukan/pengeluaran)** supaya **arus kas saya terdokumentasi dengan akurat**.  
  > Sebagai **Pengguna**, saya ingin **mengubah data transaksi yang salah input atau menghapusnya jika dibatalkan** supaya **laporan saldo akhir saya tetap tepat**.

- **Membuat Kategori Kustom**  
  > Sebagai **Pengguna**, saya ingin **menambahkan kategori transaksi kustom (misal: "Hobi", "Investasi")** supaya **pengelompokan pengeluaran saya sesuai dengan gaya hidup pribadi saya**.

- **Memfilter Transaksi Berdasarkan Tanggal**  
  > Sebagai **Pengguna**, saya ingin **memfilter riwayat transaksi berdasarkan rentang tanggal tertentu (misalnya, minggu ini atau bulan ini)** supaya **saya bisa memfokuskan evaluasi keuangan pada periode tertentu**.

- **Memfilter Transaksi Berdasarkan Kategori**  
  > Sebagai **Pengguna**, saya ingin **menyaring daftar transaksi hanya untuk kategori tertentu (misalnya, "Makanan")** supaya **saya mengetahui frekuensi dan total dana yang dihabiskan untuk kebutuhan spesifik tersebut**.

- **Mencari Transaksi Berdasarkan Judul**  
  > Sebagai **Pengguna**, saya ingin **mencari transaksi dengan mengetikkan kata kunci pada judul/deskripsi** supaya **saya bisa menemukan transaksi masa lalu secara instan tanpa perlu membaca riwayat satu per satu**.

- **Melihat Ringkasan Saldo**  
  > Sebagai **Pengguna**, saya ingin **melihat kalkulasi otomatis total pemasukan, total pengeluaran, dan saldo bersih saat ini di dasbor** supaya **saya mengetahui kondisi finansial saya secara keseluruhan dalam sekali lihat**.

- **Melihat Visualisasi Distribusi Pengeluaran per Kategori**  
  > Sebagai **Pengguna**, saya ingin **melihat grafik lingkaran (*doughnut/pie chart*) yang menampilkan persentase distribusi pengeluaran per kategori** supaya **saya secara visual langsung mengetahui pos pengeluaran mana yang paling mendominasi**.

- **Melihat Tren Bulanan**  
  > Sebagai **Pengguna**, saya ingin **melihat grafik batang atau garis yang menunjukkan tren pengeluaran dan pemasukan dari bulan ke bulan** supaya **saya dapat membandingkan kestabilan finansial saya dari waktu ke waktu**.

---

### 6. Functional Requirements

Persyaratan fungsional dikelompokkan berdasarkan modul sistem berikut:

#### Modul Autentikasi
- **FR-1**: Sistem harus menyediakan formulir registrasi yang meminta input `full_name`, `username`, `email`, dan `password`.
- **FR-2**: Sistem harus melakukan validasi keunikan data dan menolak pendaftaran jika `username` atau `email` sudah terdaftar di sistem.
- **FR-3**: Sistem harus memvalidasi format email dan memastikan panjang password minimal adalah 6 karakter pada sisi server dan client.
- **FR-4**: Sistem harus memverifikasi kredensial saat login dan menghasilkan token otorisasi (JWT) yang valid bagi pengguna yang berhasil masuk.
- **FR-5**: Sistem harus menolak akses ke semua fitur transaksi, kategori, dan dasbor bagi pengguna yang tidak memiliki token otorisasi yang valid.

#### Modul Manajemen Kategori
- **FR-6**: Sistem harus menyediakan daftar kategori bawaan (*default categories*) seperti "Makanan", "Transportasi", "Gaji", dll., saat pengguna pertama kali terdaftar.
- **FR-7**: Sistem harus memungkinkan pengguna membuat kategori baru dengan menentukan nama kategori dan tipe kategori (`income` atau `expense`).
- **FR-8**: Sistem harus membatasi nama kategori agar unik untuk masing-masing pengguna (pengguna tidak boleh membuat dua kategori dengan nama yang sama).
- **FR-9**: Sistem harus memungkinkan pengguna memperbarui nama kategori kustom.
- **FR-10**: Sistem harus mencegah penghapusan kategori yang masih digunakan oleh minimal satu data transaksi aktif (untuk menjaga integritas data relasional).

#### Modul Manajemen Transaksi
- **FR-11**: Sistem harus memungkinkan pengguna membuat transaksi baru dengan menyertakan data: judul/deskripsi (wajib), nominal (wajib, harus berupa angka positif > 0), tanggal (wajib, format YYYY-MM-DD), tipe transaksi (pemasukan/pengeluaran), dan ID Kategori.
- **FR-12**: Sistem harus secara otomatis mengasosiasikan transaksi yang dibuat dengan ID pengguna yang sedang masuk.
- **FR-13**: Sistem harus menyediakan fitur pembaruan transaksi (mengedit judul, nominal, tanggal, tipe, atau kategori transaksi).
- **FR-14**: Sistem harus menyediakan fitur *toggle* cepat untuk mengubah tipe transaksi dari pemasukan ke pengeluaran (atau sebaliknya) secara langsung pada list transaksi.
- **FR-15**: Sistem harus memungkinkan pengguna menghapus transaksi tertentu secara permanen.

#### Modul Filter & Pencarian
- **FR-16**: Sistem harus dapat menyaring riwayat transaksi berdasarkan teks pencarian pada judul/deskripsi transaksi secara *case-insensitive*.
- **FR-17**: Sistem harus dapat menyaring transaksi berdasarkan rentang tanggal yang dipilih oleh pengguna (tanggal mulai dan tanggal selesai).
- **FR-18**: Sistem harus dapat menyaring transaksi berdasarkan satu atau beberapa kategori tertentu yang dipilih pengguna.
- **FR-19**: Sistem harus mendukung kombinasi filter secara bersamaan (misal: mencari kata kunci "kopi" dalam rentang tanggal 1-10 Juli pada kategori "Makanan").

#### Modul Dashboard & Visualisasi
- **FR-20**: Sistem harus menampilkan ringkasan finansial yang terdiri atas: Total Pemasukan, Total Pengeluaran, dan Saldo Bersih (Selisih) secara dinamis sesuai dengan hasil filter transaksi yang aktif.
- **FR-21**: Sistem harus merender grafik lingkaran (*Doughnut Chart*) menggunakan Chart.js untuk menampilkan persentase alokasi pengeluaran per kategori.
- **FR-22**: Sistem harus merender grafik batang (*Bar Chart*) atau grafik garis (*Line Chart*) untuk menunjukkan tren perbandingan pemasukan vs pengeluaran bulanan.
- **FR-23**: Visualisasi grafik harus otomatis diperbarui (*re-render*) secara dinamis ketika pengguna menerapkan filter pencarian, rentang tanggal, atau kategori.

---

### 7. Non-Functional Requirements

#### Keamanan (Security)
- **NFR-1**: Sistem wajib mengamankan penyimpanan kata sandi di database dengan melakukan proses hashing satu arah menggunakan algoritma **bcrypt** (dengan *salt round* minimum 10). Kata sandi asli dalam bentuk teks polos tidak boleh disimpan di database.
- **NFR-2**: Otorisasi request API wajib berbasis **JSON Web Token (JWT)** yang dikirim melalui *HTTP Header* (`Authorization: Bearer <token>`). Masa berlaku token harus dibatasi (misal: 24 jam).
- **NFR-3**: Sistem harus menjamin **Isolasi Data Antar-User** di tingkat database. Setiap query SQL (SELECT, INSERT, UPDATE, DELETE) untuk kategori atau transaksi wajib menyertakan filter `user_id` yang didapatkan dari verifikasi token JWT di backend.

#### Performa (Performance)
- **NFR-4**: Agregasi data finansial (seperti jumlah total uang per kategori untuk chart, tren bulanan, dan total ringkasan saldo) harus dihitung dan dikelompokkan di level database menggunakan query SQL (misalnya `SUM` dan `GROUP BY`), bukan dengan memuat semua data mentah lalu menghitungnya di sisi client.
- **NFR-5**: Sistem harus mengembalikan respons API untuk pemuatan riwayat transaksi standar dalam waktu kurang dari 500ms pada kondisi jaringan normal.
- **NFR-6**: Database MySQL harus menerapkan indeks (*index*) pada kolom yang sering dicari atau direlasikan, yaitu `user_id` pada tabel transaksi dan kategori.

#### Kegunaan / Kemudahan Penggunaan (Usability)
- **NFR-7**: Form input pada frontend harus memiliki validasi awal (seperti tipe data numerik pada nominal, format email, dan field wajib diisi) untuk mencegah pengiriman request yang sia-sia ke server.
- **NFR-8**: Backend harus mengimplementasikan validasi skema input (server-side validation). Jika data tidak valid, backend harus mengembalikan respon dengan kode HTTP yang sesuai (400 Bad Request) dan pesan error terstruktur yang jelas.
- **NFR-9**: Antarmuka pengguna harus responsif (*mobile-friendly*) dan menggunakan skema warna kontras yang ramah mata (menggunakan font modern seperti Inter/Roboto, transisi hover yang halus, serta indikator pemuatan/loading yang jelas saat menunggu respon API).

---

### 8. Scope

#### In Scope (Dalam Cakupan Proyek)
- Halaman registrasi dan masuk (*Login & Register page*) yang aman dan responsif.
- Dasbor utama finansial yang memuat komponen visualisasi Chart.js (grafik distribusi kategori dan tren bulanan).
- Fitur CRUD lengkap untuk pencatatan transaksi keuangan.
- Fitur CRUD lengkap untuk manajemen kategori transaksi kustom.
- Panel filter interaktif yang mendukung filter rentang tanggal, filter dropdown kategori, serta kolom pencarian teks.
- Backend API berbasis Node.js/Express, ORM/Driver MySQL, dan JWT Authentication Middleware.
- Skema database MySQL yang terdiri dari tabel `users`, `categories`, dan `transactions` dengan relasi kunci asing (*Foreign Keys*) yang tepat.

#### Out of Scope (Di Luar Cakupan Proyek)
- **Multi-currency**: Aplikasi hanya mendukung satu mata uang default (Rupiah/IDR) dan tidak melakukan konversi mata uang asing secara real-time.
- **Ekspor Laporan**: Fitur untuk mengekspor riwayat transaksi ke format file eksternal seperti CSV, Excel, atau PDF tidak disediakan dalam fase ini.
- **Sistem Anggaran / Budgeting**: Fitur penetapan batas anggaran maksimum per kategori per bulan beserta peringatan visual saat pengeluaran melampaui batas tidak diimplementasikan.
- **Sistem Notifikasi**: Tidak ada notifikasi push atau email pengingat harian untuk mencatat keuangan.
- **Aplikasi Mobile Native**: Aplikasi tidak dideploy ke Google Play Store atau Apple App Store; platform yang didukung murni berbasis web (dapat diakses via mobile browser/PWA).
- **Integrasi Bank**: Tidak ada fitur sinkronisasi otomatis dengan rekening bank maupun e-wallet asli. Semua pencatatan dilakukan secara manual oleh pengguna.
