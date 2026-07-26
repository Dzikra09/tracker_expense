# Design System Document
## Proyek: expense-tracker-starter-project

Dokumen ini menjelaskan spesifikasi dan panduan visual untuk peremajaan antarmuka aplikasi **expense-tracker-starter-project**. Pendekatan desain ini bertujuan untuk menghadirkan nuansa finansial yang kokoh, profesional, presisi, dan modern.

---

### 1. Prinsip Desain

Sistem desain ini dibangun di atas 3 prinsip utama yang membedakannya dari gaya desain *mainstream* yang lembut dan bulat:

1. **Kontras Tinggi (*High Contrast*)**  
   Semua informasi disajikan secara lugas dengan kontras warna yang tegas (teks hitam pekat di atas latar putih bersih) untuk menjamin tingkat keterbacaan (*readability*) yang maksimal dan mempermudah pemindaian data keuangan secara cepat.
2. **Ketegasan Bentuk (*Hard Edges*)**  
   Menghindari sudut tumpul (*rounded corners*) dan efek bayangan (*box-shadow*) yang menyebar halus. Semua komponen menggunakan sudut kotak yang tajam (sudut hampir siku) dan garis pembatas solid untuk memberikan kesan formal, presisi, dan seperti pembukuan profesional (*ledger/fintech-inspired*).
3. **Konsistensi Elemen (*Component Consistency*)**  
   Penggunaan elemen visual yang seragam di seluruh halaman (misal: gaya tombol, kolom input, dan ketebalan border) untuk menciptakan pengalaman navigasi yang intuitif dan memperkuat identitas visual aplikasi.

---

### 2. Palet Warna

Semua warna dalam aplikasi dikelola melalui variabel CSS (*CSS Variables*) untuk memudahkan pemeliharaan dan modifikasi tema di masa depan.

| Variabel CSS | Kode Hex | Penggunaan Utama |
| :--- | :--- | :--- |
| `--bg-page` | `#FFFFFF` | Latar belakang utama halaman |
| `--bg-card` | `#FFFFFF` | Latar belakang komponen kartu (*card*) dan panel |
| `--text-dark` | `#111111` | Teks judul utama, isi paragraf, dan label |
| `--text-muted` | `#5C5C5C` | Teks sekunder, catatan kaki, keterangan tanggal, dan placeholder |
| `--accent-yellow` | `#FFC700` | Aksen warna utama, warna brand, tombol primer, dan penanda aktif |
| `--accent-yellow-dark` | `#E6B400` | State hover dan aktif untuk tombol beraksen kuning |
| `--color-income` | `#0F6B3D` | Indikator visual untuk status pemasukan (*income*) |
| `--color-expense` | `#B91C1C` | Indikator visual untuk status pengeluaran (*expense*) |
| `--border-dark` | `#111111` | Garis pembatas (border) tegas di setiap komponen |

---

### 3. Tipografi

Sistem tipografi menggunakan kombinasi dua font modern berkarakter kuat untuk memisahkan hierarki informasi secara jelas:

- **Display/Judul**: `Space Grotesk`  
  - **Ketebalan (*Weight*)**: Bold (`700`), Extra Bold (`800`)  
  - **Penerapan**: Digunakan untuk elemen judul utama (`h1`, `h2`, `h3`), nama brand/logo, dan nilai saldo utama yang membutuhkan penekanan visual yang kuat.
- **Body/Teks Utama**: `Inter`  
  - **Ketebalan (*Weight*)**: Regular (`400`), Medium (`500`), Semi-Bold (`600`)  
  - **Penerapan**: Digunakan untuk teks isi paragraf, label formulir, input teks, tombol, tabel, dan daftar transaksi.

---

### 4. Layout & Spacing

Tata letak elemen diatur menggunakan aturan spasial yang kaku untuk memperkuat prinsip bentuk tegas:

- **Border Radius**: `2px`  
  Semua komponen (tombol, input, card, tag, modal) menggunakan `border-radius: 2px` untuk mempertahankan sudut yang hampir kotak sempurna.
- **Ketebalan Garis (*Border Width*)**:  
  - Pembatas card dan panel: `1.5px solid var(--border-dark)`  
  - Tombol utama dan input: `2px solid var(--border-dark)`  
- **Card Padding**: `24px` di semua sisi untuk memberikan ruang bernapas yang cukup bagi teks tanpa mengurangi ketegasan struktur kotak.
- **Prinsip Bayangan (*Shadow Principle*)**:  
  Aplikasi ini **tidak menggunakan** *box-shadow* halus/menyebar (*blur*). Efek bayangan diganti menggunakan garis solid tegas atau bayangan solid bertipe *hard shadow* (misal: `box-shadow: 4px 4px 0px #111111`).

---

### 5. Komponen UI

Visualisasi komponen antarmuka yang direncanakan:

| Nama Komponen | Karakteristik Gaya | Spesifikasi Visual |
| :--- | :--- | :--- |
| **Tombol Primer** | Latar kuning, teks hitam, border hitam tebal, efek hover bayangan solid | `background-color: var(--accent-yellow); color: var(--text-dark); border: 2px solid var(--border-dark); transform: translate(-2px, -2px); box-shadow: 2px 2px 0px var(--border-dark); transition: all 0.1s ease-in-out;` |
| **Tombol Sekunder** | Latar putih, border hitam tebal, teks hitam, tanpa efek bayangan | `background-color: #FFFFFF; color: var(--text-dark); border: 2px solid var(--border-dark);` |
| **Input Form** | Latar putih, border hitam tegas, state fokus berwarna kuning | `border: 2px solid var(--border-dark); background-color: #FFFFFF; transition: border-color 0.15s;` (Fokus: `background-color: #FFFDE6; outline: none;`) |
| **Card** | Latar putih, border hitam tegas, tanpa bayangan halus | `background-color: var(--bg-card); border: 1.5px solid var(--border-dark); padding: 24px;` |
| **Chip/Tag Kategori** | Kotak kecil tegas dengan border hitam, teks kategori | `display: inline-block; padding: 4px 8px; border: 1.5px solid var(--border-dark); font-size: 12px; font-weight: 600;` |

---

### 6. Elemen Signature

Untuk membangun ciri khas visual yang konsisten di setiap halaman, aplikasi ini menyertakan satu **Elemen Signature** khusus:
- **Garis Kuning Tebal (*Thick Yellow Top-Line*)**:  
  Sebuah garis horizontal berwarna kuning berukuran tinggi `6px` (`background-color: var(--accent-yellow)`) diletakkan di bagian paling atas (*top viewport*) dari setiap halaman aplikasi. Garis ini bertindak sebagai identitas visual instan yang menyatukan seluruh halaman aplikasi portofolio.

---

### 7. Aksesibilitas

Pengembangan antarmuka wajib mematuhi standar aksesibilitas dasar berikut:
- **Focus Indicator**: Semua elemen interaktif (tombol, input, link) harus menunjukkan indikator fokus yang sangat jelas saat diakses menggunakan keyboard. Konfigurasinya menggunakan `outline: 2px solid var(--accent-yellow)` dengan `outline-offset: 2px` saat memicu state `focus-visible`.
- **Rasio Kontras (*Contrast Ratio*)**: Semua elemen teks berwarna utama maupun indikator (pemasukan/pengeluaran) wajib memenuhi standar minimal **WCAG AA** untuk kontras teks di atas latar belakang putih/terang guna mendukung pengguna dengan gangguan penglihatan ringan.

---

### 8. Status Implementasi

> [!NOTE]  
> **Status**: *Rencana / Blueprint Desain*  
> Sistem desain yang didokumentasikan di atas merupakan cetak biru visual untuk pengembangan antarmuka di masa mendatang. Implementasi penuh ke kode stylesheet belum diterapkan pada versi aplikasi saat ini untuk menjaga stabilitas struktural fungsionalitas yang telah terintegrasi dengan backend API dan database MySQL.
