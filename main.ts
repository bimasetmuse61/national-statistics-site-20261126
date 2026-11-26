// NusaStat — entri best-national-statistics-site-20261126-0539 (Node 22,
// standard library saja). Situsnya adalah berkas statis di app/ (halaman,
// gaya, modul, dan data, tanpa build step dan tanpa jaringan). Program ini
// menyerahkan situs itu: menyalin app/ dan screenshots/ dari samping berkas
// ini ke /output lalu menulis /output/dossier.json, ringkasan yang dibaca
// juri (tangkapan layar, berkas dan byte beban pertama, dan sumber situs),
// dengan pustaka make.fun yang divendor. Biarkan vendor/makefun-frontend.ts
// apa adanya: penilai mengharuskan dossier.json sama persis dengan yang
// ditulis salinannya sendiri.
//
// Menjalankan di luar kontainer penilai: MAKEFUN_OUTPUT_DIR menggantikan
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Menjalankan situs secara lokal: node serve.ts lalu buka
// http://localhost:8080

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas penilai (reference/gate.json): hanya text_max_bytes yang membentuk
// byte; sisanya menolak entri yang akan ditolak penilai (lebih dari 4
// tangkapan layar atau satu di atas 256 KiB; lebih dari 993 berkas dan
// direktori di app/ atau 16 MiB berkas app/: app/ dihitung di samping batas
// 1000 entri /output sendiri, bersama screenshots/ dan dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
