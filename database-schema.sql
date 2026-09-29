-- ====================================================================
-- SISTEM PRESENSI KELAS - SKEMA DATABASE SQL (MySQL / MariaDB / PostgreSQL)
-- ====================================================================
-- Skrip ini dapat dijalankan di MySQL, MariaDB, PostgreSQL, atau phpMyAdmin.
-- Terintegrasi dengan Google Apps Script (melalui JDBC) dan Frontend Web.

CREATE DATABASE IF NOT EXISTS presensi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE presensi_db;

-- --------------------------------------------------------------------
-- 1. TABEL MAHASISWA
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(20) NOT NULL DEFAULT '1',
    jurusan VARCHAR(100) NOT NULL DEFAULT 'Teknik Informatika',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 2. TABEL PRESENSI (LOG KEHADIRAN HARIAN)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS presensi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(20) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    mata_kuliah VARCHAR(100) NOT NULL DEFAULT 'Rekayasa Perangkat Lunak',
    status VARCHAR(30) NOT NULL DEFAULT 'Hadir',
    tanggal DATE NOT NULL,
    waktu_presensi TIME NOT NULL,
    waktu_lengkap VARCHAR(50) NOT NULL,
    metode_input VARCHAR(30) DEFAULT 'QR Code',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_presensi_mahasiswa FOREIGN KEY (nim) REFERENCES mahasiswa(nim) ON DELETE CASCADE,
    UNIQUE KEY uq_presensi_harian (nim, tanggal)
);

-- Index untuk mempercepat query real-time
CREATE INDEX idx_presensi_tanggal ON presensi(tanggal);
CREATE INDEX idx_presensi_nim ON presensi(nim);

-- --------------------------------------------------------------------
-- 3. DATA AWAL (SEED MAHASISWA)
-- --------------------------------------------------------------------
INSERT INTO mahasiswa (nim, nama, kelas, jurusan) VALUES
('2024001', 'Khairul Munandar', '2', 'Teknik Informatika'),
('2024002', 'Hilmatun Safura', '3', 'Teknik Informatika'),
('2024003', 'Zafira Ismi Samahiya', '3', 'Teknik Informatika'),
('2024004', 'Muhammad Raffail Fahlevi', '3', 'Teknik Informatika'),
('2024005', 'Hayatun Nufus', '3', 'Teknik Informatika'),
('2024006', 'Aida Yusira', '3', 'Teknik Informatika'),
('2024007', 'Rismatur Rahmi', '3', 'Teknik Informatika'),
('2024008', 'Naila Afifah', '3', 'Teknik Informatika'),
('2024009', 'Anshar Salsaraja', '3', 'Teknik Informatika'),
('2024010', 'Salman Farisi', '3', 'Teknik Informatika'),
('2024011', 'Ulfa Mailani', '3', 'Teknik Informatika'),
('2024012', 'Intan Mauli Zahra', '3', 'Teknik Informatika'),
('2024013', 'Quratul Naiva', '3', 'Teknik Informatika'),
('2024014', 'Rahmatul Zikra', '3', 'Teknik Informatika'),
('2024015', 'Wilda Rahma', '2', 'Teknik Informatika'),
('2024016', 'Milhan Ahmadia', '2', 'Teknik Informatika'),
('2024017', 'Ade Sity Zhahara', '2', 'Teknik Informatika'),
('2024018', 'Ika Nazilla', '2', 'Teknik Informatika'),
('2024019', 'Muhammad Syauqi', '2', 'Teknik Informatika'),
('2024020', 'Nisa Widiatul Uhya', '2', 'Teknik Informatika'),
('2023021', 'Yasmin Thahirah', '2', 'Teknik Informatika'),
('2023022', 'Dian Ramadani', '2', 'Teknik Informatika'),
('2023023', 'Fauzan Azima', '2', 'Teknik Informatika'),
('2023024', 'Ozra Ferdian', '2', 'Teknik Informatika'),
('2023025', 'Shybbral Malashy', '2', 'Teknik Informatika'),
('2023026', 'Muhammad Ferdy', '2', 'Teknik Informatika'),
('2023027', 'Khairunnisa', '2', 'Teknik Informatika'),
('2023028', 'Azratul Al Zahra', '2', 'Teknik Informatika'),
('2023029', 'Zaskia', '2', 'Teknik Informatika'),
('2023030', 'Aslan', '2', 'Teknik Informatika'),
('2023031', 'Muhammad Zuhdi', '1', 'Teknik Informatika'),
('2023032', 'Alfisyahrina', '1', 'Teknik Informatika'),
('2023033', 'Farah Nadhira', '1', 'Teknik Informatika'),
('2023034', 'Noor Qurratul Aina', '1', 'Teknik Informatika'),
('2023035', 'Muksalmina Adami', '1', 'Teknik Informatika'),
('2023036', 'Miftahul Jannah', '1', 'Teknik Informatika'),
('2023037', 'Safira', '1', 'Teknik Informatika'),
('2023038', 'Keisya Nazifa', '1', 'Teknik Informatika'),
('2023039', 'M. Muklis', '1', 'Teknik Informatika'),
('2023040', 'Muhammad Aidil Al Fitra', '1', 'Teknik Informatika'),
('2023041', 'Fitrahul Ulfa', '1', 'Teknik Informatika'),
('2023042', 'Subhan', '1', 'Teknik Informatika'),
('2023043', 'Muhammad Farhan', '4', 'Teknik Informatika'),
('2023044', 'Zaskia Salsabila', '4', 'Teknik Informatika'),
('2023045', 'Lia Safitri', '4', 'Teknik Informatika'),
('2023046', 'Muhammad Ghazi Al-Ghazali', '4', 'Teknik Informatika'),
('2023047', 'Dian Akbar Maulana', '4', 'Teknik Informatika'),
('2023048', 'Muhammad Khalis', '4', 'Teknik Informatika'),
('2023049', 'Fikri Arjuna', '4', 'Teknik Informatika'),
('2023050', 'Feby Auzia Fitriani', '3', 'Teknik Informatika'),
('2023051', 'Ahlul Zikri', '3', 'Teknik Informatika'),
('2023052', 'Asmaul Husna', '3', 'Teknik Informatika'),
('2023053', 'Nizam', '3', 'Teknik Informatika'),
('2023054', 'Raisyatul Alya', '3', 'Teknik Informatika'),
('2023055', 'Nelly Agustiani', '3', 'Teknik Informatika'),
('2023056', 'Misbahun Nura', '3', 'Teknik Informatika'),
('2023057', 'Fajarul Akbar', '3', 'Teknik Informatika'),
('2023058', 'Riska Fitria', '3', 'Teknik Informatika'),
('2023059', 'Mizral Aqla', '3', 'Teknik Informatika'),
('2023060', 'Wirqan Herari', '2', 'Teknik Informatika'),
('2023061', 'Rasya Islami Fasya', '2', 'Teknik Informatika'),
('2023062', 'Muammar', '1', 'Teknik Informatika'),
('2023063', 'Putri Nayla', '1', 'Teknik Informatika'),
('2023064', 'Reandra Akbar Pratama', '1', 'Teknik Informatika'),
('2023065', 'Farah Shafira', '1', 'Teknik Informatika'),
('2023066', 'Auzir Fachlevi', '1', 'Teknik Informatika'),
('2023067', 'Faisal Maulana', '1', 'Teknik Informatika'),
('2023068', 'Raffi Khairan', '3', 'Teknik Informatika'),
('2023069', 'M. Shamdi Quif', '2', 'Teknik Informatika'),
('2023070', 'Syahrial Ramadhan', '2', 'Teknik Informatika'),
('2023071', 'Safwal Sya\'ban', '2', 'Teknik Informatika'),
('2023072', 'Ghalil Gibran', '2', 'Teknik Informatika'),
('2023073', 'M Andra Andhika', '2', 'Teknik Informatika'),
('2023074', 'Aulia Saputra', '2', 'Teknik Informatika'),
('2023075', 'Rizky Adlani Batu Bara', '2', 'Teknik Informatika'),
('2023076', 'Faqkral Ferdiansyah SA', '2', 'Teknik Informatika'),
('2023077', 'Veliga Shinta Fezia', '2', 'Teknik Informatika'),
('2023078', 'Tama Rachidi', '2', 'Teknik Informatika'),
('2023079', 'Teuku Zaki Irfan', '2', 'Teknik Informatika'),
('2023080', 'Muhammad Alaidinsyah', '2', 'Teknik Informatika'),
('2023081', 'Khairul Munawar', '2', 'Teknik Informatika'),
('2023082', 'Sebran Malasy', '2', 'Teknik Informatika'),
('2023083', 'Syarif Hidayatullah', '2', 'Teknik Informatika'),
('2023084', 'Muhammad Aqil', '2', 'Teknik Informatika'),
('2023085', 'Feza Mukammil', '2', 'Teknik Informatika'),
('2023086', 'Muhammad Aqil II', '2', 'Teknik Informatika'),
('2023087', 'Muhammad Rayyannur', '2', 'Teknik Informatika'),
('2023088', 'Mohd. Daniel Fendisa', '2', 'Teknik Informatika'),
('2023089', 'Muhammad Aqil Ulya', '2', 'Teknik Informatika'),
('2023090', 'Muhammad Owal Nifka', '2', 'Teknik Informatika'),
('2023091', 'Zulfirman', '2', 'Teknik Informatika'),
('2023092', 'Khairul Munawar (B)', '2', 'Teknik Informatika'),
('2023093', 'Sebran Malasy (B)', '2', 'Teknik Informatika'),
('2023094', 'Muhammad Shamdi Qowie', '2', 'Teknik Informatika'),
('2023095', 'Muhammad Hafiz', '2', 'Teknik Informatika'),
('2024050', 'Liza Ulul Khaira', '2', 'Teknik Informatika'),
('2024051', 'Oulia Putri', '2', 'Teknik Informatika'),
('2024057', 'Dhia Munira Safira', '2', 'Teknik Informatika')
ON DUPLICATE KEY UPDATE nama = VALUES(nama), kelas = VALUES(kelas), jurusan = VALUES(jurusan);

-- --------------------------------------------------------------------
-- 4. VIEW LAPORAN REKAP PRESENSI HARI INI
-- --------------------------------------------------------------------
CREATE OR REPLACE VIEW v_presensi_hari_ini AS
SELECT 
    m.nim,
    m.nama,
    m.kelas,
    m.jurusan,
    COALESCE(p.status, 'Belum Hadir') AS status_kehadiran,
    p.waktu_presensi,
    p.waktu_lengkap
FROM mahasiswa m
LEFT JOIN presensi p 
    ON m.nim = p.nim AND p.tanggal = CURDATE()
ORDER BY m.kelas ASC, m.nama ASC;
