/* Lernen 8 – erzeugt Lernkarten als PDF direkt im Gerät (ohne Internet, ohne fremde Bibliothek).
   Schrift: Helvetica (in jedem PDF-Programm eingebaut). Breiten werden mit Helvetica/Arial gemessen (gleiche Maße). */
(function () {
  'use strict';
  var MM = 72 / 25.4;
  var cv = document.createElement('canvas').getContext('2d');
  function tw(t, size, bold) { cv.font = (bold ? 'bold ' : '') + '100px Helvetica, Arial, sans-serif'; return cv.measureText(t).width * size / 100; }

  /* Zeichen auf WinAnsi abbilden (Umlaute, €, –, „“ bleiben erhalten) */
  var WIN = { '€': 0x80, '‚': 0x82, '„': 0x84, '…': 0x85, '‰': 0x89, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97 };
  var SYM = { 'π': '160', '√': '326', '≈': '273', '→': '256', 'Ω': '127', 'Δ': '104' }; // Oktalcodes in der Symbol-Kodierung
  var REPL = { '₀': '0', 'Ē': 'nicht E', '→': '->', '←': '<-', '↔': '<->', '⇒': '=>', '≥': '>=', '≤': '<=', '≈': '~', '✓': 'OK', '✗': 'x', '−': '-', '‑': '-', '­': '', ' ': ' ', ' ': ' ', '★': '*', '☆': '*', '⚠': '!' };
  function clean(t) { return String(t == null ? '' : t).replace(/\*\*/g, '').replace(/[←↔⇒≥≤✓✗−‑­  ★☆⚠₀Ē]/g, function (c) { return REPL[c]; }); }
  function enc(t) {
    var out = '';
    for (var i = 0; i < t.length; i++) {
      var c = t[i], code = t.charCodeAt(i);
      if (WIN[c]) code = WIN[c]; else if (code > 255) code = 63;
      var ch = String.fromCharCode(code);
      out += (ch === '(' || ch === ')' || ch === '\\') ? '\\' + ch : ch;
    }
    return out;
  }
  function wrap(text, size, bold, width) {
    var words = clean(text).split(/\s+/).filter(Boolean), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (tw(t, size, bold) <= width || !cur) {
        if (!cur && tw(w, size, bold) > width) { // sehr langes Wort hart trennen
          var part = '';
          for (var i = 0; i < w.length; i++) { if (tw(part + w[i], size, bold) > width && part) { lines.push(part); part = ''; } part += w[i]; }
          cur = part; return;
        }
        cur = t;
      } else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines.length ? lines : [''];
  }
  function hex(h) { h = (h || '#1f6f5c').trim().replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
  function rgb(c) { return c.map(function (v) { return v.toFixed(3); }).join(' '); }
  var HL = { gelb: [1, .914, .478], gruen: [.776, .941, .706], rosa: [1, .788, .878], blau: [.769, .89, 1] };

  /* Eine Karte zeichnen. x,y = linke obere Ecke (PDF-Koordinaten), w,h = Größe in pt, k = Schriftfaktor */
  function drawCard(o, c, x, y, w, h, small) {
    var k = small ? 0.78 : 1, acc = c.accent, ink = [.114, .137, .169], grey = [.36, .40, .45], line = [.86, .84, .80];
    var pT = (small ? 5 : 9) * MM, pS = (small ? 5 : 8) * MM, pB = (small ? 4 : 7) * MM;
    var L = x + pS, R = x + w - pS, W = R - L, cy = y - pT;
    var fs = 10.5 * k, lh = fs * 1.32, hlIdx = 0;
    function text(t, tx, ty, size, bold, col) {
      /* Mathe-Zeichen, die Helvetica nicht hat, kommen aus der eingebauten Schrift „Symbol“ (F3) */
      var f = (bold ? 'F2' : 'F1'), sz = ' ' + size.toFixed(2) + ' Tf ', body = '';
      String(t).split(/([π√≈→ΩΔ])/).forEach(function (p) { if (!p) return; if (SYM[p]) body += '/F3' + sz + '(\\' + SYM[p] + ') Tj '; else body += '/' + f + sz + '(' + enc(p) + ') Tj '; });
      o.push('BT ' + rgb(col || ink) + ' rg ' + tx.toFixed(2) + ' ' + ty.toFixed(2) + ' Td ' + body + 'ET');
    }
    function hline(x1, x2, yy, col, wd, dash) { o.push((dash ? '[2 2] 0 d ' : '') + rgb(col) + ' RG ' + (wd || .5) + ' w ' + x1.toFixed(2) + ' ' + yy.toFixed(2) + ' m ' + x2.toFixed(2) + ' ' + yy.toFixed(2) + ' l S' + (dash ? ' [] 0 d' : '')); }
    function rect(x1, yTop, ww, hh, col) { o.push(rgb(col) + ' rg ' + x1.toFixed(2) + ' ' + (yTop - hh).toFixed(2) + ' ' + ww.toFixed(2) + ' ' + hh.toFixed(2) + ' re f'); }
    function mark(yTop, hh, x1, x2) { var m = c.marks['k:' + (hlIdx++)]; if (m) rect(x1 == null ? L - 2 : x1, yTop + 1 - fs * 0.24, (x2 == null ? R + 2 : x2) - (x1 == null ? L - 2 : x1), hh, HL[m === 1 ? 'gelb' : m] || HL.gelb); }
    // Kopfzeile
    var hs = 7 * k; cy -= hs;
    text(clean(c.head).toUpperCase(), L, cy, hs, false, grey);
    var r = clean(c.headRight); text(r, R - tw(r, hs, false), cy, hs, false, grey);
    cy -= 4 * k; hline(L, R, cy, line, .5); cy -= 4 * k;
    // Titel
    var ts = 14 * k;
    wrap(c.title, ts, true, W).forEach(function (ln) { cy -= ts * 1.1; text(ln, L, cy, ts, true, acc); });
    cy -= 5 * k;
    // Stichpunkte
    (c.bullets || []).forEach(function (b) {
      var lines = wrap(b, fs, false, W - 9 * k), hh = lines.length * lh;
      mark(cy, hh + 1);
      lines.forEach(function (ln, i) { cy -= lh; if (!i) text('•', L, cy, fs, false); text(ln, L + 9 * k, cy, fs, false); });
      cy -= 1.5 * k;
    });
    // Regeln (Bezeichnung links, Werte untereinander)
    if (c.rules) {
      var lw = 0; c.rules.forEach(function (g) { lw = Math.max(lw, tw(clean(g[0]), fs, true)); });
      lw = Math.min(lw + 8 * k, W * 0.42);
      c.rules.forEach(function (g, gi) {
        if (gi) { cy -= fs * 0.38; hline(L, R, cy, line, .5); cy -= 1 * k; }
        var lab = wrap(g[0], fs, true, lw - 6 * k), first = cy;
        (g[1] || []).forEach(function (v, vi) {
          var lines = wrap(v, fs, false, W - lw), hh = lines.length * lh;
          mark(cy, hh + 1);
          lines.forEach(function (ln) { cy -= lh; text(ln, L + lw, cy, fs, false); });
        });
        var ly = first; lab.forEach(function (ln) { ly -= lh; text(ln, L, ly, fs, true, acc); });
        if (ly < cy) cy = ly;
      });
      cy -= 4 * k;
    }
    // Kalkulation
    if (c.calc) {
      if (c.calc.title) { cy -= lh; text(clean(c.calc.title), L, cy, fs, true); cy -= 1 * k; }
      var numW = 0, fW = 0;
      c.calc.rows.forEach(function (rw) { numW = Math.max(numW, tw(clean(rw.n || ''), fs, rw.t === 'sum')); fW = Math.max(fW, tw(clean(rw.f || ''), fs, false)); });
      var opW = 10 * k, gap = 6 * k, labW = W - opW - numW - gap - (fW ? fW + gap : 0);
      c.calc.rows.forEach(function (rw) {
        var bold = rw.t === 'sum', lines = wrap(rw.label, fs, bold, labW), hh = lines.length * lh;
        mark(cy, hh + 2);
        var top = cy;
        if (rw.t === 'sub' || rw.t === 'sum') hline(R - numW - 2, R, top - 1, ink, .6);
        lines.forEach(function (ln, i) {
          cy -= lh;
          if (!i) { if (rw.op) text(clean(rw.op), L, cy, fs, true, acc); }
          text(ln, L + opW, cy, fs, bold);
        });
        var base = top - lh;
        if (rw.f) { var f = clean(rw.f); text(f, R - numW - gap - tw(f, fs, false), base, fs, false, grey); }
        if (rw.n) { var n = clean(rw.n); text(n, R - tw(n, fs, bold), base, fs, bold); }
        if (bold) { hline(R - numW - 2, R, cy - 2.5, ink, .5); hline(R - numW - 2, R, cy - 4, ink, .5); cy -= 3; }
        cy -= 2 * k;
      });
      cy -= 2 * k;
    }
    // Fußbereich (Merke + Quelle) von unten aufbauen
    var fy = y - h + pB, footS = 6 * k;
    var mLines = c.merke ? wrap(c.merke, fs, true, W) : [];
    var footTop = fy + footS + 3 * k + mLines.length * lh + 4 * k;
    if (cy < footTop + 2) (window.ImmoPDF.overflow = window.ImmoPDF.overflow || []).push(clean(c.title));
    // Notiz (falls gewünscht) direkt über dem Merke-Bereich bzw. unter dem Inhalt
    if (c.note) {
      var nl = wrap('Notiz: ' + c.note, fs * 0.92, false, W - 8 * k).slice(0, 4), nh = nl.length * lh * 0.92 + 4 * k;
      var ny = Math.min(cy - 2 * k, footTop + nh + 6 * k);
      rect(L, ny, W, nh, [.965, .957, .937]); rect(L, ny, 2.2, nh, acc);
      mark(ny, nh, L, R);
      var yy = ny - 1.5 * k; nl.forEach(function (ln) { yy -= lh * 0.92; text(ln, L + 6 * k, yy, fs * 0.92, false); });
    } else if (c.marks) { /* Index für Notiz bleibt ungenutzt */ }
    if (mLines.length) {
      hline(L, R, footTop, acc, .6, true);
      var my = footTop - 2 * k; mark(my, mLines.length * lh + 2);
      mLines.forEach(function (ln) { my -= lh; text(ln, L, my, fs, true); });
    }
    if (c.quelle) text('Quelle: ' + clean(c.quelle), L, fy, footS, false, grey);
  }

  var SIZES = { a6: [105, 148, 1, 1, false], a7: [74, 105, 1, 1, true], a4: [210, 297, 2, 2, false], a7x8: [297, 210, 4, 2, true] };
  function build(cards, mode) {
    var S = SIZES[mode] || SIZES.a6, pw = S[0] * MM, ph = S[1] * MM, cols = S[2], rows = S[3], small = S[4];
    var cw = mode === 'a4' ? 105 * MM : mode === 'a7x8' ? 74 * MM : pw, ch = mode === 'a4' ? 148 * MM : mode === 'a7x8' ? 105 * MM : ph;
    var per = cols * rows, pages = [];
    for (var i = 0; i < cards.length; i += per) {
      var o = [];
      cards.slice(i, i + per).forEach(function (c, j) {
        var cx = (j % cols) * cw, cyTop = ph - Math.floor(j / cols) * ch;
        drawCard(o, c, cx, cyTop, cw, ch, small);
      });
      if (per > 1) { // Schnittlinien
        o.push('[3 3] 0 d 0.6 0.64 0.68 RG 0.3 w');
        for (var a = 1; a < cols; a++) o.push((a * cw).toFixed(2) + ' 0 m ' + (a * cw).toFixed(2) + ' ' + ph.toFixed(2) + ' l S');
        for (var b = 1; b < rows; b++) o.push('0 ' + (ph - b * ch).toFixed(2) + ' m ' + pw.toFixed(2) + ' ' + (ph - b * ch).toFixed(2) + ' l S');
        o.push('[] 0 d');
      }
      pages.push(o.join('\n'));
    }
    // PDF zusammensetzen
    var objs = [], out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', offs = [];
    function add(s) { objs.push(s); return objs.length; }
    add('<< /Type /Catalog /Pages 2 0 R >>');
    add('PAGES');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    add('<< /Type /Font /Subtype /Type1 /BaseFont /Symbol >>');
    var kids = [];
    pages.forEach(function (content) {
      var cid = add('<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');
      kids.push(add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pw.toFixed(2) + ' ' + ph.toFixed(2) + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ' + cid + ' 0 R >>'));
    });
    objs[1] = '<< /Type /Pages /Kids [' + kids.map(function (k) { return k + ' 0 R'; }).join(' ') + '] /Count ' + kids.length + ' >>';
    objs.forEach(function (s, i) { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + s + '\nendobj\n'; });
    var xref = out.length;
    out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(function (v) { return ('0000000000' + v).slice(-10) + ' 00000 n \n'; }).join('');
    out += 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R /Info << /Title (Lernen 8 Lernkarten) /Producer (Lernen 8) >> >>\nstartxref\n' + xref + '\n%%EOF\n';
    var bytes = new Uint8Array(out.length);
    for (var q = 0; q < out.length; q++) bytes[q] = out.charCodeAt(q) & 255;
    return bytes;
  }
  window.ImmoPDF = { build: build, hex: hex };
})();
