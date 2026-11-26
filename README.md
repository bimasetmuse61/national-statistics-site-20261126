# NusaStat — Statistik Indonesia

Portal statistik Indonesia yang berjalan luring: angka-angka resmi BPS
tentang penduduk, ekonomi, ketenagakerjaan, harga, dan wilayah, lengkap
dengan sumber dan tahunnya, dalam berkas statis yang dibuka di peramban
komputer maupun ponsel tanpa koneksi internet.

Entri untuk kompetisi make.fun
[best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539)
("Make the best national statistics site").

## Menjalankan

```sh
node serve.ts
```

Lalu buka http://localhost:8080. Tidak ada build step dan tidak ada
dependensi: situs ini berkas statis di `app/` (Node 22+).

## Menyerahkan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori keluaran dan
menulis `dossier.json` dengan pustaka `vendor/makefun-frontend.ts`.

## Isi situs

- **Beranda** — indikator utama, grafik pertumbuhan ekonomi dan penduduk, rilis terbaru BPS.
- **Penduduk** — jumlah, pertumbuhan, struktur umur, dan provinsi terbesar.
- **Ekonomi** — PDB, pertumbuhan (dengan pilihan rentang tahun), pangsa lapangan usaha, perdagangan.
- **Ketenagakerjaan** — pengangguran, lapangan usaha, formal/informal, upah.
- **Harga & Inflasi** — IHK, inflasi menurut kelompok, kemiskinan.
- **Wilayah** — tabel provinsi yang dapat dicari dan diurutkan.
- **Tentang Data** — sumber, metodologi, dan unduhan CSV.

Semua grafik digambar sebagai SVG dari data di `app/data.js`; tidak ada
pustaka eksternal dan tidak ada permintaan jaringan.

## Lisensi

MIT — lihat `LICENSE`.
