/* Lernen 8 – Online-Statistik (freiwillig). Sendet nur nach Einwilligung von Kind und Eltern:
   Spitzname, Geräteart und Lernzahlen je Tag an das Supabase-Projekt in Frankfurt. Keine Notizen, keine Namen. */
(function () {
  'use strict';
  var CFG = window.L8_SYNC || {};
  var TABLE = CFG.table || 'lernen8_tage';
  var KEY = 'l8-sync', PKEY = 'l8-sync-eltern';
  var IDLE = 120e3, HOUR = 36e5;
  var snapFn = function () { return {}; };

  function configured() { return !!(CFG.url && CFG.key); }
  function load(k) { try { return JSON.parse(localStorage.getItem(k) || 'null') || {}; } catch (e) { return {}; } }
  function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var D = load(KEY);
  function save() { store(KEY, D); }
  function active() { return configured() && !!(D.consent && D.nick); }
  function sending() { return active() && D.on !== false; }

  function z2(v) { return (v < 10 ? '0' : '') + v; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + z2(d.getMonth() + 1) + '-' + z2(d.getDate()); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtTime(t) { var d = new Date(t); return z2(d.getDate()) + '.' + z2(d.getMonth() + 1) + '.' + d.getFullYear() + ', ' + z2(d.getHours()) + ':' + z2(d.getMinutes()) + ' Uhr'; }
  function fmtDay(k) { var p = String(k).split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]); return ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()] + ' ' + p[2] + '.' + p[1] + '.'; }
  function deviceName() {
    var u = navigator.userAgent || '';
    return /iPad/.test(u) ? 'iPad' : /iPhone/.test(u) ? 'iPhone' : /Android/.test(u) ? (/Mobile/.test(u) ? 'Android-Handy' : 'Android-Tablet') : /Mac/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows-PC' : 'Gerät';
  }
  function today() {
    D.days = D.days || {}; var k = dayKey();
    var d = D.days[k] || (D.days[k] = { ms: 0, c: 0, qr: 0, qw: 0, er: 0, ew: 0 });
    (D.dirty = D.dirty || {})[k] = 1; return d;
  }

  /* ---------- Lernzeit: zählt nur, wenn die App sichtbar ist und bedient wird ---------- */
  var lastAct = 0, saveT = 0;
  function touch() {
    if (!active() || document.hidden) return;
    var now = Date.now();
    if (lastAct && now - lastAct < IDLE) { today().ms += now - lastAct; if (now - saveT > 15e3) { saveT = now; save(); } }
    lastAct = now;
  }
  ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) { window.addEventListener(ev, touch, { passive: true, capture: true }); });
  window.addEventListener('scroll', touch, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { touch(); lastAct = 0; save(); send(false, true); } else { send(false); }
  });
  window.addEventListener('online', function () { send(false); });
  setInterval(function () { send(false); }, 5 * 60e3);

  function card(ok) { if (!active()) return; var d = today(); d.c++; if (ok) d.qr++; else d.qw++; save(); }
  function exam(ok) { if (!active()) return; var d = today(); if (ok) d.er++; else d.ew++; save(); }

  /* ---------- Verbindung zu Supabase (ohne Zusatzbibliothek) ---------- */
  function api(path, opt, token) {
    opt = opt || {};
    var h = { apikey: CFG.key, 'Content-Type': 'application/json' };
    if (token) h.Authorization = 'Bearer ' + token;
    Object.keys(opt.headers || {}).forEach(function (k) { h[k] = opt.headers[k]; });
    return fetch(CFG.url.replace(/\/$/, '') + path, { method: opt.method || 'GET', headers: h, body: opt.body ? JSON.stringify(opt.body) : undefined, keepalive: !!opt.keepalive })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {} if (!r.ok) { var err = new Error((j && (j.msg || j.message || j.error_description || j.error)) || ('Fehler ' + r.status)); err.status = r.status; throw err; } return j; }); });
  }
  function takeSession(o, j) { o.at = j.access_token; o.rt = j.refresh_token; o.exp = Date.now() + (j.expires_in || 3600) * 1000; if (j.user && j.user.id) o.uid = j.user.id; }
  function kidSession() {
    if (D.at && D.exp > Date.now() + 60e3) return Promise.resolve(D.at);
    var p = D.rt ? api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: D.rt } }) : Promise.reject(new Error('neu'));
    return p.catch(function (e) {
      if (D.rt && e.status && e.status < 500 && e.status !== 429) { D.rt = ''; }
      else if (D.rt) throw e;
      return api('/auth/v1/signup', { method: 'POST', body: { data: {} } });
    }).then(function (j) { takeSession(D, j); save(); return D.at; });
  }

  var busy = false;
  function rowsToSend() {
    var s = {}; try { s = snapFn() || {}; } catch (e) {}
    var t = today(); t.due = s.due || 0; t.st = s.streak || 0; t.x = s.extra || null; t.seen = new Date().toISOString();
    return Object.keys(D.dirty || {}).filter(function (k) { return D.days[k]; }).map(function (k) {
      var d = D.days[k];
      return { user_id: D.uid, nick: D.nick, device: D.device || deviceName(), day: k, minutes: Math.min(1440, Math.round(d.ms / 60e3)), cards_learned: d.c, quiz_right: d.qr, quiz_wrong: d.qw, exam_right: d.er, exam_wrong: d.ew, due: d.due || 0, streak: d.st || 0, last_seen: d.seen || new Date().toISOString(), extra: d.x || null };
    });
  }
  function send(force, leaving) {
    if (!sending() || busy) return Promise.resolve(false);
    if (navigator.onLine === false) return Promise.resolve(false);
    if (!force && D.last && Date.now() - D.last < HOUR) return Promise.resolve(false);
    busy = true;
    return kidSession().then(function (tok) {
      var rows = rowsToSend(); if (!rows.length) return true;
      var post = function (tk) { rows.forEach(function (r) { r.user_id = D.uid; }); return api('/rest/v1/' + TABLE + '?on_conflict=user_id,day', { method: 'POST', body: rows, keepalive: !!leaving, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' } }, tk); };
      return post(tok).catch(function (e) { if (e.status === 401) { D.at = ''; return kidSession().then(post); } throw e; });
    }).then(function () {
      D.dirty = {}; D.last = Date.now(); D.err = '';
      var old = dayKey(new Date(Date.now() - 40 * 864e5)); Object.keys(D.days || {}).forEach(function (k) { if (k < old) delete D.days[k]; });
      save(); busy = false; return true;
    }).catch(function (e) { D.err = String(e.message || e); save(); busy = false; return false; });
  }

  /* ---------- Seite „Online-Übersicht“ für das Kind: Einwilligung, Stand, Abmelden ---------- */
  var WHAT = '<ul class="plain-list"><li><b>Was:</b> dein Spitzname, die Geräteart (z. B. „iPhone“) und je Tag: Lernminuten, Anzahl Karten, richtig und falsch, fällige Karten, Serie, Stand je Fach und die nächste Klassenarbeit.</li>' +
    '<li><b>Nicht:</b> kein echter Name, keine Notizen, keine Markierungen, kein Ort.</li>' +
    '<li><b>Wohin:</b> auf einen Server von Supabase in Frankfurt (EU).</li>' +
    '<li><b>Wer sieht es:</b> nur die eingetragenen Eltern mit eigener Anmeldung.</li>' +
    '<li><b>Löschen:</b> automatisch nach 12 Monaten, oder sofort mit dem Knopf „Abmelden und alles löschen“.</li></ul>';
  function viewKonto(main) {
    document.title = 'Online-Übersicht – Lernen 8';
    var head = '<div class="content"><div class="crumb"><a href="#/">Start</a> › Online-Übersicht</div><h1>Online-Übersicht</h1>';
    if (!configured()) { main.innerHTML = head + '<p class="lead">Die Online-Übersicht ist noch nicht eingerichtet. Alles bleibt nur auf diesem Gerät.</p></div>'; return; }
    if (!active()) {
      main.innerHTML = head + '<p class="lead">Wenn du willst, sieht ein Elternteil auf dem eigenen Handy, wie viel du gelernt hast. Das ist freiwillig.</p>' + WHAT +
        '<form id="kf" class="pinf"><label for="nick">Spitzname (bitte nicht dein voller Name)</label><input id="nick" class="gq" maxlength="30" autocomplete="off" placeholder="z. B. Kapitän8">' +
        '<label class="chk"><input type="checkbox" id="c1"> Ich bin einverstanden.</label><label class="chk"><input type="checkbox" id="c2"> Ein Elternteil ist einverstanden.</label>' +
        '<button class="btn primary" type="submit">Anmelden</button><p id="kmsg" class="muted" aria-live="polite"></p></form>' +
        '<p class="muted" style="font-size:13px">Du kannst das Senden jederzeit wieder ausschalten.</p></div>';
      main.querySelector('#kf').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var n = main.querySelector('#nick').value.trim().replace(/\s+/g, ' '), msg = main.querySelector('#kmsg');
        if (n.length < 2) { msg.textContent = 'Bitte einen Spitznamen mit mindestens 2 Zeichen eingeben.'; return; }
        if (!main.querySelector('#c1').checked || !main.querySelector('#c2').checked) { msg.textContent = 'Bitte beide Häkchen setzen. Sonst bleibt alles nur auf dem Gerät.'; return; }
        D = { nick: n, consent: { kid: true, parent: true, at: new Date().toISOString() }, on: true, device: deviceName(), days: {}, dirty: {} };
        today(); save(); msg.textContent = 'Verbinde …';
        send(true).then(function (ok) { viewKonto(main); });
      });
      return;
    }
    var stat = D.on === false ? 'Senden ist ausgeschaltet. Gezählt wird nur noch auf dem Gerät.'
      : D.last ? 'Zuletzt gesendet: ' + esc(fmtTime(D.last)) + '.' : 'Noch nichts gesendet.';
    main.innerHTML = head + '<p class="lead">Angemeldet als <b>' + esc(D.nick) + '</b>. ' + stat + '</p>' +
      (D.err && D.on !== false ? '<p class="hint">Das letzte Senden hat nicht geklappt (' + esc(D.err) + '). Die Zahlen bleiben gespeichert und gehen später mit.</p>' : '') +
      WHAT + '<div class="actions"><button class="btn primary" id="snow">Jetzt senden</button>' +
      '<button class="btn" id="stog">' + (D.on === false ? 'Senden wieder einschalten' : 'Senden ausschalten') + '</button>' +
      '<button class="btn" id="sdel">Abmelden und alles löschen</button></div><p id="smsg" class="muted" aria-live="polite"></p></div>';
    var msg = main.querySelector('#smsg');
    main.querySelector('#snow').addEventListener('click', function () { msg.textContent = 'Sende …'; send(true).then(function (ok) { msg.textContent = ok ? '✓ gesendet' : 'Hat nicht geklappt. Ist das Internet an?'; if (ok) setTimeout(function () { viewKonto(main); }, 800); }); });
    main.querySelector('#stog').addEventListener('click', function () { D.on = D.on === false; save(); viewKonto(main); });
    main.querySelector('#sdel').addEventListener('click', function () {
      if (!confirm('Alle gesendeten Zahlen werden auf dem Server sofort gelöscht. Dein Lernstand auf diesem Gerät bleibt. Fortfahren?')) return;
      msg.textContent = 'Lösche …';
      var done = function () { D = {}; save(); viewKonto(main); };
      if (!D.rt && !D.at) return done();
      kidSession().then(function (tok) { return api('/rest/v1/rpc/alles_loeschen', { method: 'POST', body: {} }, tok); })
        .then(done).catch(function (e) { msg.textContent = 'Löschen hat nicht geklappt (' + e.message + '). Bitte mit Internet nochmal versuchen.'; });
    });
  }

  /* ---------- Online-Übersicht für Eltern (eigene Anmeldung mit E-Mail und Passwort) ---------- */
  var P = load(PKEY);
  function parentSession() {
    if (P.at && P.exp > Date.now() + 60e3) return Promise.resolve(P.at);
    if (!P.rt) return Promise.reject(new Error('login'));
    return api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: P.rt } })
      .then(function (j) { takeSession(P, j); store(PKEY, P); return P.at; })
      .catch(function (e) { if (e.status && e.status < 500) { P = {}; store(PKEY, P); throw new Error('login'); } throw e; });
  }
  function pct(r, w) { return r + w ? Math.round(r * 100 / (r + w)) + ' %' : '–'; }
  function mins(m) { return m >= 60 ? Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : m + ' min'; }
  function since(t) {
    var m = Math.round((Date.now() - new Date(t)) / 60e3);
    return m < 2 ? 'gerade eben' : m < 60 ? 'vor ' + m + ' Minuten' : m < 1440 ? 'vor ' + Math.round(m / 60) + ' Stunden' : 'vor ' + Math.round(m / 1440) + ' Tagen';
  }
  function kidBlock(rows) {
    rows.sort(function (a, b) { return a.day < b.day ? 1 : -1; });
    var last = rows.reduce(function (a, r) { return !a || r.last_seen > a.last_seen ? r : a; }, null);
    var byDay = {}; rows.forEach(function (r) { var d = byDay[r.day] || (byDay[r.day] = { m: 0, c: 0, qr: 0, qw: 0, er: 0, ew: 0 }); d.m += r.minutes; d.c += r.cards_learned; d.qr += r.quiz_right; d.qw += r.quiz_wrong; d.er += r.exam_right; d.ew += r.exam_wrong; });
    var week = [], sum = { m: 0, c: 0, qr: 0, qw: 0, er: 0, ew: 0 }, max = 20;
    for (var i = 6; i >= 0; i--) { var k = dayKey(new Date(Date.now() - i * 864e5)), d = byDay[k] || { m: 0, c: 0, qr: 0, qw: 0, er: 0, ew: 0 }; week.push([k, d]); Object.keys(sum).forEach(function (x) { sum[x] += d[x]; }); max = Math.max(max, d.m); }
    var x = last.extra || {}, ka = x.ka, ff = (x.faecher || []).filter(function (f) { return f.n; });
    var bars = '<div class="wbars">' + week.map(function (w) {
      return '<div class="wb' + (w[0] === dayKey() ? ' heute' : '') + '"><div class="wcol"><i style="height:' + Math.round(w[1].m * 100 / max) + '%"></i></div><b>' + w[1].m + '</b><span>' + esc(fmtDay(w[0]).slice(0, 2)) + '</span></div>';
    }).join('') + '</div>';
    var hist = Object.keys(byDay).sort().reverse().slice(0, 14).map(function (k) { var d = byDay[k]; return '<tr><th>' + esc(fmtDay(k)) + '</th><td>' + mins(d.m) + '</td><td>' + d.c + '</td><td>' + pct(d.qr, d.qw) + '</td><td>' + pct(d.er, d.ew) + '</td></tr>'; }).join('');
    return '<div class="section-title">' + esc(last.nick) + '</div>' +
      '<p class="t-sub">Zuletzt aktiv: ' + esc(since(last.last_seen)) + ' (' + esc(fmtTime(last.last_seen)) + ', ' + esc(last.device || 'Gerät') + ')</p>' +
      '<div class="today"><div class="t-row"><div class="t-box"><b>' + mins(sum.m) + '</b><span>Lernzeit 7 Tage</span></div><div class="t-box"><b>' + sum.c + '</b><span>Karten 7 Tage</span></div><div class="t-box"><b>' + last.streak + '</b><span>Tage Serie</span></div></div>' +
      '<div class="t-row"><div class="t-box"><b>' + pct(sum.qr, sum.qw) + '</b><span>Karten gewusst</span></div><div class="t-box"><b>' + pct(sum.er, sum.ew) + '</b><span>Aufgaben richtig</span></div><div class="t-box"><b>' + last.due + '</b><span>Karten fällig</span></div></div>' +
      bars + '<p class="t-sub">Minuten je Tag, letzte 7 Tage</p></div>' +
      (ka ? '<p class="hint">Nächste: <b>' + esc(ka.t) + '</b> am ' + esc(fmtDay(ka.d)) + ' · ' + esc(ka.bereit) + ' % der Karten sicher.</p>' : '') +
      (ff.length ? '<div class="tablewrap"><table class="ftable"><tr><th>Fach</th><td><b>Aufgaben richtig</b></td></tr>' + ff.map(function (f) { return '<tr><th>' + esc(f.f) + '</th><td>' + esc(f.q) + ' % von ' + esc(f.n) + '</td></tr>'; }).join('') + '</table></div>' : '') +
      '<div class="tablewrap"><table class="ftable hist"><tr><th>Tag</th><td><b>Zeit</b></td><td><b>Karten</b></td><td><b>gewusst</b></td><td><b>Aufg.</b></td></tr>' + hist + '</table></div>';
  }
  function viewOnline(main) {
    document.title = 'Online-Übersicht Eltern – Lernen 8';
    var head = '<div class="content eltern"><div class="crumb"><a href="#/">Start</a> › <a href="#/eltern">Elternblick</a> › Online</div><h1>Online-Übersicht</h1>';
    if (!configured()) { main.innerHTML = head + '<p class="lead">Noch nicht eingerichtet.</p></div>'; return; }
    function loginForm(err) {
      main.innerHTML = head + '<p class="lead">Hier siehst du die Lernzahlen aller angemeldeten Kinder, von allen Geräten. Melde dich mit deinem Eltern-Zugang an.</p>' +
        '<form id="lf" class="pinf"><input id="lm" class="gq" type="email" autocomplete="username" placeholder="E-Mail" aria-label="E-Mail">' +
        '<input id="lp" class="gq" type="password" autocomplete="current-password" placeholder="Passwort" aria-label="Passwort">' +
        '<button class="btn primary" type="submit">Anmelden</button><p id="lmsg" class="muted" aria-live="polite">' + esc(err || '') + '</p></form></div>';
      main.querySelector('#lf').addEventListener('submit', function (ev) {
        ev.preventDefault(); var m = main.querySelector('#lmsg'); m.textContent = 'Melde an …';
        api('/auth/v1/token?grant_type=password', { method: 'POST', body: { email: main.querySelector('#lm').value.trim(), password: main.querySelector('#lp').value } })
          .then(function (j) { P = {}; takeSession(P, j); store(PKEY, P); show(); })
          .catch(function (e) { m.textContent = e.status === 400 ? 'E-Mail oder Passwort stimmt nicht.' : 'Anmeldung hat nicht geklappt (' + e.message + ').'; });
      });
    }
    function show() {
      main.innerHTML = head + '<p class="lead">Lade …</p></div>';
      var from = dayKey(new Date(Date.now() - 30 * 864e5));
      parentSession().then(function (tok) {
        return api('/rest/v1/' + TABLE + '?select=*&day=gte.' + from + '&order=day.desc&limit=3000', {}, tok);
      }).then(function (rows) {
        var by = {}; (rows || []).forEach(function (r) { var k = String(r.nick).toLowerCase(); (by[k] = by[k] || []).push(r); });
        var keys = Object.keys(by).sort();
        main.innerHTML = head + '<p class="lead">Stand: ' + esc(fmtTime(Date.now())) + '. Zahlen der letzten 30 Tage.</p>' +
          (keys.length ? keys.map(function (k) { return kidBlock(by[k]); }).join('') : '<p class="hint">Noch keine Daten. Entweder hat sich noch kein Kind angemeldet, oder dein Zugang steht noch nicht in der Eltern-Liste.</p>') +
          '<div class="actions noprint"><button class="btn" id="oref">Neu laden</button><button class="btn" id="oout">Abmelden</button></div></div>';
        main.querySelector('#oref').addEventListener('click', show);
        main.querySelector('#oout').addEventListener('click', function () { P = {}; store(PKEY, P); loginForm(''); });
      }).catch(function (e) { if (e.message === 'login') loginForm(''); else main.innerHTML = head + '<p class="hint">Laden hat nicht geklappt (' + esc(e.message) + '). Ist das Internet an?</p></div>'; });
    }
    if (P.rt) show(); else loginForm('');
  }

  function statusText() { return !configured() ? '' : active() ? (D.on === false ? 'aus' : 'an') : 'freiwillig'; }

  window.L8Sync = { configured: configured, active: active, card: card, exam: exam, send: send, setSnapshot: function (f) { snapFn = f; }, viewKonto: viewKonto, viewOnline: viewOnline, statusText: statusText };
  setTimeout(function () { send(false); }, 3000);
})();
