// Halaman-halaman situs: tiap halaman dirender dari data.js dan grafik SVG
// dari charts.js. Rute hash: #/ (Beranda), #/penduduk, #/ekonomi, #/kerja,
// #/harga, #/wilayah, #/tentang. Semua kontrol (pencarian provinsi,
// pengurutan tabel, pilihan rentang tahun) bekerja tanpa jaringan.

import {
  AGE_GROUPS, EMPLOYMENT_SECTORS, GDP_2024, GDP_GROWTH, GDP_NOMINAL,
  GDP_SECTORS, INFLATION, INFLATION_GROUPS, LABOUR_EXTRA, LABOUR_FEB_2025,
  POPULATION_2024, POPULATION_TREND, POVERTY, POVERTY_MAR_2025, PRICE_2024,
  PROVINCES, RELEASES, TRADE_2024, UNEMPLOYMENT,
} from './data.js';
import { barChart, donut, hbarChart, lineChart } from './charts.js';

const id = (n, d = 2) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
const id0 = (n) => n.toLocaleString('id-ID');

function kpi(label, value, note) {
  return `<div class="kpi"><div class="kpi-value">${value}</div>` +
    `<div class="kpi-label">${label}</div><div class="kpi-note">${note}</div></div>`;
}

function source(text) {
  return `<p class="source">Sumber: ${text}</p>`;
}

function mount(app, selector, node) {
  const slot = app.querySelector(selector);
  if (slot) slot.replaceWith(node);
}

// ---------- Beranda ----------
export function home(app) {
  app.innerHTML = `
    <section class="hero">
      <h1>Statistik Indonesia, dalam satu tempat</h1>
      <p class="lede">Angka-angka resmi tentang penduduk, ekonomi, pekerjaan, dan harga
      di Indonesia — lengkap dengan sumber dan tahunnya, bisa dibuka luring
      di komputer maupun di ponsel.</p>
      <p class="hero-links">
        <a class="btn" href="#/penduduk">Penduduk</a>
        <a class="btn" href="#/ekonomi">Ekonomi</a>
        <a class="btn" href="#/kerja">Ketenagakerjaan</a>
        <a class="btn" href="#/harga">Harga &amp; Inflasi</a>
        <a class="btn" href="#/wilayah">Wilayah</a>
      </p>
    </section>
    <section class="kpis" aria-label="Indikator utama">
      ${kpi('Penduduk 2024', '281,6 jt', 'BPS, estimasi pertengahan tahun')}
      ${kpi('Pertumbuhan ekonomi 2024', '5,03%', 'PDB atas dasar harga konstan')}
      ${kpi('Inflasi Des 2024', '1,57%', 'year-on-year, IHK 2022 = 100')}
      ${kpi('Pengangguran Feb 2025', '4,76%', 'Tingkat Pengangguran Terbuka')}
    </section>
    <section class="grid2">
      <article class="card">
        <h2>Pertumbuhan ekonomi, 2019–2024</h2>
        <div data-chart="growth"></div>
        ${source('BPS, Pertumbuhan Ekonomi Indonesia 2024 (rilis 5 Februari 2025).')}
        <p><a href="#/ekonomi">Lihat halaman Ekonomi &rarr;</a></p>
      </article>
      <article class="card">
        <h2>Penduduk Indonesia, 2000–2024</h2>
        <div data-chart="population"></div>
        ${source('BPS, Sensus Penduduk 2000, 2010, 2020; Supas 2015; estimasi 2024.')}
        <p><a href="#/penduduk">Lihat halaman Penduduk &rarr;</a></p>
      </article>
    </section>
    <section class="card">
      <h2>Rilis terbaru</h2>
      <ul class="releases">
        ${RELEASES.map((r) => `<li><span class="rel-date">${r.date}</span> <span class="rel-topic">${r.topic}</span> ${r.title}</li>`).join('')}
      </ul>
      ${source('Badan Pusat Statistik (BPS), Berita Resmi Statistik.')}
    </section>
    <section class="card">
      <h2>Tentang data di situs ini</h2>
      <p>Semua angka berasal dari rilis resmi BPS dan dicantumkan sumber serta
      tahunnya di setiap halaman. Situs ini tidak mengambil data dari internet:
      seluruh angka tersimpan di berkas situs ini, sehingga halaman tetap
      berfungsi penuh tanpa koneksi. Cara angka dikumpulkan dan dihitung
      dijelaskan di <a href="#/tentang">halaman Tentang Data</a>.</p>
    </section>`;
  mount(app, '[data-chart="growth"]', lineChart(
    GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '%', label: 'Pertumbuhan ekonomi tahunan, persen' },
  ));
  mount(app, '[data-chart="population"]', barChart(
    POPULATION_TREND.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '', decimals: 0, label: 'Jumlah penduduk, juta jiwa' },
  ));
}

// ---------- Penduduk ----------
export function penduduk(app) {
  app.innerHTML = `
    <h1>Penduduk</h1>
    <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia.
    Halaman ini menampilkan jumlah, pertumbuhan, struktur umur, dan sebaran
    penduduk menurut provinsi.</p>
    <section class="kpis" aria-label="Indikator penduduk">
      ${kpi('Jumlah penduduk 2024', '281,60 jt jiwa', 'BPS, estimasi pertengahan tahun')}
      ${kpi('Laju pertumbuhan', '1,04% / tahun', 'Rata-rata 2020–2024')}
      ${kpi('Kepadatan penduduk', '147 jiwa/km²', 'BPS 2024')}
      ${kpi('Harapan hidup', '74,15 tahun', 'BPS 2024')}
      ${kpi('IPM 2024', '75,02', 'Indeks Pembangunan Manusia')}
    </section>
    <section class="grid2">
      <article class="card">
        <h2>Jumlah penduduk, 2000–2024</h2>
        <div data-chart="trend"></div>
        ${source('BPS, Sensus Penduduk 2000, 2010, 2020; Supas 2015; estimasi 2024.')}
      </article>
      <article class="card">
        <h2>Struktur umur penduduk 2024</h2>
        <div data-chart="age"></div>
        ${source('BPS, Estimasi Penduduk Pertengahan Tahun 2024.')}
        <p>Sebanyak 68,9 persen penduduk berada pada usia produktif (15–64
        tahun) — kondisi yang disebut bonus demografi.</p>
      </article>
    </section>
    <section class="card">
      <h2>Provinsi berpenduduk terbanyak, 2024</h2>
      <div data-chart="provinces"></div>
      ${source('BPS, Estimasi Penduduk Pertengahan Tahun 2024.')}
      <p>Tiga provinsi di Pulau Jawa — Jawa Barat, Jawa Timur, dan Jawa Tengah —
      menampung 46,2 persen penduduk Indonesia. Daftar lengkap 10 provinsi
      terbesar beserta kepadatannya ada di <a href="#/wilayah">halaman Wilayah</a>.</p>
    </section>
    <section class="card">
      <h2>Catatan</h2>
      <p>Rasio jenis kelamin 2024 sebesar ${id(POPULATION_2024.sexRatio)} laki-laki
      per 100 perempuan (BPS). Pertumbuhan penduduk melambat dari 1,49 persen
      per tahun pada 2000–2010 menjadi sekitar 1,04 persen per tahun pada
      2020–2024.</p>
    </section>`;
  mount(app, '[data-chart="trend"]', barChart(
    POPULATION_TREND.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '', decimals: 0, label: 'Jumlah penduduk, juta jiwa' },
  ));
  mount(app, '[data-chart="age"]', hbarChart(
    AGE_GROUPS.map((g) => ({ label: g.group, value: g.pct })),
    { unit: '%', label: 'Persen penduduk menurut kelompok umur, 2024' },
  ));
  mount(app, '[data-chart="provinces"]', hbarChart(
    PROVINCES.slice(0, 5).map((p) => ({ label: p.name, value: p.pop })),
    { unit: ' jt', label: 'Penduduk provinsi, juta jiwa, 2024' },
  ));
}

// ---------- Ekonomi ----------
let econRange = 'all';

export function ekonomi(app) {
  const growth = econRange === 'recent'
    ? GDP_GROWTH.filter((p) => p.year >= 2022)
    : GDP_GROWTH;
  const nominal = econRange === 'recent'
    ? GDP_NOMINAL.filter((p) => p.year >= 2022)
    : GDP_NOMINAL;
  app.innerHTML = `
    <h1>Ekonomi</h1>
    <p class="lede">Produk Domestik Bruto (PDB), pertumbuhan ekonomi, struktur
    lapangan usaha, dan perdagangan luar negeri Indonesia.</p>
    <section class="kpis" aria-label="Indikator ekonomi">
      ${kpi('PDB 2024', 'Rp22.139 triliun', 'Harga berlaku, BPS')}
      ${kpi('Pertumbuhan 2024', '5,03%', 'Harga konstan 2010')}
      ${kpi('PDB per kapita', 'Rp78,62 jt', 'US$4.785,5 pada 2024')}
      ${kpi('Surplus perdagangan 2024', 'US$31,04 miliar', 'Ekspor US$264,70 miliar')}
    </section>
    <section class="card">
      <h2>Pertumbuhan ekonomi tahunan</h2>
      <div class="controls" role="group" aria-label="Rentang tahun">
        <button type="button" data-range="all" ${econRange === 'all' ? 'aria-pressed="true"' : ''}>2019–2024</button>
        <button type="button" data-range="recent" ${econRange === 'recent' ? 'aria-pressed="true"' : ''}>2022–2024</button>
      </div>
      <div data-chart="growth"></div>
      ${source('BPS, Pertumbuhan Ekonomi Indonesia 2024 (rilis 5 Februari 2025).')}
      <p>Kontraksi 2020 sebesar −2,07 persen terjadi pada masa pandemi
      Covid-19; ekonomi kembali tumbuh di atas 5 persen sejak 2022.</p>
    </section>
    <section class="grid2">
      <article class="card">
        <h2>PDB atas dasar harga berlaku</h2>
        <div data-chart="nominal"></div>
        ${source('BPS, PDB menurut lapangan usaha 2019–2024 (Rp triliun).')}
      </article>
      <article class="card">
        <h2>Pangsa PDB menurut lapangan usaha, 2024</h2>
        <div data-chart="sectors"></div>
        ${source('BPS, PDB menurut lapangan usaha 2024.')}
      </article>
    </section>
    <section class="card">
      <h2>Perdagangan luar negeri, 2024</h2>
      <table class="data">
        <thead><tr><th>Arus</th><th>Nilai (miliar US$)</th></tr></thead>
        <tbody>
          <tr><td>Ekspor</td><td>${id(TRADE_2024.exports)}</td></tr>
          <tr><td>Impor</td><td>${id(TRADE_2024.imports)}</td></tr>
          <tr><td><strong>Neraca perdagangan</strong></td><td><strong>Surplus ${id(TRADE_2024.surplus)}</strong></td></tr>
        </tbody>
      </table>
      ${source('BPS, Perkembangan Ekspor dan Impor Indonesia 2024.')}
    </section>`;
  mount(app, '[data-chart="growth"]', lineChart(
    growth.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '%', label: 'Pertumbuhan PDB tahunan, persen' },
  ));
  mount(app, '[data-chart="nominal"]', barChart(
    nominal.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '', decimals: 0, label: 'PDB harga berlaku, Rp triliun' },
  ));
  mount(app, '[data-chart="sectors"]', hbarChart(
    GDP_SECTORS.map((s) => ({ label: s.sector, value: s.pct })),
    { unit: '%', label: 'Pangsa PDB menurut lapangan usaha, persen, 2024' },
  ));
  app.querySelectorAll('[data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      econRange = btn.getAttribute('data-range');
      ekonomi(app);
      window.scrollTo(0, 0);
    });
  });
}

// ---------- Ketenagakerjaan ----------
export function kerja(app) {
  app.innerHTML = `
    <h1>Ketenagakerjaan</h1>
    <p class="lede">Angkatan kerja, pengangguran, lapangan pekerjaan, dan upah
    di Indonesia berdasarkan Survei Angkatan Kerja Nasional (Sakernas) BPS.</p>
    <section class="kpis" aria-label="Indikator ketenagakerjaan">
      ${kpi('TPT Februari 2025', '4,76%', 'Tingkat Pengangguran Terbuka')}
      ${kpi('Angkatan kerja', '153,05 jt orang', 'Februari 2025')}
      ${kpi('TPAK', '70,92%', 'Tingkat Partisipasi Angkatan Kerja')}
      ${kpi('Upah rata-rata', 'Rp3,09 jt/bulan', 'Buruh/karyawan, Feb 2025')}
    </section>
    <section class="grid2">
      <article class="card">
        <h2>Tingkat Pengangguran Terbuka, Agustus 2019–2024</h2>
        <div data-chart="tpt"></div>
        ${source('BPS, Sakernas Agustus 2019–2024. Februari 2025: 4,76 persen.')}
      </article>
      <article class="card">
        <h2>Pekerja menurut lapangan usaha, Feb 2025</h2>
        <div data-chart="sectors"></div>
        ${source('BPS, Sakernas Februari 2025 (angka dibulatkan).')}
      </article>
    </section>
    <section class="grid2">
      <article class="card">
        <h2>Pekerja formal dan informal, Feb 2025</h2>
        <div class="donut-wrap">
          <div data-chart="donut"></div>
          <ul class="legend">
            <li><span class="sw formal"></span>Formal — ${id(LABOUR_EXTRA.formalShare, 1)}%</li>
            <li><span class="sw informal"></span>Informal — ${id(LABOUR_EXTRA.informalShare, 1)}%</li>
          </ul>
        </div>
        ${source('BPS, Sakernas Februari 2025.')}
        <p>Lebih dari separuh pekerja Indonesia masih bekerja di sektor
        informal, antara lain berusaha sendiri dan pekerja keluarga.</p>
      </article>
      <article class="card">
        <h2>Jumlah orang, Februari 2025</h2>
        <table class="data">
          <thead><tr><th>Kelompok</th><th>Juta orang</th></tr></thead>
          <tbody>
            <tr><td>Angkatan kerja</td><td>${id(LABOUR_FEB_2025.labourForce)}</td></tr>
            <tr><td>Bekerja</td><td>${id(LABOUR_FEB_2025.employed)}</td></tr>
            <tr><td>Pengangguran</td><td>${id(LABOUR_FEB_2025.unemployed)}</td></tr>
          </tbody>
        </table>
        ${source('BPS, Keadaan Ketenagakerjaan Indonesia Februari 2025.')}
      </article>
    </section>`;
  mount(app, '[data-chart="tpt"]', lineChart(
    UNEMPLOYMENT.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '%', label: 'Tingkat Pengangguran Terbuka, persen, Agustus' },
  ));
  mount(app, '[data-chart="sectors"]', hbarChart(
    EMPLOYMENT_SECTORS.map((s) => ({ label: s.sector, value: s.pct })),
    { unit: '%', label: 'Persen pekerja menurut lapangan usaha' },
  ));
  mount(app, '[data-chart="donut"]', donut(
    [
      { label: 'Formal', value: LABOUR_EXTRA.formalShare },
      { label: 'Informal', value: LABOUR_EXTRA.informalShare },
    ],
    { label: 'Pekerja formal dan informal, persen' },
  ));
}

// ---------- Harga & inflasi ----------
export function harga(app) {
  app.innerHTML = `
    <h1>Harga &amp; Inflasi</h1>
    <p class="lede">Perkembangan harga konsumen (Indeks Harga Konsumen/IHK) dan
    inflasi tahunan Indonesia, serta kemiskinan sebagai ukuran daya beli.</p>
    <section class="kpis" aria-label="Indikator harga">
      ${kpi('Inflasi Des 2024', '1,57%', 'Year-on-year')}
      ${kpi('IHK Des 2024', '106,52', '2022 = 100')}
      ${kpi('Penduduk miskin Mar 2025', '8,47%', '23,85 juta orang')}
      ${kpi('Rasio gini Mar 2025', '0,375', 'Ketimpangan pengeluaran')}
    </section>
    <section class="grid2">
      <article class="card">
        <h2>Inflasi tahunan (Desember y-on-y), 2019–2024</h2>
        <div data-chart="inflation"></div>
        ${source('BPS, Perkembangan Indeks Harga Konsumen, Desember tiap tahun.')}
        <p>Inflasi 2022 melonjak ke 5,51 persen setelah penyesuaian harga BBM
        bersubsidi, lalu kembali ke kisaran sasaran 1,5–3,5 persen.</p>
      </article>
      <article class="card">
        <h2>Inflasi menurut kelompok, Des 2024 (y-on-y)</h2>
        <div data-chart="groups"></div>
        ${source('BPS, Perkembangan Indeks Harga Konsumen Desember 2024.')}
      </article>
    </section>
    <section class="card">
      <h2>Persentase penduduk miskin, 2019–2025</h2>
      <div data-chart="poverty"></div>
      ${source('BPS, Profil Kemiskinan di Indonesia, September 2019–Maret 2025.')}
      <p>Kemiskinan sempat naik melewati 10 persen pada 2020–2021, lalu turun
      bertahap hingga 8,47 persen pada Maret 2025 — terendah sepanjang
      pencatatan BPS.</p>
    </section>`;
  mount(app, '[data-chart="inflation"]', lineChart(
    INFLATION.map((p) => ({ label: String(p.year), value: p.value })),
    { unit: '%', label: 'Inflasi tahunan, persen' },
  ));
  // Label kelompok dipersingkat agar muat di sisi kiri grafik.
  const shortGroup = {
    'Makanan, minuman, dan tembakau': 'Makanan & tembakau',
    'Perumahan, air, listrik, dan bahan bakar rumah tangga': 'Perumahan & energi',
    'Informasi, komunikasi, dan jasa keuangan': 'Informasi & keuangan',
    'Penyediaan makanan dan minuman/restoran': 'Makanan jadi/restoran',
    'Perawatan pribadi dan jasa lainnya': 'Perawatan pribadi',
  };
  mount(app, '[data-chart="groups"]', hbarChart(
    INFLATION_GROUPS.map((g) => ({ label: shortGroup[g.group] || g.group, value: g.value })),
    { unit: '%', decimals: 2, labelW: 190, label: 'Inflasi menurut kelompok, persen' },
  ));
  mount(app, '[data-chart="poverty"]', lineChart(
    POVERTY.map((p) => ({ label: p.period, value: p.value })),
    { unit: '%', label: 'Penduduk miskin, persen' },
  ));
}

// ---------- Wilayah ----------
let provinceQuery = '';
let provinceSort = 'pop';
let provinceDir = -1;

function sortedProvinces() {
  const q = provinceQuery.trim().toLowerCase();
  const rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  const key = provinceSort;
  rows.sort((a, b) => {
    if (typeof a[key] === 'string') return a[key].localeCompare(b[key], 'id') * provinceDir;
    return (a[key] - b[key]) * provinceDir;
  });
  return rows;
}

export function wilayah(app) {
  const rows = sortedProvinces();
  app.innerHTML = `
    <h1>Wilayah</h1>
    <p class="lede">Sepuluh provinsi berpenduduk terbanyak di Indonesia, 2024.
    Ketik nama provinsi untuk mencari, atau klik judul kolom untuk mengurutkan.</p>
    <section class="card">
      <h2>Sepuluh provinsi terbesar menurut jumlah penduduk</h2>
      <div data-chart="top"></div>
      ${source('BPS, Estimasi Penduduk Pertengahan Tahun 2024.')}
    </section>
    <section class="card">
      <h2>Tabel provinsi</h2>
      <p><label>Cari provinsi: <input type="search" id="prov-search" value="${provinceQuery.replace(/"/g, '&quot;')}" placeholder="misalnya Jawa" aria-label="Cari provinsi"></label></p>
      <table class="data sortable">
        <thead><tr>
          <th><button type="button" data-sort="name">Provinsi</button></th>
          <th><button type="button" data-sort="pop">Penduduk (juta)</button></th>
          <th><button type="button" data-sort="share">Pangsa (%)</button></th>
          <th><button type="button" data-sort="density">Kepadatan (jiwa/km²)</button></th>
        </tr></thead>
        <tbody>
          ${rows.length ? rows.map((p) => `<tr><td>${p.name}</td><td>${id(p.pop)}</td><td>${id(p.share)}</td><td>${id0(p.density)}</td></tr>`).join('') : '<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>'}
        </tbody>
      </table>
      <p class="table-note">${rows.length} dari 10 provinsi ditampilkan.
      Kepadatan dihitung dari luas wilayah menurut BPS.</p>
      ${source('BPS, Estimasi Penduduk Pertengahan Tahun 2024; kepadatan dihitung dari luas wilayah.')}
    </section>`;
  mount(app, '[data-chart="top"]', hbarChart(
    PROVINCES.slice(0, 10).map((p) => ({ label: p.name, value: p.pop })),
    { unit: ' jt', label: 'Penduduk provinsi, juta jiwa, 2024' },
  ));
  const input = app.querySelector('#prov-search');
  input.addEventListener('input', () => {
    provinceQuery = input.value;
    const pos = input.selectionStart;
    wilayah(app);
    const again = app.querySelector('#prov-search');
    again.focus();
    again.setSelectionRange(pos, pos);
  });
  app.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-sort');
      if (provinceSort === key) {
        provinceDir = -provinceDir;
      } else {
        provinceSort = key;
        provinceDir = key === 'name' ? 1 : -1;
      }
      wilayah(app);
    });
  });
}

// ---------- Tentang data ----------
export function tentang(app) {
  app.innerHTML = `
    <h1>Tentang Data</h1>
    <p class="lede">Dari mana angka-angka di situs ini berasal, bagaimana angka
    itu dikumpulkan, dan bagaimana mengunduhnya.</p>
    <section class="card">
      <h2>Sumber data</h2>
      <p>Seluruh angka di situs ini berasal dari <strong>Badan Pusat Statistik
      (BPS)</strong>, lembaga resmi statistik Indonesia, melalui publikasi dan
      Berita Resmi Statistik yang dapat dibaca di situs BPS (bps.go.id).
      Setiap halaman mencantumkan sumber dan tahun angka yang ditampilkannya.</p>
      <ul>
        <li><strong>Penduduk:</strong> Sensus Penduduk 2000, 2010, 2020; Survei Penduduk Antar Sensus (Supas) 2015; Estimasi Penduduk Pertengahan Tahun 2024.</li>
        <li><strong>Ekonomi:</strong> PDB menurut lapangan usaha dan pengeluaran; rilis Pertumbuhan Ekonomi Indonesia 2024 (5 Februari 2025); statistik ekspor-impor 2024.</li>
        <li><strong>Ketenagakerjaan:</strong> Survei Angkatan Kerja Nasional (Sakernas) Agustus 2019–2024 dan Februari 2025.</li>
        <li><strong>Harga:</strong> Survei Biaya Hidup dan Indeks Harga Konsumen, Desember 2019–2024.</li>
        <li><strong>Kemiskinan:</strong> Survei Sosial Ekonomi Nasional (Susenas), September 2019–Maret 2025.</li>
      </ul>
    </section>
    <section class="card">
      <h2>Catatan metodologi</h2>
      <ul>
        <li>Pertumbuhan ekonomi dihitung dari PDB atas dasar harga konstan 2010.</li>
        <li>Inflasi adalah perubahan IHK Desember terhadap Desember tahun sebelumnya (year-on-year), dengan tahun dasar IHK 2022 = 100.</li>
        <li>Tingkat Pengangguran Terbuka (TPT) adalah pengangguran dibagi angkatan kerja, dikali 100 persen.</li>
        <li>Kepadatan penduduk dihitung dari jumlah penduduk dibagi luas wilayah provinsi menurut BPS.</li>
        <li>Angka dibulatkan seperti pada rilis BPS; selisih pembulatan dapat membuat jumlah komponen tidak persis sama dengan totalnya.</li>
      </ul>
    </section>
    <section class="card">
      <h2>Unduh data</h2>
      <p>Indikator utama situs ini tersedia sebagai berkas CSV yang dapat dibuka
      di spreadsheet apa pun:</p>
      <p><a class="btn" href="data/indonesia.csv" download>Unduh indikator utama (CSV)</a></p>
      <p class="source">Berkas ini disertakan di dalam situs; tidak ada data yang diunduh dari internet.</p>
    </section>
    <section class="card">
      <h2>Tentang situs ini</h2>
      <p><strong>NusaStat</strong> adalah situs statistik mandiri: seluruh halaman,
      grafik, dan datanya tersimpan sebagai berkas di situs ini dan berjalan
      tanpa koneksi internet. Situs ini bukan situs resmi BPS dan tidak
      berafiliasi dengan BPS; untuk angka terbaru, rujuklah rilis resmi BPS.</p>
    </section>`;
}

export const PAGES = {
  '/': home,
  '/penduduk': penduduk,
  '/ekonomi': ekonomi,
  '/kerja': kerja,
  '/harga': harga,
  '/wilayah': wilayah,
  '/tentang': tentang,
};

export function notFound(app) {
  app.innerHTML = `
    <h1>Halaman tidak ditemukan</h1>
    <p class="lede">Halaman yang Anda cari tidak ada di situs ini.</p>
    <p><a class="btn" href="#/">Kembali ke Beranda</a></p>`;
}
