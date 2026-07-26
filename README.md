# Expense Tracker App

Expense Tracker App adalah aplikasi pengelola keuangan pribadi *full-stack* yang membantu pengguna memantau, mencatat, dan menganalisis pengeluaran serta pemasukan finansial secara persisten, aman, dan interaktif.

---

## Tampilan Aplikasi

[Tambahkan screenshot aplikasi di sini]

---

## Fitur Utama

- **Autentikasi Multi-User**: Pendaftaran akun baru dan login aman dengan verifikasi kredensial serta perlindungan isolasi data antar-pengguna.
- **CRUD Transaksi**: Pencatatan arus kas masuk (pemasukan) dan arus kas keluar (pengeluaran) lengkap dengan pengubahan dan penghapusan data.
- **Kategori Kustom**: Kebebasan bagi pengguna untuk menambah, mengubah, dan menghapus kategori keuangan personal sesuai dengan kebutuhan masing-masing.
- **Penyaringan & Pencarian Dinamis**: Filter riwayat transaksi berdasarkan rentang tanggal tertentu, kategori tertentu, serta pencarian judul transaksi secara langsung (*real-time*).
- **Dashboard Rekap Finansial**: Ringkasan kalkulasi otomatis untuk Saldo Saat Ini, Total Pemasukan, dan Total Pengeluaran.
- **Visualisasi Data Interaktif**: Analisis visual menggunakan Chart.js untuk menampilkan persentase alokasi pengeluaran per kategori (*Doughnut Chart*) dan tren keuangan bulanan (*Bar/Line Chart*).

---

## Tech Stack

### Frontend
- **HTML5** & **CSS3**: Penyusunan kerangka halaman dan *styling layout* yang bersih dan modern.
- **Vanilla JavaScript (ES6+)**: Logika interaksi antarmuka, pemanggilan API, otentikasi client-side, dan manipulasi DOM.
- **Chart.js**: Library visualisasi grafik di sisi client untuk penyajian statistik keuangan yang interaktif.

### Backend
- **Node.js** & **Express.js**: Platform runtime JavaScript dan framework server-side untuk menangani rute RESTful API serta middleware.
- **MySQL**: Database relasional untuk menyimpan data pengguna, kategori, dan transaksi secara persisten.
- **JSON Web Token (JWT)**: Protokol keamanan berbasis token untuk otorisasi akses API.
- **bcrypt**: Pustaka keamanan untuk melakukan *hashing* kata sandi pengguna sebelum disimpan ke database.

---

## Struktur Folder

```text
expense-tracker/
├── frontend/   (HTML, CSS, JS vanilla — index.html, style.css, config.js, 
                 auth.js, category.js, dashboard.js, main.js)
└── backend/    (Node.js + Express + MySQL — server.js, src/config, 
                 src/controllers, src/routes, src/middlewares)
```

---

## Cara Menjalankan Proyek Secara Lokal

### Prasyarat
Pastikan Anda sudah mengunduh dan memasang perangkat lunak berikut di mesin lokal Anda:
- **Node.js** (versi 16 atau lebih baru)
- **MySQL Server** (atau paket bundle seperti XAMPP / Laragon)

---

### Langkah-Langkah Instalasi

#### 1. Clone Repository
```bash
git clone https://github.com/username/expense-tracker-starter-project.git
cd expense-tracker-starter-project
```

#### 2. Setup Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal semua dependensi yang diperlukan:
   ```bash
   npm install
   ```
3. Duplikat file konfigurasi environment dari `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```
4. Buka file `.env` di text editor Anda, lalu sesuaikan kredensial koneksi database MySQL Anda:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=password_mysql_kamu
   DB_NAME=expense_tracker
   JWT_SECRET=rahasia_super_aman_kamu
   ```
5. Buat database dan jalankan perintah DDL (Data Definition Language) berikut di klien MySQL Anda (seperti phpMyAdmin, DBeaver, atau MySQL CLI) untuk membangun tabel:
   ```sql
   CREATE DATABASE IF NOT EXISTS expense_tracker;
   USE expense_tracker;

   -- Tabel Users
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     full_name VARCHAR(255) NOT NULL,
     username VARCHAR(100) NOT NULL UNIQUE,
     email VARCHAR(255) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Tabel Categories
   CREATE TABLE IF NOT EXISTS categories (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     name VARCHAR(100) NOT NULL,
     type ENUM('income', 'expense') NOT NULL,
     icon VARCHAR(50) DEFAULT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );

   -- Tabel Transactions
   CREATE TABLE IF NOT EXISTS transactions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     category_id INT NOT NULL,
     title VARCHAR(255) NOT NULL,
     amount DECIMAL(15, 2) NOT NULL,
     type ENUM('income', 'expense') NOT NULL,
     transaction_date DATE NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
   );
   ```
6. Jalankan server backend dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   Server backend akan aktif di: `http://localhost:5000`

---

#### 3. Setup Frontend
1. Masuk ke direktori frontend:
   ```bash
   cd ../frontend
   ```
2. Jalankan file `index.html` menggunakan fitur **Live Server** (ekstensi VS Code atau pustaka npm `live-server`).
   
   > **Catatan Penting**: Mengapa harus menggunakan Live Server?  
   > Membuka file `index.html` dengan cara langsung (*double click* file lokal di browser) akan memicu protokol `file://`. Hal ini membatasi beberapa modul JavaScript modern (ES Modules) untuk diimpor, dan dapat menyebabkan masalah *Cross-Origin Resource Sharing* (CORS) saat memanggil API backend. Dengan Live Server, file disajikan melalui protokol `http://localhost`, yang mensimulasikan lingkungan server produksi yang sebenarnya.

---

## Daftar Endpoint API

Semua request API ke backend dilindungi oleh token otentikasi JWT (kecuali untuk modul Auth). Token tersebut dikirim melalui header sebagai `Authorization: Bearer <token>`.

### 1. Modul Auth
| Method | Path | Deskripsi | Butuh Otorisasi? |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Mendaftarkan akun baru | Tidak |
| `POST` | `/api/auth/login` | Memverifikasi kredensial dan mendapatkan JWT Token | Tidak |

### 2. Modul Categories
| Method | Path | Deskripsi | Butuh Otorisasi? |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/categories` | Mengambil seluruh kategori milik user saat ini (opsional filter tipe) | Ya |
| `POST` | `/api/categories` | Menambah kategori kustom baru | Ya |
| `PUT` | `/api/categories/:id` | Mengubah informasi kategori berdasarkan ID | Ya |
| `DELETE` | `/api/categories/:id` | Menghapus kategori kustom (hanya jika tidak memiliki transaksi terkait) | Ya |

### 3. Modul Transactions
| Method | Path | Deskripsi | Butuh Otorisasi? |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/transactions` | Mengambil daftar transaksi dengan dukungan pencarian & penyaringan | Ya |
| `POST` | `/api/transactions` | Membuat transaksi pengeluaran/pemasukan baru | Ya |
| `PUT` | `/api/transactions/:id` | Mengubah data transaksi berdasarkan ID | Ya |
| `DELETE` | `/api/transactions/:id` | Menghapus data transaksi secara permanen | Ya |
| `PATCH` | `/api/transactions/:id/toggle-type` | Mengubah tipe transaksi (pemasukan <=> pengeluaran) secara cepat | Ya |

### 4. Modul Dashboard
| Method | Path | Deskripsi | Butuh Otorisasi? |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/dashboard/summary` | Mengambil total pemasukan, total pengeluaran, dan saldo bersih | Ya |
| `GET` | `/api/dashboard/by-category` | Mengambil total alokasi finansial per kategori (untuk grafik doughnut) | Ya |
| `GET` | `/api/dashboard/monthly-trend` | Mengambil rekap finansial bulanan (untuk grafik tren bar/line) | Ya |

---

## Skema Database

Aplikasi menggunakan skema database MySQL sederhana dengan 3 tabel utama yang saling berelasi:

1. **`users` (Tabel Pengguna)**  
   Menyimpan kredensial otentikasi dan data profil pengguna. Kunci utama `id` digunakan sebagai referensi kepemilikan data pada tabel-tabel lainnya.

2. **`categories` (Tabel Kategori)**  
   Menampung daftar kategori transaksi keuangan. Tabel ini memiliki relasi *Many-to-One* ke tabel `users` lewat kolom kunci tamu `user_id` (data kategori diisolasi per pengguna).

3. **`transactions` (Tabel Transaksi)**  
   Mencatat riwayat transaksi keuangan masuk dan keluar. Tabel ini terhubung ke tabel `users` (`user_id`) untuk kepemilikan transaksi, dan ke tabel `categories` (`category_id`) untuk penentuan klasifikasi transaksi. Penghapusan kategori dibatasi (*restrict*) bila ada transaksi terkait untuk menjaga keutuhan laporan keuangan.

---

## Kontributor

- [Nama Kamu] & [Nama Partner]

---

## Lisensi

Proyek pembelajaran pribadi, dibuat untuk keperluan portofolio.
