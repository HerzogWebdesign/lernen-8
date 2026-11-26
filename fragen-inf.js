window.L8_FRAGEN = (window.L8_FRAGEN || []).concat([
 {
  "id": "q-inf-1-1-1",
  "ref": "inf-1-1",
  "type": "mc",
  "q": "Welcher Sensor sorgt dafür, dass das Handy den Bildschirm im Dunkeln dimmt?",
  "options": [
   "ein Temperatursensor",
   "ein Lichtsensor",
   "ein Lagesensor",
   "ein Mikrofon"
  ],
  "correct": [
   1
  ],
  "why": "Der Lichtsensor misst die Helligkeit. Ist es dunkel, wird der Bildschirm dunkler."
 },
 {
  "id": "q-inf-1-1-2",
  "ref": "inf-1-1",
  "type": "mc",
  "q": "Ein Sensor liefert Werte von 0 bis 1023. Wie nennt man diesen Bereich?",
  "options": [
   "Spezifikation",
   "Schleife",
   "Index",
   "Wertebereich"
  ],
  "correct": [
   3
  ],
  "why": "Der Wertebereich reicht vom kleinsten bis zum größten Wert, den der Sensor liefern kann."
 },
 {
  "id": "q-inf-1-2-1",
  "ref": "inf-1-2",
  "type": "mc",
  "q": "Was bedeutet **analog**?",
  "options": [
   "stufenlos, mit jedem Zwischenwert",
   "nur 0 und 1",
   "in festen Stufen",
   "ohne Strom"
  ],
  "correct": [
   0
  ],
  "why": "Analog heißt stufenlos. Digital heißt: feste, abgezählte Stufen."
 },
 {
  "id": "q-inf-1-2-2",
  "ref": "inf-1-2",
  "type": "zahl",
  "q": "Ein Sensor liefert ganze Werte von 0 bis 255. Wie viele verschiedene Werte sind das?",
  "answer": 256,
  "unit": "Werte",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "größter – kleinster Wert: 255 – 0",
     "n": "255"
    },
    {
     "op": "+",
     "label": "Anfangswert 0 mitzählen",
     "n": "1"
    },
    {
     "op": "=",
     "label": "Anzahl der Werte",
     "n": "256",
     "t": "sum"
    }
   ]
  },
  "why": "Vergiss die 0 nicht! Von 0 bis 255 sind es 255 + 1 = 256 Werte."
 },
 {
  "id": "q-inf-1-3-1",
  "ref": "inf-1-3",
  "type": "mc",
  "q": "Welcher Baustein sorgt dafür, dass der Sensor immer wieder abgefragt wird?",
  "options": [
   "die Variable",
   "der Vergleich",
   "die Schleife",
   "der Kommentar"
  ],
  "correct": [
   2
  ],
  "why": "Eine Schleife wiederholt Blöcke. Ohne sie prüft das Programm den Sensor nur einmal."
 },
 {
  "id": "q-inf-1-3-2",
  "ref": "inf-1-3",
  "type": "mc",
  "q": "Wofür brauchst du im Programm eine **Variable**?",
  "options": [
   "Sie speichert einen Wert unter einem Namen.",
   "Sie wiederholt Blöcke.",
   "Sie schaltet die LED an.",
   "Sie beendet das Programm."
  ],
  "correct": [
   0
  ],
  "why": "Eine Variable ist ein Speicherplatz mit Namen, z. B. „licht“ für den Sensorwert."
 },
 {
  "id": "q-inf-1-4-1",
  "ref": "inf-1-4",
  "type": "mc",
  "q": "Welche Beschreibung ist am **genauesten**?",
  "options": [
   "„Bei Dunkelheit geht das Licht an.“",
   "„Das Licht geht manchmal an.“",
   "„Das Licht soll gut funktionieren.“",
   "„Ist der Lichtwert unter 30, geht die LED an.“"
  ],
  "correct": [
   3
  ],
  "why": "Eine Spezifikation muss genau sein. Mit der Zahl 30 ist klar, wann die LED angeht."
 },
 {
  "id": "q-inf-1-4-2",
  "ref": "inf-1-4",
  "type": "mc",
  "q": "Was ist eine **Spezifikation**?",
  "options": [
   "ein Fehler im Programm",
   "die genaue Beschreibung, was ein System können soll",
   "ein Sensor für Licht",
   "eine Formel in der Tabelle"
  ],
  "correct": [
   1
  ],
  "why": "Die Spezifikation beschreibt vorher genau, was das System tun soll."
 },
 {
  "id": "q-inf-1-5-1",
  "ref": "inf-1-5",
  "type": "mc",
  "q": "Die LED soll unter 30 angehen. Welche Testwerte sind besonders wichtig?",
  "options": [
   "0 und 1000",
   "nur 100",
   "29 und 30",
   "nur 5"
  ],
  "correct": [
   2
  ],
  "why": "Werte an der Grenze sind besonders wichtig. Dort passieren die meisten Fehler."
 },
 {
  "id": "q-inf-1-5-2",
  "ref": "inf-1-5",
  "type": "mc",
  "q": "Was gehört **nicht** zur Dokumentation einer Anwendung?",
  "options": [
   "ein Kommentar im Programm",
   "eine Bedienungsanleitung",
   "eine Prozessdokumentation",
   "ein zufälliger Klick auf Start"
  ],
  "correct": [
   3
  ],
  "why": "Dokumentieren heißt aufschreiben. Einfach mal klicken ist weder Dokumentation noch ein geplanter Test."
 },
 {
  "id": "q-inf-2-1-1",
  "ref": "inf-2-1",
  "type": "mc",
  "q": "Welche Adresse hat die Zelle in Spalte C und Zeile 4?",
  "options": [
   "4C",
   "C4",
   "Spalte 4",
   "Zeile C"
  ],
  "correct": [
   1
  ],
  "why": "Zuerst kommt der Buchstabe der Spalte, dann die Zahl der Zeile: C4."
 },
 {
  "id": "q-inf-2-1-2",
  "ref": "inf-2-1",
  "type": "mc",
  "q": "Du schreibst „Mo“ in eine Zelle und ziehst die Ecke unten rechts nach unten. Was passiert?",
  "options": [
   "Di, Mi, Do … erscheinen von selbst.",
   "Die Zelle wird gelöscht.",
   "Überall steht eine 0.",
   "Die Tabelle wird sortiert."
  ],
  "correct": [
   0
  ],
  "why": "Das Programm erkennt die Reihe und setzt sie automatisch fort."
 },
 {
  "id": "q-inf-2-2-1",
  "ref": "inf-2-2",
  "type": "mc",
  "q": "Welche Formel findet den **größten** Wert in B2 bis B6?",
  "options": [
   "=SUMME(B2:B6)",
   "=MIN(B2:B6)",
   "=ANZAHL(B2:B6)",
   "=MAX(B2:B6)"
  ],
  "correct": [
   3
  ],
  "why": "MAX heißt Maximum, also der größte Wert. MIN ist der kleinste."
 },
 {
  "id": "q-inf-2-2-2",
  "ref": "inf-2-2",
  "type": "zahl",
  "q": "In B2 bis B5 stehen die Punkte 8, 6, 10 und 4. Was ergibt =MITTELWERT(B2:B5)?",
  "answer": 7,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "B2",
     "n": "8"
    },
    {
     "op": "+",
     "label": "B3",
     "n": "6"
    },
    {
     "op": "+",
     "label": "B4",
     "n": "10"
    },
    {
     "op": "+",
     "label": "B5",
     "n": "4"
    },
    {
     "op": "=",
     "label": "Summe",
     "n": "28"
    },
    {
     "op": ":",
     "label": "Anzahl der Werte",
     "n": "4"
    },
    {
     "op": "=",
     "label": "Mittelwert",
     "n": "7",
     "t": "sum"
    }
   ]
  },
  "why": "Erst alles addieren: 28. Dann durch die Anzahl teilen: 28 : 4 = 7."
 },
 {
  "id": "q-inf-2-3-1",
  "ref": "inf-2-3",
  "type": "mc",
  "q": "In D2 steht =B2*C2. Du kopierst die Formel nach D3. Was steht dann in D3?",
  "options": [
   "=B2*C2",
   "=B3*C3",
   "=B2*C3",
   "=D2*D3"
  ],
  "correct": [
   1
  ],
  "why": "B2 und C2 sind relative Bezüge. Sie wandern beim Kopieren eine Zeile mit."
 },
 {
  "id": "q-inf-2-3-2",
  "ref": "inf-2-3",
  "type": "mc",
  "q": "Welcher Bezug bleibt beim Kopieren immer gleich?",
  "options": [
   "B1",
   "B$",
   "$B$1",
   "B:1"
  ],
  "correct": [
   2
  ],
  "why": "Das $ vor Buchstabe und Zahl hält den Bezug fest. Das ist ein absoluter Bezug."
 },
 {
  "id": "q-inf-2-4-1",
  "ref": "inf-2-4",
  "type": "mc",
  "q": "Du sortierst erst nach Klasse, dann nach Punkten. Wann zählen die Punkte?",
  "options": [
   "immer zuerst",
   "gar nicht",
   "nur bei der ersten Zeile",
   "nur innerhalb derselben Klasse"
  ],
  "correct": [
   3
  ],
  "why": "Das zweite Kriterium entscheidet nur, wenn beim ersten Gleichstand ist, also in derselben Klasse."
 },
 {
  "id": "q-inf-2-4-2",
  "ref": "inf-2-4",
  "type": "mc",
  "q": "Was macht die **bedingte Formatierung**?",
  "options": [
   "Sie färbt eine Zelle, wenn eine Bedingung erfüllt ist.",
   "Sie löscht leere Zellen.",
   "Sie rechnet den Mittelwert aus.",
   "Sie sortiert nach Namen."
  ],
  "correct": [
   0
  ],
  "why": "Zum Beispiel: Ist der Wert unter 0, wird die Zelle blau. Das passiert von selbst."
 },
 {
  "id": "q-inf-2-5-1",
  "ref": "inf-2-5",
  "type": "mc",
  "q": "Sortieren durch Auswählen: Was machst du in jeder Runde zuerst?",
  "options": [
   "die größte Zahl löschen",
   "zwei Zahlen zufällig tauschen",
   "die kleinste Zahl im Rest suchen",
   "alle Zahlen addieren"
  ],
  "correct": [
   2
  ],
  "why": "Du suchst die kleinste Zahl im ungeordneten Teil und holst sie nach vorn."
 },
 {
  "id": "q-inf-2-5-2",
  "ref": "inf-2-5",
  "type": "mc",
  "q": "Du sortierst 7, 3, 9 durch Auswählen. Wie sieht die Reihe nach Runde 1 aus?",
  "options": [
   "3, 7, 9",
   "9, 3, 7",
   "7, 9, 3",
   "3, 9, 7"
  ],
  "correct": [
   0
  ],
  "why": "Die kleinste Zahl ist 3. Sie tauscht mit der 7 vorne. Ergebnis: 3, 7, 9."
 },
 {
  "id": "q-inf-3-1-1",
  "ref": "inf-3-1",
  "type": "mc",
  "q": "Welcher Teil einer Suchmaschine besucht Webseiten und folgt Links?",
  "options": [
   "der Crawler",
   "die Suchmaske",
   "das Ranking",
   "das Impressum"
  ],
  "correct": [
   0
  ],
  "why": "Der Crawler ist ein Suchroboter. Er sammelt automatisch die Inhalte von Webseiten."
 },
 {
  "id": "q-inf-3-1-2",
  "ref": "inf-3-1",
  "type": "mc",
  "q": "Wo sucht eine Suchmaschine, wenn du auf „Suchen“ klickst?",
  "options": [
   "auf jedem Computer der Welt",
   "in ihrer eigenen Datenbank",
   "nur auf deinem Handy",
   "in einem Buch"
  ],
  "correct": [
   1
  ],
  "why": "Der Crawler hat vorher gesammelt, der Indexer hat geordnet. Jetzt wird nur die Datenbank abgefragt."
 },
 {
  "id": "q-inf-3-2-1",
  "ref": "inf-3-2",
  "type": "mc",
  "q": "Du suchst „Eisdiele“ und bekommst Läden in deiner Nähe. Was ist der Grund?",
  "options": [
   "die Schriftgröße",
   "die Geodaten",
   "der Akkustand",
   "die Uhrzeit des Crawlers"
  ],
  "correct": [
   1
  ],
  "why": "Geodaten sind Daten über deinen Standort. Die Suchmaschine zeigt dann Treffer in der Nähe."
 },
 {
  "id": "q-inf-3-2-2",
  "ref": "inf-3-2",
  "type": "mc",
  "q": "Welche Suchanfrage findet am schnellsten das Wetter für morgen in Sassnitz?",
  "options": [
   "„Wetter“",
   "„Sassnitz“",
   "„morgen“",
   "„Wetter Sassnitz morgen“"
  ],
  "correct": [
   3
  ],
  "why": "Genaue Wörter führen zu genauen Treffern. Ein Wort allein ist zu allgemein."
 },
 {
  "id": "q-inf-3-3-1",
  "ref": "inf-3-3",
  "type": "mc",
  "q": "Wo findest du heraus, wer für eine Webseite verantwortlich ist?",
  "options": [
   "in der Suchmaske",
   "in der Werbung",
   "im Impressum",
   "in der Adressleiste"
  ],
  "correct": [
   2
  ],
  "why": "Das Impressum nennt den Verantwortlichen. Das hilft bei der Frage nach der Echtheit."
 },
 {
  "id": "q-inf-3-3-2",
  "ref": "inf-3-3",
  "type": "mc",
  "q": "Wie prüfst du am besten den **Wahrheitsgehalt** einer Aussage?",
  "options": [
   "Ich glaube dem ersten Treffer.",
   "Ich zähle die Bilder auf der Seite.",
   "Ich vergleiche mit anderen, unabhängigen Quellen.",
   "Ich schaue, wie bunt die Seite ist."
  ],
  "correct": [
   2
  ],
  "why": "Sagen mehrere unabhängige Quellen dasselbe und gibt es Belege, ist die Aussage eher wahr."
 },
 {
  "id": "q-inf-3-4-1",
  "ref": "inf-3-4",
  "type": "mc",
  "q": "Was ist eine **Filterblase**?",
  "options": [
   "ein Fehler im Crawler",
   "eine Werbeanzeige",
   "ein Sensor im Handy",
   "Du siehst vor allem Treffer, die zu deinen früheren Suchen passen."
  ],
  "correct": [
   3
  ],
  "why": "Viele Suchmaschinen passen Treffer an dich an. Dann siehst du vor allem Ähnliches."
 },
 {
  "id": "q-inf-3-4-2",
  "ref": "inf-3-4",
  "type": "mc",
  "q": "Warum haben Suchmaschinen Macht?",
  "options": [
   "Sie bestimmen mit, welche Seiten viele Menschen sehen.",
   "Sie schreiben alle Webseiten selbst.",
   "Sie können das Internet abschalten.",
   "Sie bauen Handys."
  ],
  "correct": [
   0
  ],
  "why": "Die meisten klicken nur oben. Was die Suchmaschine nach oben stellt, sehen sehr viele."
 }
]);
