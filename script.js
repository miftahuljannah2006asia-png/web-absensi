/**
 * ====================================================================
 * SISTEM PRESENSI KELAS REAL-TIME - SCRIPT.JS
 * Terhubung ke Google Sheets & Database SQL via Google Apps Script (GAS)
 * ====================================================================
 */

// Default data mahasiswa lengkap (98 Mahasiswa Teknik Informatika sesuai dataset)
const DEFAULT_STUDENTS = [
  { nim: '2024001', nama: 'Khairul Munandar', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024002', nama: 'Hilmatun Safura', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024003', nama: 'Zafira Ismi Samahiya', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024004', nama: 'Muhammad Raffail Fahlevi', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024005', nama: 'Hayatun Nufus', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024006', nama: 'Aida Yusira', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024007', nama: 'Rismatur Rahmi', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024008', nama: 'Naila Afifah', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024009', nama: 'Anshar Salsaraja', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024010', nama: 'Salman Farisi', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024011', nama: 'Ulfa Mailani', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024012', nama: 'Intan Mauli Zahra', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024013', nama: 'Quratul Naiva', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024014', nama: 'Rahmatul Zikra', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2024015', nama: 'Wilda Rahma', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024016', nama: 'Milhan Ahmadia', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024017', nama: 'Ade Sity Zhahara', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024018', nama: 'Ika Nazilla', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024019', nama: 'Muhammad Syauqi', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024020', nama: 'Nisa Widiatul Uhya', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023021', nama: 'Yasmin Thahirah', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023022', nama: 'Dian Ramadani', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023023', nama: 'Fauzan Azima', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023024', nama: 'Ozra Ferdian', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023025', nama: 'Shybbral Malashy', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023026', nama: 'Muhammad Ferdy', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023027', nama: 'Khairunnisa', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023028', nama: 'Azratul Al Zahra', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023029', nama: 'Zaskia', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023030', nama: 'Aslan', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023031', nama: 'Muhammad Zuhdi', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023032', nama: 'Alfisyahrina', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023033', nama: 'Farah Nadhira', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023034', nama: 'Noor Qurratul Aina', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023035', nama: 'Muksalmina Adami', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023036', nama: 'Miftahul Jannah', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023037', nama: 'Safira', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023038', nama: 'Keisya Nazifa', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023039', nama: 'M. Muklis', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023040', nama: 'Muhammad Aidil Al Fitra', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023041', nama: 'Fitrahul Ulfa', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023042', nama: 'Subhan', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023043', nama: 'Muhammad Farhan', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023044', nama: 'Zaskia Salsabila', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023045', nama: 'Lia Safitri', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023046', nama: 'Muhammad Ghazi Al-Ghazali', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023047', nama: 'Dian Akbar Maulana', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023048', nama: 'Muhammad Khalis', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023049', nama: 'Fikri Arjuna', kelas: '4', jurusan: 'Teknik Informatika' },
  { nim: '2023050', nama: 'Feby Auzia Fitriani', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023051', nama: 'Ahlul Zikri', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023052', nama: 'Asmaul Husna', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023053', nama: 'Nizam', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023054', nama: 'Raisyatul Alya', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023055', nama: 'Nelly Agustiani', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023056', nama: 'Misbahun Nura', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023057', nama: 'Fajarul Akbar', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023058', nama: 'Riska Fitria', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023059', nama: 'Mizral Aqla', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023060', nama: 'Wirqan Herari', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023061', nama: 'Rasya Islami Fasya', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023062', nama: 'Muammar', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023063', nama: 'Putri Nayla', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023064', nama: 'Reandra Akbar Pratama', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023065', nama: 'Farah Shafira', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023066', nama: 'Auzir Fachlevi', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023067', nama: 'Faisal Maulana', kelas: '1', jurusan: 'Teknik Informatika' },
  { nim: '2023068', nama: 'Raffi Khairan', kelas: '3', jurusan: 'Teknik Informatika' },
  { nim: '2023069', nama: 'M. Shamdi Quif', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023070', nama: 'Syahrial Ramadhan', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023071', nama: 'Safwal Sya\'ban', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023072', nama: 'Ghalil Gibran', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023073', nama: 'M Andra Andhika', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023074', nama: 'Aulia Saputra', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023075', nama: 'Rizky Adlani Batu Bara', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023076', nama: 'Faqkral Ferdiansyah SA', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023077', nama: 'Veliga Shinta Fezia', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023078', nama: 'Tama Rachidi', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023079', nama: 'Teuku Zaki Irfan', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023080', nama: 'Muhammad Alaidinsyah', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023081', nama: 'Khairul Munawar', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023082', nama: 'Sebran Malasy', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023083', nama: 'Syarif Hidayatullah', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023084', nama: 'Muhammad Aqil', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023085', nama: 'Feza Mukammil', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023086', nama: 'Muhammad Aqil II', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023087', nama: 'Muhammad Rayyannur', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023088', nama: 'Mohd. Daniel Fendisa', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023089', nama: 'Muhammad Aqil Ulya', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023090', nama: 'Muhammad Owal Nifka', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023091', nama: 'Zulfirman', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023092', nama: 'Khairul Munawar (B)', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023093', nama: 'Sebran Malasy (B)', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023094', nama: 'Muhammad Shamdi Qowie', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2023095', nama: 'Muhammad Hafiz', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024050', nama: 'Liza Ulul Khaira', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024051', nama: 'Oulia Putri', kelas: '2', jurusan: 'Teknik Informatika' },
  { nim: '2024057', nama: 'Dhia Munira Safira', kelas: '2', jurusan: 'Teknik Informatika' }
];

// Riwayat presensi riil sesuai data log pengguna
const INITIAL_ATTENDANCE = {
  '2024006': { waktu: '11:54:12', status: 'Hadir', tanggal: '12/09/2026', metode: 'QR Scanner' },
  '2024050': { waktu: '17:14:58', status: 'Hadir', tanggal: '11/09/2026', metode: 'QR Scanner' },
  '2024051': { waktu: '17:14:23', status: 'Hadir', tanggal: '11/09/2026', metode: 'QR Scanner' },
  '2024057': { waktu: '17:13:01', status: 'Hadir', tanggal: '11/09/2026', metode: 'QR Scanner' },
  '2023028': { waktu: '21:04:57', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2024002': { waktu: '16:35:59', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2024001': { waktu: '16:17:22', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2023042': { waktu: '12:53:11', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2023078': { waktu: '12:51:06', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2023066': { waktu: '12:25:29', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2023062': { waktu: '12:16:53', status: 'Hadir', tanggal: '10/09/2026', metode: 'QR Scanner' },
  '2023032': { waktu: '12:02:32', status: 'Hadir', tanggal: '09/09/2026', metode: 'QR Scanner' },
  '2023071': { waktu: '13:18:54', status: 'Hadir', tanggal: '08/09/2026', metode: 'QR Scanner' },
  '2023067': { waktu: '13:18:11', status: 'Hadir', tanggal: '08/09/2026', metode: 'QR Scanner' },
  '2023039': { waktu: '13:16:32', status: 'Hadir', tanggal: '08/09/2026', metode: 'QR Scanner' },
  '2023036': { waktu: '13:14:03', status: 'Hadir', tanggal: '08/09/2026', metode: 'QR Scanner' },
  '2024005': { waktu: '10:53:07', status: 'Hadir', tanggal: '14/07/2026', metode: 'QR Scanner' },
  '2024003': { waktu: '10:51:18', status: 'Hadir', tanggal: '14/07/2026', metode: 'QR Scanner' }
};

// STATE APLIKASI
const DEMO_PLACEHOLDER_URL = 'https://script.google.com/macros/s/AKfycbwogbQeaUFpSwIChjzUPt2piwsZcuY4OXoVLn2U-pnYAR0fEssMtJ0adG2qrxUGVwOpIw/exec';

function isDemoOrEmptyUrl(url) {
  return !url || url.trim() === '' || url === DEMO_PLACEHOLDER_URL;
}

const AppState = {
  webAppUrl: (function() {
    const saved = localStorage.getItem('presensi_gas_url');
    if (saved && saved !== DEMO_PLACEHOLDER_URL && saved.trim() !== '') return saved.trim();
    return '';
  })(),
  students: [...DEFAULT_STUDENTS],
  attendanceToday: { ...INITIAL_ATTENDANCE }, // { nim: { waktu: '08:30:15', status: 'Hadir' } }
  offlineQueue: JSON.parse(localStorage.getItem('presensi_offline_queue') || '[]'),
  
  // Scanner state
  html5QrCode: null,
  isScanning: false,
  isTorchOn: false,
  cameraFacingMode: 'environment', // 'environment' | 'user'
  isProcessingScan: false,
  lastScanNIM: null,
  lastScanTime: 0,
  
  // Filter & UI
  currentFilter: 'all', // 'all' | 'present' | 'pending'
  searchQuery: '',
  isOnline: navigator.onLine,
  syncTimer: null,
  autoSyncSeconds: 15
};

// ====================================================================
// UTILS: SOUND, ALERT & DOM HELPERS
// ====================================================================

// Synthesize pleasant chime using Web Audio API (No external mp3 required)
function playBeepSound(type = 'success') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}

function showAlert(message, type = 'info', duration = 4000) {
  const alertEl = document.getElementById('globalAlert');
  if (!alertEl) return;
  
  const iconMap = {
    success: 'fa-check-circle',
    danger: 'fa-exclamation-circle',
    warning: 'fa-triangle-exclamation',
    info: 'fa-info-circle'
  };
  
  alertEl.className = `alert-box alert-${type}`;
  alertEl.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i> <span>${message}</span>`;
  alertEl.style.display = 'flex';
  
  clearTimeout(alertEl._hideTimeout);
  if (duration > 0) {
    alertEl._hideTimeout = setTimeout(() => {
      alertEl.style.display = 'none';
    }, duration);
  }
}

function updateConnectionBadge(status, text) {
  const pill = document.getElementById('connectionPill');
  const label = document.getElementById('connectionLabel');
  if (!pill || !label) return;
  
  pill.className = `connection-pill ${status}`;
  label.textContent = text;
}

function getTodayDateString() {
  const now = new Date();
  return now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getCurrentTimeString() {
  return new Date().toLocaleTimeString('id-ID', { hour12: false });
}

// ====================================================================
// STORAGE: LOCALSTORAGE, CACHE & MASTER 98 DATA GUARANTEE
// ====================================================================

// Menggabungkan daftar mahasiswa dasar (98 orang) dengan data lain tanpa kehilangan mahasiswa
function mergeStudentLists(baseList, incomingList) {
  const map = new Map();
  
  // 1. Masukkan master list 98 mahasiswa terlebih dahulu
  (baseList || []).forEach(s => {
    if (s && s.nim) {
      const nimStr = String(s.nim).trim();
      map.set(nimStr, {
        nim: nimStr,
        nama: s.nama || '',
        kelas: String(s.kelas || '1').trim(),
        jurusan: s.jurusan || 'Teknik Informatika'
      });
    }
  });

  // 2. Gabungkan data baru / dari server (jika ada update nama atau kelas)
  (incomingList || []).forEach(s => {
    if (s && s.nim) {
      const nimStr = String(s.nim).trim();
      const existing = map.get(nimStr);
      map.set(nimStr, {
        nim: nimStr,
        nama: s.nama || (existing ? existing.nama : ''),
        kelas: (s.kelas !== undefined && s.kelas !== null && s.kelas !== '' && s.kelas !== '-') ? String(s.kelas).trim() : (existing ? existing.kelas : '1'),
        jurusan: s.jurusan || (existing ? existing.jurusan : 'Teknik Informatika')
      });
    }
  });

  return Array.from(map.values());
}

function saveLocalState() {
  const todayKey = new Date().toISOString().slice(0, 10);
  localStorage.setItem('presensi_students_cache', JSON.stringify(AppState.students));
  localStorage.setItem(`presensi_today_${todayKey}`, JSON.stringify(AppState.attendanceToday));
  localStorage.setItem('presensi_offline_queue', JSON.stringify(AppState.offlineQueue));
}

function loadLocalState() {
  const DATA_VER_KEY = 'presensi_data_version';
  const CURRENT_VER = 'v9_user_attendance_reset_supported';
  const savedVer = localStorage.getItem(DATA_VER_KEY);

  let cachedStudents = [];
  const rawCached = localStorage.getItem('presensi_students_cache');
  if (rawCached) {
    try {
      cachedStudents = JSON.parse(rawCached);
    } catch (e) {}
  }

  // JAMINAN MUTLAK: Selalu merge DEFAULT_STUDENTS (98 mahasiswa) dengan cache lokal.
  AppState.students = mergeStudentLists(DEFAULT_STUDENTS, cachedStudents);

  const todayKey = new Date().toISOString().slice(0, 10);
  const cachedToday = localStorage.getItem(`presensi_today_${todayKey}`);
  if (cachedToday !== null) {
    try {
      AppState.attendanceToday = JSON.parse(cachedToday) || {};
    } catch (e) {
      AppState.attendanceToday = {};
    }
  } else {
    // Hari baru pertama kali: mulai dengan data bersih atau log awal
    AppState.attendanceToday = { ...INITIAL_ATTENDANCE };
  }

  // Simpan versi dan perbarui cache dengan data 98 mahasiswa
  localStorage.setItem(DATA_VER_KEY, CURRENT_VER);
  saveLocalState();
}

// Buka modal konfirmasi reset seluruh kehadiran
function openResetAttendanceModal() {
  const presentCount = Object.keys(AppState.attendanceToday || {}).length;
  if (presentCount === 0) {
    showAlert('Semua mahasiswa sudah berstatus "Belum Hadir".', 'info', 3000);
    return;
  }
  openModal('modalResetAttendance');
}

// Eksekusi reset seluruh kehadiran mahasiswa menjadi "Belum Hadir"
function confirmResetAllAttendance() {
  AppState.attendanceToday = {};
  const todayKey = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`presensi_today_${todayKey}`, JSON.stringify({}));
  saveLocalState();
  closeModal('modalResetAttendance');
  renderTable();
  updateStats();
  showAlert('🧹 Sukses! Seluruh kehadiran telah direset. Semua mahasiswa kembali berstatus "Belum Hadir".', 'success', 5000);
}

// Batal hadirkan satu mahasiswa secara spesifik
function unmarkStudentAttendance(nim) {
  if (!AppState.attendanceToday[nim]) return;
  const student = AppState.students.find(s => s.nim === nim);
  const studentName = student ? student.nama : nim;
  delete AppState.attendanceToday[nim];
  const todayKey = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`presensi_today_${todayKey}`, JSON.stringify(AppState.attendanceToday));
  saveLocalState();
  renderTable();
  updateStats();
  showAlert(`↩️ Status ${studentName} (${nim}) dikembalikan ke "Belum Hadir".`, 'info', 3500);
}

// Tombol Manual untuk Mengembalikan & Menampilkan Seluruh 98 Mahasiswa
function forceResetTo98Students() {
  localStorage.removeItem('presensi_students_cache');
  AppState.students = [...DEFAULT_STUDENTS];
  AppState.attendanceToday = { ...INITIAL_ATTENDANCE };
  saveLocalState();
  renderTable();
  updateStats();
  showAlert(`✅ Berhasil memuat ulang seluruh ${AppState.students.length} mahasiswa Teknik Informatika!`, 'success', 5000);
}

// Fitur 1-Klik: Tulis Seluruh 98 Mahasiswa ke Google Spreadsheet Pengguna
async function uploadAllStudentsToGAS() {
  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    showAlert('⚠️ Hubungkan Google Sheet Anda terlebih dahulu dengan menempelkan URL Web App di menu ini.', 'warning', 7000);
    return;
  }

  showAlert('⏳ Sedang mengirim seluruh 98 data mahasiswa ke Google Spreadsheet...', 'info', 4000);
  updateConnectionBadge('syncing', '📤 Mengunggah 98 Mahasiswa...');

  const payload = {
    action: 'import_all_students',
    students: DEFAULT_STUDENTS
  };

  try {
    const res = await fetch(AppState.webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const rawText = await res.text();
    let json = null;
    try { json = JSON.parse(rawText); } catch(e) {}

    if (json && (json.status === 'success' || json.status === 'ok')) {
      showAlert(`🎉 Sukses! Seluruh ${json.count || 98} data mahasiswa telah berhasil ditulis ke tab "Mahasiswa" di Google Spreadsheet Anda.`, 'success', 6000);
      updateConnectionBadge('online', '🟢 98 Mahasiswa Tersinkron di Sheets');
    } else {
      if (rawText.includes('<!DOCTYPE') || rawText.includes('<html')) {
        throw new Error('Google Apps Script memblokir akses atau meminta login. Pastikan Anda memilih "Who has access: Anyone" saat Deploy!');
      }
      throw new Error(json && json.message ? json.message : `HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn('Gagal upload otomatis:', err);
    showAlert(`⚠️ Gagal mengisi 98 mahasiswa: ${err.message}`, 'danger', 7000);
  } finally {
    renderTable();
    updateStats();
  }
}

// ====================================================================
// REAL-TIME SERVER COMMUNICATION (GOOGLE APPS SCRIPT / SQL)
// ====================================================================

async function checkServerConnection() {
  const banner = document.getElementById('sheetNotConnectedBanner');

  if (!navigator.onLine) {
    updateConnectionBadge('offline', '📴 Mode Offline (Cache Lokal)');
    if (banner) banner.style.display = 'flex';
    return false;
  }

  // Jika URL masih kosong atau URL demo bawaan
  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    updateConnectionBadge('warning', '⚠️ Hubungkan Google Sheet Anda');
    if (banner) banner.style.display = 'flex';
    updateSettingsModalStatus('demo');
    return false;
  }

  updateConnectionBadge('syncing', '⚡ Menghubungkan ke Sheet...');
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    
    const res = await fetch(`${AppState.webAppUrl}?action=ping&_t=${Date.now()}`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeout);

    const raw = await res.text();
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch(e) {
      if (raw.includes('ServiceLogin') || raw.includes('google-signin')) {
        updateConnectionBadge('offline', '🔴 Akses Sheet Ditolak (Perlu Anyone)');
        updateSettingsModalStatus('login_required');
      } else {
        updateConnectionBadge('offline', '🔴 URL Sheet Tidak Valid (404/Error)');
        updateSettingsModalStatus('error', 'Google mengembalikan halaman error (File tidak ditemukan). Pastikan Anda membuat deployment baru.');
      }
      if (banner) banner.style.display = 'flex';
      return false;
    }

    if (data && (data.status === 'ok' || data.status === 'success')) {
      const sheetName = data.spreadsheetName || 'Google Sheets';
      updateConnectionBadge('online', `🟢 Terhubung: ${sheetName}`);
      if (banner) banner.style.display = 'none';
      updateSettingsModalStatus('connected', sheetName);
      return true;
    } else {
      updateConnectionBadge('offline', '🔴 Gagal Terhubung ke Sheet');
      if (banner) banner.style.display = 'flex';
      updateSettingsModalStatus('error', data && data.message ? data.message : 'Server tidak merespon OK.');
      return false;
    }
  } catch (err) {
    updateConnectionBadge('offline', '🔴 Google Sheet Terputus');
    if (banner) banner.style.display = 'flex';
    updateSettingsModalStatus('error', err.message);
    return false;
  }
}

async function syncWithServer(showNotification = false) {
  const isOnline = await checkServerConnection();
  if (!isOnline) {
    if (showNotification) {
      if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
        showAlert('⚠️ Website belum terhubung ke Google Sheet pribadi Anda. Silakan klik menu "Hubungkan Sheet" di atas.', 'warning', 6000);
      } else {
        showAlert('Server Google Apps Script belum tersambung. Data presensi Anda tetap tersimpan aman di memori browser.', 'info', 5000);
      }
    }
    renderTable();
    updateStats();
    return;
  }

  try {
    updateConnectionBadge('syncing', '🔄 Sinkronisasi Data...');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${AppState.webAppUrl}?action=get_all&_t=${Date.now()}`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const rawText = await res.text();
      let result = null;
      try {
        result = JSON.parse(rawText);
      } catch (e) {
        throw new Error('Respon get_all bukan JSON valid');
      }
      
      // Deteksi format array langsung maupun { data: [...] }
      const incomingStudents = Array.isArray(result) ? result : (result && Array.isArray(result.data) ? result.data : null);
      
      if (incomingStudents && incomingStudents.length > 0) {
        AppState.students = mergeStudentLists(DEFAULT_STUDENTS, incomingStudents);
      } else {
        AppState.students = mergeStudentLists(DEFAULT_STUDENTS, AppState.students);
      }
      
      // Sinkronkan presensi hari ini jika disediakan server
      if (result && result.hadirHariIni) {
        AppState.attendanceToday = {
          ...AppState.attendanceToday,
          ...result.hadirHariIni
        };
      }

      saveLocalState();
      updateConnectionBadge('online', `🟢 Terhubung (${AppState.students.length} Mahasiswa)`);
      if (showNotification) {
        showAlert(`Data berhasil disinkronkan (${AppState.students.length} Mahasiswa)!`, 'success');
      }

      // Jika ada antrean offline, kirim sekarang
      flushOfflineQueue();
    }
  } catch (err) {
    console.warn('Sync error:', err);
    updateConnectionBadge('offline', '🔴 Gagal Sinkron ke Sheet');
  } finally {
    renderTable();
    updateStats();
  }
}

// Kirim data presensi ke Google Apps Script (dengan verifikasi respon ketat)
async function sendPresensiToServer(payload) {
  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    return {
      success: false,
      isDemoUrl: true,
      error: 'URL Web App masih berupa demo atau belum diatur.'
    };
  }

  try {
    const response = await fetch(AppState.webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const rawText = await response.text();
    let data = null;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      if (rawText.includes('<!DOCTYPE') || rawText.includes('<html')) {
        if (rawText.includes('ServiceLogin') || rawText.includes('google-signin')) {
          throw new Error('Google Apps Script memblokir akses atau meminta login. Pastikan memilih "Who has access: Anyone" saat Deploy!');
        }
        throw new Error('Google Apps Script mengembalikan halaman error (404/Akses ditolak).');
      }
      throw new Error('Format respon bukan JSON dari Google Apps Script.');
    }

    if (data && (data.status === 'success' || data.status === 'already_present')) {
      return { success: true, data };
    } else {
      throw new Error(data && data.message ? data.message : `Status: ${data ? data.status : 'error'}`);
    }
  } catch (err) {
    // Fallback GET parameter jika POST diblokir
    try {
      const queryParams = new URLSearchParams({
        action: 'presensi',
        nim: payload.nim,
        nama: payload.nama,
        kelas: payload.kelas,
        jurusan: payload.jurusan,
        status: payload.status,
        metode: payload.metode,
        _t: Date.now()
      });
      const resFallback = await fetch(`${AppState.webAppUrl}?${queryParams.toString()}`);
      const fbText = await resFallback.text();
      const fbJson = JSON.parse(fbText);
      if (fbJson && (fbJson.status === 'success' || fbJson.status === 'already_present')) {
        return { success: true, data: fbJson, fallback: true };
      }
    } catch (fallbackErr) {}
    return { success: false, error: err.message };
  }
}

async function flushOfflineQueue() {
  if (AppState.offlineQueue.length === 0) {
    showAlert('Tidak ada presensi tertunda dalam antrean.', 'info');
    return;
  }

  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    showAlert('⚠️ Hubungkan Google Sheet Anda terlebih dahulu agar antrean presensi dapat dikirim.', 'warning');
    openSettingsModal();
    return;
  }
  
  const queue = [...AppState.offlineQueue];
  showAlert(`Sedang mengirim ${queue.length} data presensi tertunda ke Google Sheets...`, 'info');
  AppState.offlineQueue = [];
  saveLocalState();

  let successCount = 0;
  const failed = [];
  for (const item of queue) {
    const result = await sendPresensiToServer(item);
    if (result.success) {
      successCount++;
    } else {
      failed.push(item);
    }
  }

  if (failed.length > 0) {
    AppState.offlineQueue = [...failed];
    saveLocalState();
  }

  if (successCount > 0) {
    showAlert(`🎉 Berhasil menyinkronkan ${successCount} presensi ke tab 'Presensi' Google Sheets!`, 'success', 6000);
  } else if (failed.length > 0) {
    showAlert(`❌ Masih gagal mengirim presensi ke Sheet. Pastikan URL Web App sudah benar.`, 'danger', 6000);
  }

  // Update button in settings if open
  const btnFlush = document.getElementById('btnFlushQueue');
  if (btnFlush) {
    const qCount = AppState.offlineQueue.length;
    btnFlush.innerHTML = `<i class="fas fa-bolt"></i> Sinkronkan Presensi Tertunda ${qCount > 0 ? `(${qCount})` : ''}`;
    btnFlush.style.display = qCount > 0 ? 'inline-flex' : 'none';
  }
}

// ====================================================================
// CORE: PROSES PRESENSI MAHASISWA
// ====================================================================

async function processAttendance(inputString, source = 'QR Scanner') {
  let nim = '';
  let payloadNama = '';
  let cleanStr = String(inputString || '').trim();

  // 1. Bersihkan tanda petik di awal/akhir jika ada
  if ((cleanStr.startsWith('"') && cleanStr.endsWith('"')) || (cleanStr.startsWith("'") && cleanStr.endsWith("'"))) {
    cleanStr = cleanStr.slice(1, -1).trim();
  }

  // 2. Coba parse sebagai objek JSON
  try {
    const parsed = JSON.parse(cleanStr);
    if (typeof parsed === 'object' && parsed !== null) {
      nim = String(parsed.nim || parsed.NIM || parsed.Nim || parsed.id || parsed.ID || parsed.npm || parsed.NPM || parsed.studentId || parsed.student_id || '').trim();
      payloadNama = String(parsed.nama || parsed.name || parsed.Nama || '').trim();
    }
  } catch (e) {
    // Bukan JSON, lanjut ke pola lain
  }

  // 3. Cek apakah berupa URL dengan parameter (?nim=... atau ?id=...)
  if (!nim && (cleanStr.includes('://') || cleanStr.includes('?'))) {
    try {
      const urlObj = new URL(cleanStr.startsWith('http') ? cleanStr : `https://dummy.id/${cleanStr}`);
      nim = urlObj.searchParams.get('nim') || urlObj.searchParams.get('NIM') || urlObj.searchParams.get('id') || urlObj.searchParams.get('npm') || '';
    } catch(urlErr) {}
  }

  // 4. Cek apakah ada label seperti "NIM: 2023029" atau "NIM 2023029"
  if (!nim) {
    const labeledMatch = cleanStr.match(/(?:nim|npm|id)\s*[:=\-]?\s*([0-9a-zA-Z\-_]+)/i);
    if (labeledMatch && labeledMatch[1]) {
      nim = labeledMatch[1].trim();
    }
  }

  // 5. Jika belum dapat, gunakan teks mentah
  if (!nim) {
    nim = cleanStr;
  }

  // Jika QR adalah QR Kelas, buka form input cepat mahasiswa
  if (nim === 'ABSENSI-KELAS' || nim.toLowerCase() === 'absensi-kelas' || nim.toLowerCase() === 'semua') {
    showAlert('ℹ️ Anda memindai QR Presensi Kelas. Silakan masukkan NIM mahasiswa.', 'info', 3500);
    openManualModal();
    return;
  }

  if (!nim || nim.length < 3) {
    playBeepSound('error');
    showAlert('❌ Format QR tidak valid (informasi NIM tidak terbaca).', 'danger');
    return;
  }

  // 6. Pencarian Mahasiswa:
  // a. Pencarian utama berdasarkan NIM persis
  let student = AppState.students.find(s => String(s.nim).trim().toLowerCase() === nim.toLowerCase());

  // b. Jika NIM tidak cocok, coba cari apakah input mencakup nama mahasiswa
  if (!student) {
    const searchTarget = (payloadNama || nim).toLowerCase();
    student = AppState.students.find(s => s.nama.toLowerCase() === searchTarget);
    if (!student && searchTarget.length >= 4) {
      student = AppState.students.find(s => s.nama.toLowerCase().includes(searchTarget));
    }
  }

  if (!student) {
    playBeepSound('error');
    showAlert(`❌ QR Terdeteksi: "${nim}", namun NIM ini belum terdaftar di daftar mahasiswa. Periksa NIM di tabel atau gunakan tombol "Input Manual".`, 'danger', 6000);
    return;
  }

  // Cek apakah sudah hadir hari ini
  if (AppState.attendanceToday[student.nim]) {
    playBeepSound('error');
    const existing = AppState.attendanceToday[student.nim];
    showAlert(`⚠️ ${student.nama} (${student.nim}) sudah tercatat presensi pada pukul ${existing.waktu || 'tadi'}.`, 'warning', 4500);
    highlightTableRow(student.nim);
    return;
  }

  const waktuSekarang = getCurrentTimeString();
  
  // 1. Simpan langsung secara optimis di State & LocalStorage
  AppState.attendanceToday[student.nim] = {
    waktu: waktuSekarang,
    status: 'Hadir',
    metode: source
  };
  saveLocalState();
  renderTable();
  updateStats();
  highlightTableRow(student.nim);

  playBeepSound('success');

  // 2. Kirim ke Server Google Apps Script & Database SQL
  const payload = {
    action: 'presensi',
    nim: student.nim,
    nama: student.nama,
    kelas: student.kelas,
    jurusan: student.jurusan,
    mataKuliah: 'Rekayasa Perangkat Lunak',
    status: 'Hadir',
    metode: source,
    waktu: waktuSekarang,
    tanggal: new Date().toISOString().slice(0, 10)
  };

  const syncResult = await sendPresensiToServer(payload);
  if (!syncResult.success) {
    // Masukkan ke antrean offline jika belum ada
    const alreadyQueued = AppState.offlineQueue.some(item => item.nim === payload.nim && item.tanggal === payload.tanggal);
    if (!alreadyQueued) {
      AppState.offlineQueue.push(payload);
      saveLocalState();
    }
    
    if (syncResult.isDemoUrl) {
      showAlert(`✅ HADIR: ${student.nama} (${student.nim}) tercatat di sistem lokal! Data belum ke Sheets karena belum dihubungkan. Klik "Hubungkan Sheet".`, 'warning', 7000);
    } else {
      showAlert(`✅ HADIR: ${student.nama} (${student.nim}) tercatat offline (${syncResult.error || 'tersimpan lokal'}). Masuk antrean sinkronisasi.`, 'info', 5000);
    }
  } else {
    showAlert(`🎉 Berhasil Presensi: ${student.nama} (${student.nim}) langsung tersimpan ke Google Sheets!`, 'success', 5000);
  }
}

// Efek highlight baris tabel saat presensi berhasil
function highlightTableRow(nim) {
  setTimeout(() => {
    const row = document.getElementById(`row-${nim}`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('row-just-present');
      setTimeout(() => row.classList.remove('row-just-present'), 2500);
    }
  }, 100);
}

// Efek visual scanner ketika berhasil mendeteksi QR
function triggerScanSuccessVisual() {
  const crosshair = document.querySelector('.scan-crosshair');
  const viewport = document.getElementById('scannerViewport');
  if (crosshair) {
    crosshair.classList.add('scanned-success');
    setTimeout(() => crosshair.classList.remove('scanned-success'), 1200);
  }
  if (viewport) {
    viewport.classList.add('viewport-success-glow');
    setTimeout(() => viewport.classList.remove('viewport-success-glow'), 1200);
  }
}

// ====================================================================
// CAMERA & QR SCANNER (HTML5-QRCODE)
// ====================================================================

async function toggleScanner() {
  if (AppState.isScanning) {
    await stopScanner();
  } else {
    await startScanner();
  }
}

async function startScanner() {
  const btnScan = document.getElementById('btnStartScan');
  const overlay = document.getElementById('scannerOverlay');
  const placeholder = document.getElementById('scannerPlaceholder');
  
  if (AppState.html5QrCode) {
    try {
      await AppState.html5QrCode.stop();
      await AppState.html5QrCode.clear();
    } catch (e) {}
    AppState.html5QrCode = null;
  }

  if (btnScan) {
    btnScan.className = 'btn btn-danger';
    btnScan.innerHTML = '<i class="fas fa-stop"></i> Matikan Kamera';
  }
  if (placeholder) placeholder.style.display = 'none';
  if (overlay) overlay.style.display = 'flex';

  try {
    // Inisialisasi scanner dengan ZXing engine murni untuk stabilitas maksimum
    AppState.html5QrCode = new Html5Qrcode("qr-reader", {
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    });

    // PENTING: Jangan berikan batasan qrbox fixed kecil!
    // Membiarkan seluruh bidang kamera dipindai (Full-Frame Scanning) memastikan
    // QR Code yang berukuran besar, dekat, maupun miring dapat langsung dideteksi
    // tanpa terpotong sudut finder pattern-nya.
    const qrConfig = {
      fps: 20,
      disableFlip: false
    };

    try {
      await AppState.html5QrCode.start(
        { facingMode: AppState.cameraFacingMode },
        qrConfig,
        onScanSuccess,
        onScanError
      );
    } catch (modeErr) {
      console.warn('Gagal dengan facingMode, mencoba kamera default (laptop webcam):', modeErr);
      // Fallback untuk laptop yang tidak memiliki label environment/user
      await AppState.html5QrCode.start(
        {},
        qrConfig,
        onScanSuccess,
        onScanError
      );
    }

    AppState.isScanning = true;
    showAlert('📷 Kamera aktif! Arahkan ke QR Code mahasiswa (jarak 15-25 cm).', 'info', 3000);
  } catch (err) {
    console.error('Kamera error:', err);
    showAlert('Gagal membuka kamera. Pastikan Anda mengizinkan akses kamera pada browser, atau gunakan tombol "Scan Foto/File" / "Input Manual".', 'danger', 7000);
    resetScannerControls();
  }
}

async function stopScanner() {
  if (AppState.html5QrCode && AppState.isScanning) {
    try {
      await AppState.html5QrCode.stop();
      await AppState.html5QrCode.clear();
    } catch (e) {}
  }
  AppState.html5QrCode = null;
  AppState.isScanning = false;
  resetScannerControls();
}

function resetScannerControls() {
  const btnScan = document.getElementById('btnStartScan');
  const overlay = document.getElementById('scannerOverlay');
  const placeholder = document.getElementById('scannerPlaceholder');
  
  if (btnScan) {
    btnScan.className = 'btn btn-primary';
    btnScan.innerHTML = '<i class="fas fa-camera"></i> Mulai Scan Kamera';
  }
  if (overlay) overlay.style.display = 'none';
  if (placeholder) placeholder.style.display = 'flex';
}

function onScanSuccess(decodedText) {
  const now = Date.now();
  // Debounce 2 detik agar tidak spam scan berulang
  if (AppState.lastScanNIM === decodedText && now - AppState.lastScanTime < 2500) {
    return;
  }
  
  AppState.lastScanNIM = decodedText;
  AppState.lastScanTime = now;
  triggerScanSuccessVisual();
  processAttendance(decodedText, 'QR Scanner');
}

function onScanError(errorMessage) {
  // Abaikan frame error biasa saat kamera mencari QR
}

async function switchCamera() {
  AppState.cameraFacingMode = (AppState.cameraFacingMode === 'environment') ? 'user' : 'environment';
  if (AppState.isScanning) {
    await stopScanner();
    await startScanner();
    showAlert(`Kamera dialihkan ke ${AppState.cameraFacingMode === 'user' ? 'Depan' : 'Belakang'}.`, 'info', 2000);
  }
}

async function toggleTorch() {
  if (!AppState.isScanning || !AppState.html5QrCode) {
    showAlert('Aktifkan kamera terlebih dahulu untuk menggunakan lampu flash.', 'info');
    return;
  }

  try {
    const videoEl = document.querySelector('#qr-reader video');
    if (videoEl && videoEl.srcObject) {
      const track = videoEl.srcObject.getVideoTracks()[0];
      const capabilities = track.getCapabilities ? track.getCapabilities() : {};
      
      if (capabilities.torch) {
        AppState.isTorchOn = !AppState.isTorchOn;
        await track.applyConstraints({ advanced: [{ torch: AppState.isTorchOn }] });
        showAlert(`Lampu Flash: ${AppState.isTorchOn ? 'Menyala' : 'Mati'}`, 'info', 1500);
      } else {
        showAlert('Perangkat Anda tidak mendukung fitur Flash/Torch kamera.', 'warning');
      }
    }
  } catch (err) {
    showAlert('Fitur lampu flash tidak tersedia pada kamera ini.', 'warning');
  }
}

// ====================================================================
// QR CODE GENERATOR & SCANNING UTILITIES
// ====================================================================

function renderQrToImage(imgEl, textData) {
  if (!imgEl) return;
  // Coba render via library lokal qrcode.js jika tersedia
  if (typeof QRCode !== 'undefined') {
    try {
      const tempDiv = document.createElement('div');
      new QRCode(tempDiv, {
        text: textData,
        width: 280,
        height: 280,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      setTimeout(() => {
        const canvas = tempDiv.querySelector('canvas');
        const img = tempDiv.querySelector('img');
        if (canvas) {
          imgEl.src = canvas.toDataURL('image/png');
        } else if (img && img.src) {
          imgEl.src = img.src;
        }
      }, 50);
      return;
    } catch (e) {
      console.warn('Lokal QRCode gagal, beralih ke CDN:', e);
    }
  }

  // Fallback ke REST API QR jika library belum termuat
  imgEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(textData)}`;
}

function generateClassQR() {
  const qrImg = document.getElementById('classQrImage');
  if (!qrImg) return;

  const payload = {
    nim: 'ABSENSI-KELAS',
    nama: 'Presensi Kelas Real-Time',
    mataKuliah: 'Rekayasa Perangkat Lunak',
    waktuDibuat: new Date().toISOString()
  };
  renderQrToImage(qrImg, JSON.stringify(payload));
}

function generateStudentQR() {
  const inputEl = document.getElementById('studentNimInput');
  const previewBox = document.getElementById('studentQrPreview');
  const qrImg = document.getElementById('studentQrImage');
  const detailsEl = document.getElementById('studentQrDetails');
  
  if (!inputEl) return;
  const nim = inputEl.value.trim();
  if (!nim) {
    showAlert('Silakan masukkan NIM mahasiswa terlebih dahulu.', 'warning');
    inputEl.focus();
    return;
  }

  const student = AppState.students.find(s => s.nim === nim);
  if (!student) {
    showAlert(`NIM ${nim} tidak ditemukan dalam daftar mahasiswa.`, 'danger');
    return;
  }

  const payload = {
    nim: student.nim,
    nama: student.nama,
    kelas: student.kelas,
    jurusan: student.jurusan,
    generatedAt: new Date().toISOString()
  };

  renderQrToImage(qrImg, JSON.stringify(payload));
  if (detailsEl) {
    detailsEl.innerHTML = `<strong>${student.nama}</strong> (${student.nim})<br><span style="color:var(--text-muted)">Kelas ${student.kelas} &bull; ${student.jurusan}</span>`;
  }
  if (previewBox) previewBox.style.display = 'flex';
  showAlert(`QR Code berhasil dibuat untuk ${student.nama}`, 'success');
}

// Helper memuat gambar ke HTMLImageElement
function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Ekstraksi QR Code langsung dari raw canvas imageData menggunakan jsQR
function scanQrFromCanvasWithJsQR(canvas) {
  if (typeof jsQR === 'undefined') return null;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  
  // Percobaan 1: Gambar asli
  const imgData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code1 = jsQR(imgData1.data, imgData1.width, imgData1.height, {
    inversionAttempts: "attemptBoth",
  });
  if (code1 && code1.data) return code1.data;

  // Percobaan 2: Binarisasi kontras tinggi (jika foto agak gelap/silau/screenshot)
  const data = imgData1.data;
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    const val = brightness > 128 ? 255 : 0;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }
  const code2 = jsQR(data, canvas.width, canvas.height, {
    inversionAttempts: "attemptBoth",
  });
  if (code2 && code2.data) return code2.data;

  return null;
}

// Fitur Pemindaian dari File Gambar (Multi-Engine: Html5Qrcode + jsQR + BarcodeDetector)
async function handleFileQrUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  showAlert('⏳ Memproses foto/gambar QR...', 'info', 2500);

  let decodedText = null;

  // METODE 1: Coba Html5Qrcode bawaan (termasuk stop kamera terlebih dahulu jika sedang aktif di elemen yang sama)
  try {
    let wasScanning = false;
    if (AppState.isScanning && AppState.html5QrCode) {
      wasScanning = true;
      try { await stopScanner(); } catch (e) {}
    }

    // Buat instansiasi khusus untuk scan file
    const tempScanner = new Html5Qrcode("qr-reader", { verbose: false });
    try {
      decodedText = await tempScanner.scanFile(file, true);
    } catch (scanFileErr) {
      console.warn('Metode 1 (Html5Qrcode.scanFile) tidak mendeteksi QR, mencoba pemindaian kanvas:', scanFileErr);
    } finally {
      try { await tempScanner.clear(); } catch(e) {}
    }
  } catch (err1) {
    console.warn('Html5QrCode scanFile err:', err1);
  }

  // METODE 2: Scan menggunakan BarcodeDetector API browser native jika didukung
  if (!decodedText && ('BarcodeDetector' in window)) {
    try {
      const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
      const img = await loadImageFromFile(file);
      const barcodes = await barcodeDetector.detect(img);
      if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
        decodedText = barcodes[0].rawValue;
      }
    } catch (bdErr) {
      console.warn('BarcodeDetector native gagal:', bdErr);
    }
  }

  // METODE 3: Canvas + jsQR Engine dengan multi-resolusi (sangat akurat untuk screenshot WhatsApp / foto HP)
  if (!decodedText) {
    try {
      const img = await loadImageFromFile(file);
      
      // Tes resolusi asli
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      decodedText = scanQrFromCanvasWithJsQR(canvas);

      // Jika belum terbaca dan gambar terlalu besar (misal foto kamera HP 4000px), perkecil ke 800-1000px
      if (!decodedText && (canvas.width > 1200 || canvas.height > 1200)) {
        const scale = 1000 / Math.max(canvas.width, canvas.height);
        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = Math.round(canvas.width * scale);
        smallCanvas.height = Math.round(canvas.height * scale);
        const sCtx = smallCanvas.getContext('2d', { willReadFrequently: true });
        sCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);
        decodedText = scanQrFromCanvasWithJsQR(smallCanvas);
      }
    } catch (canvasErr) {
      console.warn('Canvas jsQR scan gagal:', canvasErr);
    }
  }

  // HASIL AKHIR:
  if (decodedText) {
    triggerScanSuccessVisual();
    processAttendance(decodedText, 'Scan Foto/File');
  } else {
    showAlert('❌ QR Code tidak terdeteksi pada gambar ini. Pastikan foto memuat seluruh kotak QR Code secara jelas, atau gunakan tombol "Input Manual".', 'danger', 6500);
  }

  // Reset input agar bisa memilih file yang sama lagi
  event.target.value = '';
}

// Simulasi Cepat Presensi (1-Click Test untuk menguji seluruh sistem seketika)
function simulateQuickScan() {
  // Cari mahasiswa yang belum hadir
  const unattended = AppState.students.find(s => !AppState.attendanceToday[s.nim]);
  const target = unattended || AppState.students[0];
  if (target) {
    showAlert(`⚡ Menguji alur presensi untuk: ${target.nama} (${target.nim})...`, 'info', 1500);
    processAttendance(target.nim, 'Uji Coba Presensi');
  }
}

// Buka Aplikasi di Tab Baru Browser (Membuka batasan izin kamera pada iframe)
function openNewTab() {
  window.open(window.location.href, '_blank');
}

// Modal Diagnostik Sistem
function openDiagnosticModal() {
  openModal('modalDiagnostic');
  runDiagnosticChecks();
}

async function runDiagnosticChecks() {
  const storageIcon = document.getElementById('diagStorageIcon');
  const storageDesc = document.getElementById('diagStorageDesc');
  const cameraIcon = document.getElementById('diagCameraIcon');
  const cameraDesc = document.getElementById('diagCameraDesc');
  const serverIcon = document.getElementById('diagServerIcon');
  const serverDesc = document.getElementById('diagServerDesc');

  // 1. Cek Local Storage
  try {
    localStorage.setItem('diag_test', '1');
    localStorage.removeItem('diag_test');
    if (storageIcon) storageIcon.innerHTML = '<i class="fas fa-circle-check" style="color:var(--success);"></i>';
    if (storageDesc) storageDesc.innerHTML = `<strong>Normal & Siap</strong> &bull; Tersedia kapasitas penyimpanan offline untuk ${AppState.students.length} mahasiswa dan catatan kehadiran.`;
  } catch (e) {
    if (storageIcon) storageIcon.innerHTML = '<i class="fas fa-circle-exclamation" style="color:var(--danger);"></i>';
    if (storageDesc) storageDesc.innerHTML = `Penyimpanan browser dibatasi.`;
  }

  // 2. Cek Kamera
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(t => t.stop());
      if (cameraIcon) cameraIcon.innerHTML = '<i class="fas fa-circle-check" style="color:var(--success);"></i>';
      if (cameraDesc) cameraDesc.innerHTML = `<strong>Kamera Siap</strong> &bull; Perangkat video webcam terdeteksi dan izin akses diberikan.`;
    } catch (camErr) {
      if (cameraIcon) cameraIcon.innerHTML = '<i class="fas fa-triangle-exclamation" style="color:var(--warning);"></i>';
      if (cameraDesc) cameraDesc.innerHTML = `<strong>Perhatian:</strong> Izin kamera belum diizinkan atau terhalang izin iframe. Solusi: Klik tombol <em>"Tab Baru"</em> di kanan atas atau gunakan <em>"Scan dari Foto/File"</em>.`;
    }
  } else {
    if (cameraIcon) cameraIcon.innerHTML = '<i class="fas fa-circle-xmark" style="color:var(--danger);"></i>';
    if (cameraDesc) cameraDesc.innerHTML = `Browser tidak mendukung MediaDevices API. Gunakan tombol <em>"Scan dari Foto/File"</em>.`;
  }

  // 3. Cek Google Apps Script
  if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--accent);"></i>';
  if (serverDesc) serverDesc.textContent = `Mengetes koneksi ke server Google Apps Script...`;
  
  try {
    const res = await fetch(`${AppState.webAppUrl}?action=ping&_t=${Date.now()}`);
    if (res.ok) {
      const d = await res.json().catch(() => ({}));
      if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-circle-check" style="color:var(--success);"></i>';
      if (serverDesc) serverDesc.innerHTML = `<strong>Terhubung Sempurna!</strong> &bull; Google Sheets merespon: "${d.server || d.status || 'OK'}". Data otomatis tersinkron ke Cloud.`;
      updateConnectionBadge('online', '🟢 Terhubung: Google Sheets & SQL');
    } else {
      throw new Error(`Status ${res.status}`);
    }
  } catch (gasErr) {
    if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-circle-info" style="color:var(--warning);"></i>';
    if (serverDesc) serverDesc.innerHTML = `<strong>Status: Mode Database Lokal Aktif</strong>.<br>URL Google Apps Script belum merespon. Anda dapat menyalin file <code>google-apps-script.js</code> ke Google Sheets Anda, lalu tempelkan URL Web App pada menu Konfigurasi. Sistem tetap dapat digunakan 100% normal secara offline.`;
    updateConnectionBadge('online', '🟢 Mode Database Lokal (Siap Sinkron)');
  }
}

function downloadImageFromUrl(url, filename) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      window.open(url, '_blank');
    });
}

function downloadClassQR() {
  const qrImg = document.getElementById('classQrImage');
  if (qrImg && qrImg.src) {
    downloadImageFromUrl(qrImg.src, 'QR-Presensi-Kelas.png');
  }
}

function downloadStudentQR() {
  const qrImg = document.getElementById('studentQrImage');
  const inputEl = document.getElementById('studentNimInput');
  const nim = (inputEl && inputEl.value.trim()) || 'mahasiswa';
  if (qrImg && qrImg.src) {
    downloadImageFromUrl(qrImg.src, `QR-${nim}.png`);
  }
}

// ====================================================================
// TABLE RENDERING & STATS
// ====================================================================

function updateStats() {
  const total = AppState.students.length;
  let presentCount = 0;
  
  AppState.students.forEach(s => {
    if (AppState.attendanceToday[s.nim]) {
      presentCount++;
    }
  });

  const absentCount = Math.max(0, total - presentCount);
  const rate = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  const elTotal = document.getElementById('statTotal');
  const elPresent = document.getElementById('statPresent');
  const elAbsent = document.getElementById('statAbsent');
  const elRate = document.getElementById('statRate');
  const elHeaderCount = document.getElementById('headerStudentCount');
  const elMhsCountText = document.getElementById('mhsCountText');

  if (elTotal) elTotal.textContent = total;
  if (elPresent) elPresent.textContent = presentCount;
  if (elAbsent) elAbsent.textContent = absentCount;
  if (elRate) elRate.textContent = `${rate}%`;
  if (elHeaderCount) elHeaderCount.textContent = total;
  if (elMhsCountText) elMhsCountText.textContent = `${total} Mahasiswa Terdaftar`;
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  const emptyState = document.getElementById('emptyState');
  if (!tbody) return;

  const query = AppState.searchQuery.toLowerCase().trim();
  
  const filtered = AppState.students.filter(student => {
    const isPresent = !!AppState.attendanceToday[student.nim];
    
    // Filter status
    if (AppState.currentFilter === 'present' && !isPresent) return false;
    if (AppState.currentFilter === 'pending' && isPresent) return false;

    // Filter search query
    if (query) {
      const matchNim = student.nim.toLowerCase().includes(query);
      const matchNama = student.nama.toLowerCase().includes(query);
      const matchKelas = student.kelas.toLowerCase().includes(query);
      const matchJurusan = student.jurusan.toLowerCase().includes(query);
      return matchNim || matchNama || matchKelas || matchJurusan;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  let html = '';
  filtered.forEach(student => {
    const attendance = AppState.attendanceToday[student.nim];
    const isPresent = !!attendance;
    
    html += `
      <tr id="row-${student.nim}">
        <td><span class="nim-code">${student.nim}</span></td>
        <td style="font-weight: 600;">${student.nama}</td>
        <td>Kelas ${student.kelas}</td>
        <td style="color: var(--text-muted);">${student.jurusan}</td>
        <td>
          ${isPresent 
            ? `<span class="badge badge-success"><i class="fas fa-check-circle"></i> Hadir</span>` 
            : `<span class="badge badge-pending"><i class="far fa-circle"></i> Belum</span>`}
        </td>
        <td style="font-size: 12px; color: var(--text-muted);">
          ${isPresent ? `<i class="far fa-clock"></i> ${attendance.waktu || '-'}` : '-'}
        </td>
        <td>
          ${!isPresent ? `
            <button class="btn btn-sm btn-outline" onclick="quickMarkAttendance('${student.nim}')" title="Tandai Hadir Langsung">
              <i class="fas fa-check"></i> Hadirkan
            </button>
          ` : `
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; color: var(--success); font-weight: 600;">
                <i class="fas fa-shield-alt"></i> Tercatat
              </span>
              <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 11px; color: var(--text-muted);" onclick="unmarkStudentAttendance('${student.nim}')" title="Batalkan kehadiran mahasiswa ini">
                <i class="fas fa-rotate-left"></i> Batal
              </button>
            </div>
          `}
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function quickMarkAttendance(nim) {
  processAttendance(nim, 'Manual Dosen');
}

// ====================================================================
// MODALS (SETTINGS, MANUAL ATTENDANCE, CODE EXPORT)
// ====================================================================

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

function updateSettingsModalStatus(status, extraInfo = '') {
  const badge = document.getElementById('settingsConnectionBadge');
  const statusTitle = document.getElementById('settingsStatusTitle');
  const statusDesc = document.getElementById('settingsStatusDesc');
  if (!badge) return;

  if (status === 'connected') {
    badge.className = 'alert-box alert-success';
    if (statusTitle) statusTitle.innerHTML = '<i class="fas fa-circle-check" style="color: var(--success);"></i> Status: Terhubung ke Google Spreadsheet';
    if (statusDesc) statusDesc.innerHTML = `File: <strong>${extraInfo || 'Spreadsheet Aktif'}</strong> &bull; Setiap presensi otomatis langsung masuk ke tab 'Presensi'.`;
  } else if (status === 'login_required') {
    badge.className = 'alert-box alert-danger';
    if (statusTitle) statusTitle.innerHTML = '<i class="fas fa-circle-xmark" style="color: var(--danger);"></i> Status: Akses Ditolak (Meminta Login Google)';
    if (statusDesc) statusDesc.innerHTML = 'Saat Deploy Web App, Anda <strong>WAJIB</strong> memilih <code>Who has access: Anyone (Siapa saja)</code>. Jika memilih <em>Only myself</em>, Google akan memblokir kiriman presensi dari browser.';
  } else if (status === 'demo') {
    badge.className = 'alert-box alert-warning';
    if (statusTitle) statusTitle.innerHTML = '<i class="fas fa-triangle-exclamation" style="color: #d97706;"></i> Status: Belum Terhubung ke Spreadsheet Pribadi Anda';
    if (statusDesc) statusDesc.innerHTML = 'Website masih memakai URL demo. Ikuti 4 langkah di bawah ini untuk menghubungkannya ke Google Sheets pribadi Anda.';
  } else {
    badge.className = 'alert-box alert-danger';
    if (statusTitle) statusTitle.innerHTML = '<i class="fas fa-circle-xmark" style="color: var(--danger);"></i> Status: Gagal Terhubung ke Sheet';
    if (statusDesc) statusDesc.innerHTML = extraInfo || 'Periksa kembali URL Web App Anda. Pastikan berakhiran <code>/exec</code>.';
  }
}

function openSettingsModal() {
  const urlInput = document.getElementById('settingsGasUrl');
  if (urlInput) {
    urlInput.value = isDemoOrEmptyUrl(AppState.webAppUrl) ? '' : AppState.webAppUrl;
  }

  // Update button flush queue
  const btnFlush = document.getElementById('btnFlushQueue');
  if (btnFlush) {
    const qCount = AppState.offlineQueue.length;
    btnFlush.innerHTML = `<i class="fas fa-bolt"></i> Sinkronkan Presensi Tertunda ${qCount > 0 ? `(${qCount})` : ''}`;
    btnFlush.style.display = qCount > 0 ? 'inline-flex' : 'none';
  }

  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    updateSettingsModalStatus('demo');
  } else {
    testConnectionFromSettings();
  }

  openModal('modalSettings');
}

function saveSettings() {
  const urlInput = document.getElementById('settingsGasUrl');
  if (!urlInput) return;
  const newUrl = urlInput.value.trim();

  if (!newUrl) {
    showAlert('Silakan masukkan URL Web App Google Apps Script Anda.', 'warning');
    return;
  }

  if (newUrl === DEMO_PLACEHOLDER_URL) {
    showAlert('⚠️ URL tersebut adalah URL demo bawaan yang sudah non-aktif. Silakan pasang Apps Script di Google Sheets Anda sendiri.', 'warning', 7000);
    return;
  }

  if (!newUrl.startsWith('https://script.google.com/macros/s/') || !newUrl.includes('/exec')) {
    showAlert('⚠️ Format URL tidak valid! URL Web App Google Apps Script harus diawali "https://script.google.com/macros/s/" dan berakhiran "/exec"', 'danger', 7000);
    return;
  }

  AppState.webAppUrl = newUrl;
  localStorage.setItem('presensi_gas_url', newUrl);
  showAlert('✅ URL Google Apps Script berhasil disimpan! Menghubungkan ke sheet...', 'success', 4000);
  closeModal('modalSettings');

  checkServerConnection().then(connected => {
    if (connected) {
      showAlert('🎉 Sukses! Website sekarang terhubung langsung ke Google Spreadsheet Anda.', 'success', 6000);
      if (AppState.offlineQueue.length > 0) {
        flushOfflineQueue();
      }
    }
  });
}

async function testConnectionFromSettings() {
  const urlInput = document.getElementById('settingsGasUrl');
  const url = (urlInput && urlInput.value.trim()) ? urlInput.value.trim() : AppState.webAppUrl;
  const btn = document.getElementById('btnTestConnection');

  if (!url || isDemoOrEmptyUrl(url)) {
    showAlert('Silakan masukkan URL Web App Google Apps Script Anda terlebih dahulu.', 'warning');
    updateSettingsModalStatus('demo');
    return false;
  }

  if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengetes Koneksi...';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(`${url}?action=ping&_t=${Date.now()}`, { signal: controller.signal });
    clearTimeout(timeout);

    const rawText = await res.text();
    let data = null;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      if (rawText.includes('<!DOCTYPE') || rawText.includes('<html')) {
        if (rawText.includes('ServiceLogin') || rawText.includes('google-signin')) {
          updateSettingsModalStatus('login_required');
          throw new Error('Google meminta login. Saat Deploy Web App, Anda WAJIB memilih "Who has access: Anyone" (Siapa saja)!');
        } else {
          updateSettingsModalStatus('error', 'Google mengembalikan halaman error (404). Pastikan Deploy > New deployment.');
          throw new Error('Google Sheets mengembalikan halaman error. Pastikan Anda sudah klik Deploy > New deployment.');
        }
      }
      updateSettingsModalStatus('error', 'Format respon bukan JSON dari Google Apps Script.');
      throw new Error('Format respon bukan JSON dari Google Apps Script.');
    }

    if (data && (data.status === 'ok' || data.status === 'success')) {
      const sheetName = data.spreadsheetName || 'Google Sheets Anda';
      showAlert(`🎉 Koneksi Berhasil! Terhubung ke spreadsheet: "${sheetName}".`, 'success', 6000);
      updateSettingsModalStatus('connected', sheetName);
      updateConnectionBadge('online', `🟢 Terhubung: ${sheetName}`);
      const banner = document.getElementById('sheetNotConnectedBanner');
      if (banner) banner.style.display = 'none';
      return true;
    } else {
      throw new Error(data && data.message ? data.message : 'Server tidak merespon OK.');
    }
  } catch (err) {
    showAlert(`❌ Gagal terhubung: ${err.message}`, 'danger', 8000);
    if (!document.getElementById('settingsStatusTitle').textContent.includes('Login')) {
      updateSettingsModalStatus('error', err.message);
    }
    return false;
  } finally {
    if (btn) btn.innerHTML = '<i class="fas fa-plug"></i> Tes Koneksi';
  }
}

// Mengirim 1 baris kehadiran contoh ke spreadsheet untuk menguji langsung
async function sendTestRowToGAS() {
  const urlInput = document.getElementById('settingsGasUrl');
  const url = (urlInput && urlInput.value.trim()) ? urlInput.value.trim() : AppState.webAppUrl;
  const btn = document.getElementById('btnTestRow');

  if (!url || isDemoOrEmptyUrl(url)) {
    showAlert('Masukkan URL Web App Google Sheets Anda terlebih dahulu di kotak input di atas.', 'warning', 6000);
    return;
  }

  if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim baris tes...';

  try {
    const testPayload = {
      action: 'presensi',
      nim: '2024001',
      nama: 'Khairul Munandar (Uji Coba)',
      kelas: '2',
      jurusan: 'Teknik Informatika',
      mataKuliah: 'Rekayasa Perangkat Lunak',
      status: 'Hadir',
      metode: 'Tes Koneksi Web',
      waktu: getCurrentTimeString(),
      tanggal: new Date().toISOString().slice(0, 10)
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(testPayload),
      redirect: 'follow'
    });

    const raw = await response.text();
    let resData = null;
    try {
      resData = JSON.parse(raw);
    } catch (e) {
      if (raw.includes('<!DOCTYPE') || raw.includes('<html')) {
        throw new Error('Google Apps Script memblokir akses atau meminta login. Pastikan memilih "Who has access: Anyone" saat Deploy!');
      }
      throw new Error('Respon bukan JSON valid.');
    }

    if (resData && (resData.status === 'success' || resData.status === 'already_present')) {
      showAlert('🎉 BERHASIL! 1 baris data tes berhasil masuk ke tab "Presensi" di Google Sheet Anda! Silakan cek spreadsheet Anda sekarang.', 'success', 8000);
      playBeepSound('success');
    } else {
      throw new Error(resData && resData.message ? resData.message : 'Gagal menulis baris ke sheet.');
    }
  } catch (err) {
    showAlert(`❌ Gagal kirim baris tes: ${err.message}`, 'danger', 8000);
    playBeepSound('error');
  } finally {
    if (btn) btn.innerHTML = '<i class="fas fa-paper-plane"></i> 🧪 Tes Kirim 1 Baris ke Sheet';
  }
}

// Menyalin kode script Google Apps Script ke clipboard
async function copyGasScriptCode() {
  try {
    const res = await fetch('/google-apps-script.js?_t=' + Date.now());
    if (res.ok) {
      const code = await res.text();
      await navigator.clipboard.writeText(code);
      showAlert('✅ Kode google-apps-script.js berhasil disalin! Buka Google Sheets > Ekstensi > Apps Script > Tempel (paste) kodenya.', 'success', 6000);
      return;
    }
  } catch (e) {}
  showAlert('Buka menu "Ambil Kode VS Code" lalu pilih tab google-apps-script.js untuk menyalin kodenya.', 'info');
}

// Diagnostik Modal
function openDiagnosticModal() {
  openModal('modalDiagnostic');
  runDiagnosticChecks();
}

async function runDiagnosticChecks() {
  // 1. Storage check
  const storageIcon = document.getElementById('diagStorageIcon');
  const storageDesc = document.getElementById('diagStorageDesc');
  try {
    localStorage.setItem('__test_storage__', '1');
    localStorage.removeItem('__test_storage__');
    if (storageIcon) storageIcon.innerHTML = '<i class="fas fa-circle-check" style="color: var(--success);"></i>';
    if (storageDesc) storageDesc.textContent = `Aktif (${AppState.students.length} mahasiswa & ${Object.keys(AppState.attendanceToday).length} kehadiran tersimpan di browser).`;
  } catch (e) {
    if (storageIcon) storageIcon.innerHTML = '<i class="fas fa-circle-xmark" style="color: var(--danger);"></i>';
    if (storageDesc) storageDesc.textContent = 'Penyimpanan lokal browser dinonaktifkan atau penuh.';
  }

  // 2. Kamera check
  const camIcon = document.getElementById('diagCameraIcon');
  const camDesc = document.getElementById('diagCameraDesc');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    if (camIcon) camIcon.innerHTML = '<i class="fas fa-circle-check" style="color: var(--success);"></i>';
    if (camDesc) camDesc.textContent = 'API Kamera didukung browser. Jika preview iframe memblokir izin kamera, gunakan tombol "Tab Baru".';
  } else {
    if (camIcon) camIcon.innerHTML = '<i class="fas fa-triangle-exclamation" style="color: var(--warning);"></i>';
    if (camDesc) camDesc.textContent = 'Kamera tidak terdeteksi atau diblokir izin. Gunakan tombol "Scan dari Foto/File" atau "Input Manual".';
  }

  // 3. Google Apps Script / Sheet check
  const serverIcon = document.getElementById('diagServerIcon');
  const serverDesc = document.getElementById('diagServerDesc');
  if (serverDesc) serverDesc.textContent = 'Sedang mengecek koneksi Google Apps Script...';

  if (isDemoOrEmptyUrl(AppState.webAppUrl)) {
    if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-triangle-exclamation" style="color: #d97706;"></i>';
    if (serverDesc) serverDesc.innerHTML = '<strong>Belum Terhubung ke Sheet Anda:</strong> Masih memakai URL demo. Buka menu <em>"Hubungkan Sheet"</em> untuk panduan 4 langkah pasang script ke Google Spreadsheet Anda.';
    return;
  }

  try {
    const res = await fetch(`${AppState.webAppUrl}?action=ping&_t=${Date.now()}`);
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch(e) {}
    
    if (json && (json.status === 'ok' || json.status === 'success')) {
      if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-circle-check" style="color: var(--success);"></i>';
      if (serverDesc) serverDesc.innerHTML = `<strong>Terhubung Sukses:</strong> Spreadsheet: <em>${json.spreadsheetName || 'Google Sheets'}</em>. Data presensi langsung masuk ke tab 'Presensi'.`;
    } else {
      if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-circle-xmark" style="color: var(--danger);"></i>';
      if (serverDesc) serverDesc.innerHTML = '<strong>Gagal Merespon:</strong> URL tidak mengembalikan JSON. Pastikan pengaturan Deploy memilih <em>"Who has access: Anyone"</em>.';
    }
  } catch (err) {
    if (serverIcon) serverIcon.innerHTML = '<i class="fas fa-circle-xmark" style="color: var(--danger);"></i>';
    if (serverDesc) serverDesc.innerHTML = `<strong>Koneksi Gagal:</strong> ${err.message}. Periksa kembali URL Web App di menu Konfigurasi.`;
  }
}

function openManualModal() {
  const select = document.getElementById('manualStudentSelect');
  if (select) {
    let options = '<option value="">-- Pilih Mahasiswa --</option>';
    AppState.students.forEach(s => {
      const isPresent = !!AppState.attendanceToday[s.nim];
      options += `<option value="${s.nim}">${s.nim} - ${s.nama} ${isPresent ? '(Sudah Hadir)' : ''}</option>`;
    });
    select.innerHTML = options;
  }
  openModal('modalManual');
}

function submitManualAttendance() {
  const select = document.getElementById('manualStudentSelect');
  const customNimInput = document.getElementById('manualCustomNim');
  const nim = (select && select.value) || (customNimInput && customNimInput.value.trim());

  if (!nim) {
    showAlert('Silakan pilih mahasiswa atau ketikkan NIM.', 'warning');
    return;
  }

  processAttendance(nim, 'Input Manual');
  closeModal('modalManual');
}

// ====================================================================
// EXPORT KODE KE VS CODE (TABBED CODE VIEWER & ZIP DOWNLOAD)
// ====================================================================

const CODE_TEMPLATES = {
  html: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presensi Kelas Real-Time</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
</head>
<body>
  <!-- Buka index.html lengkap yang telah dirapikan -->
</body>
</html>`,
  css: `/* Lihat file style.css di root direktori */`,
  js: `// Lihat file script.js di root direktori`,
  gas: `// Lihat file google-apps-script.js di root direktori`,
  sql: `-- Lihat file database-schema.sql di root direktori`
};

function openCodeExportModal() {
  switchCodeTab('html');
  openModal('modalCodeExport');
}

async function switchCodeTab(tabName) {
  // Update button active
  document.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  const codeEl = document.getElementById('codeViewerBlock');
  if (!codeEl) return;

  codeEl.textContent = 'Memuat kode file...';

  let filePath = '';
  if (tabName === 'html') filePath = 'index.html';
  if (tabName === 'css') filePath = 'style.css';
  if (tabName === 'js') filePath = 'script.js';
  if (tabName === 'gas') filePath = 'google-apps-script.js';
  if (tabName === 'sql') filePath = 'database-schema.sql';

  try {
    const res = await fetch(`./${filePath}?_t=${Date.now()}`);
    if (res.ok) {
      const text = await res.text();
      codeEl.textContent = text;
      codeEl.dataset.currentFile = filePath;
    } else {
      codeEl.textContent = `// File ${filePath} tersedia di project directory.`;
    }
  } catch (e) {
    codeEl.textContent = `// File ${filePath}`;
  }
}

function copyCurrentCode() {
  const codeEl = document.getElementById('codeViewerBlock');
  if (!codeEl) return;
  
  navigator.clipboard.writeText(codeEl.textContent).then(() => {
    showAlert('✅ Kode berhasil disalin ke clipboard! Siap di-paste ke VS Code.', 'success');
  }).catch(() => {
    showAlert('Gagal menyalin kode secara otomatis. Silakan pilih dan salin manual.', 'warning');
  });
}

async function downloadProjectZip() {
  if (typeof JSZip === 'undefined') {
    showAlert('Library ZIP sedang dimuat, coba sesaat lagi.', 'warning');
    return;
  }

  showAlert('Sedang mengemas seluruh project menjadi .ZIP...', 'info');
  const zip = new JSZip();

  const files = ['index.html', 'style.css', 'script.js', 'google-apps-script.js', 'database-schema.sql'];
  for (const f of files) {
    try {
      const res = await fetch(`./${f}`);
      if (res.ok) {
        const content = await res.text();
        zip.file(f, content);
      }
    } catch (e) {}
  }

  // Tambah README panduan menjalankan di VS Code & GitHub Pages
  const readme = `# Presensi Kelas Real-Time (QR Code + Google Sheets + Database SQL)

## Cara Membuka di Visual Studio Code (VS Code):
1. Ekstrak file .zip ini ke folder komputer Anda.
2. Buka VS Code -> File -> Open Folder -> pilih folder hasil ekstrak.
3. Pasang ekstensi 'Live Server' di VS Code (opsional tapi disarankan).
4. Klik kanan pada 'index.html' -> pilih 'Open with Live Server'.

## Cara Deploy ke GitHub Pages (Agar CSS & JS Muncul Sempurna):
1. Buat repository baru di GitHub (misal: presensi-qr), pastikan diset Public.
2. Upload semua file (index.html, style.css, script.js, dll.) ke root repository (branch main).
3. Buka tab **Settings** di repository GitHub Anda.
4. Di panel menu kiri, klik **Pages**.
5. Di bagian **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** | Folder: **/ (root)**
   - Klik **Save**.
6. Tunggu sekitar 1 - 2 menit, lalu refresh halaman Settings -> Pages.
7. Link website Anda akan muncul (misal: https://username.github.io/presensi-qr/).
8. Buka tautan tersebut: seluruh tampilan CSS dan fungsi script akan berjalan mulus!

## Struktur File:
- index.html            : Tampilan utama antarmuka web yang rapi & responsif (menggunakan path relatif ./style.css dan ./script.js)
- style.css             : Desain visual elegan bebas konflik gaya
- script.js             : Logika kamera, pemindai QR, sinkronisasi real-time & offline cache
- google-apps-script.js : Backend API untuk Google Sheets & JDBC Database SQL
- database-schema.sql   : Skema tabel MySQL / PostgreSQL
`;
  zip.file('README.md', readme);

  zip.generateAsync({ type: 'blob' }).then(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'presensi-kelas-vscode.zip';
    document.body.appendChild(link);
    link.click();
    link.remove();
    showAlert('✅ File presensi-kelas-vscode.zip berhasil diunduh!', 'success');
  });
}

// ====================================================================
// INITIALIZATION
// ====================================================================

function setupEventListeners() {
  // Live Search
  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderTable();
    });
  }

  // Filter Chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.currentFilter = btn.dataset.filter;
      renderTable();
    });
  });

  // Tab switcher for QR (Class vs Student)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const pane = document.getElementById(`tabPane-${targetTab}`);
      if (pane) pane.classList.add('active');
    });
  });

  // Online/Offline network events
  window.addEventListener('online', () => {
    AppState.isOnline = true;
    showAlert('Jaringan kembali online! Menyinkronkan data...', 'success');
    syncWithServer(true);
  });

  window.addEventListener('offline', () => {
    AppState.isOnline = false;
    updateConnectionBadge('offline', '📴 Offline (Mode Cache)');
    showAlert('Jaringan terputus. Sistem berjalan dalam mode offline lokal.', 'warning');
  });

  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });

  // Clock
  setInterval(() => {
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      clockEl.textContent = `${getTodayDateString()} &bull; ${getCurrentTimeString()}`;
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  loadLocalState();
  setupEventListeners();
  renderTable();
  updateStats();
  generateClassQR();

  // Initial Sync
  syncWithServer(false);

  // Auto-sync interval
  setInterval(() => {
    if (AppState.isOnline) {
      syncWithServer(false);
    }
  }, AppState.autoSyncSeconds * 1000);
});

// Cleanup camera when leaving
window.addEventListener('beforeunload', () => {
  if (AppState.html5QrCode && AppState.isScanning) {
    try {
      AppState.html5QrCode.stop();
    } catch (e) {}
  }
});
