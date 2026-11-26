// Perute hash situs NusaStat: tiap rute memanggil satu fungsi halaman dari
// views.js, memperbarui judul dokumen dan penanda tautan aktif, lalu menandai
// halaman siap untuk tangkapan layar (window.__shotReady).
import { PAGES, notFound } from './views.js';

const app = document.getElementById('app');
const titles = {
  '/': 'NusaStat — Statistik Indonesia',
  '/penduduk': 'Penduduk | NusaStat',
  '/ekonomi': 'Ekonomi | NusaStat',
  '/kerja': 'Ketenagakerjaan | NusaStat',
  '/harga': 'Harga & Inflasi | NusaStat',
  '/wilayah': 'Wilayah | NusaStat',
  '/tentang': 'Tentang Data | NusaStat',
};

function route() {
  window.__shotReady = false;
  const path = location.hash.replace(/^#/, '') || '/';
  const render = PAGES[path] || notFound;
  document.title = titles[path] || 'Halaman tidak ditemukan | NusaStat';
  render(app);
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.setAttribute('aria-current', href === `#${path}` ? 'page' : 'false');
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', route);
route();
