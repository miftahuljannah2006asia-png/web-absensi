# Presensi Kelas Real-Time

Sistem Presensi Kelas dengan Pemindai QR Code otomatis, terhubung langsung ke Google Sheets dan Database SQL dengan dukungan sinkronisasi real-time & offline cache.

---

## ⚠️ Kenapa Tampilan CSS Tidak Muncul Saat Di-upload ke GitHub?

Jika Anda mengunggah file ke GitHub dan tampilan web tidak memiliki CSS (tampil berantakan/hanya teks polos), berikut penyebab utama dan solusinya:

### 1. Masalah Path Absolut vs Relatif (Sudah Diperbaiki!)
- **Penyebab:** Sebelumnya tag stylesheet ditulis `<link rel="stylesheet" href="/style.css" />` (dengan tanda slash `/` di awal).
- Pada GitHub Pages, website Anda di-hosting di sub-direktori:  
  `https://username.github.io/nama-repository/`
- Tanda `/style.css` membuat browser mencari file di `https://username.github.io/style.css` (bukan di dalam folder repository Anda), sehingga terjadi error **404 Not Found**.
- **Solusi yang sudah diterapkan:** Sekarang sudah diubah menjadi path relatif:
  ```html
  <link rel="stylesheet" href="./style.css" />
  <script src="./script.js"></script>
  ```
  Dengan `./style.css`, browser akan mencari file tepat di folder repository Anda di GitHub Pages.

---

### 2. Cara Mengaktifkan GitHub Pages dengan Benar
File HTML dan CSS di GitHub tidak akan otomatis tampil sebagai website hanya dengan membuka link repository atau raw URL. Anda harus mengaktifkan fitur **GitHub Pages**:

1. Buka repository Anda di **GitHub**.
2. Klik tab **Settings** (ikon gerigi di atas).
3. Di panel menu kiri, klik **Pages** (di bawah bagian *Code and automation*).
4. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`
   - **Branch**: Pilih `main` (atau `master`) dan folder `/ (root)`
   - Klik tombol **Save**.
5. Tunggu sekitar 1 - 2 menit, lalu refresh halaman Settings -> Pages.
6. GitHub akan menampilkan link website Anda, misalnya:  
   👉 `https://username.github.io/nama-repository/`
7. Buka link tersebut, CSS dan JavaScript akan ter-load 100% sempurna!

---

### 3. Jangan Membuka Link "Raw" GitHub
- Jika Anda membuka link `raw.githubusercontent.com/.../index.html`, browser memblokir CSS karena GitHub mengirimkan header keamanan `X-Content-Type-Options: nosniff` (dianggap teks biasa).
- Gunakan selalu link **GitHub Pages** resmi seperti langkah 2 di atas.

---

## 📂 Struktur File
- `index.html` : Struktur antarmuka presensi modern, tabel responsif & modal
- `style.css` : Styling tema elegan, kartu statistik, pemindai kamera & animasi
- `script.js` : Logika presensi, scanner kamera, sinkronisasi Google Sheets, reset kehadiran, dan master 98 data
- `google-apps-script.js` : Skrip integrasi Google Sheets & koneksi database JDBC SQL
- `database-schema.sql` : Skema tabel database MySQL / PostgreSQL
