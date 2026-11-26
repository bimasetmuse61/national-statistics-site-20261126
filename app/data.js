// Data statistik Indonesia. Setiap angka dicantumkan sumber dan tahunnya di
// halaman yang menampilkannya; file ini hanya menyimpan angka dan labelnya.
// Sumber utama: Badan Pusat Statistik (BPS) — Sensus Penduduk, Survei Sosial
// Ekonomi Nasional (Susenas), Survei Angkatan Kerja Nasional (Sakernas),
// dan rilis Berita Resmi Statistik. Angka dibulatkan seperti pada rilis BPS.

export const META = {
  country: 'Indonesia',
  sourceName: 'Badan Pusat Statistik (BPS)',
  sourceNote: 'Angka-angka di situs ini berasal dari rilis resmi BPS. ' +
    'Nilai dibulatkan seperti pada rilis aslinya; halaman tiap topik ' +
    'mencantumkan sumber dan tahun setiap angka.',
};

// Penduduk (jiwa, juta) — BPS, Estimasi Penduduk Pertengahan Tahun & Sensus
export const POPULATION_TREND = [
  { year: 2000, value: 205.13, label: 'Sensus Penduduk 2000' },
  { year: 2010, value: 237.64, label: 'Sensus Penduduk 2010' },
  { year: 2015, value: 255.46, label: 'Supas 2015' },
  { year: 2020, value: 270.20, label: 'Sensus Penduduk 2020' },
  { year: 2024, value: 281.60, label: 'Estimasi pertengahan tahun 2024' },
];

export const POPULATION_2024 = {
  total: 281.60, // juta jiwa
  growth: 1.04, // % per tahun 2020-2024
  density: 147, // jiwa per km persegi
  sexRatio: 102.4, // laki-laki per 100 perempuan
  lifeExpectancy: 74.15, // tahun
  hdi: 75.02, // Indeks Pembangunan Manusia 2024
  source: 'BPS, Estimasi Penduduk Pertengahan Tahun 2024; IPM 2024',
};

// Struktur umur 2024 (persen penduduk) — BPS
export const AGE_GROUPS = [
  { group: '0–14 tahun', pct: 24.3 },
  { group: '15–24 tahun', pct: 16.5 },
  { group: '25–54 tahun', pct: 42.1 },
  { group: '55–64 tahun', pct: 10.3 },
  { group: '65 tahun ke atas', pct: 6.8 },
];

// Provinsi: penduduk 2024 (juta), kepadatan (jiwa/km2, dihitung dari luas
// wilayah BPS), dan pangsa terhadap penduduk nasional — BPS 2024.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.35, density: 1423, share: 17.88 },
  { name: 'Jawa Timur', pop: 41.81, density: 875, share: 14.85 },
  { name: 'Jawa Tengah', pop: 37.89, density: 1155, share: 13.46 },
  { name: 'Sumatera Utara', pop: 16.05, density: 220, share: 5.70 },
  { name: 'Banten', pop: 12.43, density: 1286, share: 4.41 },
  { name: 'DKI Jakarta', pop: 10.68, density: 16084, share: 3.79 },
  { name: 'Sulawesi Selatan', pop: 9.36, density: 200, share: 3.32 },
  { name: 'Lampung', pop: 9.28, density: 268, share: 3.30 },
  { name: 'Sumatera Selatan', pop: 8.94, density: 98, share: 3.17 },
  { name: 'Riau', pop: 6.96, density: 80, share: 2.47 },
];

// Ekonomi — BPS, Berita Resmi Statistik
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

export const GDP_NOMINAL = [
  { year: 2019, value: 15832.7 },
  { year: 2020, value: 15443.4 },
  { year: 2021, value: 16976.7 },
  { year: 2022, value: 19588.4 },
  { year: 2023, value: 20892.4 },
  { year: 2024, value: 22139.0 },
];

export const GDP_2024 = {
  nominal: 22139.0, // Rp triliun, harga berlaku
  growth: 5.03, // %
  perCapitaIdr: 78.62, // Rp juta
  perCapitaUsd: 4785.5, // US$
  source: 'BPS, Pertumbuhan Ekonomi Indonesia 2024 (rilis 5 Februari 2025)',
};

// Pangsa PDB menurut lapangan usaha, 2024 (%) — BPS
export const GDP_SECTORS = [
  { sector: 'Industri pengolahan', pct: 18.98 },
  { sector: 'Perdagangan besar dan eceran', pct: 13.03 },
  { sector: 'Pertanian, kehutanan, perikanan', pct: 11.91 },
  { sector: 'Konstruksi', pct: 10.05 },
  { sector: 'Pertambangan dan penggalian', pct: 9.08 },
  { sector: 'Lapangan usaha lainnya', pct: 36.95 },
];

// Perdagangan luar negeri 2024 (miliar US$) — BPS
export const TRADE_2024 = {
  exports: 264.70,
  imports: 233.66,
  surplus: 31.04,
  source: 'BPS, Perkembangan Ekspor dan Impor Indonesia 2024',
};

// Ketenagakerjaan — BPS, Sakernas
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

export const LABOUR_FEB_2025 = {
  labourForce: 153.05, // juta orang
  employed: 145.77, // juta orang
  unemployed: 7.28, // juta orang
  tpt: 4.76, // % Tingkat Pengangguran Terbuka
  tpak: 70.92, // % Tingkat Partisipasi Angkatan Kerja
  source: 'BPS, Keadaan Ketenagakerjaan Indonesia Februari 2025',
};

// Pekerja menurut lapangan usaha utama, Februari 2025 (%) — BPS (sekitar)
export const EMPLOYMENT_SECTORS = [
  { sector: 'Pertanian', pct: 27.5 },
  { sector: 'Perdagangan', pct: 18.9 },
  { sector: 'Industri pengolahan', pct: 13.9 },
  { sector: 'Konstruksi', pct: 7.6 },
  { sector: 'Jasa lainnya', pct: 32.1 },
];

export const LABOUR_EXTRA = {
  formalShare: 40.9, // % pekerja formal, Februari 2025
  informalShare: 59.1, // % pekerja informal, Februari 2025
  avgWage: 3.09, // Rp juta per bulan, upah rata-rata buruh/karyawan
  source: 'BPS, Sakernas Februari 2025',
};

// Harga dan inflasi — BPS, Indeks Harga Konsumen
export const INFLATION = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const PRICE_2024 = {
  cpiDec: 106.52, // IHK Desember 2024 (2022 = 100)
  inflationDec: 1.57, // % year-on-year Desember 2024
  source: 'BPS, Perkembangan Indeks Harga Konsumen Desember 2024',
};

// Inflasi menurut kelompok pengeluaran, Desember 2024 y-on-y (%) — BPS
export const INFLATION_GROUPS = [
  { group: 'Makanan, minuman, dan tembakau', value: 1.90 },
  { group: 'Pakaian dan alas kaki', value: 1.28 },
  { group: 'Perumahan, air, listrik, dan bahan bakar rumah tangga', value: 0.61 },
  { group: 'Perlengkapan rumah tangga', value: 1.07 },
  { group: 'Kesehatan', value: 1.76 },
  { group: 'Transportasi', value: 0.91 },
  { group: 'Informasi, komunikasi, dan jasa keuangan', value: -0.34 },
  { group: 'Rekreasi, olahraga, dan budaya', value: 1.26 },
  { group: 'Pendidikan', value: 1.73 },
  { group: 'Penyediaan makanan dan minuman/restoran', value: 2.11 },
  { group: 'Perawatan pribadi dan jasa lainnya', value: 6.36 },
];

// Kemiskinan dan ketimpangan — BPS
export const POVERTY = [
  { period: 'Sep 2019', value: 9.22 },
  { period: 'Mar 2020', value: 9.78 },
  { period: 'Sep 2020', value: 10.19 },
  { period: 'Mar 2021', value: 10.14 },
  { period: 'Sep 2021', value: 9.71 },
  { period: 'Mar 2022', value: 9.54 },
  { period: 'Sep 2022', value: 9.57 },
  { period: 'Mar 2023', value: 9.36 },
  { period: 'Sep 2023', value: 9.36 },
  { period: 'Mar 2024', value: 9.03 },
  { period: 'Sep 2024', value: 8.57 },
  { period: 'Mar 2025', value: 8.47 },
];

export const POVERTY_MAR_2025 = {
  rate: 8.47, // % penduduk miskin
  poorPeople: 23.85, // juta orang
  gini: 0.375, // rasio gini Maret 2025
  source: 'BPS, Profil Kemiskinan di Indonesia Maret 2025; Gini Maret 2025',
};

// Rilis terbaru yang dirujuk halaman Beranda — BPS, Berita Resmi Statistik
export const RELEASES = [
  { date: '5 Feb 2025', title: 'Pertumbuhan ekonomi 2024 mencapai 5,03 persen', topic: 'Ekonomi' },
  { date: '5 Mei 2025', title: 'Tingkat Pengangguran Terbuka Februari 2025 sebesar 4,76 persen', topic: 'Ketenagakerjaan' },
  { date: '2 Jan 2025', title: 'Inflasi Desember 2024 sebesar 1,57 persen (y-on-y)', topic: 'Harga' },
  { date: '15 Jul 2025', title: 'Persentase penduduk miskin Maret 2025 sebesar 8,47 persen', topic: 'Kemiskinan' },
  { date: '15 Nov 2024', title: 'Indeks Pembangunan Manusia 2024 mencapai 75,02', topic: 'Penduduk' },
];
