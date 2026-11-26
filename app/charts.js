// Pembuat grafik SVG murni (tanpa pustaka): grafik garis, grafik batang,
// grafik batang horizontal, dan donat. Semua grafik digambar dari data yang
// diteruskan pemanggil, dengan label sumbu dan nilai yang terbaca.

const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs, text) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (text !== undefined) el.textContent = text;
  return el;
}

function niceMax(value) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const scaled = value / power;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const step of steps) {
    if (scaled <= step) return step * power;
  }
  return 10 * power;
}

function fmtNum(value, decimals = 1) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Grafik garis dengan titik dan label nilai.
export function lineChart(points, opts) {
  const { width = 640, height = 280, unit = '', decimals = 2, color = '#0e7490', zeroLine = true } = opts || {};
  const padL = 52; const padR = 16; const padT = 26; const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = points.map((p) => p.value);
  const max = niceMax(Math.max(...values, 0));
  const min = Math.min(0, ...values);
  const span = max - min || 1;
  const x = (i) => padL + (innerW * i) / Math.max(points.length - 1, 1);
  const y = (v) => padT + innerH * (1 - (v - min) / span);

  const svg = svgEl('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': opts?.label || 'Grafik garis',
  });
  // Garis grid dan label sumbu-y.
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = min + (span * t) / ticks;
    const gy = y(v);
    svg.appendChild(svgEl('line', { x1: padL, y1: gy, x2: width - padR, y2: gy, stroke: '#e2e8f0', 'stroke-width': 1 }));
    svg.appendChild(svgEl('text', { x: padL - 8, y: gy + 4, 'text-anchor': 'end', 'font-size': 12, fill: '#64748b' }, fmtNum(v, decimals) + unit));
  }
  if (zeroLine && min < 0) {
    svg.appendChild(svgEl('line', { x1: padL, y1: y(0), x2: width - padR, y2: y(0), stroke: '#94a3b8', 'stroke-width': 1 }));
  }
  // Garis dan titik.
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  svg.appendChild(svgEl('path', { d: path, fill: 'none', stroke: color, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  points.forEach((p, i) => {
    svg.appendChild(svgEl('circle', { cx: x(i), cy: y(p.value), r: 4, fill: color, stroke: '#fff', 'stroke-width': 1.5 }));
    svg.appendChild(svgEl('text', {
      x: x(i), y: y(p.value) - 10, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 600, fill: '#0f172a',
      stroke: '#fff', 'stroke-width': 3, 'paint-order': 'stroke',
    }, fmtNum(p.value, decimals) + unit));
    svg.appendChild(svgEl('text', {
      x: x(i), y: height - 10, 'text-anchor': 'middle', 'font-size': 12, fill: '#64748b',
    }, String(p.label)));
  });
  return svg;
}

// Grafik batang vertikal.
export function barChart(bars, opts) {
  const { width = 640, height = 280, unit = '', decimals = 1, color = '#0e7490' } = opts || {};
  const padL = 56; const padR = 12; const padT = 26; const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const max = niceMax(Math.max(...bars.map((b) => b.value), 0));
  const slot = innerW / bars.length;
  const barW = Math.min(48, slot * 0.62);

  const svg = svgEl('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': opts?.label || 'Grafik batang',
  });
  for (let t = 0; t <= 4; t++) {
    const v = (max * t) / 4;
    const gy = padT + innerH * (1 - t / 4);
    svg.appendChild(svgEl('line', { x1: padL, y1: gy, x2: width - padR, y2: gy, stroke: '#e2e8f0', 'stroke-width': 1 }));
    svg.appendChild(svgEl('text', { x: padL - 8, y: gy + 4, 'text-anchor': 'end', 'font-size': 12, fill: '#64748b' }, fmtNum(v, decimals) + unit));
  }
  bars.forEach((b, i) => {
    const h = (innerH * b.value) / max;
    const bx = padL + slot * i + (slot - barW) / 2;
    svg.appendChild(svgEl('rect', {
      x: bx, y: padT + innerH - h, width: barW, height: h, rx: 4, fill: color,
    }));
    svg.appendChild(svgEl('text', {
      x: bx + barW / 2, y: padT + innerH - h - 7, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 600, fill: '#0f172a',
      stroke: '#fff', 'stroke-width': 3, 'paint-order': 'stroke',
    }, fmtNum(b.value, decimals) + unit));
    svg.appendChild(svgEl('text', {
      x: bx + barW / 2, y: height - 10, 'text-anchor': 'middle', 'font-size': 12, fill: '#64748b',
    }, String(b.label)));
  });
  return svg;
}

// Grafik batang horizontal dengan label di kiri.
export function hbarChart(rows, opts) {
  const { width = 640, rowH = 34, unit = '%', decimals = 1, color = '#0e7490', labelW = 220 } = opts || {};
  const height = rows.length * rowH + 14;
  const max = niceMax(Math.max(...rows.map((r) => r.value), 0));
  const barX = labelW + 8;
  const barWMax = width - barX - 64;

  const svg = svgEl('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': opts?.label || 'Grafik batang horizontal',
  });
  rows.forEach((r, i) => {
    const cy = 14 + i * rowH + rowH / 2;
    const w = Math.max(2, (barWMax * r.value) / max);
    svg.appendChild(svgEl('text', {
      x: labelW, y: cy + 4, 'text-anchor': 'end', 'font-size': 13, fill: '#0f172a',
    }, r.label));
    svg.appendChild(svgEl('rect', {
      x: barX, y: cy - 9, width: w, height: 18, rx: 4, fill: color,
    }));
    svg.appendChild(svgEl('text', {
      x: barX + w + 8, y: cy + 4, 'font-size': 13, 'font-weight': 600, fill: '#0f172a',
    }, fmtNum(r.value, decimals) + unit));
  });
  return svg;
}

// Donat dua bagian (misalnya formal vs informal).
export function donut(parts, opts) {
  const { size = 180, colors = ['#0e7490', '#f59e0b'] } = opts || {};
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${size} ${size}`, role: 'img', width: size, height: size,
    'aria-label': opts?.label || 'Grafik donat',
  });
  let offset = 0;
  parts.forEach((p, i) => {
    const frac = p.value / 100;
    const circle = svgEl('circle', {
      cx: size / 2, cy: size / 2, r, fill: 'none', stroke: colors[i % colors.length],
      'stroke-width': 26, 'stroke-dasharray': `${(frac * c).toFixed(1)} ${c.toFixed(1)}`,
      'stroke-dashoffset': (-offset * c).toFixed(1), transform: `rotate(-90 ${size / 2} ${size / 2})`,
    });
    svg.appendChild(circle);
    offset += frac;
  });
  const mid = svgEl('text', {
    x: size / 2, y: size / 2 - 2, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700, fill: '#0f172a',
  }, `${fmtNum(parts[0].value, 1)}%`);
  svg.appendChild(mid);
  svg.appendChild(svgEl('text', {
    x: size / 2, y: size / 2 + 20, 'text-anchor': 'middle', 'font-size': 12, fill: '#64748b',
  }, parts[0].label));
  return svg;
}
