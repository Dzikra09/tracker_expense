# Analisis Project: Expense Tracker App

Berdasarkan analisis langsung pada *source code* (HTML, CSS, JS), berikut adalah detail teknis dari aplikasi yang terdapat di dalam folder proyek ini:

## 1. IDENTITAS PROJECT
- **Nama/Judul Project**: Expense Tracker App (Ditemukan di `README.md` baris 1 dan tag `<title>` pada `index.html` baris 6).
- **Jenis Aplikasi**: Web Application (Client-Side HTML statis).
- **Tujuan Aplikasi**: Aplikasi pencatat keuangan sederhana yang menyelesaikan masalah pencatatan arus kas (pemasukan dan pengeluaran) serta menampilkan ringkasan saldo pengguna secara *real-time* (Terlihat dari UI di `index.html` baris 27-73 dan kalkulasi di `main.js`).

## 2. TECH STACK
- **Bahasa Pemrograman Utama**: HTML5, CSS3, dan Vanilla JavaScript (ES6+). Terlihat dari ekstensi file yang digunakan dan penulisan sintaks.
- **Framework/Library**: **Tidak menggunakan *framework* atau *library* eksternal apapun**. Aplikasi murni ditulis dengan *Vanilla JS* (terbukti dari ketiadaan file `package.json`, konfigurasi *bundler*, maupun *tag script* CDN di `index.html`). Modifikasi DOM dilakukan secara native seperti `document.getElementById` dan `createElement` di `main.js`.
- **Database**: **Tidak ada database relasional (SQL) atau NoSQL berbasis server**. Aplikasi menyimpan data secara lokal pada *browser* pengguna menggunakan **Local Storage Web API**.
- **Cara Koneksi Database**: Menggunakan *native* JavaScript Web API (`localStorage.setItem()` dan `localStorage.getItem()`) dengan konversi data berbentuk *string* JSON, sebagaimana terlihat pada `main.js` baris 43-50 (`saveToLocalStorage` dan `loadFromLocalStorage`).

## 3. ARSITEKTUR
- **Pola Arsitektur**: Tidak terstruktur secara *pattern* khusus (monolitik statis). Logika UI, manipulasi DOM, validasi *form*, dan interaksi penyimpanan data (Storage) seluruhnya disatukan dalam satu file (`main.js`).
- **Struktur Folder Utama dan Fungsinya**:
  - `index.html`: Kerangka struktur antarmuka dan *layout* halaman (*views*).
  - `style.css`: Aturan desain visual dan *styling* (*stylesheets*).
  - `main.js`: *Controller* tunggal tempat semua logika aplikasi berada, mulai dari *event listener*, pemrosesan data, hingga manipulasi elemen DOM (baris 1 - 272).
  - `README.md` dan `submission-rubric.md`: Dokumentasi dan panduan penilaian proyek dari platform (Dicoding).

## 4. FITUR UTAMA
Berikut adalah fitur-fitur fungsional yang berjalan berdasarkan *event listener* di `main.js`:
- **Dashboard Ringkasan (*Financial Summary*)**: Menghitung secara otomatis *Saldo Saat Ini*, *Pemasukan*, dan *Pengeluaran* berdasarkan seluruh riwayat (fungsi `updateDashboard` pada `main.js` baris 55).
- **CRUD Transaksi (Create, Read, Update, Delete)**:
  - **Create**: *Form submit* untuk mencatat transaksi baru dengan atribut *keterangan*, *nominal*, *tanggal*, dan *tipe* (`main.js` baris 214 - `transactionForm.addEventListener("submit")`).
  - **Read**: Menampilkan daftar riwayat secara dinamis ke dalam dua kolom arus berbeda (Pemasukan vs Pengeluaran) (fungsi `renderTransactions` pada `main.js` baris 75).
  - **Update**: Mode *Edit* keterangan (`main.js` baris 202) dan tombol aksi cepat "Ubah Tipe" (*toggle income/expense*) pada masing-masing *card* (`main.js` baris 157).
  - **Delete**: Penghapusan *item* transaksi spesifik (`main.js` baris 172).
- **Pencarian Real-Time (Search/Filter)**: Menyaring daftar riwayat transaksi berdasarkan teks judul/keterangan yang diinput pengguna (`main.js` baris 255 - `searchInput.addEventListener("input")`).
- **Autentikasi**: *Tidak ada*. Nama *user* ("Halo, dzikra_althaf") berstatus *hardcoded* statis di file `index.html` (baris 19).

## 5. STRUKTUR DAN QUERY DATABASE
Karena proyek tidak menggunakan *Database Management System* (MySQL/PostgreSQL), **tidak ada skema file .sql, *migration*, maupun relasi *table* (*One-to-Many*, dll)**.

Sebagai gantinya, struktur data direpresentasikan dalam bentuk **Array of Objects JSON** di *memory* dan *Local Storage*. 
Skema tunggal entitas transaksi berbentuk seperti ini (dirakit di `main.js` baris 237):
```json
{
  "id": 1690000000000, 
  "title": "Makan siang", 
  "amount": 50000, 
  "date": "2023-07-22", 
  "type": "expense" 
}
```

**Contoh "Query" (Manipulasi Array JS) paling kompleks di kode ini:**
1. **Pencarian Dinamis Berdasarkan Teks (Search)**:
   ```javascript
   // main.js baris 258-262
   const filtered = keyword
     ? transactions.filter((tx) =>
         tx.title.toLowerCase().includes(keyword)
       )
     : transactions;
   ```
   *Penjelasan*: Bertindak seperti query `SELECT * FROM transactions WHERE title LIKE '%keyword%'`. Menggunakan fungsi bawaan `Array.prototype.filter()` dan `String.prototype.includes()` untuk menyaring objek *array* yang judulnya memuat kata kunci secara *case-insensitive*.

2. **Kalkulasi Agregasi Saldo Dashboard (Sum/Aggregation)**:
   ```javascript
   // main.js baris 59-65
   data.forEach((t) => {
     if (t.type === "income") {
       income += t.amount;
     } else {
       expense += t.amount;
     }
   });
   ```
   *Penjelasan*: Bertindak seperti `SELECT SUM(amount) GROUP BY type`. Skrip melakuan perulangan terhadap seluruh *array* transaksi, memisahkannya ke dalam variabel `income` atau `expense` berdasarkan properti tipe data tersebut untuk menghasilkan rekap saldo.

3. **Penghapusan Data Spesifik (Delete)**:
   ```javascript
   // main.js baris 175-177
   transactions = transactions.filter(
     (t) => t.id !== transaction.id
   );
   ```
   *Penjelasan*: Bertindak seperti `DELETE FROM transactions WHERE id = ?`. Array utama diperbarui (`re-assigned`) dengan mempertahankan seluruh data yang ID-nya *tidak* sama dengan data yang sedang diklik hapus.

## 6. POIN TEKNIS YANG BISA DITONJOLKAN DI CV
*Gunakan kalimat-kalimat ini di CV/Portofolio Anda (sesuaikan dengan target lowongan):*

- **"Membangun aplikasi web Single Page Application (SPA) Expense Tracker fungsional secara murni menggunakan Vanilla JavaScript, HTML5, dan CSS3."**
- **"Mengimplementasikan fungsionalitas CRUD secara mandiri untuk pencatatan transaksi keuangan beserta kalkulasi riwayat dashboard otomatis di sisi *client*."**
- **"Merancang sistem penyimpanan lokal (Local Storage API) untuk menjamin persistensi data pengguna di *browser* tanpa memerlukan integrasi ke *backend server*."**
- **"Mengembangkan fitur pencarian data dan penyaringan (*filtering*) *real-time* dengan memanipulasi *Array* dan *String Objects* pada JavaScript secara efisien."**
- **"Memanipulasi struktur DOM (*Document Object Model*) tingkat lanjut untuk merender komponen *list* UI secara dinamis berdasarkan respons *input* pengguna."**
