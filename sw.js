/* Offline-Speicher: alle Dateien der App werden beim ersten Öffnen auf dem Gerät abgelegt. */
var VERSION = 'lernen-8-v10';
var FILES = [
  './', 'index.html', 'styles.css', 'app.js', 'pdf.js', 'plan.js', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'de.js', 'fragen-de.js', 'ma.js', 'fragen-ma.js', 'en.js', 'fragen-en.js', 'ch.js', 'fragen-ch.js', 'ph.js', 'fragen-ph.js', 'bi.js', 'fragen-bi.js', 'ge.js', 'fragen-ge.js', 'geo.js', 'fragen-geo.js', 'sk.js', 'fragen-sk.js', 'awt.js', 'fragen-awt.js', 'inf.js', 'fragen-inf.js', 'mu.js', 'fragen-mu.js', 'ku.js', 'fragen-ku.js', 're.js', 'fragen-re.js', 'ph-k.js', 'fragen-ph-k.js'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return Promise.all(FILES.map(function (f) { return c.add(new Request(f, { cache: 'reload' })).catch(function () {}); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  // Erst das Netz (damit Updates ankommen), ohne Netz der Speicher auf dem Gerät.
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request.url, { cache: 'no-cache' }).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
