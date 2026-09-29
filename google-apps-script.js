/**
 * ====================================================================
 * BACKEND GOOGLE APPS SCRIPT (GAS) - PRESENSI KELAS REAL-TIME
 * ====================================================================
 * Versi: 3.2 - Super Resilient & CORS-Proof
 *
 * PANDUAN DEPLOY AGAR TIDAK GAGAL:
 * 1. Buka Google Sheets baru di browser: https://sheets.new
 * 2. Beri nama file: "Database Presensi Kelas"
 * 3. Buka menu: Ekstensi (Extensions) > Apps Script
 * 4. Hapus seluruh isi kode bawaan, lalu salin-tempel (paste) SEMUA KODE INI.
 * 5. Klik tombol "Simpan" (ikon disket).
 * 6. Klik tombol biru "Deploy" (Terapkan) di kanan atas > pilih "New deployment" (Penerapan baru).
 * 7. Klik ikon gerigi "Select type" > pilih "Web app".
 * 8. PENTING - KONFIGURASI DENGAN TEPAT:
 *    - Description : API Presensi Kelas v3
 *    - Execute as  : Me (email saya)
 *    - Who has access : Anyone (Siapa saja - PENTING! JANGAN pilih 'Only myself')
 * 9. Klik "Deploy" -> Klik "Authorize access" -> Pilih akun Google Anda ->
 *    Klik "Advanced" (Lanjutan) -> Klik "Go to Untitled project (unsafe)" -> Klik "Allow".
 * 10. Salin URL "Web App" yang berakhiran /exec, lalu masukkan ke menu
 *     "Konfigurasi" di website presensi!
 * ====================================================================
 */

const CONFIG = {
  // Jika script berdiri sendiri (bukan dari menu Ekstensi Google Sheets), isi ID Spreadsheet di bawah ini:
  SPREADSHEET_ID: '', // Biarkan kosong jika dibuat langsung dari Ekstensi > Apps Script di Google Sheets
  
  SHEET_MAHASISWA: 'Mahasiswa',
  SHEET_PRESENSI: 'Presensi',
  TIMEZONE: 'Asia/Jakarta',
  
  // Integrasi opsional ke database SQL (MySQL/PostgreSQL) via JDBC
  ENABLE_SQL: false,
  SQL_HOST: '127.0.0.1',
  SQL_PORT: 3306,
  SQL_DB_NAME: 'presensi_db',
  SQL_USER: 'root',
  SQL_PASSWORD: ''
};

// Helper: Dapatkan Spreadsheet aktif dengan fallback aman
function getSpreadsheet() {
  try {
    if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.trim() !== '') {
      return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID.trim());
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (e) {}

  // Fallback buat spreadsheet baru otomatis jika belum ada
  const newSs = SpreadsheetApp.create('Database Presensi Mahasiswa Otomatis');
  return newSs;
}

// Master data 98 mahasiswa Teknik Informatika
const MASTER_98_MAHASISWA = [
  ['2024001', 'Khairul Munandar', '2', 'Teknik Informatika'],
  ['2024002', 'Hilmatun Safura', '3', 'Teknik Informatika'],
  ['2024003', 'Zafira Ismi Samahiya', '3', 'Teknik Informatika'],
  ['2024004', 'Muhammad Raffail Fahlevi', '3', 'Teknik Informatika'],
  ['2024005', 'Hayatun Nufus', '3', 'Teknik Informatika'],
  ['2024006', 'Aida Yusira', '3', 'Teknik Informatika'],
  ['2024007', 'Rismatur Rahmi', '3', 'Teknik Informatika'],
  ['2024008', 'Naila Afifah', '3', 'Teknik Informatika'],
  ['2024009', 'Anshar Salsaraja', '3', 'Teknik Informatika'],
  ['2024010', 'Salman Farisi', '3', 'Teknik Informatika'],
  ['2024011', 'Ulfa Mailani', '3', 'Teknik Informatika'],
  ['2024012', 'Intan Mauli Zahra', '3', 'Teknik Informatika'],
  ['2024013', 'Quratul Naiva', '3', 'Teknik Informatika'],
  ['2024014', 'Rahmatul Zikra', '3', 'Teknik Informatika'],
  ['2024015', 'Wilda Rahma', '2', 'Teknik Informatika'],
  ['2024016', 'Milhan Ahmadia', '2', 'Teknik Informatika'],
  ['2024017', 'Ade Sity Zhahara', '2', 'Teknik Informatika'],
  ['2024018', 'Ika Nazilla', '2', 'Teknik Informatika'],
  ['2024019', 'Muhammad Syauqi', '2', 'Teknik Informatika'],
  ['2024020', 'Nisa Widiatul Uhya', '2', 'Teknik Informatika'],
  ['2023021', 'Yasmin Thahirah', '2', 'Teknik Informatika'],
  ['2023022', 'Dian Ramadani', '2', 'Teknik Informatika'],
  ['2023023', 'Fauzan Azima', '2', 'Teknik Informatika'],
  ['2023024', 'Ozra Ferdian', '2', 'Teknik Informatika'],
  ['2023025', 'Shybbral Malashy', '2', 'Teknik Informatika'],
  ['2023026', 'Muhammad Ferdy', '2', 'Teknik Informatika'],
  ['2023027', 'Khairunnisa', '2', 'Teknik Informatika'],
  ['2023028', 'Azratul Al Zahra', '2', 'Teknik Informatika'],
  ['2023029', 'Zaskia', '2', 'Teknik Informatika'],
  ['2023030', 'Aslan', '2', 'Teknik Informatika'],
  ['2023031', 'Muhammad Zuhdi', '1', 'Teknik Informatika'],
  ['2023032', 'Alfisyahrina', '1', 'Teknik Informatika'],
  ['2023033', 'Farah Nadhira', '1', 'Teknik Informatika'],
  ['2023034', 'Noor Qurratul Aina', '1', 'Teknik Informatika'],
  ['2023035', 'Muksalmina Adami', '1', 'Teknik Informatika'],
  ['2023036', 'Miftahul Jannah', '1', 'Teknik Informatika'],
  ['2023037', 'Safira', '1', 'Teknik Informatika'],
  ['2023038', 'Keisya Nazifa', '1', 'Teknik Informatika'],
  ['2023039', 'M. Muklis', '1', 'Teknik Informatika'],
  ['2023040', 'Muhammad Aidil Al Fitra', '1', 'Teknik Informatika'],
  ['2023041', 'Fitrahul Ulfa', '1', 'Teknik Informatika'],
  ['2023042', 'Subhan', '1', 'Teknik Informatika'],
  ['2023043', 'Muhammad Farhan', '4', 'Teknik Informatika'],
  ['2023044', 'Zaskia Salsabila', '4', 'Teknik Informatika'],
  ['2023045', 'Lia Safitri', '4', 'Teknik Informatika'],
  ['2023046', 'Muhammad Ghazi Al-Ghazali', '4', 'Teknik Informatika'],
  ['2023047', 'Dian Akbar Maulana', '4', 'Teknik Informatika'],
  ['2023048', 'Muhammad Khalis', '4', 'Teknik Informatika'],
  ['2023049', 'Fikri Arjuna', '4', 'Teknik Informatika'],
  ['2023050', 'Feby Auzia Fitriani', '3', 'Teknik Informatika'],
  ['2023051', 'Ahlul Zikri', '3', 'Teknik Informatika'],
  ['2023052', 'Asmaul Husna', '3', 'Teknik Informatika'],
  ['2023053', 'Nizam', '3', 'Teknik Informatika'],
  ['2023054', 'Raisyatul Alya', '3', 'Teknik Informatika'],
  ['2023055', 'Nelly Agustiani', '3', 'Teknik Informatika'],
  ['2023056', 'Misbahun Nura', '3', 'Teknik Informatika'],
  ['2023057', 'Fajarul Akbar', '3', 'Teknik Informatika'],
  ['2023058', 'Riska Fitria', '3', 'Teknik Informatika'],
  ['2023059', 'Mizral Aqla', '3', 'Teknik Informatika'],
  ['2023060', 'Wirqan Herari', '2', 'Teknik Informatika'],
  ['2023061', 'Rasya Islami Fasya', '2', 'Teknik Informatika'],
  ['2023062', 'Muammar', '1', 'Teknik Informatika'],
  ['2023063', 'Putri Nayla', '1', 'Teknik Informatika'],
  ['2023064', 'Reandra Akbar Pratama', '1', 'Teknik Informatika'],
  ['2023065', 'Farah Shafira', '1', 'Teknik Informatika'],
  ['2023066', 'Auzir Fachlevi', '1', 'Teknik Informatika'],
  ['2023067', 'Faisal Maulana', '1', 'Teknik Informatika'],
  ['2023068', 'Raffi Khairan', '3', 'Teknik Informatika'],
  ['2023069', 'M. Shamdi Quif', '2', 'Teknik Informatika'],
  ['2023070', 'Syahrial Ramadhan', '2', 'Teknik Informatika'],
  ['2023071', 'Safwal Sya\'ban', '2', 'Teknik Informatika'],
  ['2023072', 'Ghalil Gibran', '2', 'Teknik Informatika'],
  ['2023073', 'M Andra Andhika', '2', 'Teknik Informatika'],
  ['2023074', 'Aulia Saputra', '2', 'Teknik Informatika'],
  ['2023075', 'Rizky Adlani Batu Bara', '2', 'Teknik Informatika'],
  ['2023076', 'Faqkral Ferdiansyah SA', '2', 'Teknik Informatika'],
  ['2023077', 'Veliga Shinta Fezia', '2', 'Teknik Informatika'],
  ['2023078', 'Tama Rachidi', '2', 'Teknik Informatika'],
  ['2023079', 'Teuku Zaki Irfan', '2', 'Teknik Informatika'],
  ['2023080', 'Muhammad Alaidinsyah', '2', 'Teknik Informatika'],
  ['2023081', 'Khairul Munawar', '2', 'Teknik Informatika'],
  ['2023082', 'Sebran Malasy', '2', 'Teknik Informatika'],
  ['2023083', 'Syarif Hidayatullah', '2', 'Teknik Informatika'],
  ['2023084', 'Muhammad Aqil', '2', 'Teknik Informatika'],
  ['2023085', 'Feza Mukammil', '2', 'Teknik Informatika'],
  ['2023086', 'Muhammad Aqil II', '2', 'Teknik Informatika'],
  ['2023087', 'Muhammad Rayyannur', '2', 'Teknik Informatika'],
  ['2023088', 'Mohd. Daniel Fendisa', '2', 'Teknik Informatika'],
  ['2023089', 'Muhammad Aqil Ulya', '2', 'Teknik Informatika'],
  ['2023090', 'Muhammad Owal Nifka', '2', 'Teknik Informatika'],
  ['2023091', 'Zulfirman', '2', 'Teknik Informatika'],
  ['2023092', 'Khairul Munawar (B)', '2', 'Teknik Informatika'],
  ['2023093', 'Sebran Malasy (B)', '2', 'Teknik Informatika'],
  ['2023094', 'Muhammad Shamdi Qowie', '2', 'Teknik Informatika'],
  ['2023095', 'Muhammad Hafiz', '2', 'Teknik Informatika'],
  ['2024050', 'Liza Ulul Khaira', '2', 'Teknik Informatika'],
  ['2024051', 'Oulia Putri', '2', 'Teknik Informatika'],
  ['2024057', 'Dhia Munira Safira', '2', 'Teknik Informatika']
];

// Melengkapi mahasiswa yang belum terdaftar di Sheet jika baris masih sedikit
function populateMissingStudents(sheetMhs) {
  const existingRows = sheetMhs.getDataRange().getValues();
  const existingNims = new Set();
  for (let i = 1; i < existingRows.length; i++) {
    if (existingRows[i][0]) existingNims.add(String(existingRows[i][0]).trim());
  }

  const now = new Date();
  MASTER_98_MAHASISWA.forEach(row => {
    const nim = String(row[0]).trim();
    if (!existingNims.has(nim)) {
      sheetMhs.appendRow([row[0], row[1], row[2], row[3], now]);
      existingNims.add(nim);
    }
  });
}

// Inisialisasi sheet Mahasiswa & Presensi
function initSheets(ss) {
  if (!ss) ss = getSpreadsheet();
  
  // 1. Sheet Mahasiswa
  let sheetMhs = ss.getSheetByName(CONFIG.SHEET_MAHASISWA);
  if (!sheetMhs) {
    sheetMhs = ss.insertSheet(CONFIG.SHEET_MAHASISWA);
    sheetMhs.appendRow(['NIM', 'Nama Mahasiswa', 'Kelas', 'Jurusan', 'Terdaftar Pada']);
    sheetMhs.getRange(1, 1, 1, 5).setBackground('#0f766e').setFontColor('#ffffff').setFontWeight('bold');
    sheetMhs.setFrozenRows(1);
    
    // Seed seluruh 98 mahasiswa
    const now = new Date();
    MASTER_98_MAHASISWA.forEach(row => sheetMhs.appendRow([row[0], row[1], row[2], row[3], now]));
  } else {
    // Jika sheet sudah ada tapi barisnya kurang dari 50 (misal template lama), lengkapi ke 98
    if (sheetMhs.getLastRow() < 50) {
      populateMissingStudents(sheetMhs);
    }
  }

  // 2. Sheet Presensi
  let sheetPresensi = ss.getSheetByName(CONFIG.SHEET_PRESENSI);
  if (!sheetPresensi) {
    sheetPresensi = ss.insertSheet(CONFIG.SHEET_PRESENSI);
    sheetPresensi.appendRow(['ID Log', 'Tanggal', 'Waktu', 'NIM', 'Nama Mahasiswa', 'Kelas', 'Jurusan', 'Mata Kuliah', 'Status', 'Metode Presensi']);
    sheetPresensi.getRange(1, 1, 1, 10).setBackground('#0f172a').setFontColor('#2dd4bf').setFontWeight('bold');
    sheetPresensi.setFrozenRows(1);
  }

  return { sheetMhs, sheetPresensi };
}

// ====================================================================
// HANDLE GET (PING, GET DATA, & FALLBACK PRESENSI TANPA MASALAH CORS)
// ====================================================================
function doGet(e) {
  try {
    const ss = getSpreadsheet();
    initSheets(ss);
    
    const params = e && e.parameter ? e.parameter : {};
    const action = params.action || 'ping';

    // 1. PING: Test koneksi API
    if (action === 'ping') {
      return responseJson({
        status: 'ok',
        server: 'Google Apps Script Presensi API v3',
        serverTime: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
        spreadsheetName: ss.getName(),
        spreadsheetUrl: ss.getUrl()
      });
    }

    // 2. GET_ALL: Ambil daftar mahasiswa + status kehadiran hari ini
    if (action === 'get_all' || action === 'get_mahasiswa') {
      const sheetMhs = ss.getSheetByName(CONFIG.SHEET_MAHASISWA);
      const mhsRows = sheetMhs.getDataRange().getValues();
      
      const students = [];
      for (let i = 1; i < mhsRows.length; i++) {
        const row = mhsRows[i];
        if (row[0]) {
          students.push({
            nim: String(row[0]).trim(),
            nama: String(row[1] || '').trim(),
            kelas: String(row[2] || '1').trim(),
            jurusan: String(row[3] || 'Teknik Informatika').trim()
          });
        }
      }

      // Ambil riwayat presensi hari ini
      const todayStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd");
      const sheetPres = ss.getSheetByName(CONFIG.SHEET_PRESENSI);
      const presRows = sheetPres.getDataRange().getValues();
      const hadirMap = {};

      for (let j = 1; j < presRows.length; j++) {
        const pRow = presRows[j];
        let pDate = '';
        if (pRow[1] instanceof Date) {
          pDate = Utilities.formatDate(pRow[1], CONFIG.TIMEZONE, "yyyy-MM-dd");
        } else if (pRow[1]) {
          pDate = String(pRow[1]).slice(0, 10);
        }

        if (pDate === todayStr) {
          hadirMap[String(pRow[3]).trim()] = {
            waktu: String(pRow[2] || ''),
            status: String(pRow[8] || 'Hadir'),
            metode: String(pRow[9] || 'QR Code')
          };
        }
      }

      return responseJson({
        status: 'success',
        totalMahasiswa: students.length,
        tanggal: todayStr,
        data: students,
        hadirHariIni: hadirMap
      });
    }

    // 3. PRESENSI VIA GET (Fallback super aman yang 100% bebas dari CORS OPTIONS preflight)
    if (action === 'presensi' && params.nim) {
      return catatPresensi(ss, {
        nim: params.nim,
        nama: params.nama,
        kelas: params.kelas,
        jurusan: params.jurusan,
        mataKuliah: params.mataKuliah || 'Rekayasa Perangkat Lunak',
        status: params.status || 'Hadir',
        metode: params.metode || 'Link Web'
      });
    }

    return responseJson({ status: 'info', message: 'API aktif. Gunakan action=ping atau action=get_all' });

  } catch (err) {
    return responseJson({ status: 'error', error: err.toString() }, 500);
  }
}

// ====================================================================
// HANDLE POST (INPUT DATA PRESENSI)
// ====================================================================
function doPost(e) {
  try {
    const ss = getSpreadsheet();
    initSheets(ss);
    
    let body = {};
    if (e && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        body = e.parameter || {};
      }
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    if (body.action === 'import_all_students' && Array.isArray(body.students)) {
      return importAllStudentsToSheet(ss, body.students);
    }

    return catatPresensi(ss, body);

  } catch (err) {
    return responseJson({ status: 'error', error: err.toString() }, 500);
  }
}

// Fungsi untuk mengimpor seluruh 98 mahasiswa ke Sheet Mahasiswa
function importAllStudentsToSheet(ss, studentsList) {
  let sheetMhs = ss.getSheetByName(CONFIG.SHEET_MAHASISWA);
  if (!sheetMhs) {
    sheetMhs = ss.insertSheet(CONFIG.SHEET_MAHASISWA);
    sheetMhs.appendRow(['NIM', 'Nama Mahasiswa', 'Kelas', 'Jurusan', 'Terdaftar Pada']);
    sheetMhs.getRange(1, 1, 1, 5).setBackground('#0f766e').setFontColor('#ffffff').setFontWeight('bold');
    sheetMhs.setFrozenRows(1);
  }

  // Bersihkan data lama jika ada (sisakan baris header)
  const lastRow = sheetMhs.getLastRow();
  if (lastRow > 1) {
    sheetMhs.deleteRows(2, lastRow - 1);
  }

  const now = new Date();
  const rows = (studentsList || []).map(s => [
    String(s.nim).trim(),
    String(s.nama || '').trim(),
    String(s.kelas || '1').trim(),
    String(s.jurusan || 'Teknik Informatika').trim(),
    now
  ]);

  if (rows.length > 0) {
    sheetMhs.getRange(2, 1, rows.length, 5).setValues(rows);
  }

  return responseJson({
    status: 'success',
    message: `Berhasil mengisi ${rows.length} mahasiswa ke tab Mahasiswa Google Spreadsheet.`,
    count: rows.length
  });
}

// ====================================================================
// FUNGSI INTI PENCATATAN PRESENSI KE SPREADSHEET & SQL
// ====================================================================
function catatPresensi(ss, data) {
  const nim = String(data.nim || '').trim();
  if (!nim) {
    return responseJson({ status: 'error', message: 'NIM wajib dicantumkan.' }, 400);
  }

  const sheetPresensi = ss.getSheetByName(CONFIG.SHEET_PRESENSI);
  const now = new Date();
  const tanggalHariIni = Utilities.formatDate(now, CONFIG.TIMEZONE, "yyyy-MM-dd");
  const waktuSekarang = Utilities.formatDate(now, CONFIG.TIMEZONE, "HH:mm:ss");

  // 1. Cek apakah mahasiswa ini sudah presensi hari ini (cegah ganda)
  const rows = sheetPresensi.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const rNim = String(rows[i][3]).trim();
    let rDate = '';
    if (rows[i][1] instanceof Date) {
      rDate = Utilities.formatDate(rows[i][1], CONFIG.TIMEZONE, "yyyy-MM-dd");
    } else {
      rDate = String(rows[i][1]).slice(0, 10);
    }

    if (rNim === nim && rDate === tanggalHariIni) {
      return responseJson({
        status: 'already_present',
        message: 'Mahasiswa sudah melakukan presensi hari ini.',
        data: {
          nim: nim,
          nama: rows[i][4],
          waktu: rows[i][2],
          tanggal: rDate
        }
      });
    }
  }

  // 2. Lengkapi nama jika belum ada dari sheet Mahasiswa
  let nama = data.nama || '';
  let kelas = data.kelas || '1';
  let jurusan = data.jurusan || 'Teknik Informatika';

  if (!nama) {
    const sheetMhs = ss.getSheetByName(CONFIG.SHEET_MAHASISWA);
    const mhsRows = sheetMhs.getDataRange().getValues();
    for (let k = 1; k < mhsRows.length; k++) {
      if (String(mhsRows[k][0]).trim() === nim) {
        nama = mhsRows[k][1];
        kelas = mhsRows[k][2];
        jurusan = mhsRows[k][3];
        break;
      }
    }
  }

  // 3. Masukkan baris baru ke Sheet Presensi
  const logId = 'LOG-' + Date.now();
  sheetPresensi.appendRow([
    logId,
    tanggalHariIni,
    waktuSekarang,
    nim,
    nama || ('Mahasiswa ' + nim),
    kelas,
    jurusan,
    data.mataKuliah || 'Rekayasa Perangkat Lunak',
    data.status || 'Hadir',
    data.metode || 'QR Scanner'
  ]);

  // 4. Sinkronisasi opsional ke SQL (MySQL / Postgres via JDBC)
  let sqlResult = 'disabled';
  if (CONFIG.ENABLE_SQL) {
    try {
      sqlResult = syncJdbcSql(nim, nama, kelas, jurusan, tanggalHariIni, waktuSekarang, data.status || 'Hadir');
    } catch (sqlErr) {
      sqlResult = 'error: ' + sqlErr.toString();
    }
  }

  return responseJson({
    status: 'success',
    message: 'Presensi berhasil dicatat!',
    data: {
      id: logId,
      nim: nim,
      nama: nama,
      kelas: kelas,
      jurusan: jurusan,
      tanggal: tanggalHariIni,
      waktu: waktuSekarang,
      sql: sqlResult
    }
  });
}

// Sinkronisasi JDBC Google Apps Script ke Database SQL
function syncJdbcSql(nim, nama, kelas, jurusan, tanggal, waktu, status) {
  const url = 'jdbc:mysql://' + CONFIG.SQL_HOST + ':' + CONFIG.SQL_PORT + '/' + CONFIG.SQL_DB_NAME;
  const conn = Jdbc.getConnection(url, CONFIG.SQL_USER, CONFIG.SQL_PASSWORD);
  const sql = "INSERT INTO presensi (nim, nama, kelas, jurusan, status, tanggal, waktu_presensi, waktu_lengkap) " +
              "VALUES (?, ?, ?, ?, ?, ?, ?, ?) " +
              "ON DUPLICATE KEY UPDATE status = VALUES(status), waktu_presensi = VALUES(waktu_presensi);";
  const stmt = conn.prepareStatement(sql);
  stmt.setString(1, nim);
  stmt.setString(2, nama);
  stmt.setString(3, kelas);
  stmt.setString(4, jurusan);
  stmt.setString(5, status);
  stmt.setString(6, tanggal);
  stmt.setString(7, waktu);
  stmt.setString(8, tanggal + ' ' + waktu);
  stmt.execute();
  stmt.close();
  conn.close();
  return 'synced';
}

// Helper Response JSON Aman CORS
function responseJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
