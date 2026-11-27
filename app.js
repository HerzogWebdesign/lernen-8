/* Lernen 8 – Lern-App für die 8. Klasse. Alles läuft lokal; Fortschritt, Sterne, Notizen und Karteikasten bleiben nur auf diesem Gerät. */
(function () {
  'use strict';
  var AREAS = (window.L8 || []).slice().sort(function (a, b) {
    return ((a.year || 1) - (b.year || 1)) || (a.kind === b.kind ? 0 : a.kind === 'lf' ? -1 : 1) || (a.nr - b.nr);
  });
  var SUBS = [], BYID = {};
  AREAS.forEach(function (a) {
    a.year = a.year || 1;
    BYID[a.id] = { type: 'area', area: a };
    (a.topics || []).forEach(function (t, ti) {
      BYID[t.id] = { type: 'topic', area: a, topic: t };
      (t.subs || []).forEach(function (s, si) {
        var e = { type: 'sub', area: a, topic: t, sub: s, num: (ti + 1) + '.' + (si + 1), idx: SUBS.length };
        BYID[s.id] = e; SUBS.push(e);
      });
    });
  });
  var GLOSSAR = (window.L8_GLOSSAR || []).filter(function (g) { return g && g.term; });
  var FRAGEN = (window.L8_FRAGEN || []).filter(function (q) { return q && q.ref && BYID[q.ref]; });

  /* ---------- Speicher (nur lokal auf dem Gerät) ---------- */
  var KEY = 'lernen-8-v1';
  var S = { done: {}, star: {}, notes: {}, box: {}, qs: {}, hl: {}, bag: {}, days: {}, stars: 0, exams: {}, tests: [] };
  try {
    var raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw) S = { done: raw.done || {}, star: raw.star || {}, notes: raw.notes || {}, box: raw.box || {}, qs: raw.qs || {}, hl: raw.hl || {}, bag: raw.bag || {}, days: raw.days || {}, stars: raw.stars || 0, exams: raw.exams || {}, tests: raw.tests || [] };
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function isDone(id) { return !!S.done[id]; }
  function setDone(id, v) { if (v) S.done[id] = 1; else delete S.done[id]; save(); }
  function isStar(id) { return !!S.star[id]; }
  function setStar(id, v) { if (v) S.star[id] = Date.now(); else delete S.star[id]; save(); }
  /* Notizen: je Karte eine Liste von Notizzetteln mit Datum; auf die Karte nur, wenn gewünscht */
  function notesOf(id) {
    var n = S.notes[id];
    if (!n) return [];
    if (typeof n === 'string') { n = [{ id: 'n' + Date.now(), text: n, created: Date.now(), onCard: false }]; S.notes[id] = n; }
    return n;
  }
  function notesText(id, cardOnly) { return notesOf(id).filter(function (x) { return x.text && (!cardOnly || x.onCard); }).map(function (x) { return x.text; }).join(' · '); }
  function fmtDate(t) { var d = new Date(t); function z(v) { return (v < 10 ? '0' : '') + v; } return z(d.getDate()) + '.' + z(d.getMonth() + 1) + '.' + d.getFullYear() + ', ' + z(d.getHours()) + ':' + z(d.getMinutes()) + ' Uhr'; }

  /* ---------- Hilfen ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }
  function plain(s) { return String(s == null ? '' : s).replace(/\*\*/g, ''); }
  function $(sel) { return document.querySelector(sel); }
  var main = $('#main');
  var DAY = 864e5, INTERVAL = [0, 0, 1, 3, 7, 14, 30]; // Stufe 1..6 → Tage bis zur nächsten Abfrage (KONZEPT.md B)
  var MAXF = 6, SICHER = 4, STUFEN = [1, 2, 3, 4, 5, 6]; // ab Stufe 4 (7-Tage-Abstand) gilt eine Karte als sicher

  function calcHtml(c) {
    var h = (c.title ? '<div class="calc-title">' + md(c.title) + '</div>' : '') + '<table class="calc">';
    (c.rows || []).forEach(function (r) {
      h += '<tr' + (r.t ? ' class="' + esc(r.t) + '"' : '') + '><td class="op">' + esc(r.op || '') + '</td><td>' + md(r.label) +
        '</td><td class="f">' + md(r.f || '') + '</td><td class="n">' + md(r.n || '') + '</td></tr>';
    });
    return h + '</table>';
  }
  function rulesHtml(rules) {
    var h = '<table class="rules">';
    rules.forEach(function (r) {
      var vals = r[1] || [];
      vals.forEach(function (v, i) {
        h += '<tr' + (i === 0 ? ' class="grp"' : '') + '>' + (i === 0 ? '<th rowspan="' + vals.length + '">' + md(r[0]) + '</th>' : '') + '<td>' + md(v) + '</td></tr>';
      });
    });
    return h + '</table>';
  }
  function blockHtml(b) {
    if (b.p != null) return '<p>' + md(b.p) + '</p>';
    if (b.h != null) return '<h3>' + md(b.h) + '</h3>';
    if (b.ul) return '<ul>' + b.ul.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ul>';
    if (b.rules) return rulesHtml(b.rules);
    if (b.calc) return '<div class="example">' + calcHtml(b.calc) + '</div>';
    if (b.ex != null) return '<div class="example"><b class="lbl">Beispiel:</b> ' + md(b.ex) + '</div>';
    if (b.note != null) return '<div class="note">' + md(b.note) + '</div>';
    if (b.warn != null) return '<div class="warn">' + md(b.warn) + '</div>';
    return '';
  }
  function cardBody(e) {
    var c = e.sub.card || {}, h = '';
    if (c.bullets) h += '<ul>' + c.bullets.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ul>';
    if (c.rules) h += rulesHtml(c.rules);
    if (c.calc) h += calcHtml(c.calc);
    var cn = e.__noNote ? '' : notesText(e.sub.id, true);
    if (cn) h += '<div class="k-note"><b>Notiz:</b> ' + esc(cn) + '</div>';
    if (c.merke) h += '<div class="k-merk">' + md(/^merke/i.test(c.merke) ? c.merke : 'Merke: ' + c.merke) + '</div>';
    if (c.quelle) h += '<div class="k-foot">Quelle: ' + esc(c.quelle) + '</div>';
    return h;
  }
  function cardHead(e) {
    var a = e.area;
    return '<div class="k-head"><span>' + esc(a.short || a.title) + '</span><span>' + esc(e.num) + '</span></div>' +
      '<h4>' + md((e.sub.card && e.sub.card.title) || e.sub.title) + '</h4>';
  }
  function accentStyle(a) { return a && a.color ? ' style="--card-accent:' + esc(a.color) + '"' : ''; }
  function cardHtml(e, noNote) { if (noNote === true) e = Object.assign({}, e, { __noNote: true }); return '<div class="card" data-card="' + esc(e.sub.id) + '"' + accentStyle(e.area) + '>' + cardHead(e) + cardBody(e) + '</div>'; }
  function frontHtml(e) { var c = e.sub.card || {}; return '<p class="frage">' + md(cardFrage(e)) + '</p>' + (c.formel ? '<p class="formel">' + md(c.formel) + '</p>' : ''); }
  function cardFrage(e) { var c = e.sub.card || {}; return c.frage || ('Was weißt du über „' + plain(c.title || e.sub.title) + '“?'); }
  function areaLabel(a) { return a.kind === 'lf' ? 'Lernfeld ' + a.nr : 'Fach'; }
  function areaStats(a) {
    var n = 0, d = 0;
    a.topics.forEach(function (t) { t.subs.forEach(function (s) { n++; if (isDone(s.id)) d++; }); });
    return { n: n, d: d };
  }
  function marks(id) {
    return (isStar(id) ? '<span class="star on" aria-label="auf dem Merkzettel">★</span>' : '') +
      '<span class="check' + (isDone(id) ? ' on' : '') + '" aria-label="' + (isDone(id) ? 'gelernt' : 'offen') + '"></span>';
  }
  function topicsHtml(a, current) {
    return a.topics.map(function (t, ti) {
      return '<section class="topic"><h2>' + (ti + 1) + '. ' + md(t.title) + '</h2><ol>' +
        t.subs.map(function (s) {
          var e = BYID[s.id];
          return '<li><a href="#/s/' + esc(s.id) + '"' + (s.id === current ? ' aria-current="page"' : '') + '>' +
            '<span class="num">' + e.num + '</span><span class="ttl">' + md(s.title) + '</span>' + marks(s.id) + '</a></li>';
        }).join('') + '</ol></section>';
    }).join('');
  }
  function subLink(e, extra) {
    return '<a href="#/s/' + esc(e.sub.id) + '"><div class="rp">' + areaLabel(e.area) + ' · ' + md(e.topic.title) + '</div>' +
      '<div class="rt">' + md(e.sub.title) + '</div>' + (extra || '') + '</a>';
  }
  function setNav(name) {
    document.querySelectorAll('nav.tabs a').forEach(function (a) { a.classList.toggle('on', a.dataset.nav === name); });
  }

  /* ---------- Einstellungen (nur dieses Gerät) ---------- */
  function getPref(k, d) { try { return localStorage.getItem('l8-pref-' + k) || d; } catch (e) { return d; } }
  function setPref(k, v) { try { localStorage.setItem('l8-pref-' + k, v); } catch (e) {} }
  function tileMode() { return getPref('tiles', 'list'); }
  var TBREAK = {}, SQ = {};
  function sqLabel(a) { return a.sq || SQ[a.id] || [a.kind === 'lf' ? 'LF ' + a.nr : plain(a.title).slice(0, 2).toUpperCase(), plain(a.short || a.title).replace(/^LF \d+ · /, '')]; }
  function titleLines(a) { return a.lines || TBREAK[a.id] || [plain(a.title)]; }
  var THEMES = ['auto', 'light', 'dark'], THEME_LABEL = { auto: '◐', light: '☀', dark: '☾' }, THEME_NAME = { auto: 'Hell/Dunkel: automatisch', light: 'Hell', dark: 'Dunkel' };
  var ACCENTS = [['gruen', '#1f6f5c', 'Grün'], ['blau', '#1f5fa8', 'Blau'], ['lila', '#6b3fa0', 'Lila'], ['beere', '#a8324a', 'Beere'], ['orange', '#a5520e', 'Orange']];
  function applyTheme() {
    var t = getPref('theme', 'auto'), r = document.documentElement, ac = getPref('accent', 'gruen');
    if (ac === 'gruen') r.removeAttribute('data-accent'); else r.setAttribute('data-accent', ac);
    if (t === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t);
    var b = $('#themebtn'); if (b) { b.textContent = THEME_LABEL[t]; b.title = THEME_NAME[t]; b.setAttribute('aria-label', THEME_NAME[t]); }
    var mc = document.querySelector('meta[name=theme-color]'); if (mc) mc.content = (t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches)) ? '#1f252c' : '#1f6f5c';
  }

  /* ---------- Tagesziel, Serie, Sterne (KONZEPT.md D, E) ---------- */
  function z2(v) { return (v < 10 ? '0' : '') + v; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + z2(d.getMonth() + 1) + '-' + z2(d.getDate()); }
  function weekKey(d) { var t = new Date(d.getFullYear(), d.getMonth(), d.getDate()); var wd = (t.getDay() + 6) % 7; t.setDate(t.getDate() - wd); return dayKey(t); }
  function goal() { return Math.max(1, Math.min(6, parseInt(getPref('goal', '2'), 10) || 2)); }
  function roundsToday() { return S.days[dayKey()] || 0; }
  function addStars(n) { S.stars = (S.stars || 0) + n; save(); }
  function logRound(count) { if (count === false) return; var k = dayKey(); S.days[k] = (S.days[k] || 0) + 1; save(); }
  /* Serie: Tage mit mindestens einer Runde. Je Woche (Mo–So) brechen bis zu 2 freie Tage die Serie nicht (Joker). */
  function streak() {
    var keys = Object.keys(S.days).filter(function (k) { return S.days[k] > 0; }).sort();
    if (!keys.length) return { n: 0, joker: 2 };
    var first = keys[0], d = new Date(), n = 0, miss = {};
    if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1); // heute zählt erst, wenn eine Runde geschafft ist
    for (var i = 0; i < 800 && dayKey(d) >= first; i++) {
      if (S.days[dayKey(d)]) n++;
      else { var w = weekKey(d); miss[w] = (miss[w] || 0) + 1; if (miss[w] > 2) break; }
      d.setDate(d.getDate() - 1);
    }
    return { n: n, joker: Math.max(0, 2 - (miss[weekKey(new Date())] || 0)) };
  }
  function todayPanel() {
    var g = goal(), r = roundsToday(), st = streak(), due = dueList(SUBS).length;
    var dots = ''; for (var i = 0; i < Math.max(g, r); i++) dots += '<i class="' + (i < r ? 'on' : '') + '"></i>';
    return '<section class="today"><div class="t-row">' +
      '<div class="t-box"><b>' + Math.min(r, g) + ' / ' + g + '</b><span>Runden heute</span><div class="t-dots" aria-hidden="true">' + dots + '</div></div>' +
      '<div class="t-box"><b>' + st.n + '</b><span>Tage Serie</span><small>' + st.joker + ' Joker diese Woche</small></div>' +
      '<div class="t-box"><b>⭐ ' + (S.stars || 0) + '</b><span>Sterne</span></div></div>' +
      (r >= g ? '<p class="t-msg">Tagesziel geschafft! Mehr geht, muss aber nicht.</p>' : '') +
      '<a class="btn primary big" href="#/runde">' + (r ? 'Noch eine Runde' : 'Runde starten') + ' · 5 Minuten</a>' +
      rewardLine() + '<p class="muted t-sub">' + (due ? due + ' Karten sind heute dran. Eine Runde = höchstens 10 Karten.' : 'Heute ist nichts fällig. Eine Runde wiederholt trotzdem.') + '</p></section>';
  }

  /* ---------- Startseite ---------- */
  function viewHome() {
    setNav('start'); document.title = 'Lernen 8';
    var all = SUBS.length, d = SUBS.filter(function (e) { return isDone(e.sub.id); }).length;
    var stars = Object.keys(S.star).filter(function (id) { return BYID[id]; }).length;
    var due = dueList(SUBS).length;
    var tile = function (a) {
      var st = areaStats(a), pct = st.n ? Math.round(st.d * 100 / st.n) : 0;
      return '<a class="tile"' + (a.color ? ' style="border-top:4px solid ' + esc(a.color) + '"' : '') + ' href="#/b/' + esc(a.id) + '"><div class="nr">' + esc(a.icon || '') + ' Fach</div><div class="t">' + esc(plain(a.title)) + '</div>' +
        '<div class="meta">' + a.topics.length + ' Themen · ' + st.n + ' Karten · ' + st.d + ' sicher</div>' +
        '<div class="progress"><i style="width:' + pct + '%"></i></div></a>';
    };
    var qb = function (href, label, num) { return '<a class="qbtn" href="' + href + '"><b>' + label + '</b><small>' + num + '</small></a>'; };
    var html = '<div class="content" style="max-width:none">' +
      '<h1 class="home-h1">8. Klasse<span>Regionale Schule · Mecklenburg-Vorpommern</span></h1>' +
      examBanner() + todayPanel() +
      '<p class="lead">' + all + ' Lernkarten · ' + d + ' sicher · ' + stars + ' auf dem Merkzettel.</p>' +
      '<div class="quickgrid">' + qb('#/abfragen', 'Karteikasten', due + ' fällig') + qb('#/pruefung', 'Üben', FRAGEN.length + ' Aufgaben') +
      qb('#/merken', 'Merkzettel', stars + ' Karten') + qb('#/arbeit', 'Klassenarbeiten', exams().length + ' geplant') + qb('#/plan', 'Stundenplan', 'Mo–Fr') + qb('#/kalender', 'Termine', (function (n) { return n + (n === 1 ? ' Eintrag' : ' Einträge'); })(window.ImmoPlan ? window.ImmoPlan.data().cal.length : 0)) +
      (GLOSSAR.length ? qb('#/az', 'A–Z', GLOSSAR.length + ' Begriffe') : '') + qb('#/eltern', 'Elternblick', 'mit Zahl') + (window.L8Sync && L8Sync.configured() ? qb('#/konto', 'Online', L8Sync.statusText()) : '') + '</div>' +
      (window.ImmoPlan ? window.ImmoPlan.nextHtml() : '') +
      '<div class="section-title">Fächer</div><div class="tiles">' + AREAS.map(tile).join('') + '</div>' +
      '<div class="section-title">Gut zu wissen</div><div class="hint">Grundlage sind die Rahmenpläne des Landes Mecklenburg-Vorpommern für die Regionale Schule, Klasse 8. Deine Schule kann Reihenfolge und Themen anders verteilen – Stellen mit ⚠ zeigen das.</div>' +
      '<div class="section-title">Tagesziel</div><div class="hint"><label>Runden pro Tag: <select id="goalsel" class="sel" style="width:auto;display:inline-block">' +
      [1, 2, 3, 4].map(function (n) { return '<option' + (n === goal() ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label> · eine Runde dauert etwa 5 Minuten.</div>' +
      '<div class="section-title">Deine Daten</div><div class="hint">Fortschritt, Sterne, Notizen, Stundenplan und Termine bleiben nur auf diesem Gerät. Für ein neues Gerät oder als Sicherung:' +
      '<div class="actions"><button class="btn" id="exp">Sicherung speichern</button><label class="btn" for="imp">Sicherung laden</label><input type="file" id="imp" accept=".json,application/json" hidden></div></div>' +
      '<div class="section-title">Farbe</div>' + '<div class="colors" role="group" aria-label="Farbe">' + ACCENTS.map(function (c) {
        return '<button data-accent="' + c[0] + '" style="background:' + c[1] + '" aria-label="' + c[2] + '" title="' + c[2] + '"' + (getPref('accent', 'gruen') === c[0] ? ' class="on" aria-pressed="true"' : '') + '></button>';
      }).join('') + '</div>' + '</div>';
    main.innerHTML = html;
    $('#goalsel').addEventListener('change', function (ev) { setPref('goal', ev.target.value); viewHome(); });
    main.querySelectorAll('.colors button').forEach(function (b) { b.addEventListener('click', function () { setPref('accent', b.dataset.accent); applyTheme(); viewHome(); }); });
    $('#exp').addEventListener('click', function () {
      var blob = new Blob([JSON.stringify({ app: 'lernen-8', v: 1, saved: new Date().toISOString(), data: S, plan: window.ImmoPlan ? window.ImmoPlan.data() : null }, null, 1)], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lernen-8-sicherung.json';
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    $('#imp').addEventListener('change', function (ev) {
      var f = ev.target.files[0]; if (!f) return;
      f.text().then(function (t) {
        var j = JSON.parse(t); if (!j || j.app !== 'lernen-8' || !j.data) throw new Error('x');
        if (!confirm('Sicherung laden? Der jetzige Stand auf diesem Gerät wird ersetzt.')) return;
        var x = j.data; S = { done: x.done || {}, star: x.star || {}, notes: x.notes || {}, box: x.box || {}, qs: x.qs || {}, hl: x.hl || {}, bag: x.bag || {}, days: x.days || {}, stars: x.stars || 0, exams: x.exams || {}, tests: x.tests || [] }; save(); if (j.plan && window.ImmoPlan) window.ImmoPlan.restore(j.plan); viewHome();
      }).catch(function () { alert('Diese Datei ist keine Sicherung von Lernen 8.'); });
    });
  }

  function viewArea(id) {
    var a = BYID[id] && BYID[id].area; if (!a) return viewHome();
    setNav('start');
    var st = areaStats(a);
    document.title = a.title + ' – Lernen 8';
    main.innerHTML = '<div class="content">' +
      '<div class="crumb"><a href="#/">Start</a> › Fach</div>' +
      '<h1>' + titleLines(a).map(esc).join('<br>') + '</h1>' +
      '<p class="lead">' + md(a.intro) + '<br><small>' + esc(a.hours || '') + (a.hours ? ' · ' : '') + st.d + ' von ' + st.n + ' sicher</small></p>' +
      topicsHtml(a) +
      '<div class="actions"><a class="btn primary" href="#/runde?b=' + esc(a.id) + '">Runde nur mit diesem Fach</a><a class="btn" href="#/abfragen?b=' + esc(a.id) + '">Karteikasten</a><a class="btn" href="#/pruefung?b=' + esc(a.id) + '">Wissen prüfen</a><a class="btn" href="#/druck?b=' + esc(a.id) + '">Karten drucken</a></div>' +
      '<p class="src">Quelle: ' + esc(a.source) + '</p></div>';
  }

  function viewSub(id) {
    var e = BYID[id]; if (!e || e.type !== 'sub') return viewHome();
    setNav('start');
    var s = e.sub, a = e.area, prev = SUBS[e.idx - 1], next = SUBS[e.idx + 1];
    if (prev && prev.area !== a) prev = null; if (next && next.area !== a) next = null;
    document.title = s.title + ' – Lernen 8';
    var subCtx = (a.short || a.title) + ' · ' + e.num + ' ' + plain(s.title) + ' [' + s.id + ']';
    main.innerHTML = '<div class="layout with-side"><nav class="side" aria-label="Themen">' + topicsHtml(a, s.id) + '</nav>' +
      '<div class="content">' +
      '<div class="crumb"><a href="#/b/' + esc(a.id) + '">' + areaLabel(a) + ' · ' + md(a.title) + '</a> › ' + md(e.topic.title) + '</div>' +
      '<article class="sub"><div class="sub-head"><h1>' + md(s.title) + '</h1>' +
      '<div class="subtools">' + starBtnHtml(s.id) + markBtnHtml() + '</div></div>' +
      s.content.map(blockHtml).join('') +
      '<div class="essenz-label"><span>Essenz · Lernkarte</span><div class="cardtools">' + starBtnHtml(s.id) + markBtnHtml() + bagBtnHtml(s.id) +
      '<label class="done"><input type="checkbox" id="donebox"' + (isDone(s.id) ? ' checked' : '') + '> gelernt</label></div></div>' +
      cardHtml(e) +
      '<section class="notebox" id="notebox"></section>' +
      '<div class="actions"><span class="muted" style="align-self:center">Karte drucken:</span><a class="btn" href="#/druckansicht?ids=' + esc(s.id) + '&m=a6">A6</a><a class="btn" href="#/druckansicht?ids=' + esc(s.id) + '&m=a7">A7 (Spielkarte)</a></div>' +
      '<p class="src">Quelle: ' + md(s.src) + '</p>' + reportHtml(subCtx) + '</article>' +
      '<div class="pager">' + (prev ? '<a href="#/s/' + esc(prev.sub.id) + '"><small>Zurück</small>' + md(prev.sub.title) + '</a>' : '<span style="flex:1"></span>') +
      (next ? '<a class="next" href="#/s/' + esc(next.sub.id) + '"><small>Weiter</small>' + md(next.sub.title) + '</a>' : '<span style="flex:1"></span>') + '</div>' +
      '</div></div>';
    function refreshSide() { var li = document.querySelector('.side a[href="#/s/' + s.id + '"]'); if (li) { li.querySelectorAll('.star,.check').forEach(function (x) { x.remove(); }); li.insertAdjacentHTML('beforeend', marks(s.id)); } }
    $('#donebox').addEventListener('change', function (ev) { setDone(s.id, ev.target.checked); refreshSide(); });
    main.querySelectorAll('.js-bag').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = !inBag(s.id); setBag(s.id, v);
        main.querySelectorAll('.js-bag').forEach(function (x) { x.classList.toggle('on', v); x.setAttribute('aria-pressed', v); x.textContent = v ? '🖨 In der Mappe' : '🖨 Druckmappe'; });
      });
    });
    main.querySelectorAll('.js-star').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = !isStar(s.id); setStar(s.id, v);
        main.querySelectorAll('.js-star').forEach(function (x) { x.classList.toggle('on', v); x.setAttribute('aria-pressed', v); x.textContent = v ? '★ Gemerkt' : '☆ Merken'; });
        refreshSide();
      });
    });
    function renderNotes(openNew) {
      var list = notesOf(s.id), box = $('#notebox');
      box.innerHTML = '<div class="nb-head"><h3>Meine Notizen</h3><button class="btn" id="nb-new" type="button">+ Neue Notiz</button></div>' +
        (list.length || openNew ? '' : '<p class="muted nb-empty">Noch keine Notiz. Tippe auf „+ Neue Notiz“.</p>') +
        list.map(function (n, i) {
          return '<div class="nz" data-i="' + i + '"><div class="nz-date">' + fmtDate(n.created) + (n.edited ? ' · bearbeitet ' + fmtDate(n.edited) : '') + '</div>' +
            '<textarea rows="3" aria-label="Notiz vom ' + fmtDate(n.created) + '">' + esc(n.text) + '</textarea>' +
            '<div class="nz-bar"><label class="nz-card"><input type="checkbox"' + (n.onCard ? ' checked' : '') + '> auf die Karte</label>' +
            '<span class="nz-ok" aria-live="polite"></span><button class="btn nz-del" type="button">Löschen</button><button class="btn primary nz-save" type="button">Speichern</button></div></div>';
        }).join('') +
        (openNew ? '<div class="nz nz-newbox"><div class="nz-date">Neu · ' + fmtDate(Date.now()) + '</div><textarea rows="3" id="nb-text" placeholder="z. B. was die Lehrkraft dazu gesagt hat …"></textarea>' +
          '<div class="nz-bar"><label class="nz-card"><input type="checkbox" id="nb-card"> auf die Karte</label><button class="btn" id="nb-cancel" type="button">Abbrechen</button><button class="btn primary" id="nb-save" type="button">Speichern</button></div></div>' : '');
      function refreshCard() { var cd = main.querySelector('.card[data-card="' + s.id + '"]'); if (cd) { cd.outerHTML = cardHtml(e); applyCardMarks(main.querySelector('article.sub')); } }
      $('#nb-new').addEventListener('click', function () { renderNotes(true); var t = $('#nb-text'); if (t) t.focus(); });
      if (openNew) {
        $('#nb-cancel').addEventListener('click', function () { renderNotes(false); });
        $('#nb-save').addEventListener('click', function () {
          var t = $('#nb-text').value.trim(); if (!t) { $('#nb-text').focus(); return; }
          var arr = notesOf(s.id).slice(); arr.push({ id: 'n' + Date.now(), text: t, created: Date.now(), onCard: $('#nb-card').checked });
          S.notes[s.id] = arr; save(); renderNotes(false); refreshCard();
        });
      }
      box.querySelectorAll('.nz[data-i]').forEach(function (el) {
        var i = +el.dataset.i, ta = el.querySelector('textarea'), cb = el.querySelector('.nz-card input'), ok = el.querySelector('.nz-ok');
        ta.addEventListener('input', function () { ok.textContent = 'nicht gespeichert'; ok.className = 'nz-ok warn-t'; });
        cb.addEventListener('change', function () { ok.textContent = 'nicht gespeichert'; ok.className = 'nz-ok warn-t'; });
        el.querySelector('.nz-save').addEventListener('click', function () {
          var arr = notesOf(s.id), n = arr[i]; if (!n) return;
          var t = ta.value.trim();
          if (!t) { if (!confirm('Die Notiz ist leer. Löschen?')) return; arr.splice(i, 1); }
          else { if (t !== n.text) n.edited = Date.now(); n.text = t; n.onCard = cb.checked; }
          if (arr.length) S.notes[s.id] = arr; else delete S.notes[s.id];
          save(); renderNotes(false); refreshCard();
          var again = box.querySelector('.nz[data-i="' + i + '"] .nz-ok'); if (again) { again.textContent = '✓ gespeichert'; again.className = 'nz-ok'; }
        });
        el.querySelector('.nz-del').addEventListener('click', function () {
          if (!confirm('Diese Notiz löschen?')) return;
          var arr = notesOf(s.id); arr.splice(i, 1); if (arr.length) S.notes[s.id] = arr; else delete S.notes[s.id];
          save(); renderNotes(false); refreshCard();
        });
      });
    }
    renderNotes(false);
    bindReport(subCtx);
    document.body.classList.remove('marking'); setupMarker(s.id);
    var cur = document.querySelector('.side [aria-current="page"]'); if (cur) cur.scrollIntoView({ block: 'center' });
  }


  /* ---------- Fehler melden (ohne Server: per WhatsApp oder E-Mail) ---------- */
  var APP_VERSION = 'v21';
  function reportHtml(ctx) {
    return '<details class="report"><summary>Fehler gefunden?</summary><div class="report-in">' +
      '<label for="rep-txt">Was stimmt nicht?</label><textarea id="rep-txt" rows="3" placeholder="z. B. Zahl falsch, Satz unklar, Paragraf stimmt nicht …"></textarea>' +
      '<div class="actions"><button class="btn primary" id="rep-wa" type="button">Per WhatsApp senden</button><button class="btn" id="rep-mail" type="button">Per E-Mail</button></div>' +
      '<small class="muted">Es wird nur dein Text und die Stelle in der App gesendet (' + esc(ctx) + ').</small></div></details>';
  }
  function bindReport(ctx) {
    var msg = function () { var t = ($('#rep-txt') || {}).value || ''; return 'Fehler in Lernen 8 (' + APP_VERSION + ')\nStelle: ' + ctx + '\nProblem: ' + (t.trim() || '–'); };
    var wa = $('#rep-wa'), ml = $('#rep-mail');
    if (wa) wa.addEventListener('click', function () { window.open('https://wa.me/?text=' + encodeURIComponent(msg()), '_blank', 'noopener'); });
    if (ml) ml.addEventListener('click', function () { location.href = 'mailto:?subject=' + encodeURIComponent('Fehler in Lernen 8') + '&body=' + encodeURIComponent(msg()); });
  }


  /* ---------- Textmarker in mehreren Farben (nur dieses Gerät) ---------- */
  var CARD_MARK = 'li, tr, .k-merk, .k-note';
  var HL_COLORS = [['gelb', '#ffe066', 'Gelb'], ['gruen', '#9fe38a', 'Grün'], ['rosa', '#ffaed0', 'Rosa'], ['blau', '#9fd2ff', 'Blau']];
  function hlKey(v) { return v === 1 || !v ? 'gelb' : v; }
  function starBtnHtml(id) { return '<button class="starbtn js-star' + (isStar(id) ? ' on' : '') + '" aria-pressed="' + isStar(id) + '">' + (isStar(id) ? '★ Gemerkt' : '☆ Merken') + '</button>'; }
  function markBtnHtml() { return '<button class="starbtn markbtn js-mark" aria-pressed="false">🖍 Markieren</button>'; }
  function setHl(el, v) {
    HL_COLORS.forEach(function (c) { el.classList.remove('hl-' + c[0]); });
    el.classList.toggle('hl', !!v); if (v) el.classList.add('hl-' + hlKey(v));
  }
  function contentMarkables(art) {
    return Array.prototype.filter.call(art.querySelectorAll('p, li, tr, .note, .warn'), function (el) {
      return !el.closest('.card') && !el.closest('.notebox') && !el.closest('details') && !el.classList.contains('src');
    });
  }
  function applyCardMarks(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('.card[data-card]'), function (card) {
      var m = S.hl[card.dataset.card] || {};
      Array.prototype.forEach.call(card.querySelectorAll(CARD_MARK), function (el, i) { setHl(el, m['k:' + i]); });
    });
  }
  function markCount(id) { return Object.keys(S.hl[id] || {}).length; }
  function setupMarker(id) {
    var art = main.querySelector('article.sub'); if (!art) return;
    var cm = contentMarkables(art), bar = $('#markbar');
    function color() { return getPref('hlcolor', 'gelb'); }
    function paint() {
      var m = S.hl[id] || {};
      cm.forEach(function (el, i) { setHl(el, m['c:' + i]); });
      applyCardMarks(art);
      var clr = $('#markclear'); if (clr) clr.hidden = !markCount(id);
    }
    function renderBar() {
      bar.innerHTML = '<span class="mb-t">Farbe:</span>' + HL_COLORS.map(function (c) {
        return '<button class="mb-c' + (color() === c[0] ? ' on' : '') + '" data-c="' + c[0] + '" style="background:' + c[1] + '" aria-label="' + c[2] + '" title="' + c[2] + '"></button>';
      }).join('') + '<button class="mb-c mb-erase' + (color() === 'weg' ? ' on' : '') + '" data-c="weg" aria-label="Radierer: Markierung entfernen" title="Radierer">⌫</button>' +
        '<button class="mb-x" id="markclear"' + (markCount(id) ? '' : ' hidden') + '>Alle löschen</button><button class="mb-done" id="markdone">Fertig</button>';
      bar.querySelectorAll('.mb-c').forEach(function (b) { b.addEventListener('click', function () { setPref('hlcolor', b.dataset.c); renderBar(); }); });
      $('#markclear').addEventListener('click', function () { if (confirm('Alle Markierungen auf dieser Seite löschen?')) { delete S.hl[id]; save(); paint(); } });
      $('#markdone').addEventListener('click', function () { setMode(false); });
    }
    function setMode(on) {
      document.body.classList.toggle('marking', on); bar.hidden = !on;
      main.querySelectorAll('.js-mark').forEach(function (b) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.textContent = on ? '🖍 Fertig' : '🖍 Markieren'; });
      if (on) renderBar();
    }
    paint(); setMode(false);
    main.querySelectorAll('.js-mark').forEach(function (b) { b.addEventListener('click', function () { setMode(!document.body.classList.contains('marking')); }); });
    art.addEventListener('click', function (ev) {
      if (!document.body.classList.contains('marking')) return;
      var el = ev.target.closest('p, li, tr, .note, .warn, .k-merk, .k-note'); if (!el || !art.contains(el) || ev.target.closest('button, label, textarea, details')) return;
      var key = null, card = el.closest('.card');
      if (card) { var i = Array.prototype.indexOf.call(card.querySelectorAll(CARD_MARK), el); if (i >= 0) key = 'k:' + i; }
      else { var j = cm.indexOf(el); if (j >= 0) key = 'c:' + j; }
      if (!key) return;
      ev.preventDefault();
      var m = S.hl[id] || (S.hl[id] = {}), c = color();
      if (c === 'weg' || (m[key] && hlKey(m[key]) === c)) delete m[key]; else m[key] = c;
      if (!Object.keys(m).length) delete S.hl[id];
      save(); paint();
    });
  }

  /* ---------- Merkzettel ---------- */
  function viewStars() {
    setNav('merken'); document.title = 'Merkzettel – Lernen 8';
    var list = SUBS.filter(function (e) { return isStar(e.sub.id); });
    var withNotes = SUBS.filter(function (e) { return notesText(e.sub.id) && !isStar(e.sub.id); });
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Merkzettel</div><h1>Merkzettel</h1>' +
      '<p class="lead">' + (list.length ? list.length + (list.length === 1 ? ' Karte' : ' Karten') + ' zum Nochmal-Ansehen.' : 'Noch leer. Tippe bei einer Karte auf „☆ Merken“, dann steht sie hier.') + '</p>' +
      (list.length ? '<div class="actions" style="margin-bottom:12px"><a class="btn primary" href="#/abfragen?b=star">Merkzettel abfragen</a><a class="btn" href="#/druck?b=star">Merkzettel drucken</a></div>' : '') +
      '<div class="results">' + list.map(function (e) {
        return '<div class="row">' + subLink(e, notesText(e.sub.id) ? '<div class="rs">Notiz: ' + esc(notesText(e.sub.id).slice(0, 140)) + '</div>' : '') +
          '<button class="iconbtn unstar" data-id="' + esc(e.sub.id) + '" aria-label="Vom Merkzettel nehmen">✕</button></div>';
      }).join('') + '</div>' +
      (withNotes.length ? '<div class="section-title">Karten mit Notiz</div><div class="results">' + withNotes.map(function (e) {
        return subLink(e, '<div class="rs">Notiz: ' + esc(notesText(e.sub.id).slice(0, 140)) + '</div>');
      }).join('') + '</div>' : '') + '</div>';
    var s2b = $('#star2bag'); if (s2b) s2b.addEventListener('click', function () { list.forEach(function (e) { if (!inBag(e.sub.id)) S.bag[e.sub.id] = Date.now(); }); save(); s2b.textContent = '✓ in der Druckmappe'; });
    main.querySelectorAll('.unstar').forEach(function (b) { b.addEventListener('click', function () { setStar(b.dataset.id, false); viewStars(); }); });
  }

  /* ---------- Runde: 5 Minuten oder 10 Karten (KONZEPT.md A, B, C, E, G) ---------- */
  var ROUND_MS = 5 * 60e3, ROUND_N = 10, timers = [];
  function stopTimers() { timers.forEach(function (t) { clearInterval(t); clearTimeout(t); }); timers = []; }
  var CAN_SPEAK = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  function speak(text, lang) {
    if (!CAN_SPEAK) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(plain(text)); u.lang = lang === 'en' ? 'en-GB' : 'de-DE'; u.rate = 0.95; speechSynthesis.speak(u); } catch (x) {}
  }
  function speakBtn(id) { return CAN_SPEAK ? '<button class="btn speak" id="' + id + '" type="button" aria-label="Vorlesen">🔊 Vorlesen</button>' : ''; }
  function cardSpeech(e) {
    var c = e.sub.card || {}, t = [c.title || e.sub.title];
    (c.bullets || []).forEach(function (x) { t.push(x); });
    (c.rules || []).forEach(function (r) { t.push(r[0] + ': ' + r[1].join(', ')); });
    if (c.merke) t.push(c.merke);
    return t.join('. ').replace(/→/g, ' ergibt ').replace(/·/g, ' mal ').replace(/²/g, ' Quadrat ').replace(/³/g, ' hoch drei ');
  }
  var MOVES = ['10 Hampelmänner', '1 Glas Wasser trinken', 'einmal ums Haus oder durch die Wohnung gehen', '20 Sekunden auf einem Bein stehen, dann das andere', '5 Kniebeugen und ganz lang strecken', 'Fenster auf und 5 tiefe Atemzüge'];
  var round = null;
  function roundPool(b) {
    var list = scopeList(b), isExam = String(b).indexOf('exam:') === 0, now = Date.now();
    // Klassenarbeit: alles, was noch nicht sicher oder fällig ist; sonst nur Fälliges, Karten naher Klassenarbeiten zuerst
    var due = isExam ? list.filter(function (e) { return cardState(e.sub.id) !== 'sicher' || boxOf(e.sub.id).due <= now; }) : dueList(list);
    var pri = {}; if (!isExam) exams().filter(function (x) { return daysUntil(x.date) <= 7; }).forEach(function (x) { examSubs(x).forEach(function (e) { pri[e.sub.id] = 1; }); });
    var pick = (due.length ? due : list).slice().sort(function (x, y) { return ((pri[y.sub.id] ? 1 : 0) - (pri[x.sub.id] ? 1 : 0)) || boxOf(x.sub.id).f - boxOf(y.sub.id).f || Math.random() - 0.5; });
    return pick.slice(0, ROUND_N).map(function (e) { return e.sub.id; });
  }
  function viewRound(params) {
    setNav('runde'); document.title = 'Runde – Lernen 8';
    var b = params.b || 'all';
    if (!params.go) {
      round = null;
      var n = roundPool(b).length, due = dueList(scopeList(b)).length;
      main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Runde</div><h1>Eine Runde</h1>' +
        '<ol class="steps"><li><b>Frage lesen</b> und im Kopf antworten (oder laut sagen).</li><li><b>Umdrehen</b> und vergleichen.</li><li>Ehrlich sagen: <b>Wusste ich · Halb · Noch nicht</b>. Alles ist okay – jede Karte bringt einen Stern.</li></ol>' +
        '<fieldset><legend>Welches Fach?</legend><select id="scope" class="sel"><option value="all">Alle Fächer</option>' +
        (String(b).indexOf('exam:') === 0 ? '<option value="' + esc(b) + '" selected>' + esc(scopeName(b)) + '</option>' : '') + AREAS.map(function (a) { return '<option value="' + a.id + '"' + (b === a.id ? ' selected' : '') + '>' + esc(plain(a.title)) + '</option>'; }).join('') + '</select></fieldset>' +
        '<p class="count">' + (due ? due + ' Karten sind fällig.' : 'Heute ist nichts fällig – wir wiederholen die unsichersten Karten.') + ' Diese Runde: ' + n + ' Karten, höchstens 5 Minuten.</p>' +
        (n ? '<div class="actions"><a class="btn primary big" href="#/runde?b=' + b + '&go=1&n=' + Date.now() + '">Los geht’s</a></div>' : '<p class="hint">In diesem Fach gibt es noch keine Karten.</p>') + '</div>';
      $('#scope').addEventListener('change', function (ev) { location.hash = '#/runde?b=' + ev.target.value; });
      return;
    }
    if (!round || round.key !== params.n) round = { key: params.n, b: b, queue: roundPool(b), start: Date.now(), done: 0, ok: 0, half: 0, no: 0, repeated: {} };
    roundCard();
  }
  function timeLeft() { return Math.max(0, ROUND_MS - (Date.now() - round.start)); }
  function roundCard() {
    stopTimers();
    if (!round.queue.length || timeLeft() <= 0) return roundEnd();
    var e = BYID[round.queue[0]], bx = boxOf(e.sub.id), total = round.done + round.queue.length;
    main.innerHTML = '<div class="content quiz round"><div class="qbar"><span>Karte ' + (round.done + 1) + ' von ' + total + ' · Stufe ' + bx.f + '</span><a class="linkbtn" href="#/">Pause machen</a></div>' +
      '<div class="timer" aria-label="Zeit der Runde"><i id="tbar"></i></div>' +
      '<div class="card qcard" id="qcard" data-card="' + esc(e.sub.id) + '"' + accentStyle(e.area) + '>' + cardHead(e) +
      '<div class="qfront" id="qfront">' + frontHtml(e) + '<div class="actions">' + speakBtn('sp1') + '<button class="btn primary" id="reveal">Umdrehen</button></div></div>' +
      '<div class="qback" id="qback" hidden>' + cardBody(e) + '<div class="actions">' + speakBtn('sp2') + '</div></div></div>' +
      '<div class="qactions three" id="qact" hidden><button class="btn r-no" data-r="no">Noch nicht</button><button class="btn r-half" data-r="half">Halb</button><button class="btn primary r-ok" data-r="ok">Wusste ich</button></div>' +
      '<p class="src"><a href="#/s/' + esc(e.sub.id) + '">Erklärung ansehen</a></p></div>';
    applyCardMarks(main);
    var bar = $('#tbar');
    function tick() { var p = timeLeft() / ROUND_MS; bar.style.width = (p * 100).toFixed(1) + '%'; bar.classList.toggle('low', p < 0.2); }
    tick(); timers.push(setInterval(tick, 1000));
    var s1 = $('#sp1'); if (s1) s1.addEventListener('click', function () { var c = e.sub.card || {}; speak(cardFrage(e) + (c.formel ? ' ' + c.formel.replace(/·/g, ' mal ').replace(/²/g, ' Quadrat ') : '')); });
    var s2 = $('#sp2'); if (s2) s2.addEventListener('click', function () { speak(cardSpeech(e), (e.sub.card || {}).lang); });
    $('#reveal').addEventListener('click', function () { $('#qfront').hidden = true; $('#qback').hidden = false; $('#qact').hidden = false; });
    main.querySelectorAll('#qact button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var r = btn.dataset.r, id = e.sub.id;
        if (window.L8Sync) L8Sync.card(r === 'ok');
        if (r === 'ok') { var f = Math.min(MAXF, bx.f + 1); S.box[id] = { f: f, due: Date.now() + INTERVAL[f] * DAY - 36e5 }; if (f >= SICHER) S.done[id] = 1; round.ok++; }
        else if (r === 'half') { S.box[id] = { f: bx.f, due: Date.now() + DAY - 36e5 }; round.half++; }
        else { S.box[id] = { f: 1, due: Date.now() + DAY - 36e5 }; delete S.done[id]; round.no++; }
        save(); round.done++; round.queue.shift();
        // „Noch nicht“: einmal am Ende der Runde nochmal zeigen, damit die Antwort frisch hängen bleibt
        if (r === 'no' && !round.repeated[id] && round.queue.length < ROUND_N) { round.repeated[id] = 1; round.queue.push(id); }
        roundCard(); window.scrollTo(0, 0);
      });
    });
  }
  function roundEnd() {
    stopTimers();
    if (!round.closed) { round.closed = true; round.stars = round.done + (round.done ? 3 : 0); addStars(round.stars); if (round.done) logRound(); if (window.L8Sync) L8Sync.send(); }
    var g = goal(), r = roundsToday(), st = streak(), move = MOVES[Math.floor(Math.random() * MOVES.length)];
    var more = dueList(scopeList(round.b)).length;
    main.innerHTML = '<div class="content"><h1>' + (round.done ? 'Runde geschafft! ⭐ +' + round.stars : 'Pause') + '</h1>' +
      (round.done ? '<p class="lead">' + round.done + ' Karten: ' + round.ok + '× wusste ich, ' + round.half + '× halb, ' + round.no + '× noch nicht. Die „Noch nicht“-Karten kommen morgen wieder.</p>' : '') +
      '<div class="today"><div class="t-row"><div class="t-box"><b>' + Math.min(r, g) + ' / ' + g + '</b><span>Runden heute</span></div><div class="t-box"><b>' + st.n + '</b><span>Tage Serie</span></div><div class="t-box"><b>⭐ ' + (S.stars || 0) + '</b><span>Sterne</span></div></div>' +
      (r >= g ? '<p class="t-msg">Tagesziel geschafft! 🎉</p>' : '') + '</div>' +
      '<div class="hint pause"><b>Kurze Pause (2 Minuten):</b> ' + esc(move) + '.<div class="timer"><i id="pbar" style="width:100%"></i></div><button class="btn" id="pgo">Pause starten</button> <span id="pmsg" class="muted"></span></div>' +
      '<div class="actions">' + (more ? '<a class="btn primary" href="#/runde?b=' + round.b + '&go=1&n=' + Date.now() + '">Noch eine Runde (' + Math.min(more, ROUND_N) + ' Karten)</a>' : '<a class="btn primary" href="#/runde?b=' + round.b + '&go=1&n=' + Date.now() + '">Noch eine Runde</a>') +
      '<a class="btn" href="#/">Für heute fertig</a></div></div>';
    $('#pgo').addEventListener('click', function (ev) {
      var t0 = Date.now(), btn = ev.currentTarget; btn.disabled = true;
      var iv = setInterval(function () {
        var p = Math.max(0, 1 - (Date.now() - t0) / 120e3); $('#pbar').style.width = (p * 100).toFixed(1) + '%';
        if (p <= 0) { clearInterval(iv); $('#pmsg').textContent = 'Pause vorbei. Bereit für die nächste Runde?'; btn.disabled = false; }
      }, 1000); timers.push(iv);
    });
  }

  /* ---------- Klassenarbeiten (KONZEPT.md H): Termine kommen aus dem Kalender (Art Klassenarbeit/Test/Vokabeltest + Fach) ---------- */
  var EXAM_TYPES = { ka: 'Klassenarbeit', test: 'Test', vok: 'Vokabeltest' };
  function fmtDay(k) { var p = String(k).split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]); return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()] + ', ' + p[2] + '.' + p[1] + '.' + p[0]; }
  function daysUntil(k) { var p = String(k).split('-'), t = new Date(+p[0], +p[1] - 1, +p[2]), n = new Date(); n = new Date(n.getFullYear(), n.getMonth(), n.getDate()); return Math.round((t - n) / DAY); }
  function exams(withPast) {
    var cal = window.ImmoPlan ? window.ImmoPlan.data().cal : [];
    return cal.filter(function (e) { return EXAM_TYPES[e.type] && e.subj && BYID[e.subj] && BYID[e.subj].type === 'area' && (withPast || daysUntil(e.date) >= 0); })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  }
  function examById(id) { return exams(true).filter(function (e) { return e.id === id; })[0]; }
  function examTopics(ex) { var a = BYID[ex.subj].area, sel = (S.exams || {})[ex.id]; return a.topics.filter(function (t) { return !sel || sel.indexOf(t.id) >= 0; }); }
  function examSubs(ex) { var ids = {}; examTopics(ex).forEach(function (t) { t.subs.forEach(function (s) { ids[s.id] = 1; }); }); return SUBS.filter(function (e) { return ids[e.sub.id]; }); }
  function cardState(id) { var b = S.box[id]; if (!b) return 'neu'; return b.f >= SICHER ? 'sicher' : 'wackelig'; }
  function stateCounts(list) { var c = { sicher: 0, wackelig: 0, neu: 0 }; list.forEach(function (e) { c[cardState(e.sub.id)]++; }); return c; }
  function examLabel(ex) { return EXAM_TYPES[ex.type] + ' ' + plain(BYID[ex.subj].area.title); }
  function whenText(d) { return d === 0 ? 'heute' : d === 1 ? 'morgen' : d < 0 ? 'vorbei' : 'in ' + d + ' Tagen'; }
  function stateBar(c) {
    var n = (c.sicher + c.wackelig + c.neu) || 1;
    return '<div class="sbar" aria-hidden="true"><i class="s" style="width:' + (c.sicher * 100 / n).toFixed(1) + '%"></i><i class="w" style="width:' + (c.wackelig * 100 / n).toFixed(1) + '%"></i></div>' +
      '<small class="muted">' + c.sicher + ' sicher · ' + c.wackelig + ' wackelig · ' + c.neu + ' neu</small>';
  }
  function examHint(ex) { var d = daysUntil(ex.date); return d === 3 || d === 1 ? 'Heute ist Mini-Test-Tag: 10 Fragen, etwa 5 Minuten.' : d === 0 ? 'Viel Erfolg heute! Schau dir kurz die wackeligen Karten an.' : ''; }
  function examBanner() {
    var ex = exams().filter(function (e) { return daysUntil(e.date) <= 7; })[0]; if (!ex) return '';
    var h = examHint(ex);
    return '<a class="exam-banner" href="#/arbeit?id=' + esc(ex.id) + '"><b>' + esc(examLabel(ex)) + ' ' + whenText(daysUntil(ex.date)) + '</b><span>' + esc(h || 'Jetzt vorbereiten: Lernrunden und Mini-Test') + '</span></a>';
  }
  function examLi(ex) {
    return '<li><a href="#/arbeit?id=' + esc(ex.id) + '"><b>' + esc(examLabel(ex)) + '</b><small>' + esc(fmtDay(ex.date)) + ' · ' + whenText(daysUntil(ex.date)) + '</small>' + stateBar(stateCounts(examSubs(ex))) + '</a></li>';
  }
  function viewExams(params) {
    setNav(''); document.title = 'Klassenarbeiten – Lernen 8';
    var one = params.id && examById(params.id);
    if (one) return viewExam1(one);
    var list = exams();
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Klassenarbeiten</div><h1>Klassenarbeiten</h1>' +
      '<p class="lead">Trag Klassenarbeiten und Tests mit Fach im Kalender ein. Dann zieht die App die passenden Karten vor und erinnert dich an den Mini-Test 3 Tage und 1 Tag vorher.</p>' +
      '<div class="actions"><a class="btn primary" href="#/kalender">+ Klassenarbeit eintragen</a></div>' +
      (list.length ? '<ul class="exam-list">' + list.map(examLi).join('') + '</ul>'
        : '<p class="hint">Noch keine Klassenarbeit eingetragen. Wähle im Kalender die Art „Klassenarbeit“ oder „Test“ und das Fach.</p>') + '</div>';
  }
  function viewExam1(ex) {
    var a = BYID[ex.subj].area, sel = (S.exams || {})[ex.id], d = daysUntil(ex.date), subs = examSubs(ex), c = stateCounts(subs);
    var todo = c.wackelig + c.neu, perDay = d > 0 ? Math.ceil(todo / d) : todo, h = examHint(ex);
    var wobbly = subs.filter(function (e) { return cardState(e.sub.id) === 'wackelig'; });
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/arbeit">Klassenarbeiten</a> › ' + esc(plain(a.title)) + '</div>' +
      '<h1>' + esc(examLabel(ex)) + '</h1><p class="lead">' + esc(fmtDay(ex.date)) + ' – ' + whenText(d) + '.' + (ex.note ? '<br><small>' + esc(ex.note) + '</small>' : '') + '</p>' +
      (h ? '<p class="t-msg">' + esc(h) + '</p>' : '') +
      '<div class="today">' + stateBar(c) + '<p class="t-sub">' + (todo ? (d > 0 ? 'Plan: etwa ' + perDay + ' Karten pro Tag bis zur Arbeit.' : 'Heute: die wackeligen Karten noch einmal ansehen.') : 'Alle Karten sind sicher. Ein Mini-Test zeigt, ob es hält.') + '</p>' +
      '<div class="actions"><a class="btn primary" href="#/runde?b=exam:' + esc(ex.id) + '&go=1&n=' + Date.now() + '">Lernrunde für diese Arbeit</a><a class="btn" href="#/pruefung?b=exam:' + esc(ex.id) + '&go=1&n=10">Mini-Test (10 Fragen)</a></div></div>' +
      '<div class="section-title">Welche Themen kommen dran?</div><p class="muted" style="font-size:14px;margin-top:0">Frag deine Lehrkraft oder schau ins Heft. Ohne Auswahl gelten alle Themen.</p>' +
      '<ul class="flist">' + a.topics.map(function (t) {
        return '<li><label><input type="checkbox" class="extop" value="' + esc(t.id) + '"' + (!sel || sel.indexOf(t.id) >= 0 ? ' checked' : '') + '><span>' + md(t.title) + ' <small>(' + t.subs.length + ' Karten)</small></span></label></li>';
      }).join('') + '</ul>' +
      (wobbly.length ? '<div class="section-title">Diese Karten wackeln noch</div><div class="results">' + wobbly.map(function (e) { return subLink(e); }).join('') + '</div>' : '') + '</div>';
    main.querySelectorAll('.extop').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var ids = Array.prototype.filter.call(main.querySelectorAll('.extop'), function (x) { return x.checked; }).map(function (x) { return x.value; });
        S.exams = S.exams || {};
        if (!ids.length || ids.length === a.topics.length) delete S.exams[ex.id]; else S.exams[ex.id] = ids;
        save(); viewExam1(ex);
      });
    });
  }

  /* ---------- Elternblick (KONZEPT.md J): einfache Zahlensperre auf diesem Gerät, kein Konto ---------- */
  var parentOpen = false;
  function viewParents() {
    setNav(''); document.title = 'Elternblick – Lernen 8';
    var pin = getPref('pin', '');
    if (!parentOpen) {
      main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Elternblick</div><h1>Elternblick</h1>' +
        '<p class="lead">' + (pin ? 'Bitte die Eltern-Zahl eingeben.' : 'Lege eine Zahl mit 4 bis 8 Ziffern fest. Sie schützt diesen Bereich auf diesem Gerät.') + '</p>' +
        '<form id="pinf" class="pinf"><input id="pin" class="gq" type="password" inputmode="numeric" autocomplete="off" maxlength="8" aria-label="Eltern-Zahl" placeholder="Zahl">' +
        (pin ? '' : '<input id="pin2" class="gq" type="password" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="Zahl wiederholen" aria-label="Zahl wiederholen">') +
        '<button class="btn primary" type="submit">' + (pin ? 'Öffnen' : 'Festlegen') + '</button><p id="pinmsg" class="muted" aria-live="polite"></p></form>' +
        '<p class="muted" style="font-size:13px">Die Zahl ist nur eine einfache Sperre auf diesem Gerät, kein sicherer Passwortschutz.</p></div>';
      $('#pinf').addEventListener('submit', function (ev) {
        ev.preventDefault(); var v = $('#pin').value.trim();
        if (!/^\d{4,8}$/.test(v)) { $('#pinmsg').textContent = 'Bitte 4 bis 8 Ziffern eingeben.'; return; }
        if (!pin) { if ($('#pin2').value.trim() !== v) { $('#pinmsg').textContent = 'Die beiden Zahlen sind verschieden.'; return; } setPref('pin', v); }
        else if (v !== pin) { $('#pinmsg').textContent = 'Die Zahl stimmt nicht.'; $('#pin').value = ''; return; }
        parentOpen = true; viewParents();
      });
      return;
    }
    var now = new Date(), mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() + 6) % 7), week = [], sum = 0, max = goal();
    for (var i = 0; i < 7; i++) { var dd = new Date(mon); dd.setDate(mon.getDate() + i); var r = S.days[dayKey(dd)] || 0; week.push([['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][i], r, dayKey(dd) === dayKey()]); sum += r; max = Math.max(max, r); }
    var st = streak(), ex = exams(), tests = (S.tests || []).slice(-5).reverse();
    var reward = getPref('reward', ''), rgoal = parseInt(getPref('rewardgoal', '0'), 10) || 0;
    var bars = '<div class="wbars">' + week.map(function (w) {
      return '<div class="wb' + (w[2] ? ' heute' : '') + '"><div class="wcol"><i style="height:' + Math.round(w[1] * 100 / max) + '%"></i></div><b>' + w[1] + '</b><span>' + w[0] + '</span></div>';
    }).join('') + '</div>';
    var rows = AREAS.map(function (a) { return '<tr><th>' + esc(plain(a.title)) + '</th><td>' + stateBar(stateCounts(SUBS.filter(function (e) { return e.area === a; }))) + '</td></tr>'; }).join('');
    main.innerHTML = '<div class="content eltern"><div class="crumb"><a href="#/">Start</a> › Elternblick</div><h1>Elternblick</h1>' +
      '<p class="lead">Stand: ' + esc(fmtDay(dayKey())) + '. Alle Zahlen kommen nur von diesem Gerät.</p>' +
      '<div class="section-title">Diese Woche</div><div class="today"><div class="t-row"><div class="t-box"><b>' + sum + '</b><span>Runden</span></div><div class="t-box"><b>' + st.n + '</b><span>Tage Serie</span></div><div class="t-box"><b>⭐ ' + (S.stars || 0) + '</b><span>Sterne</span></div></div>' + bars +
      '<p class="t-sub">Tagesziel: ' + goal() + (goal() === 1 ? ' Runde' : ' Runden') + ' (änderbar auf der Startseite)</p></div>' +
      '<div class="section-title">Nächste Klassenarbeiten</div>' + (ex.length ? '<ul class="exam-list">' + ex.slice(0, 5).map(examLi).join('') + '</ul>' : '<p class="hint">Keine eingetragen. Im <a href="#/kalender">Kalender</a> mit Art „Klassenarbeit“ und Fach eintragen.</p>') +
      '<div class="section-title">Letzte Mini-Tests</div>' + (tests.length ? '<ul class="cal-list mini">' + tests.map(function (t) { return '<li>' + esc(fmtDay(t.d)) + ' · ' + esc(scopeName(t.b)) + ': ' + t.pts + ' von ' + t.n + ' gelöst</li>'; }).join('') + '</ul>' : '<p class="hint">Noch kein Mini-Test gemacht.</p>') +
      '<div class="section-title">Stand je Fach</div><div class="tablewrap"><table class="ftable">' + rows + '</table></div>' +
      '<div class="section-title">Belohnung</div><div class="hint rewardf"><label for="rgoal">Bei so vielen Sternen</label><input id="rgoal" class="gq" inputmode="numeric" value="' + (rgoal || '') + '" placeholder="z. B. 150">' +
      '<label for="rtext">gibt es</label><input id="rtext" class="gq" value="' + esc(reward) + '" placeholder="z. B. einen Kinoabend">' +
      '<div class="actions"><button class="btn" id="rsave" type="button">Speichern</button><span id="rmsg" class="muted" aria-live="polite"></span></div></div>' +
      '<div class="section-title">Mehr</div><div class="actions noprint">' + (window.L8Sync && L8Sync.configured() ? '<a class="btn primary" href="#/eltern-online">Online-Übersicht (alle Geräte)</a>' : '') + '<button class="btn" id="pprint" type="button">Wochenblatt drucken</button><button class="btn" id="pchange" type="button">Eltern-Zahl ändern</button><button class="btn" id="plock" type="button">Sperren</button></div></div>';
    $('#rsave').addEventListener('click', function () { setPref('reward', $('#rtext').value.trim()); setPref('rewardgoal', String(parseInt($('#rgoal').value, 10) || 0)); $('#rmsg').textContent = '✓ gespeichert'; });
    $('#pprint').addEventListener('click', function () { document.body.classList.add('p-eltern'); setTimeout(function () { window.print(); }, 60); });
    $('#pchange').addEventListener('click', function () { setPref('pin', ''); parentOpen = false; viewParents(); });
    $('#plock').addEventListener('click', function () { parentOpen = false; location.hash = '#/'; });
  }
  function rewardLine() {
    var reward = getPref('reward', ''), rgoal = parseInt(getPref('rewardgoal', '0'), 10) || 0;
    if (!reward || !rgoal) return '';
    var left = rgoal - (S.stars || 0);
    return '<p class="t-sub reward">' + (left > 0 ? '🎁 Noch ' + left + ' Sterne bis: ' + esc(reward) : '🎁 Geschafft: ' + esc(reward) + '!') + '</p>';
  }

  /* ---------- Momentaufnahme für die Online-Statistik (sync.js) ---------- */
  if (window.L8Sync) L8Sync.setSnapshot(function () {
    var faecher = AREAS.map(function (a) {
      var r = 0, n = 0; FRAGEN.forEach(function (q) { if (BYID[q.ref].area === a && q.id in S.qs) { n++; r += S.qs[q.id] ? 1 : 0; } });
      return { f: plain(a.title), q: n ? Math.round(r * 100 / n) : 0, n: n };
    }).filter(function (f) { return f.n; });
    var ex = exams()[0], ka = null;
    if (ex) { var l = examSubs(ex), c = stateCounts(l); ka = { t: examLabel(ex), d: ex.date, bereit: l.length ? Math.round(c.sicher * 100 / l.length) : 0 }; }
    return { due: dueList(SUBS).length, streak: streak().n, extra: { faecher: faecher, ka: ka } };
  });

  /* ---------- Karteikasten ---------- */
  function boxOf(id) { return S.box[id] || { f: 1, due: 0 }; }
  function dueList(list) { var now = Date.now(); return list.filter(function (e) { return boxOf(e.sub.id).due <= now; }); }
  function scopeList(b) {
    if (String(b).indexOf('exam:') === 0) { var ex = examById(String(b).slice(5)); return ex ? examSubs(ex) : []; }
    if (b === 'star') return SUBS.filter(function (e) { return isStar(e.sub.id); });
    if (b === 'mappe') return SUBS.filter(function (e) { return inBag(e.sub.id); }).sort(function (x, y) { return S.bag[x.sub.id] - S.bag[y.sub.id]; });
    if (b && BYID[b] && BYID[b].type === 'area') return SUBS.filter(function (e) { return e.area.id === b; });
    return SUBS.slice();
  }
  function scopeName(b) { if (String(b).indexOf('exam:') === 0) { var ex = examById(String(b).slice(5)); return ex ? examLabel(ex) : 'Klassenarbeit'; } return b === 'mappe' ? 'Druckmappe' : b === 'star' ? 'Merkzettel' : (b && BYID[b] && BYID[b].area) ? areaLabel(BYID[b].area) + ': ' + plain(BYID[b].area.title) : 'Alle Karten'; }
  var quiz = null;
  function viewQuiz(params) {
    setNav('abfragen'); document.title = 'Abfragen – Lernen 8';
    var b = params.b || 'all';
    if (!params.go) { quiz = null; return quizStart(b); }
    if (!quiz || quiz.b !== b || params.sel || (params.n && params.n !== quiz.n)) {
      var list = scopeList(b), due = dueList(list);
      var pool = params.sel ? (window.__l8Sel || []).map(function (id) { return BYID[id]; }).filter(Boolean) : params.all ? list : due;
      if (params.sel) { window.__l8Sel = null; history.replaceState(null, '', '#/abfragen?b=' + b + '&go=1&all=1'); }
      pool = pool.slice().sort(function (x, y) { return boxOf(x.sub.id).f - boxOf(y.sub.id).f || Math.random() - 0.5; });
      quiz = { b: b, n: params.n, sel: !!params.sel, hist: [], queue: pool.map(function (e) { return e.sub.id; }), right: 0, again: 0, total: pool.length, shown: false };
    }
    quizCard();
  }
  function quizStart(b) {
    var list = scopeList(b), due = dueList(list), counts = [0, 0, 0, 0, 0, 0, 0];
    list.forEach(function (e) { counts[boxOf(e.sub.id).f]++; });
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Abfragen</div><h1>Abfragen</h1>' +
      '<p class="lead">Wie ein Karteikasten: Frage lesen, überlegen, umdrehen. Gewusst → die Karte steigt eine Stufe und kommt später wieder (nach 1, 3, 7, 14, 30 Tagen). Noch nicht → zurück auf Stufe 1. Ab Stufe 4 gilt sie als sicher.</p>' +
      '<fieldset><legend>Welche Karten?</legend><select id="scope" class="sel">' +
      '<option value="all">Alle Karten</option><option value="star"' + (b === 'star' ? ' selected' : '') + '>Merkzettel</option>' +
      AREAS.map(function (a) { return '<option value="' + a.id + '"' + (b === a.id ? ' selected' : '') + '>' + esc(areaLabel(a) + ': ' + plain(a.title)) + '</option>'; }).join('') +
      '</select></fieldset>' +
      '<div class="boxes">' + STUFEN.map(function (f) {
        return '<a class="boxf" href="#/fach?f=' + f + '&b=' + b + '"><b>' + counts[f] + '</b><span>Stufe ' + f + '</span><small>' + (f === 1 ? 'neu/nochmal' : 'nach ' + INTERVAL[f] + ' Tag' + (INTERVAL[f] > 1 ? 'en' : '') + (f >= SICHER ? ' ✓' : '')) + '</small></a>';
      }).join('') + '</div><p class="muted" style="font-size:14px;margin:-4px 0 8px">Tippe auf eine Stufe, um Karten anzusehen, zu verschieben oder einzelne abzufragen.</p>' +
      '<p class="count">' + due.length + ' von ' + list.length + ' Karten sind heute dran.</p>' +
      '<div class="actions">' + (due.length ? '<a class="btn primary" href="#/abfragen?b=' + b + '&go=1">Los geht’s (' + due.length + ')</a>' : '<span class="hint" style="display:block">Für heute ist alles erledigt. 👍</span>') +
      '<a class="btn" href="#/abfragen?b=' + b + '&go=1&all=1">Alle ' + list.length + ' üben</a><a class="btn" href="#/fach?f=0&b=' + b + '">Karten selbst auswählen</a></div></div>';
    $('#scope').addEventListener('change', function (ev) { location.hash = '#/abfragen?b=' + ev.target.value; });
  }
  function quizCard() {
    if (!quiz.queue.length) {
      var dueN = dueList(scopeList(quiz.b)).length, wasSel = !!quiz.sel;
      main.innerHTML = '<div class="content"><h1>' + (wasSel ? 'Auswahl geschafft!' : 'Fertig!') + '</h1><p class="lead">' + quiz.right + '× gewusst, ' + quiz.again + '× nochmal.</p>' +
        '<div class="actions">' + (dueN ? '<a class="btn primary" href="#/abfragen?b=' + quiz.b + '&go=1&n=' + Date.now() + '">Nächste Karten abfragen (' + dueN + ' fällig)</a>' : '') +
        '<a class="btn' + (dueN ? '' : ' primary') + '" href="#/fach?b=' + quiz.b + '&f=0">Andere Karten auswählen</a>' +
        '<a class="btn" href="#/abfragen?b=' + quiz.b + '">Zum Karteikasten</a></div></div>';
      quiz = null; return;
    }
    var e = BYID[quiz.queue[0]], bx = boxOf(e.sub.id), doneN = quiz.total - quiz.queue.length;
    main.innerHTML = '<div class="content quiz"><div class="crumb"><a href="#/abfragen?b=' + quiz.b + '">Abfragen</a> › ' + esc(scopeName(quiz.b)) + '</div>' +
      '<div class="qbar">' + (quiz.hist.length ? '<button class="btn qprev" id="qprev">‹ Vorherige</button>' : '') + '<span>Karte ' + Math.min(doneN + 1, quiz.total) + ' von ' + quiz.total + ' · Stufe ' + bx.f + '</span>' +
      '<button class="starbtn small' + (isStar(e.sub.id) ? ' on' : '') + '" id="qstar">' + (isStar(e.sub.id) ? '★' : '☆') + '</button></div>' +
      '<div class="progress"><i style="width:' + Math.round(doneN * 100 / Math.max(1, quiz.total)) + '%"></i></div>' +
      '<div class="card qcard" id="qcard" data-card="' + esc(e.sub.id) + '"' + accentStyle(e.area) + '>' + cardHead(e) +
      '<div class="qfront" id="qfront">' + frontHtml(e) + '<p class="muted">Erst überlegen, dann umdrehen.</p><button class="btn primary" id="reveal">Umdrehen</button></div>' +
      '<div class="qback" id="qback" hidden>' + cardBody(e) + '</div></div>' +
      '<div class="qactions" id="qact" hidden><button class="btn again" id="again">Noch nicht</button><button class="btn primary" id="right">✓ Gewusst</button></div>' +
      '<p class="src"><a href="#/s/' + esc(e.sub.id) + '">Ganzen Inhalt ansehen</a></p></div>';
    applyCardMarks(main);
    $('#reveal').addEventListener('click', function () { $('#qfront').hidden = true; $('#qback').hidden = false; $('#qact').hidden = false; });
    $('#qstar').addEventListener('click', function (ev) { var v = !isStar(e.sub.id); setStar(e.sub.id, v); ev.currentTarget.textContent = v ? '★' : '☆'; ev.currentTarget.classList.toggle('on', v); });
    var snap = function (kind) { quiz.hist.push({ id: e.sub.id, box: S.box[e.sub.id] ? { f: S.box[e.sub.id].f, due: S.box[e.sub.id].due } : null, done: !!S.done[e.sub.id], kind: kind, queue: quiz.queue.slice(), total: quiz.total }); };
    var pv = $('#qprev'); if (pv) pv.addEventListener('click', function () {
      var h = quiz.hist.pop(); if (!h) return;
      if (h.box) S.box[h.id] = h.box; else delete S.box[h.id];
      if (h.done) S.done[h.id] = 1; else delete S.done[h.id];
      if (h.kind === 'right') quiz.right--; else quiz.again--;
      quiz.queue = h.queue; quiz.total = h.total; save(); quizCard(); window.scrollTo(0, 0);
    });
    $('#right').addEventListener('click', function () {
      snap('right'); if (window.L8Sync) L8Sync.card(true);
      var f = Math.min(MAXF, bx.f + 1); S.box[e.sub.id] = { f: f, due: Date.now() + INTERVAL[f] * DAY - 36e5 };
      if (f >= SICHER) S.done[e.sub.id] = 1;
      save(); quiz.right++; quiz.queue.shift(); quizCard(); window.scrollTo(0, 0);
    });
    $('#again').addEventListener('click', function () {
      snap('again'); if (window.L8Sync) L8Sync.card(false);
      S.box[e.sub.id] = { f: 1, due: 0 }; delete S.done[e.sub.id]; save(); quiz.again++;
      var id = quiz.queue.shift(); if (quiz.queue.length > 2) quiz.queue.splice(3, 0, id); else quiz.queue.push(id);
      quiz.total++; quizCard(); window.scrollTo(0, 0);
    });
  }



  /* ---------- Fächer des Karteikastens: ansehen, verschieben, auswählen ---------- */
  function viewFach(params) {
    setNav('abfragen'); document.title = 'Karten auswählen – Lernen 8';
    var b = params.b || 'all', f = parseInt(params.f, 10) || 0;
    var list = scopeList(b).filter(function (e) { return !f || boxOf(e.sub.id).f === f; });
    var url = function (nb, nf) { return '#/fach?b=' + nb + '&f=' + nf; };
    var areaTabs = '<a href="' + url('all', f) + '"' + (b === 'all' ? ' class="on"' : '') + '>Alle</a>' + AREAS.map(function (a) {
      return '<a href="' + url(a.id, f) + '"' + (b === a.id ? ' class="on"' : '') + '>' + esc(sqLabel(a)[0]) + '</a>';
    }).join('') + (Object.keys(S.star).length ? '<a href="' + url('star', f) + '"' + (b === 'star' ? ' class="on"' : '') + '>★ Merkzettel</a>' : '');
    var stufen = '<a href="' + url(b, 0) + '"' + (!f ? ' class="on"' : '') + '>alle</a>' + STUFEN.map(function (n) {
      return '<a href="' + url(b, n) + '"' + (n === f ? ' class="on"' : '') + '>' + n + '</a>';
    }).join('');
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/abfragen?b=' + b + '">Abfragen</a> › Karten auswählen</div>' +
      '<h1>Karten auswählen</h1><p class="muted" style="margin:0 0 6px;font-size:14px">Fach</p><nav class="ftabs">' + areaTabs + '</nav>' +
      '<p class="muted" style="margin:6px 0 6px;font-size:14px">Stufe im Karteikasten (1 = neu oder nochmal, ab 4 = sicher, 6 = sitzt fest)</p><nav class="ftabs small">' + stufen + '</nav>' +
      '<div class="selbar"><label class="opt"><input type="checkbox" id="selall"> Alle auswählen</label><span id="selcount" class="muted">0 ausgewählt</span></div>' +
      (list.length ? '<ul class="flist">' + list.map(function (e) {
        var bx = boxOf(e.sub.id);
        return '<li><label><input type="checkbox" class="selc" value="' + esc(e.sub.id) + '"><span><small>' + e.num + ' · Stufe ' + bx.f + '</small>' + md(e.sub.title) + '</span></label><span class="fbadge">' + esc(sqLabel(e.area)[0]) + '</span></li>';
      }).join('') + '</ul>' : '<p class="hint">Hier liegen keine Karten.</p>') +
      '<div class="selactions"><button class="btn primary" id="selquiz" disabled>Auswahl abfragen</button>' +
      '<span class="moveto"><select id="seltarget" class="sel" aria-label="Zielstufe">' + STUFEN.filter(function (n) { return n !== f; }).map(function (n) { return '<option value="' + n + '"' + (n === Math.min(MAXF, f + 1) && f ? ' selected' : '') + '>auf Stufe ' + n + '</option>'; }).join('') + '</select>' +
      '<button class="btn" id="selmove" disabled>Verschieben</button></span></div></div>';
    function picked() { return Array.prototype.map.call(main.querySelectorAll('.selc:checked'), function (c) { return c.value; }); }
    function upd() { var n = picked().length; $('#selcount').textContent = n + ' ausgewählt'; $('#selquiz').disabled = !n; $('#selmove').disabled = !n; }
    main.querySelectorAll('.selc').forEach(function (c) { c.addEventListener('change', upd); });
    $('#selall').addEventListener('change', function (ev) { main.querySelectorAll('.selc').forEach(function (c) { c.checked = ev.target.checked; }); upd(); });
    $('#selquiz').addEventListener('click', function () { window.__l8Sel = picked(); quiz = null; location.hash = '#/abfragen?b=' + b + '&go=1&sel=1'; });
    $('#selmove').addEventListener('click', function () {
      var t = parseInt($('#seltarget').value, 10), ids = picked();
      ids.forEach(function (id) { S.box[id] = { f: t, due: t === 1 ? 0 : Date.now() + INTERVAL[t] * DAY - 36e5 }; if (t >= SICHER) S.done[id] = 1; else delete S.done[id]; });
      save(); viewFach(params);
      var m = document.createElement('p'); m.className = 'toast'; m.textContent = ids.length + (ids.length === 1 ? ' Karte' : ' Karten') + ' auf Stufe ' + t + ' verschoben.'; main.querySelector('.content').prepend(m);
    });
  }


  /* ---------- Prüfungsfragen ---------- */
  var exam = null;
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function qScope(b) { var ids = {}; scopeList(b).forEach(function (e) { ids[e.sub.id] = 1; }); return FRAGEN.filter(function (q) { return ids[q.ref]; }); }
  function parseNum(v) { v = String(v).replace(/\s|€|%|m²/g, ''); if (/,/.test(v)) v = v.replace(/\./g, '').replace(',', '.'); return parseFloat(v); }
  function viewExam(params) {
    setNav('pruefung'); document.title = 'Üben – Lernen 8';
    var b = params.b || 'all';
    if (!params.go) {
      exam = null;
      var pool = qScope(b), wrong = pool.filter(function (q) { return S.qs[q.id] === 0; }).length, right = pool.filter(function (q) { return S.qs[q.id] === 1; }).length;
      main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Üben</div><h1>Üben</h1>' +
        '<p class="lead">Kurze Aufgaben zum Antippen oder Rechnen. Du siehst sofort, ob es stimmt und wie es geht. Was noch nicht klappt, kommt auf deinen Merkzettel.</p>' +
        '<fieldset><legend>Welche Fragen?</legend><select id="scope" class="sel"><option value="all">Alle Fächer</option><option value="star"' + (b === 'star' ? ' selected' : '') + '>Merkzettel</option>' +
        AREAS.map(function (a) { return '<option value="' + a.id + '"' + (b === a.id ? ' selected' : '') + '>' + esc(areaLabel(a) + ': ' + plain(a.title)) + '</option>'; }).join('') + '</select></fieldset>' +
        '<p class="count">' + pool.length + ' Fragen · ' + right + ' zuletzt richtig · ' + wrong + ' zuletzt falsch</p>' +
        (pool.length ? '<div class="actions"><a class="btn primary" href="#/pruefung?b=' + b + '&go=1&n=5">5 Aufgaben</a><a class="btn" href="#/pruefung?b=' + b + '&go=1&n=10">Mini-Test (10)</a>' +
          (wrong ? '<a class="btn" href="#/pruefung?b=' + b + '&go=1&n=99&w=1">Nur die falschen (' + wrong + ')</a>' : '') + '</div>' : '<p class="hint">Für diesen Bereich gibt es noch keine Fragen.</p>') + '</div>';
      $('#scope').addEventListener('change', function (ev) { location.hash = '#/pruefung?b=' + ev.target.value; });
      return;
    }
    if (!exam) {
      var p = qScope(b); if (params.w) p = p.filter(function (q) { return S.qs[q.id] === 0; });
      p = shuffle(p.slice()).slice(0, parseInt(params.n, 10) || 10);
      exam = { b: b, list: p, i: 0, pts: 0 };
    }
    examQ();
  }
  function examQ() {
    if (exam.i >= exam.list.length) {
      var pct = Math.round(exam.pts * 100 / Math.max(1, exam.list.length));
      addStars(exam.list.length); S.tests = (S.tests || []).concat([{ d: dayKey(), b: exam.b, pts: exam.pts, n: exam.list.length }]).slice(-30); save();
      main.innerHTML = '<div class="content"><h1>Geschafft! ⭐ +' + exam.list.length + '</h1><p class="lead">' + exam.pts + ' von ' + exam.list.length + ' Aufgaben gelöst. ' + (pct >= 80 ? 'Das sitzt schon gut.' : pct >= 50 ? 'Gut drangeblieben – die anderen üben wir noch.' : 'Jeder Versuch hilft beim Merken. Die Karten liegen jetzt auf deinem Merkzettel.') + '</p>' +
        ((exam.wrong || []).length ? '<div class="section-title">Diese Karten wackeln noch</div><div class="results">' + exam.wrong.map(function (id) { return BYID[id] ? subLink(BYID[id]) : ''; }).join('') + '</div>' : '') +
        '<div class="actions"><a class="btn primary" href="#/pruefung?b=' + exam.b + '">Nochmal</a>' + (String(exam.b).indexOf('exam:') === 0 ? '<a class="btn" href="#/arbeit?id=' + esc(String(exam.b).slice(5)) + '">Zur Klassenarbeit</a>' : '<a class="btn" href="#/merken">Zum Merkzettel</a>') + '</div></div>';
      exam = null; return;
    }
    var q = exam.list[exam.i], e = BYID[q.ref], multi = q.type === 'mc' && q.correct.length > 1;
    var order = q.type === 'mc' ? q.options.map(function (o, i) { return i; }) : [];
    var body = q.type === 'mc'
      ? '<div class="opts">' + order.map(function (i, k) { return '<button class="optbtn" data-i="' + i + '"><span class="ol">' + 'abcdef'.charAt(k) + '</span>' + md(q.options[i]) + '</button>'; }).join('') + '</div>' +
        (multi ? '<p class="muted">Zwei Antworten sind richtig.</p>' : '') + '<div class="actions"><button class="btn primary" id="check"' + (multi ? '' : ' hidden') + '>Prüfen</button></div>'
      : '<div class="numin"><input id="num" inputmode="decimal" autocomplete="off" placeholder="Deine Lösung"><span>' + esc(q.unit || '') + '</span></div><div class="actions"><button class="btn primary" id="check">Prüfen</button></div>';
    main.innerHTML = '<div class="content quiz"><div class="crumb"><a href="#/pruefung?b=' + exam.b + '">Wissen prüfen</a> › Frage ' + (exam.i + 1) + ' von ' + exam.list.length + '</div>' +
      '<div class="progress"><i style="width:' + Math.round(exam.i * 100 / exam.list.length) + '%"></i></div>' +
      '<article class="sub qbox"><div class="rp">' + areaLabel(e.area) + ' · ' + md(e.sub.title) + '</div><h2 class="qq">' + md(q.q) + '</h2>' + body + '<div id="fb"></div></article></div>';
    var picked = [];
    function finish(ok) {
      S.qs[q.id] = ok ? 1 : 0; if (window.L8Sync) L8Sync.exam(ok); if (ok) exam.pts++; else { setStar(q.ref, true); if ((exam.wrong = exam.wrong || []).indexOf(q.ref) < 0) exam.wrong.push(q.ref); } save();
      main.querySelectorAll('.optbtn').forEach(function (bt) {
        var i = +bt.dataset.i; bt.disabled = true;
        if (q.correct.indexOf(i) >= 0) bt.classList.add('right'); else if (picked.indexOf(i) >= 0) bt.classList.add('wrong');
      });
      var c = $('#check'); if (c) c.remove(); var n = $('#num'); if (n) n.disabled = true;
      $('#fb').innerHTML = '<div class="fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? '✓ Richtig!' : 'Noch nicht ganz.' + (q.type === 'zahl' ? ' Lösung: ' + esc(String(q.answer).replace('.', ',')) + ' ' + esc(q.unit || '') : '')) + '</b>' +
        (q.why ? '<p>' + md(q.why) + '</p>' : '') + (q.solution ? '<div class="example">' + calcHtml(q.solution) + '</div>' : '') +
        (ok ? '' : '<p class="muted">Die Karte liegt jetzt auf deinem Merkzettel – so kommt sie bald wieder.</p>') +
        '<p><a href="#/s/' + esc(q.ref) + '">Karte „' + md(e.sub.title) + '“ ansehen</a></p></div>' +
        '<div class="actions"><button class="btn primary" id="nextq">' + (exam.i + 1 < exam.list.length ? 'Nächste Frage' : 'Zum Ergebnis') + '</button></div>' +
        reportHtml('Übungsfrage ' + q.id + ': ' + plain(q.q).slice(0, 80));
      bindReport('Übungsfrage ' + q.id + ': ' + plain(q.q).slice(0, 80));
      $('#nextq').addEventListener('click', function () { exam.i++; examQ(); window.scrollTo(0, 0); });
    }
    main.querySelectorAll('.optbtn').forEach(function (bt) {
      bt.addEventListener('click', function () {
        var i = +bt.dataset.i;
        if (!multi) { picked = [i]; finish(q.correct.length === 1 && q.correct[0] === i); return; }
        var k = picked.indexOf(i); if (k >= 0) picked.splice(k, 1); else picked.push(i); bt.classList.toggle('sel', k < 0);
      });
    });
    var chk = $('#check');
    if (chk) chk.addEventListener('click', function () {
      if (q.type === 'zahl') { var v = parseNum($('#num').value); if (isNaN(v)) { $('#num').focus(); return; } finish(Math.abs(v - q.answer) <= (q.tol || 0.01) + 1e-9); }
      else finish(picked.length === q.correct.length && picked.every(function (i) { return q.correct.indexOf(i) >= 0; }));
    });
    var ni = $('#num'); if (ni) ni.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') chk.click(); });
  }

  /* ---------- Fachbegriffe A–Z ---------- */
  function norm(s) { return String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss'); }
  function firstLetter(t) { var c = norm(t).replace(/[^a-z0-9]/g, '').charAt(0).toUpperCase(); return /[A-Z]/.test(c) ? c : '#'; }
  function viewAZ(params) {
    setNav('az'); document.title = 'Fachbegriffe – Lernen 8';
    var letters = []; GLOSSAR.forEach(function (g) { var l = firstLetter(g.term); if (letters.indexOf(l) < 0) letters.push(l); });
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Fachbegriffe</div><h1>Fachbegriffe A–Z</h1>' +
      (GLOSSAR.length ? '<input type="search" id="gq" class="gq" placeholder="Begriff filtern …" aria-label="Begriff filtern" value="' + esc(params.q || '') + '">' +
        '<nav class="letters">' + letters.map(function (l) { return '<a href="#L-' + l + '" data-l="' + l + '">' + l + '</a>'; }).join('') + '</nav><dl class="gloss" id="gloss"></dl>'
        : '<p class="lead">Die Fachbegriffe werden gerade ergänzt.</p>') + '</div>';
    if (!GLOSSAR.length) return;
    function render(q) {
      var w = norm(q || '').trim(), last = '', h = '';
      GLOSSAR.forEach(function (g) {
        if (w && norm(g.term + ' ' + g.def).indexOf(w) < 0) return;
        var l = firstLetter(g.term);
        if (l !== last) { h += '<dt class="lt" id="L-' + l + '">' + l + '</dt>'; last = l; }
        var e = g.ref && BYID[g.ref];
        h += '<dt>' + md(g.term) + '</dt><dd>' + md(g.def) + (e ? ' <a href="#/s/' + esc(g.ref) + '">→ ' + md(e.sub.title) + '</a>' : '') + '</dd>';
      });
      $('#gloss').innerHTML = h || '<dd>Kein Begriff gefunden.</dd>';
    }
    render(params.q);
    $('#gq').addEventListener('input', function (ev) { render(ev.target.value); });
    main.querySelectorAll('.letters a').forEach(function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); $('#gq').value = ''; render(''); var t = document.getElementById('L-' + a.dataset.l); if (t) t.scrollIntoView({ block: 'start' }); });
    });
  }

  /* ---------- Suche ---------- */
  var INDEX = SUBS.map(function (e) {
    var s = e.sub, parts = [s.title, e.topic.title, e.area.title];
    s.content.forEach(function (b) {
      if (b.p) parts.push(b.p); if (b.h) parts.push(b.h); if (b.ex) parts.push(b.ex); if (b.note) parts.push(b.note); if (b.warn) parts.push(b.warn);
      if (b.ul) parts = parts.concat(b.ul);
      if (b.rules) b.rules.forEach(function (r) { parts.push(r[0]); parts = parts.concat(r[1]); });
      if (b.calc) { parts.push(b.calc.title || ''); b.calc.rows.forEach(function (r) { parts.push(r.label); }); }
    });
    var c = s.card || {}; parts.push(c.title || '', c.merke || ''); parts = parts.concat(c.bullets || []);
    if (S.notes[s.id]) parts.push(notesText(s.id));
    var text = plain(parts.join(' \n '));
    return { e: e, text: text, low: norm(text) };
  });
  function viewSearch(q) {
    setNav(''); document.title = 'Suche – Lernen 8';
    var words = norm(q).split(/\s+/).filter(Boolean);
    var hits = !words.length ? [] : INDEX.map(function (x) {
      if (!words.every(function (w) { return x.low.indexOf(w) >= 0; })) return null;
      var score = words.reduce(function (s, w) { return s + (norm(x.e.sub.title).indexOf(w) >= 0 ? 10 : 0) + (norm(x.e.topic.title).indexOf(w) >= 0 ? 3 : 0); }, 0);
      return { x: x, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score || a.x.e.idx - b.x.e.idx; });
    var gl = !words.length ? [] : GLOSSAR.filter(function (g) { return words.every(function (w) { return norm(g.term).indexOf(w) >= 0; }); }).slice(0, 5);
    var hl = function (t) {
      var h = esc(t); words.forEach(function (w) {
        if (w.length < 2) return;
        var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ae/g, '(?:ae|ä)').replace(/oe/g, '(?:oe|ö)').replace(/ue/g, '(?:ue|ü)').replace(/ss/g, '(?:ss|ß)') + ')', 'gi');
        h = h.replace(re, '<mark>$1</mark>');
      }); return h;
    };
    var snip = function (x) {
      var lowRaw = x.text.toLowerCase(), i = -1;
      words.some(function (w) { i = lowRaw.indexOf(w); return i >= 0; });
      if (i < 0) i = 0;
      var a = Math.max(0, i - 50), t = x.text.slice(a, a + 140).replace(/\s+/g, ' ');
      return (a ? '… ' : '') + t + ' …';
    };
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Suche</div>' +
      '<h1>Suche</h1><p class="lead">' + (words.length ? hits.length + ' Treffer für „' + esc(q) + '“' : 'Gib oben ein Wort ein, z. B. „Pythagoras“ oder „Zylinder“.') + '</p>' +
      (gl.length ? '<dl class="gloss small">' + gl.map(function (g) { return '<dt>' + md(g.term) + '</dt><dd>' + md(g.def) + '</dd>'; }).join('') + '</dl>' : '') +
      '<div class="results">' + hits.slice(0, 60).map(function (h) {
        var e = h.x.e;
        return '<a href="#/s/' + esc(e.sub.id) + '"><div class="rp">' + areaLabel(e.area) + ' · ' + esc(e.topic.title) + '</div><div class="rt">' + hl(plain(e.sub.title)) + '</div><div class="rs">' + hl(snip(h.x)) + '</div></a>';
      }).join('') + '</div></div>';
  }

  /* ---------- Druck ---------- */
  function printCards(list, mode, noDialog, noNote) {
    var sheet = $('#sheet'), html = '', ch = function (e) { return cardHtml(e, !!noNote); };
    var per = mode === 'a4' ? 4 : mode === 'a7x8' ? 8 : 0;
    if (per) {
      for (var i = 0; i < list.length; i += per) html += '<div class="page">' + list.slice(i, i + per).map(ch).join('') + '</div>';
    } else html = list.map(ch).join('');
    sheet.innerHTML = html; applyCardMarks(sheet);
    document.body.classList.remove('p-a4', 'p-a6', 'p-a7', 'p-a7x8'); document.body.classList.add('p-' + mode);
    $('#page-size').textContent = '@page{size:' + ({ a4: 'A4 portrait', a6: '105mm 148mm', a7: '74mm 105mm', a7x8: 'A4 landscape' })[mode] + ';margin:0}';
    if (!noDialog) setTimeout(function () { window.print(); }, 60);
  }

  var FORMATS = [['a6', 'A6 einzeln'], ['a7', 'A7 einzeln (Spielkarte)'], ['a4', '4 × A6 auf A4'], ['a7x8', '8 × A7 auf A4 quer']];
  function pdfCard(e, noNote) {
    var c = e.sub.card || {}, a = e.area;
    return { head: a.short || a.title, headRight: e.num, title: c.title || e.sub.title,
      bullets: c.bullets, rules: c.rules, calc: c.calc,
      merke: c.merke ? (/^merke/i.test(c.merke) ? c.merke : 'Merke: ' + c.merke) : '', quelle: c.quelle,
      note: noNote ? '' : notesText(e.sub.id, true), marks: S.hl[e.sub.id] || {},
      accent: window.ImmoPDF.hex(a.color || getComputedStyle(document.documentElement).getPropertyValue('--card-accent')) };
  }
  function makePdf(list, mode, noNote) {
    var bytes = window.ImmoPDF.build(list.map(function (e) { return pdfCard(e, noNote); }), mode);
    var name = 'Lernkarten-' + ({ a6: 'A6', a7: 'A7', a4: '4xA6-auf-A4', a7x8: '8xA7-auf-A4' })[mode] + '.pdf';
    var blob = new Blob([bytes], { type: 'application/pdf' }), file = null;
    try { file = new File([blob], name, { type: 'application/pdf' }); } catch (x) {}
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      return navigator.share({ files: [file], title: 'Lernen 8 – Lernkarten' }).catch(function () {});
    }
    var url = URL.createObjectURL(blob), aEl = document.createElement('a');
    aEl.href = url; aEl.download = name; aEl.target = '_blank'; document.body.appendChild(aEl); aEl.click();
    setTimeout(function () { URL.revokeObjectURL(url); aEl.remove(); }, 60000);
  }
  function inBag(id) { return !!S.bag[id]; }
  function setBag(id, v) { if (v) S.bag[id] = Date.now(); else delete S.bag[id]; save(); }
  function bagBtnHtml(id) { return '<button class="starbtn js-bag' + (inBag(id) ? ' on' : '') + '" aria-pressed="' + inBag(id) + '">' + (inBag(id) ? '🖨 In der Mappe' : '🖨 Druckmappe') + '</button>'; }
  var printExcl = {};
  function viewPrintPreview(params) {
    setNav('druck'); document.title = 'Druckansicht – Lernen 8';
    var m = FORMATS.some(function (f) { return f[0] === params.m; }) ? params.m : 'a6';
    var all = params.ids ? params.ids.split(',').map(function (id) { return BYID[id]; }).filter(function (e) { return e && e.type === 'sub'; })
      : scopeList(params.b || 'all').filter(function (e) { return !params.only || !isDone(e.sub.id); });
    var noNote = params.nn === '1', hasNotes = all.some(function (e) { return notesText(e.sub.id, true); });
    var base = '#/druckansicht?' + (params.ids ? 'ids=' + params.ids : 'b=' + (params.b || 'all') + (params.only ? '&only=1' : ''));
    var standalone = window.navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
    var per = m === 'a4' ? 4 : m === 'a7x8' ? 8 : 1;
    var back = params.ids && params.ids.indexOf(',') < 0 && BYID[params.ids] ? '#/s/' + params.ids : '#/druck';
    main.innerHTML = '<div class="content"><div class="crumb"><a href="' + back + '">Zurück</a> › Druckansicht</div>' +
      '<h1>Druckansicht</h1><div class="fmt" role="group" aria-label="Format">' + FORMATS.map(function (f) {
        return '<a href="' + base + '&m=' + f[0] + (noNote ? '&nn=1' : '') + '"' + (f[0] === m ? ' class="on" aria-current="true"' : '') + '>' + f[1] + '</a>';
      }).join('') + '</div>' +
      (hasNotes ? '<label class="opt"><input type="checkbox" id="withnotes"' + (noNote ? '' : ' checked') + '> Notizen mitdrucken (nur die mit „auf die Karte“)</label>' : '') +
      (all.length > 1 ? '<details class="pick" id="pick"><summary>Karten auswählen <span id="pickcount"></span></summary><div class="pick-in">' +
        '<div class="pick-bar"><button class="linkbtn" id="pick-all">alle</button><button class="linkbtn" id="pick-none">keine</button>' +
        (params.b === 'mappe' ? '<button class="linkbtn" id="bag-clear">Druckmappe leeren</button>' : '') + '</div><ul class="flist">' +
        all.map(function (e) { return '<li><label><input type="checkbox" class="pk" value="' + esc(e.sub.id) + '"' + (printExcl[e.sub.id] ? '' : ' checked') + '><span><small>' + esc(e.area.short || areaLabel(e.area)) + ' · ' + e.num + '</small>' + md(e.sub.title) + '</span></label></li>'; }).join('') +
        '</ul></div></details>' : '') +
      '<p class="count" id="pcount"></p>' +
      '<div class="actions"><button class="btn primary" id="dopdf">PDF erstellen</button>' + (standalone ? '' : '<button class="btn" id="doprint">Direkt drucken</button>') + '</div>' +
      '<div class="hint printhint">„PDF erstellen“ öffnet auf iPhone und Tablet das Teilen-Menü: dort <b>Drucken</b> oder <b>In Dateien sichern</b> wählen. Beim Drucken die Größe auf 100 % lassen.</div>' +
      '<div class="preview pv-' + m + '" id="preview"></div></div>';
    function list() { return all.filter(function (e) { return !printExcl[e.sub.id]; }); }
    function refresh() {
      var l = list();
      $('#pcount').textContent = l.length + (l.length === 1 ? ' Karte' : ' Karten') + ' → ' + Math.ceil(l.length / per) + ' Blatt ' + ({ a6: 'A6', a7: 'A7', a4: 'A4', a7x8: 'A4 quer' })[m];
      var pc = $('#pickcount'); if (pc) pc.textContent = '(' + l.length + ' von ' + all.length + ')';
      $('#dopdf').disabled = !l.length; var dp = $('#doprint'); if (dp) dp.disabled = !l.length;
      printCards(l, m, true, noNote);
      var pv = $('#preview'); pv.innerHTML = $('#sheet').innerHTML;
      var natural = { a6: 397, a7: 280, a4: 794, a7x8: 1119 }[m];
      pv.style.zoom = Math.min(1, (pv.parentNode.clientWidth - 2) / natural).toFixed(3);
    }
    refresh();
    main.querySelectorAll('.pk').forEach(function (c) { c.addEventListener('change', function () { if (c.checked) delete printExcl[c.value]; else printExcl[c.value] = 1; refresh(); }); });
    var pa = $('#pick-all'); if (pa) pa.addEventListener('click', function () { main.querySelectorAll('.pk').forEach(function (c) { c.checked = true; delete printExcl[c.value]; }); refresh(); });
    var pn = $('#pick-none'); if (pn) pn.addEventListener('click', function () { main.querySelectorAll('.pk').forEach(function (c) { c.checked = false; printExcl[c.value] = 1; }); refresh(); });
    var bc = $('#bag-clear'); if (bc) bc.addEventListener('click', function () { if (confirm('Druckmappe leeren?')) { S.bag = {}; save(); location.hash = '#/druck'; } });
    var wn = $('#withnotes'); if (wn) wn.addEventListener('change', function () { location.hash = base + '&m=' + m + (wn.checked ? '' : '&nn=1'); });
    $('#dopdf').addEventListener('click', function () { var l = list(); if (l.length) makePdf(l, m, noNote); });
    var dp = $('#doprint'); if (dp) dp.addEventListener('click', function () { var l = list(); if (l.length) printCards(l, m, false, noNote); });
  }
  var printPick = null;
  function viewPrint(params) {
    setNav('druck'); document.title = 'Drucken – Lernen 8';
    // Startauswahl: Bereich aus dem Link, sonst Druckmappe, sonst nichts
    if (params.b || !printPick) {
      printPick = {};
      var start = params.b ? scopeList(params.b) : (Object.keys(S.bag).length ? scopeList('mappe') : []);
      start.forEach(function (e) { printPick[e.sub.id] = 1; });
      if (params.b) history.replaceState(null, '', '#/druck');
    }
    var fm = getPref('printfmt', 'a4');
    var bagN = Object.keys(S.bag).filter(function (id) { return BYID[id]; }).length, starN = Object.keys(S.star).filter(function (id) { return BYID[id]; }).length;
    var openArea = params.b && BYID[params.b] && BYID[params.b].type === 'area' ? params.b : '';
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Drucken</div><h1>Lernkarten drucken</h1>' +
      '<fieldset><legend>Format</legend>' + FORMATS.map(function (f) {
        return '<div class="opt"><input type="radio" name="m" id="m-' + f[0] + '" value="' + f[0] + '"' + (fm === f[0] ? ' checked' : '') + '><label for="m-' + f[0] + '">' + f[1] + '</label></div>';
      }).join('') + '</fieldset>' +
      '<fieldset class="picker"><legend>Karten auswählen</legend>' +
      '<label class="opt allrow"><input type="checkbox" id="pp-all"> <b>Alle Karten</b></label>' +
      '<div class="pp-quick">' + (bagN ? '<button class="btn" id="pp-bag" type="button">Druckmappe (' + bagN + ')</button>' : '') +
      (starN ? '<button class="btn" id="pp-star" type="button">Merkzettel (' + starN + ')</button>' : '') +
      '<button class="btn" id="pp-open" type="button">Nur nicht gelernte</button><button class="btn" id="pp-none" type="button">Keine</button></div>' +
      AREAS.map(function (a) {
        return '<details class="pp-area"' + (a.id === openArea ? ' open' : '') + ' data-a="' + a.id + '"><summary><label class="pp-ahead"><input type="checkbox" class="pp-a" data-a="' + a.id + '"> ' +
          esc(areaLabel(a)) + ': ' + titleLines(a).map(esc).join(' ') + ' <span class="pp-n" data-a="' + a.id + '"></span></label></summary><ul class="flist">' +
          SUBS.filter(function (e) { return e.area === a; }).map(function (e) {
            return '<li><label><input type="checkbox" class="pp-c" data-a="' + a.id + '" value="' + esc(e.sub.id) + '"><span><small>' + e.num + '</small>' + md(e.sub.title) + '</span></label></li>';
          }).join('') + '</ul></details>';
      }).join('') + '</fieldset>' +
      '<div class="selactions"><span class="count" id="count"></span><button class="btn primary" id="go">Weiter zur Druckansicht</button></div></div>';
    function sync() {
      var n = 0;
      main.querySelectorAll('.pp-c').forEach(function (c) { c.checked = !!printPick[c.value]; if (c.checked) n++; });
      AREAS.forEach(function (a) {
        var cs = main.querySelectorAll('.pp-c[data-a="' + a.id + '"]'), on = 0; cs.forEach(function (c) { if (c.checked) on++; });
        var h = main.querySelector('.pp-a[data-a="' + a.id + '"]'); h.checked = on === cs.length && on > 0; h.indeterminate = on > 0 && on < cs.length;
        main.querySelector('.pp-n[data-a="' + a.id + '"]').textContent = '(' + on + '/' + cs.length + ')';
      });
      var all = $('#pp-all'); all.checked = n === SUBS.length; all.indeterminate = n > 0 && n < SUBS.length;
      var m = (document.querySelector('input[name=m]:checked') || {}).value, per = m === 'a4' ? 4 : m === 'a7x8' ? 8 : 1;
      $('#count').textContent = n + (n === 1 ? ' Karte' : ' Karten') + ' → ' + Math.ceil(n / per) + ' Blatt';
      $('#go').disabled = !n;
    }
    function setMany(list, v) { list.forEach(function (id) { if (v) printPick[id] = 1; else delete printPick[id]; }); sync(); }
    $('#pp-all').addEventListener('change', function (ev) { setMany(SUBS.map(function (e) { return e.sub.id; }), ev.target.checked); });
    main.querySelectorAll('.pp-a').forEach(function (h) {
      h.addEventListener('click', function (ev) { ev.stopPropagation(); });
      h.addEventListener('change', function () { setMany(SUBS.filter(function (e) { return e.area.id === h.dataset.a; }).map(function (e) { return e.sub.id; }), h.checked); });
    });
    main.querySelectorAll('.pp-c').forEach(function (c) { c.addEventListener('change', function () { setMany([c.value], c.checked); }); });
    var qb = function (id, fn) { var b = $(id); if (b) b.addEventListener('click', fn); };
    qb('#pp-bag', function () { printPick = {}; setMany(scopeList('mappe').map(function (e) { return e.sub.id; }), true); });
    qb('#pp-star', function () { printPick = {}; setMany(scopeList('star').map(function (e) { return e.sub.id; }), true); });
    qb('#pp-open', function () { Object.keys(printPick).forEach(function (id) { if (isDone(id)) delete printPick[id]; }); sync(); });
    qb('#pp-none', function () { printPick = {}; sync(); });
    main.querySelectorAll('input[name=m]').forEach(function (r) { r.addEventListener('change', function () { setPref('printfmt', r.value); sync(); }); });
    sync();
    $('#go').addEventListener('click', function () {
      var ids = SUBS.filter(function (e) { return printPick[e.sub.id]; }).map(function (e) { return e.sub.id; });
      if (!ids.length) return;
      printExcl = {};
      location.hash = '#/druckansicht?ids=' + ids.join(',') + '&m=' + document.querySelector('input[name=m]:checked').value;
    });
  }


  /* ---------- Router ---------- */
  var navDepth = 0;
  function parentOf(h) {
    var m = h.match(/^s\/(.+)$/); if (m && BYID[m[1]]) return '#/b/' + BYID[m[1]].area.id;
    if (/^fach/.test(h)) return '#/abfragen';
    return '#/';
  }
  function route() {
    var h = location.hash.replace(/^#\/?/, ''), q = '', params = {};
    document.body.classList.remove('marking'); var mbar = $('#markbar'); if (mbar) mbar.hidden = true;
    stopTimers(); if (CAN_SPEAK) try { speechSynthesis.cancel(); } catch (x) {}
    var bb = $('#backbtn'), atHome = (h === '' || h === '/'); if (bb) bb.hidden = atHome; document.body.classList.toggle('has-back', !atHome);
    if (/^L-/.test(h)) return; // Sprungmarke im Lexikon
    var qi = h.indexOf('?'); if (qi >= 0) { q = h.slice(qi + 1); h = h.slice(0, qi); q.split('&').forEach(function (p) { var kv = p.split('='); params[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); }); }
    var p = h.split('/');
    if (p[0] === 'b') viewArea(p[1]);
    else if (p[0] === 's') viewSub(p[1]);
    else if (p[0] === 'suche') { viewSearch(params.q || ''); var si = $('#q'); if (si && document.activeElement !== si) si.value = params.q || ''; }
    else if (p[0] === 'druck') viewPrint(params);
    else if (p[0] === 'druckansicht') viewPrintPreview(params);
    else if (p[0] === 'druckvorschau') { viewHome(); printCards(scopeList(params.b || 'all'), ['a6', 'a7', 'a7x8'].indexOf(params.m) >= 0 ? params.m : 'a4', true); }
    else if (p[0] === 'merken') viewStars();
    else if (p[0] === 'runde') viewRound(params);
    else if (p[0] === 'arbeit') viewExams(params);
    else if (p[0] === 'eltern') viewParents();
    else if (p[0] === 'eltern-online') { setNav(''); window.L8Sync.viewOnline(main); }
    else if (p[0] === 'konto') { setNav(''); window.L8Sync.viewKonto(main); }
    else if (p[0] === 'abfragen') viewQuiz(params);
    else if (p[0] === 'fach') viewFach(params);
    else if (p[0] === 'plan') { setNav(''); window.ImmoPlan.viewPlan(main); }
    else if (p[0] === 'kalender') { setNav(''); window.ImmoPlan.viewCal(main); }
    else if (p[0] === 'az') viewAZ(params);
    else if (p[0] === 'pruefung') viewExam(params);
    else viewHome();
    if (p[0] !== 'suche') { window.scrollTo(0, 0); var qi2 = $('#q'); if (qi2 && document.activeElement !== qi2) qi2.value = ''; }
  }
  applyTheme();
  $('#themebtn').addEventListener('click', function () {
    var t = getPref('theme', 'auto'); setPref('theme', THEMES[(THEMES.indexOf(t) + 1) % 3]); applyTheme();
  });
  var t;
  $('#q').addEventListener('input', function (ev) {
    clearTimeout(t); var v = ev.target.value;
    t = setTimeout(function () { var target = '#/suche?q=' + encodeURIComponent(v); if (location.hash !== target) history.replaceState(null, '', target); route(); }, 150);
  });
  $('#searchform').addEventListener('submit', function (ev) { ev.preventDefault(); $('#q').blur(); });
  window.addEventListener('hashchange', function () { navDepth++; route(); });
  var totop = $('#totop'), tick = false;
  window.addEventListener('scroll', function () {
    if (tick) return; tick = true;
    requestAnimationFrame(function () { totop.hidden = window.scrollY < 400; tick = false; });
  }, { passive: true });
  totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('#backbtn').addEventListener('click', function () {
    if (navDepth > 0) { navDepth -= 2; history.back(); }
    else location.hash = parentOf(location.hash.replace(/^#\/?/, '').split('?')[0]);
  });
  window.addEventListener('afterprint', function () { document.body.classList.remove('p-a4', 'p-a6', 'p-a7', 'p-a7x8', 'p-eltern'); });
  route();

  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
  window.__IMMO_DEBUG = { SUBS: SUBS, cardHtml: cardHtml, printCards: printCards, pdfCard: pdfCard };
})();
