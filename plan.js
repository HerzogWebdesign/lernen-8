/* Lernen 8 – Stundenplan und Kalender. Alles bleibt auf dem Gerät. */
(function () {
  'use strict';
  var KEY = 'lernen-8-plan-v1', FOTO = 'lernen-8-planfoto-v1';
  var DAYS = [['mo', 'Mo'], ['di', 'Di'], ['mi', 'Mi'], ['do', 'Do'], ['fr', 'Fr']];
  var TYPES = [['ka', 'Klassenarbeit', '#c0392b'], ['test', 'Test', '#d35400'], ['vok', 'Vokabeltest', '#8e44ad'], ['abgabe', 'Abgabe', '#2c6fb3'], ['urlaub', 'Urlaub', '#0e9f8e'], ['frei', 'Schulferien / frei', '#7f8c8d'], ['sonst', 'Sonstiges', '#5c6773']];
  var P;
  function subjects() {
    var a = (window.L8 || []).slice().sort(function (x, y) { return (x.kind === y.kind ? 0 : x.kind === 'lf' ? -1 : 1) || (x.nr - y.nr); });
    return a.map(function (x) { return [x.id, x.title, x.short || x.title]; }).concat([['sport', 'Sport', 'Sport']]);
  }
  function subj(id) { return subjects().filter(function (x) { return x[0] === id; })[0]; }
  var SHORT = { ka: 'Klassen\u00ADarbeit', test: 'Test', vok: 'Vokabeln', abgabe: 'Abgabe', urlaub: 'Urlaub', frei: 'frei' };
  function load() {
    try { P = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { P = null; }
    if (!P) P = {};
    P.rows = P.rows || ['08:00–08:45', '08:45–09:30', '09:50–10:35', '10:35–11:20', '11:40–12:25', '12:25–13:10', '13:30–14:15', '14:15–15:00'];
    P.cells = P.cells || {}; P.cal = P.cal || [];
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); return true; } catch (e) { alert('Speichern hat nicht geklappt (Speicher voll?).'); return false; } }
  load();
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(s) { return document.querySelector(s); }
  function z(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); }
  function parseIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function deDate(s) { var d = parseIso(s); return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()] + ', ' + z(d.getDate()) + '.' + z(d.getMonth() + 1) + '.' + d.getFullYear(); }
  function typeOf(k) { return TYPES.filter(function (t) { return t[0] === k; })[0] || TYPES[TYPES.length - 1]; }

  /* ---------- Stundenplan ---------- */
  var editPlan = false;
  function viewPlan(main) {
    document.title = 'Stundenplan – Lernen 8';
    var foto = null; try { foto = localStorage.getItem(FOTO); } catch (e) {}
    var today = ['so', 'mo', 'di', 'mi', 'do', 'fr', 'sa'][new Date().getDay()];
    var grid = '<div class="tt-wrap"><table class="tt"><thead><tr><th class="tt-h">Std.</th>' + DAYS.map(function (d) { return '<th class="' + (d[0] === today ? 'today' : '') + '">' + d[1] + '</th>'; }).join('') + '</tr></thead><tbody>' +
      P.rows.map(function (r, i) {
        return '<tr><th class="tt-h"><b>' + (i + 1) + '</b>' + (editPlan ? '<input class="tt-time" data-r="' + i + '" value="' + esc(r) + '" aria-label="Uhrzeit Stunde ' + (i + 1) + '">' : '<small>' + esc(r) + '</small>') + '</th>' +
          DAYS.map(function (d) {
            var k = d[0] + '-' + i, v = P.cells[k] || '';
            return '<td class="' + (d[0] === today ? 'today' : '') + (v ? ' full' : '') + '">' + (editPlan ? '<textarea class="tt-in" data-k="' + k + '" rows="2" aria-label="' + d[1] + ' Stunde ' + (i + 1) + '">' + esc(v) + '</textarea>' : esc(v).replace(/\n/g, '<br>')) + '</td>';
          }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    main.innerHTML = '<div class="content" style="max-width:900px"><div class="crumb"><a href="#/">Start</a> › Stundenplan</div><h1>Stundenplan</h1>' +
      '<div class="actions" style="margin:0 0 10px">' + (editPlan
        ? '<button class="btn primary" id="tt-save">Speichern</button><button class="btn" id="tt-cancel">Abbrechen</button><button class="btn" id="tt-addrow">+ Stunde</button><button class="btn" id="tt-delrow">– Stunde</button>'
        : '<button class="btn primary" id="tt-edit">Bearbeiten</button>') + '</div>' +
      grid +
      (editPlan ? '<p class="hint" style="margin-top:10px"><b>Tipp vom Foto:</b> Öffne das Foto des Stundenplans in der Fotos-App, drücke lange auf ein Wort → „Kopieren“ und füge es hier ins Feld ein. So musst du nicht alles abtippen.</p>' : '') +
      '<div class="section-title">Foto vom Stundenplan</div>' +
      (foto ? '<div class="tt-foto"><img src="' + foto + '" alt="Foto des Stundenplans" id="tt-img"></div>' : '<p class="hint">Noch kein Foto. Fotografiere den Stundenplan der Schule – er bleibt nur auf diesem Gerät.</p>') +
      '<div class="actions"><label class="btn" for="tt-file">' + (foto ? 'Foto ersetzen' : 'Foto aufnehmen oder wählen') + '</label><input type="file" id="tt-file" accept="image/*" hidden>' +
      (foto ? '<button class="btn" id="tt-fotodel">Foto löschen</button>' : '') + '</div>' +
      '<p class="muted" style="font-size:13px;margin-top:10px">Automatisch aus dem Foto lesen kann die App nicht, weil sie ohne Internet arbeitet. Das Foto bleibt aber immer griffbereit.</p></div>';
    function readInputs() {
      main.querySelectorAll('.tt-in').forEach(function (t) { var v = t.value.trim(); if (v) P.cells[t.dataset.k] = v; else delete P.cells[t.dataset.k]; });
      main.querySelectorAll('.tt-time').forEach(function (t) { P.rows[+t.dataset.r] = t.value.trim(); });
    }
    var b = function (id, fn) { var el = $(id); if (el) el.addEventListener('click', fn); };
    b('#tt-edit', function () { editPlan = true; viewPlan(main); });
    b('#tt-cancel', function () { editPlan = false; load(); viewPlan(main); });
    b('#tt-save', function () { readInputs(); if (save()) { editPlan = false; viewPlan(main); } });
    b('#tt-addrow', function () { readInputs(); P.rows.push(''); viewPlan(main); });
    b('#tt-delrow', function () { readInputs(); if (P.rows.length > 1) { var i = P.rows.length - 1; P.rows.pop(); DAYS.forEach(function (d) { delete P.cells[d[0] + '-' + i]; }); } viewPlan(main); });
    b('#tt-fotodel', function () { if (confirm('Foto löschen?')) { try { localStorage.removeItem(FOTO); } catch (e) {} viewPlan(main); } });
    b('#tt-img', function () { var im = $('#tt-img'); im.classList.toggle('zoom'); });
    $('#tt-file').addEventListener('change', function (ev) {
      var f = ev.target.files[0]; if (!f) return;
      var img = new Image(), url = URL.createObjectURL(f);
      img.onload = function () {
        var max = 1600, w = img.naturalWidth, h = img.naturalHeight, sc = Math.min(1, max / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = Math.round(w * sc); c.height = Math.round(h * sc);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
        var data = c.toDataURL('image/jpeg', 0.78);
        try { localStorage.setItem(FOTO, data); } catch (e) { try { localStorage.setItem(FOTO, c.toDataURL('image/jpeg', 0.55)); } catch (x) { alert('Das Foto ist zu groß für den Speicher.'); } }
        viewPlan(main);
      };
      img.src = url;
    });
  }

  /* ---------- Kalender ---------- */
  var calMonth = null, calSel = null, calEdit = null;
  function upcoming(n) {
    var t = iso(new Date());
    return P.cal.filter(function (e) { return (e.end || e.date) >= t; }).sort(function (a, b) { return (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')); }).slice(0, n || 999);
  }
  function entryHtml(e) {
    var t = typeOf(e.type);
    return '<li class="cal-e" data-id="' + esc(e.id) + '"><span class="cal-dot" style="background:' + t[2] + '"></span><div class="cal-et"><small>' + deDate(e.date) + (e.end && e.end !== e.date ? ' – ' + deDate(e.end) : '') + (e.time ? ' · ' + esc(e.time) + ' Uhr' : '') + ' · ' + esc(t[1]) + (e.subj && subj(e.subj) ? ' · ' + esc(subj(e.subj)[1]) : '') + '</small><b>' + esc(e.title) + '</b>' + (e.note ? '<span>' + esc(e.note) + '</span>' : '') + '</div>' +
      '<div class="cal-ea"><button class="btn cal-ics" title="In den Kalender des Handys übernehmen">📅</button><button class="btn cal-ed" title="Bearbeiten">✎</button></div></li>';
  }
  function viewCal(main) {
    document.title = 'Kalender – Lernen 8';
    var now = new Date(); if (!calMonth) calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    var y = calMonth.getFullYear(), m = calMonth.getMonth(), first = new Date(y, m, 1), startDow = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    var byDay = {};
    P.cal.forEach(function (e) {
      var d = parseIso(e.date), end = e.end ? parseIso(e.end) : d;
      for (var x = new Date(d); x <= end; x.setDate(x.getDate() + 1)) { var k = iso(x); (byDay[k] = byDay[k] || []).push(e); }
    });
    var cells = '';
    for (var i = 0; i < startDow; i++) cells += '<span class="cal-d empty"></span>';
    for (var dd = 1; dd <= days; dd++) {
      var k = y + '-' + z(m + 1) + '-' + z(dd), ev = byDay[k] || [], cls = 'cal-d' + (k === iso(now) ? ' today' : '') + (k === calSel ? ' sel' : '') + (ev.length ? ' has' : '');
      cells += '<button class="' + cls + '" data-d="' + k + '"><span>' + dd + '</span>' + ev.slice(0, 2).map(function (e) {
        var sj = e.subj && subj(e.subj);
        return '<em class="chip" style="background:' + typeOf(e.type)[2] + '">' + esc(SHORT[e.type] || e.title.split(' ')[0]) + (sj ? '<br><b>' + esc(sj[2]) + '</b>' : '') + '</em>';
      }).join('') + (ev.length > 2 ? '<em class="more">+' + (ev.length - 2) + '</em>' : '') + '</button>';
    }
    var list = calSel ? (byDay[calSel] || []) : upcoming();
    var editing = calEdit ? P.cal.filter(function (e) { return e.id === calEdit; })[0] : null;
    var f = editing || { date: calSel || iso(now), type: 'ka', title: '', time: '', note: '', end: '' };
    main.innerHTML = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Kalender</div><h1>Kalender</h1>' +
      '<div class="cal-nav"><button class="btn" id="cal-prev" aria-label="Voriger Monat">‹</button><b>' + ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][m] + ' ' + y + '</b><button class="btn" id="cal-next" aria-label="Nächster Monat">›</button></div>' +
      '<div class="cal-grid">' + ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(function (w) { return '<span class="cal-w">' + w + '</span>'; }).join('') + cells + '</div>' +
      '<div class="actions" style="margin:10px 0"><button class="btn primary" id="cal-new">+ Termin' + (calSel ? ' am ' + deDate(calSel) : '') + '</button>' + (calSel ? '<button class="btn" id="cal-all">Alle kommenden zeigen</button>' : '') + (P.cal.length ? '<button class="btn" id="cal-export">Alle in den Handy-Kalender</button>' : '') + '</div>' +
      '<div id="cal-form"' + (calEdit ? '' : ' hidden') + ' class="cal-form"><h3>' + (editing ? 'Termin bearbeiten' : 'Neuer Termin') + '</h3>' +
        '<label>Art<select id="cf-type" class="sel">' + TYPES.map(function (t) { return '<option value="' + t[0] + '"' + (f.type === t[0] ? ' selected' : '') + '>' + t[1] + '</option>'; }).join('') + '</select></label>' +
        '<label>Lernfeld / Fach<select id="cf-subj" class="sel"><option value="">– ohne –</option>' + subjects().map(function (x) { return '<option value="' + x[0] + '"' + (f.subj === x[0] ? ' selected' : '') + '>' + esc(x[1]) + '</option>'; }).join('') + '</select></label>' +
        '<label>Titel<input id="cf-title" class="gq" value="' + esc(f.title) + '" placeholder="z. B. Wohnfläche und Kaution (oder leer lassen)"></label>' +
        '<div class="cf-row"><label>Datum<input type="date" id="cf-date" class="gq" value="' + esc(f.date) + '"></label><label>bis (optional)<input type="date" id="cf-end" class="gq" value="' + esc(f.end || '') + '"></label><label>Uhrzeit<input type="time" id="cf-time" class="gq" value="' + esc(f.time || '') + '"></label></div>' +
        '<label>Notiz<textarea id="cf-note" class="gq" rows="2" placeholder="z. B. Themen: Kaution, Wohnfläche">' + esc(f.note || '') + '</textarea></label>' +
        '<div class="actions"><button class="btn primary" id="cf-save">Speichern</button><button class="btn" id="cf-cancel">Abbrechen</button>' + (editing ? '<button class="btn" id="cf-del">Löschen</button>' : '') + '</div></div>' +
      '<div class="section-title">' + (calSel ? 'Termine am ' + deDate(calSel) : 'Kommende Termine') + '</div>' +
      (list.length ? '<ul class="cal-list">' + list.map(entryHtml).join('') + '</ul>' : '<p class="hint">' + (calSel ? 'Keine Termine an diesem Tag.' : 'Noch keine Termine. Trag Klassenarbeiten, Schulblöcke und Prüfungen ein.') + '</p>') + '</div>';
    var b = function (id, fn) { var el = $(id); if (el) el.addEventListener('click', fn); };
    b('#cal-prev', function () { calMonth = new Date(y, m - 1, 1); viewCal(main); });
    b('#cal-next', function () { calMonth = new Date(y, m + 1, 1); viewCal(main); });
    b('#cal-all', function () { calSel = null; viewCal(main); });
    b('#cal-new', function () { calEdit = null; $('#cal-form').hidden = false; $('#cf-title').focus(); });
    b('#cf-cancel', function () { calEdit = null; viewCal(main); });
    b('#cf-del', function () { if (confirm('Termin löschen?')) { P.cal = P.cal.filter(function (e) { return e.id !== calEdit; }); save(); calEdit = null; viewCal(main); } });
    b('#cf-save', function () {
      var t = $('#cf-title').value.trim(), d = $('#cf-date').value, sjv = $('#cf-subj').value;
      if (!t && sjv) t = typeOf($('#cf-type').value)[1] + ' ' + subj(sjv)[1];
      if (!t) { $('#cf-title').focus(); return; } if (!d) { $('#cf-date').focus(); return; }
      var e = { id: calEdit || 'c' + Date.now(), type: $('#cf-type').value, subj: $('#cf-subj').value, title: t, date: d, end: $('#cf-end').value > d ? $('#cf-end').value : '', time: $('#cf-time').value, note: $('#cf-note').value.trim() };
      P.cal = P.cal.filter(function (x) { return x.id !== e.id; }); P.cal.push(e);
      if (save()) { calEdit = null; calSel = d; var dd = parseIso(d); calMonth = new Date(dd.getFullYear(), dd.getMonth(), 1); viewCal(main); }
    });
    b('#cal-export', function () { shareIcs(P.cal, 'Lernen-8-Termine.ics'); });
    main.querySelectorAll('.cal-d[data-d]').forEach(function (el) { el.addEventListener('click', function () { calSel = calSel === el.dataset.d ? null : el.dataset.d; viewCal(main); }); });
    main.querySelectorAll('.cal-e').forEach(function (li) {
      var e = P.cal.filter(function (x) { return x.id === li.dataset.id; })[0];
      li.querySelector('.cal-ed').addEventListener('click', function () { calEdit = e.id; viewCal(main); window.scrollTo(0, $('#cal-form').offsetTop - 120); });
      li.querySelector('.cal-ics').addEventListener('click', function () { shareIcs([e], 'Termin.ics'); });
    });
  }
  /* Kalenderdatei (.ics) – lässt sich in den Kalender von iPhone, Android oder Outlook übernehmen */
  function icsText(list) {
    function esc2(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
    function dt(d) { return d.replace(/-/g, ''); }
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lernen 8//Lern-App//DE', 'CALSCALE:GREGORIAN'];
    list.forEach(function (e) {
      L.push('BEGIN:VEVENT', 'UID:' + e.id + '@lernen-8', 'DTSTAMP:' + stamp);
      if (e.time && !e.end) {
        var p = e.time.split(':'), s = parseIso(e.date); s.setHours(+p[0], +p[1]); var en = new Date(s.getTime() + 90 * 60000);
        var f = function (d) { return d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + 'T' + z(d.getHours()) + z(d.getMinutes()) + '00'; };
        L.push('DTSTART:' + f(s), 'DTEND:' + f(en));
      } else {
        var endD = parseIso(e.end || e.date); endD.setDate(endD.getDate() + 1);
        L.push('DTSTART;VALUE=DATE:' + dt(e.date), 'DTEND;VALUE=DATE:' + dt(iso(endD)));
      }
      var tn = typeOf(e.type)[1], sj = e.subj && subj(e.subj), tt = e.title || (tn + (sj ? ' ' + sj[1] : ''));
      if (tt.toLowerCase().indexOf(tn.split(' ')[0].toLowerCase()) !== 0) tt = tn + ': ' + tt;
      if (sj && tt.indexOf(sj[1]) < 0 && tt.indexOf(sj[2]) < 0) tt += ' (' + sj[1] + ')';
      L.push('SUMMARY:' + esc2(tt));
      if (e.note) L.push('DESCRIPTION:' + esc2(e.note));
      if (e.type === 'ka' || e.type === 'test' || e.type === 'vok') L.push('BEGIN:VALARM', 'TRIGGER:-P2D', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc2('In 2 Tagen: ' + e.title), 'END:VALARM');
      L.push('END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.join('\r\n') + '\r\n';
  }
  function shareIcs(list, name) {
    var blob = new Blob([icsText(list)], { type: 'text/calendar' }), file = null;
    try { file = new File([blob], name, { type: 'text/calendar' }); } catch (x) {}
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: name }).catch(function () {}); return; }
    var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 60000);
  }
  function nextHtml() {
    var n = upcoming(3); if (!n.length) return '';
    return '<div class="section-title">Nächste Termine</div><ul class="cal-list mini">' + n.map(function (e) {
      var t = typeOf(e.type); return '<li><a href="#/kalender"><span class="cal-dot" style="background:' + t[2] + '"></span><small>' + deDate(e.date) + '</small> ' + esc(e.title) + '</a></li>';
    }).join('') + '</ul>';
  }
  window.ImmoPlan = { viewPlan: viewPlan, viewCal: viewCal, nextHtml: nextHtml, data: function () { return P; }, restore: function (d) { if (d) { P = d; save(); load(); } }, icsText: icsText };
})();
