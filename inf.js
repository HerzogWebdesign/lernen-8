window.L8 = window.L8 || [];
window.L8.push({
 "id": "inf",
 "kind": "fach",
 "nr": 10,
 "title": "Informatik und Medienbildung",
 "short": "Informatik · Klasse 8",
 "color": "#34495e",
 "icon": "💻",
 "hours": "1 Wochenstunde (Plan 2019: ca. 30 Stunden)",
 "intro": "Sensoren programmieren, Daten mit der Tabellenkalkulation auswerten und Suchmaschinen verstehen – alles aus dem Rahmenplan für Klasse 8.",
 "source": "Rahmenplan Informatik und Medienbildung, Regionale Schule/Gesamtschule, 2019, Klasse 8",
 "topics": [
  {
   "id": "inf-1",
   "title": "Sensorgesteuerte Anwendungen entwickeln",
   "subs": [
    {
     "id": "inf-1-1",
     "title": "Sensoren und ihr Wertebereich",
     "content": [
      {
       "p": "Ein **Sensor** ist ein Messfühler. Er misst eine Größe aus der Umwelt."
      },
      {
       "p": "Ein **Informatiksystem** ist ein Gerät mit Hardware und Software. Beispiele: Handy, Smartwatch, Mikrocontroller."
      },
      {
       "h": "Sensoren im Alltag"
      },
      {
       "rules": [
        [
         "Lichtsensor",
         [
          "Das Handy dimmt den Bildschirm im Dunkeln."
         ]
        ],
        [
         "Temperatursensor",
         [
          "Die Heizung misst die Raumtemperatur."
         ]
        ],
        [
         "Bewegungssensor",
         [
          "Das Flurlicht in der Schule geht von selbst an."
         ]
        ],
        [
         "Lagesensor",
         [
          "Das Handy dreht das Bild beim Kippen."
         ]
        ]
       ]
      },
      {
       "p": "Das Programm **fragt** den Sensor **ab**. Es liest also seinen aktuellen Wert."
      },
      {
       "p": "Der **Wertebereich** sind alle Werte, die ein Sensor liefern kann. Er reicht vom kleinsten bis zum größten Wert."
      },
      {
       "ex": "Ein Lichtsensor liefert Werte von 0 bis 255. Bei 0 ist es ganz dunkel, bei 255 sehr hell."
      },
      {
       "note": "Den Wertebereich findest du heraus: Miss im Dunkeln und im Hellen. Oder lies in der Beschreibung des Sensors nach."
      }
     ],
     "card": {
      "title": "Sensoren",
      "frage": "Was ist ein Sensor, und was bedeutet sein Wertebereich?",
      "rules": [
       [
        "Sensor",
        [
         "Messfühler",
         "misst eine Größe der Umwelt"
        ]
       ],
       [
        "Beispiele",
        [
         "Licht, Temperatur",
         "Bewegung, Lage"
        ]
       ],
       [
        "Abfragen",
        [
         "Programm liest den Sensorwert"
        ]
       ],
       [
        "Wertebereich",
        [
         "kleinster bis größter Wert"
        ]
       ],
       [
        "Beispiel",
        [
         "Lichtsensor: 0 bis 255",
         "0 = dunkel, 255 = hell"
        ]
       ]
      ],
      "merke": "Merke: Ein Sensor misst. Sein Wertebereich reicht vom kleinsten bis zum größten Wert.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Sensorgesteuerte Anwendungen entwickeln“: Sensorwerte abfragen und verarbeiten, Sensoren identifizieren, Wertebereich ermitteln (S. 25)"
    },
    {
     "id": "inf-1-2",
     "title": "Analog-Digital-Wandlung",
     "content": [
      {
       "p": "Viele Größen sind **analog**. Das heißt: stufenlos. Die Temperatur kann jeden Zwischenwert haben."
      },
      {
       "p": "Ein Computer kann nur **digitale** Werte speichern. Das sind einzelne, abgezählte Stufen."
      },
      {
       "p": "Die **Analog-Digital-Wandlung** macht aus dem stufenlosen Wert eine Stufe. Man sagt auch: Der Wert wird auf **diskrete** Werte abgebildet. Diskret heißt: einzeln, mit Abstand dazwischen."
      },
      {
       "rules": [
        [
         "analog",
         [
          "stufenlos, jeder Zwischenwert",
          "z. B. echte Temperatur"
         ]
        ],
        [
         "digital",
         [
          "feste Stufen",
          "z. B. 0 °C, 0,5 °C, 1 °C …"
         ]
        ],
        [
         "Wandlung",
         [
          "Der Messwert wird auf die nächstgelegene Stufe gerundet."
         ]
        ]
       ]
      },
      {
       "ex": "Der Sensor misst in Stufen von 0,5 °C. Die echte Temperatur am Strand von Rügen ist 18,3 °C. Gespeichert wird 18,5 °C."
      },
      {
       "p": "Wie viele Stufen gibt es? Teile den Bereich durch die Schrittweite. Dann zähle 1 dazu, weil der Anfangswert auch eine Stufe ist."
      },
      {
       "calc": {
        "title": "Stufen von 0 °C bis 40 °C in Schritten von 0,5 °C",
        "rows": [
         {
          "label": "Bereich: 40 °C – 0 °C",
          "n": "40"
         },
         {
          "op": ":",
          "label": "Schrittweite",
          "n": "0,5"
         },
         {
          "op": "+",
          "label": "Anfangswert mitzählen",
          "n": "1"
         },
         {
          "op": "=",
          "label": "Anzahl der Stufen",
          "n": "81",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Kleinere Stufen machen die Messung genauer. Dann braucht man aber mehr Speicher."
      }
     ],
     "card": {
      "title": "Von analog zu digital",
      "frage": "Was passiert bei der Analog-Digital-Wandlung? Erkläre an einem Beispiel.",
      "rules": [
       [
        "analog",
        [
         "stufenlos, jeder Zwischenwert"
        ]
       ],
       [
        "digital",
        [
         "feste Stufen (diskrete Werte)"
        ]
       ],
       [
        "Wandlung",
        [
         "Messwert auf Stufe runden"
        ]
       ],
       [
        "Beispiel",
        [
         "Stufen von 0,5 °C",
         "18,3 °C → 18,5 °C"
        ]
       ],
       [
        "Stufen zählen",
        [
         "= Bereich : Schritt + 1",
         "= 40 : 0,5 + 1 = **81**"
        ]
       ]
      ],
      "merke": "Merke: Ein stufenloser Messwert wird auf eine von vielen festen Stufen gesetzt.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Sensorgesteuerte Anwendungen entwickeln“: das Prinzip der Analog-Digital-Wandlung exemplarisch erläutern, stufenlose Größe wie Temperatur auf diskrete Werte abbilden (S. 25)"
    },
    {
     "id": "inf-1-3",
     "title": "Blockbasiert programmieren",
     "content": [
      {
       "p": "In einer **blockbasierten** Programmiersprache setzt du Bausteine zusammen. Du musst keinen Text tippen."
      },
      {
       "p": "Ein **Algorithmus** ist eine genaue Schritt-für-Schritt-Anleitung. Das Programm setzt ihn um."
      },
      {
       "h": "Wichtige Bausteine"
      },
      {
       "rules": [
        [
         "Variable",
         [
          "Ein Speicherplatz mit Namen.",
          "z. B. „licht“ speichert den Sensorwert."
         ]
        ],
        [
         "Schleife",
         [
          "Wiederholt Blöcke.",
          "„wiederhole fortlaufend“ läuft ohne Ende."
         ]
        ],
        [
         "Bedingung",
         [
          "„falls … dann … sonst“",
          "Das Programm prüft und entscheidet."
         ]
        ],
        [
         "Vergleich",
         [
          "z. B. licht < 30",
          "Ergebnis: wahr oder falsch"
         ]
        ]
       ]
      },
      {
       "h": "Beispiel: Nachtlicht"
      },
      {
       "rules": [
        [
         "Schleife",
         [
          "wiederhole fortlaufend:"
         ]
        ],
        [
         "Variable",
         [
          "setze licht auf Lichtsensorwert"
         ]
        ],
        [
         "Bedingung",
         [
          "falls licht < 30: LED an",
          "sonst: LED aus"
         ]
        ]
       ]
      },
      {
       "note": "Die Schleife ist wichtig. Ohne sie prüft das Programm den Sensor nur ein einziges Mal."
      }
     ],
     "card": {
      "title": "Bausteine im Programm",
      "frage": "Welche Bausteine brauchst du für ein Nachtlicht mit Lichtsensor?",
      "rules": [
       [
        "Variable",
        [
         "Speicher mit Namen",
         "licht = Sensorwert"
        ]
       ],
       [
        "Schleife",
        [
         "wiederhole fortlaufend"
        ]
       ],
       [
        "Bedingung",
        [
         "falls … dann … sonst"
        ]
       ],
       [
        "Nachtlicht",
        [
         "falls licht < 30: LED an",
         "sonst: LED aus"
        ]
       ]
      ],
      "merke": "Merke: Schleife wiederholt, Bedingung entscheidet, Variable speichert.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Sensorgesteuerte Anwendungen entwickeln“: Algorithmieren mit einer blockbasierten Programmiersprache festigen; Sensorwerte verarbeiten (S. 25)"
    },
    {
     "id": "inf-1-4",
     "title": "Spezifikation prüfen und erweitern",
     "content": [
      {
       "p": "Eine **Spezifikation** ist die genaue Beschreibung, was ein System können soll. Erst danach wird programmiert."
      },
      {
       "h": "Prüfen: Ist die Beschreibung genau?"
      },
      {
       "rules": [
        [
         "ungenau",
         [
          "„Bei Dunkelheit geht das Licht an.“",
          "Was heißt dunkel?"
         ]
        ],
        [
         "genau",
         [
          "„Ist der Lichtwert unter 30, geht die LED an. Sonst ist sie aus.“"
         ]
        ]
       ]
      },
      {
       "p": "Prüfe auch: Fehlt ein Fall? Ist klar, was genau bei 30 passiert?"
      },
      {
       "h": "Erweitern: Was soll es noch können?"
      },
      {
       "ex": "Neue Anforderung: „Drückst du Taste A, bleibt die LED aus. Erst ein neuer Druck auf Taste A schaltet zurück.“ So stört das Licht nachts nicht."
      },
      {
       "note": "Je genauer die Spezifikation, desto leichter kannst du später testen."
      }
     ],
     "card": {
      "title": "Die Spezifikation",
      "frage": "Was ist eine Spezifikation, und wie prüfst du sie?",
      "rules": [
       [
        "Spezifikation",
        [
         "genaue Beschreibung, was",
         "das System können soll"
        ]
       ],
       [
        "Prüfen",
        [
         "Ist alles genau? (Zahlen!)",
         "Fehlt ein Fall?"
        ]
       ],
       [
        "Beispiel",
        [
         "nicht „dunkel“",
         "sondern „Lichtwert unter 30“"
        ]
       ],
       [
        "Erweitern",
        [
         "neue Anforderung ergänzen"
        ]
       ]
      ],
      "merke": "Merke: Erst genau beschreiben, dann programmieren.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Sensorgesteuerte Anwendungen entwickeln“: eine Spezifikation prüfen und erweitern; Spezifikation als exakte Beschreibung der gewünschten Funktionalität (S. 25)"
    },
    {
     "id": "inf-1-5",
     "title": "Dokumentieren und systematisch testen",
     "content": [
      {
       "p": "**Dokumentieren** heißt: aufschreiben, wie die Anwendung funktioniert. So verstehen andere und du selbst sie später."
      },
      {
       "rules": [
        [
         "Kommentar",
         [
          "Kurze Erklärung direkt im Programm"
         ]
        ],
        [
         "Prozessdokumentation",
         [
          "Was hast du wann gemacht und warum?"
         ]
        ],
        [
         "Bedienungsanleitung",
         [
          "So benutzt man die Anwendung."
         ]
        ]
       ]
      },
      {
       "p": "**Systematisch testen** heißt: geplant und der Reihe nach prüfen. Du probierst nicht nur irgendwas aus."
      },
      {
       "h": "Testfälle für das Nachtlicht"
      },
      {
       "rules": [
        [
         "Lichtwert 10",
         [
          "erwartet: LED an"
         ]
        ],
        [
         "Lichtwert 29",
         [
          "erwartet: LED an (knapp unter der Grenze)"
         ]
        ],
        [
         "Lichtwert 30",
         [
          "erwartet: LED aus (genau die Grenze)"
         ]
        ],
        [
         "Lichtwert 200",
         [
          "erwartet: LED aus"
         ]
        ]
       ]
      },
      {
       "p": "Vergleiche das erwartete Ergebnis mit dem echten Ergebnis. Weicht es ab, suchst du den Fehler und verbesserst das Programm."
      },
      {
       "note": "Teste besonders die Werte an der Grenze. Dort passieren die meisten Fehler."
      }
     ],
     "card": {
      "title": "Doku und Test",
      "frage": "Wie dokumentierst du eine Anwendung, und wie testest du sie systematisch?",
      "rules": [
       [
        "Dokumentieren",
        [
         "Kommentar im Programm",
         "Prozessdokumentation",
         "Bedienungsanleitung"
        ]
       ],
       [
        "Testfall",
        [
         "Eingabe + erwartetes Ergebnis"
        ]
       ],
       [
        "Vergleich",
        [
         "erwartet und echt gleich?"
        ]
       ],
       [
        "Grenzwerte",
        [
         "z. B. 29 und 30 testen"
        ]
       ],
       [
        "Abweichung",
        [
         "Fehler suchen, verbessern"
        ]
       ]
      ],
      "merke": "Merke: Plane Testfälle vorher und prüfe besonders die Grenzwerte.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Sensorgesteuerte Anwendungen entwickeln“: eine Anwendung realisieren und dokumentieren (Kommentar, Prozessdokumentation, Bedienungsanleitung); eine Anwendung systematisch testen (S. 25)"
    }
   ]
  },
  {
   "id": "inf-2",
   "title": "Daten automatisiert auswerten",
   "subs": [
    {
     "id": "inf-2-1",
     "title": "Tabellen planen und Datenreihen fortsetzen",
     "content": [
      {
       "p": "Eine **Tabellenkalkulation** ist ein Programm für Tabellen. Es kann mit den Zahlen rechnen."
      },
      {
       "rules": [
        [
         "Spalte",
         [
          "senkrecht, hat einen Buchstaben: A, B, C"
         ]
        ],
        [
         "Zeile",
         [
          "waagerecht, hat eine Zahl: 1, 2, 3"
         ]
        ],
        [
         "Zelle",
         [
          "ein Kästchen",
          "Ihre Adresse ist z. B. B3."
         ]
        ],
        [
         "Datenreihe",
         [
          "zusammengehörige Werte",
          "z. B. Temperaturen einer Woche"
         ]
        ]
       ]
      },
      {
       "h": "Planen"
      },
      {
       "p": "Überlege zuerst: Welche Datenreihen brauche ich? Was steht oben in der Kopfzeile?"
      },
      {
       "ex": "Wetter auf Rügen: Spalte A = Tag, Spalte B = Temperatur, Spalte C = Regen in mm. Das sind mehrere Datenreihen in einer Tabelle."
      },
      {
       "h": "Automatisch fortsetzen"
      },
      {
       "p": "Schreibe „Mo“ in A2. Ziehe das kleine Quadrat unten rechts an der Zelle nach unten. Dann erscheinen Di, Mi, Do … von selbst."
      },
      {
       "p": "Das klappt auch mit Zahlen: Schreibe 1 und 2 untereinander, markiere beide und ziehe. Es folgen 3, 4, 5."
      },
      {
       "note": "**Interpretieren** heißt: Was sagen die Zahlen? Zum Beispiel: An welchem Tag war es am wärmsten?"
      }
     ],
     "card": {
      "title": "Aufbau einer Tabelle",
      "frage": "Wie ist eine Tabelle aufgebaut, und wie setzt du eine Datenreihe fort?",
      "rules": [
       [
        "Spalte",
        [
         "senkrecht, Buchstabe"
        ]
       ],
       [
        "Zeile",
        [
         "waagerecht, Zahl"
        ]
       ],
       [
        "Zelle",
        [
         "Adresse z. B. B3"
        ]
       ],
       [
        "Datenreihe",
        [
         "zusammengehörige Werte"
        ]
       ],
       [
        "Fortsetzen",
        [
         "Mo eingeben",
         "Ecke unten rechts ziehen",
         "→ Di, Mi, Do …"
        ]
       ]
      ],
      "merke": "Merke: Erst die Tabelle planen, dann Datenreihen automatisch fortsetzen lassen.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Daten automatisiert auswerten“: Tabellen mit mehreren Datenreihen planen, erstellen und interpretieren; automatisiertes Erzeugen oder Fortsetzen von Datenreihen (S. 26)"
    },
    {
     "id": "inf-2-2",
     "title": "Formeln: SUMME, MITTELWERT, MIN, MAX, ANZAHL",
     "content": [
      {
       "p": "Eine **Formel** beginnt immer mit dem Gleichheitszeichen =. Dann rechnet das Programm selbst."
      },
      {
       "p": "Der Doppelpunkt bedeutet „von … bis“. B2:B6 sind die Zellen B2, B3, B4, B5 und B6."
      },
      {
       "p": "Mehrere Bereiche trennst du mit einem **Semikolon** ;. Beispiel: =SUMME(B2:B6;D2:D6) addiert beide Bereiche."
      },
      {
       "h": "Wichtige Funktionen"
      },
      {
       "rules": [
        [
         "=SUMME(B2:B6)",
         [
          "addiert alle Werte"
         ]
        ],
        [
         "=MITTELWERT(B2:B6)",
         [
          "Summe geteilt durch die Anzahl der Werte"
         ]
        ],
        [
         "=MIN(B2:B6)",
         [
          "kleinster Wert"
         ]
        ],
        [
         "=MAX(B2:B6)",
         [
          "größter Wert"
         ]
        ],
        [
         "=ANZAHL(B2:B6)",
         [
          "zählt die Zellen mit Zahlen"
         ]
        ]
       ]
      },
      {
       "ex": "In B2 bis B6 stehen die Temperaturen von Montag bis Freitag: 12, 14, 9, 11 und 14 °C."
      },
      {
       "calc": {
        "title": "So rechnet =MITTELWERT(B2:B6)",
        "rows": [
         {
          "label": "Montag",
          "n": "12"
         },
         {
          "op": "+",
          "label": "Dienstag",
          "n": "14"
         },
         {
          "op": "+",
          "label": "Mittwoch",
          "n": "9"
         },
         {
          "op": "+",
          "label": "Donnerstag",
          "n": "11"
         },
         {
          "op": "+",
          "label": "Freitag",
          "n": "14"
         },
         {
          "op": "=",
          "label": "Summe",
          "n": "60"
         },
         {
          "op": ":",
          "label": "Anzahl der Werte",
          "n": "5"
         },
         {
          "op": "=",
          "label": "Mittelwert in °C",
          "n": "12",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Hier ist MIN = 9 und MAX = 14. ANZAHL ergibt 5."
      },
      {
       "note": "Ändert sich eine Zahl in der Tabelle, rechnet die Formel sofort neu."
      }
     ],
     "card": {
      "title": "Fünf Funktionen",
      "frage": "Was berechnen SUMME, MITTELWERT, MIN, MAX und ANZAHL?",
      "rules": [
       [
        "Formel",
        [
         "beginnt mit ="
        ]
       ],
       [
        "B2:B6",
        [
         "von B2 bis B6"
        ]
       ],
       [
        "Semikolon ;",
        [
         "trennt: =SUMME(B2:B3;B5)"
        ]
       ],
       [
        "SUMME",
        [
         "alle Werte addiert"
        ]
       ],
       [
        "MITTELWERT",
        [
         "Summe : Anzahl"
        ]
       ],
       [
        "MIN / MAX",
        [
         "kleinster / größter Wert"
        ]
       ],
       [
        "ANZAHL",
        [
         "Zellen mit Zahlen"
        ]
       ],
       [
        "Beispiel",
        [
         "12, 14, 9, 11, 14",
         "= 60 : 5 = **12**"
        ]
       ]
      ],
      "merke": "Merke: Jede Formel beginnt mit =. Der Doppelpunkt heißt „von … bis“.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Daten automatisiert auswerten“: Formeln mit arithmetischen Funktionen interpretieren und entwickeln: min(), max(), anzahl(), mittelwert(), summe() (S. 26)"
    },
    {
     "id": "inf-2-3",
     "title": "Relative und absolute Zellbezüge",
     "content": [
      {
       "p": "Ein **Zellbezug** ist die Adresse einer Zelle in einer Formel, z. B. B2."
      },
      {
       "p": "Kopierst du eine Formel, passt das Programm die Bezüge an. Das ist ein **relativer** Bezug."
      },
      {
       "ex": "In D2 steht =B2*C2. Du kopierst die Formel nach D3. Dort steht dann =B3*C3."
      },
      {
       "p": "Manchmal soll ein Bezug fest bleiben. Dann setzt du ein $ vor Buchstabe und Zahl. Das ist ein **absoluter** Bezug."
      },
      {
       "p": "Jedes $ hält nur das fest, was direkt dahinter steht: $B die Spalte, $1 die Zeile."
      },
      {
       "rules": [
        [
         "relativ: B2",
         [
          "wandert beim Kopieren mit"
         ]
        ],
        [
         "absolut: $B$1",
         [
          "bleibt beim Kopieren gleich"
         ]
        ]
       ]
      },
      {
       "h": "Beispiel: Klassenfahrt nach Stralsund"
      },
      {
       "p": "In B1 steht der Eintritt je Person: 8 €. In A3 bis A5 stehen die Anzahlen der Schüler je Gruppe."
      },
      {
       "rules": [
        [
         "B3",
         [
          "=A3*$B$1"
         ]
        ],
        [
         "B4 (kopiert)",
         [
          "=A4*$B$1"
         ]
        ],
        [
         "B5 (kopiert)",
         [
          "=A5*$B$1"
         ]
        ]
       ]
      },
      {
       "calc": {
        "title": "Gruppe in Zeile 3 mit 6 Personen",
        "rows": [
         {
          "label": "A3: Personen",
          "n": "6"
         },
         {
          "op": "×",
          "label": "$B$1: Eintritt je Person",
          "n": "8 €"
         },
         {
          "op": "=",
          "label": "B3: Kosten",
          "n": "48 €",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Das Zeichen * steht in Formeln für „mal“. Ohne $ würde aus B1 beim Kopieren B2 und B3. Dort steht aber kein Preis."
      }
     ],
     "card": {
      "title": "Bezüge beim Kopieren",
      "frage": "Was passiert mit B2 und mit $B$1, wenn du eine Formel kopierst?",
      "rules": [
       [
        "relativ: B2",
        [
         "wandert beim Kopieren mit",
         "=B2*C2 → =B3*C3"
        ]
       ],
       [
        "absolut: $B$1",
        [
         "bleibt immer gleich"
        ]
       ],
       [
        "$",
        [
         "$ vor B: Spalte fest",
         "$ vor 1: Zeile fest"
        ]
       ],
       [
        "Beispiel",
        [
         "=A3*$B$1 → =A4*$B$1"
        ]
       ],
       [
        "Wann $?",
        [
         "ein fester Wert für alle",
         "z. B. ein Preis"
        ]
       ]
      ],
      "merke": "Merke: Mit $ bleibt ein Bezug beim Kopieren fest.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Daten automatisiert auswerten“: absolute und relative Zellbezüge verwenden; Kopieren von Formeln (S. 26)"
    },
    {
     "id": "inf-2-4",
     "title": "Sortieren und bedingte Formatierung",
     "content": [
      {
       "h": "Nach mehreren Kriterien sortieren"
      },
      {
       "p": "Ein **Kriterium** ist ein Merkmal, nach dem du ordnest. Du kannst nacheinander nach mehreren Kriterien sortieren."
      },
      {
       "rules": [
        [
         "1. Kriterium",
         [
          "Klasse, z. B. erst alle 8a, dann alle 8b"
         ]
        ],
        [
         "2. Kriterium",
         [
          "innerhalb jeder Klasse nach Punkten"
         ]
        ]
       ]
      },
      {
       "p": "Das zweite Kriterium gilt nur, wenn beim ersten Gleichstand ist."
      },
      {
       "p": "Sortiert wird **aufsteigend** (klein nach groß, A bis Z) oder **absteigend** (groß nach klein)."
      },
      {
       "note": "Markiere beim Sortieren die ganze Tabelle. Sonst passen die Zeilen nicht mehr zusammen."
      },
      {
       "h": "Bedingte Formatierung"
      },
      {
       "p": "Bei der **bedingten Formatierung** ändert eine Zelle ihr Aussehen von selbst. Das passiert, wenn eine Bedingung erfüllt ist."
      },
      {
       "ex": "Temperatur unter 0 °C → Zelle wird blau. Temperatur über 25 °C → Zelle wird rot. So siehst du Frosttage und heiße Tage sofort."
      },
      {
       "p": "**Zweckmäßig** heißt: Nutze nur wenige Farben mit klarer Bedeutung. Zu viele Farben verwirren."
      }
     ],
     "card": {
      "title": "Ordnen und hervorheben",
      "frage": "Wie sortierst du nach zwei Kriterien? Was macht bedingte Formatierung?",
      "rules": [
       [
        "1. Kriterium",
        [
         "zuerst danach ordnen",
         "z. B. Klasse"
        ]
       ],
       [
        "2. Kriterium",
        [
         "nur bei Gleichstand",
         "z. B. Punkte"
        ]
       ],
       [
        "Richtung",
        [
         "aufsteigend oder absteigend"
        ]
       ],
       [
        "Formatierung",
        [
         "Zelle färbt sich von selbst,",
         "wenn Bedingung erfüllt ist"
        ]
       ],
       [
        "Beispiel",
        [
         "unter 0 °C → blau"
        ]
       ]
      ],
      "merke": "Merke: Das zweite Kriterium entscheidet nur bei Gleichstand im ersten.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Daten automatisiert auswerten“: Daten nach mehreren Kriterien sortieren; bedingte Formatierung zweckmäßig einsetzen (S. 26)"
    },
    {
     "id": "inf-2-5",
     "title": "So funktioniert Sortieren",
     "content": [
      {
       "p": "Ein **Sortierverfahren** ist ein Algorithmus zum Ordnen. Das Programm folgt dabei festen Schritten."
      },
      {
       "p": "Du kannst das mit Spielkarten oder Zetteln selbst ausprobieren."
      },
      {
       "h": "Sortieren durch Auswählen"
      },
      {
       "rules": [
        [
         "1. Schritt",
         [
          "Suche die kleinste Zahl im ungeordneten Teil."
         ]
        ],
        [
         "2. Schritt",
         [
          "Tausche sie an die vorderste freie Stelle."
         ]
        ],
        [
         "3. Schritt",
         [
          "Wiederhole, bis alles geordnet ist."
         ]
        ]
       ]
      },
      {
       "h": "Beispiel: 5, 2, 8, 1"
      },
      {
       "rules": [
        [
         "Runde 1",
         [
          "kleinste ist 1, tausche mit 5",
          "→ 1, 2, 8, 5"
         ]
        ],
        [
         "Runde 2",
         [
          "kleinste im Rest ist 2, bleibt",
          "→ 1, 2, 8, 5"
         ]
        ],
        [
         "Runde 3",
         [
          "kleinste im Rest ist 5, tausche mit 8",
          "→ 1, 2, 5, 8"
         ]
        ]
       ]
      },
      {
       "note": "Es gibt viele andere Verfahren, z. B. das Vertauschen von Nachbarn. Alle führen zum gleichen Ergebnis, aber unterschiedlich schnell."
      }
     ],
     "card": {
      "title": "Ein Sortierverfahren",
      "frage": "Wie sortierst du Zahlen Schritt für Schritt durch Auswählen?",
      "rules": [
       [
        "Schritt 1",
        [
         "kleinste Zahl im Rest suchen"
        ]
       ],
       [
        "Schritt 2",
        [
         "an die vorderste freie",
         "Stelle tauschen"
        ]
       ],
       [
        "Schritt 3",
        [
         "wiederholen bis zum Ende"
        ]
       ],
       [
        "Beispiel",
        [
         "5, 2, 8, 1",
         "→ 1, 2, 8, 5",
         "→ 1, 2, 5, 8"
        ]
       ]
      ],
      "merke": "Merke: Immer das Kleinste suchen und nach vorne holen.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Daten automatisiert auswerten“: das Prinzip des Sortierens anhand eines beliebigen Verfahrens anschaulich beschreiben; Sortierverfahren enaktiv-haptisch erkunden (S. 26)"
    }
   ]
  },
  {
   "id": "inf-3",
   "title": "Suchmaschinen verstehen",
   "subs": [
    {
     "id": "inf-3-1",
     "title": "Aufbau einer Suchmaschine",
     "content": [
      {
       "p": "Eine **Suchmaschine** ist ein besonderes Datenbanksystem. Eine **Datenbank** ist ein geordneter Speicher für viele Daten."
      },
      {
       "p": "Die Suchmaschine durchsucht nicht in dem Moment das ganze Internet. Sie sucht in ihrer eigenen Datenbank."
      },
      {
       "h": "Vier Teile"
      },
      {
       "rules": [
        [
         "Crawler",
         [
          "Suchroboter: ein Programm.",
          "Er besucht Webseiten und folgt Links.",
          "Er sammelt die Inhalte automatisch."
         ]
        ],
        [
         "Indexer",
         [
          "Ordnet die gesammelten Daten.",
          "Speichert sie in der Datenbank.",
          "Wie ein Stichwortverzeichnis im Buch."
         ]
        ],
        [
         "Suchmaske",
         [
          "Das Suchfeld für deine Anfrage.",
          "Die Anfrage wird aufbereitet.",
          "Dann geht sie als Abfrage an die Datenbank."
         ]
        ],
        [
         "Ranking",
         [
          "Ein Algorithmus sortiert die Treffer.",
          "Was er für passend hält, steht oben."
         ]
        ]
       ]
      },
      {
       "ex": "Du suchst „Fähre Rügen“. Der Index weiß längst, welche Seiten diese Wörter enthalten. Das Ranking legt fest, was oben steht."
      },
      {
       "note": "Ranking heißt Rangfolge. Nach welchen Kriterien genau sortiert wird, verraten die Anbieter meist nicht."
      }
     ],
     "card": {
      "title": "Teile einer Suchmaschine",
      "frage": "Aus welchen Teilen besteht eine Suchmaschine? Was macht jeder Teil?",
      "rules": [
       [
        "Crawler",
        [
         "besucht Seiten, folgt Links",
         "sammelt Inhalte"
        ]
       ],
       [
        "Indexer",
        [
         "ordnet und speichert",
         "in der Datenbank"
        ]
       ],
       [
        "Suchmaske",
        [
         "nimmt die Anfrage an",
         "fragt die Datenbank ab"
        ]
       ],
       [
        "Ranking",
        [
         "sortiert die Treffer"
        ]
       ]
      ],
      "merke": "Merke: Crawler sammelt, Indexer ordnet, Suchmaske fragt, Ranking sortiert.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Suchmaschinen verstehen“: Aufbau und Funktionsweise einer Suchmaschine beschreiben: Suchroboter, Indexer und Datenbank, Suchmaske und Abfrage, Algorithmus zum Sortieren (S. 27)"
    },
    {
     "id": "inf-3-2",
     "title": "Was das Suchergebnis beeinflusst",
     "content": [
      {
       "p": "Zwei Menschen können dasselbe suchen und andere Treffer bekommen. Das hat Gründe."
      },
      {
       "rules": [
        [
         "Formulierung",
         [
          "Welche Wörter du nimmst.",
          "Wie viele Wörter du nimmst."
         ]
        ],
        [
         "Geodaten",
         [
          "Daten über deinen Standort.",
          "„Eisdiele“ zeigt Läden in deiner Nähe."
         ]
        ],
        [
         "Metadaten",
         [
          "Daten über Daten, z. B. Sprache oder Datum einer Seite."
         ]
        ],
        [
         "Suchmaschine",
         [
          "Jede hat ihren eigenen Index und ihr eigenes Ranking."
         ]
        ]
       ]
      },
      {
       "ex": "„Wetter“ bringt allgemeine Seiten. „Wetter Sassnitz morgen“ bringt genau das, was du brauchst."
      },
      {
       "p": "Tipp: Nutze genaue Wörter. Probiere verschiedene Formulierungen aus."
      },
      {
       "note": "Bei vielen Suchmaschinen sucht ein Text in Anführungszeichen genau diese Wortfolge."
      }
     ],
     "card": {
      "title": "Andere Suche, andere Treffer",
      "frage": "Welche Faktoren beeinflussen, welche Treffer du bekommst?",
      "rules": [
       [
        "Formulierung",
        [
         "welche und wie viele Wörter"
        ]
       ],
       [
        "Geodaten",
        [
         "dein Standort"
        ]
       ],
       [
        "Metadaten",
        [
         "Daten über Daten",
         "z. B. Sprache, Datum"
        ]
       ],
       [
        "Suchmaschine",
        [
         "eigener Index und Ranking"
        ]
       ],
       [
        "Tipp",
        [
         "genaue Wörter nutzen",
         "Formulierungen variieren"
        ]
       ]
      ],
      "merke": "Merke: Wörter, Standort, Metadaten und die Suchmaschine selbst ändern das Ergebnis.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Suchmaschinen verstehen“: den Einfluss von Faktoren auf das Ergebnis einer Suchanfrage untersuchen, beschreiben und bewerten: Formulierung, Geo- und Metadaten, Wahl der Suchmaschine (S. 27)"
    },
    {
     "id": "inf-3-3",
     "title": "Suchergebnisse bewerten",
     "content": [
      {
       "p": "Nicht alles, was oben steht, stimmt auch. Prüfe darum jede Quelle."
      },
      {
       "h": "Drei Prüffragen"
      },
      {
       "rules": [
        [
         "Authentizität",
         [
          "Echtheit: Ist die Quelle die, die sie vorgibt?",
          "Wer steckt dahinter? Schau ins Impressum."
         ]
        ],
        [
         "Vertrauenswürdigkeit",
         [
          "Kennt sich der Anbieter aus?",
          "Will er informieren oder verkaufen?",
          "Ist die Seite aktuell?"
         ]
        ],
        [
         "Wahrheitsgehalt",
         [
          "Stimmt die Aussage?",
          "Gibt es Belege?",
          "Sagen andere Quellen dasselbe?"
         ]
        ]
       ]
      },
      {
       "p": "Das **Impressum** nennt, wer für die Seite verantwortlich ist. Viele Seiten in Deutschland müssen eins haben."
      },
      {
       "ex": "Eine Seite behauptet: „Auf Rügen gibt es keinen Strand.“ Die Seite des Landkreises und ein Atlas zeigen das Gegenteil. Die Aussage ist falsch."
      },
      {
       "note": "Vergleiche immer mindestens zwei unabhängige Quellen."
      }
     ],
     "card": {
      "title": "Quellen prüfen",
      "frage": "Mit welchen drei Prüffragen bewertest du ein Suchergebnis?",
      "rules": [
       [
        "Authentizität",
        [
         "Echtheit: Wer steckt dahinter?",
         "Impressum ansehen"
        ]
       ],
       [
        "Vertrauenswürdigkeit",
        [
         "Fachwissen? Aktuell?",
         "informieren oder verkaufen?"
        ]
       ],
       [
        "Wahrheitsgehalt",
        [
         "Belege vorhanden?",
         "andere Quellen vergleichen"
        ]
       ]
      ],
      "merke": "Merke: Prüfe, wer dahintersteckt, ob man ihm trauen kann und ob es stimmt.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Suchmaschinen verstehen“: verschiedene Herangehensweisen zum Bewerten eines Suchergebnisses nutzen: Authentizität und Vertrauenswürdigkeit der Quelle, Wahrheitsgehalt (S. 27)"
    },
    {
     "id": "inf-3-4",
     "title": "Die Macht der Suchmaschinen",
     "content": [
      {
       "p": "Sehr viele Menschen nutzen nur wenige Suchmaschinen. Was dort oben steht, sehen also sehr viele."
      },
      {
       "h": "Warum Suchmaschinen Macht haben"
      },
      {
       "rules": [
        [
         "Rangfolge",
         [
          "Die meisten klicken nur die ersten Treffer an.",
          "Was weit hinten steht, sieht kaum jemand."
         ]
        ],
        [
         "Werbung",
         [
          "Bezahlte Anzeigen stehen oft ganz oben.",
          "Sie müssen als Anzeige gekennzeichnet sein."
         ]
        ],
        [
         "Filterblase",
         [
          "Die Treffer können sich deinen früheren Suchen anpassen.",
          "Du siehst dann vor allem Ähnliches."
         ]
        ],
        [
         "Daten",
         [
          "Viele Suchmaschinen speichern, was du suchst."
         ]
        ]
       ]
      },
      {
       "p": "So beeinflussen Suchmaschinen, was du weißt und was du denkst."
      },
      {
       "h": "Was du tun kannst"
      },
      {
       "ul": [
        "Schau auch weiter unten und auf Seite 2.",
        "Erkenne Anzeigen und überspringe sie.",
        "Probiere mal eine andere Suchmaschine.",
        "Bilde dir deine Meinung aus mehreren Quellen."
       ]
      }
     ],
     "card": {
      "title": "Macht der Suche",
      "frage": "Warum haben Suchmaschinen Macht? Was kannst du dagegen tun?",
      "rules": [
       [
        "Rangfolge",
        [
         "oben = wird gesehen"
        ]
       ],
       [
        "Werbung",
        [
         "Anzeigen stehen oft oben"
        ]
       ],
       [
        "Filterblase",
        [
         "Treffer oft an dich angepasst"
        ]
       ],
       [
        "Daten",
        [
         "Suchen werden oft gespeichert"
        ]
       ],
       [
        "Du",
        [
         "Anzeigen erkennen",
         "mehrere Quellen nutzen",
         "andere Suchmaschine testen"
        ]
       ]
      ],
      "merke": "Merke: Suchmaschinen bestimmen mit, was du siehst. Nutze darum mehrere Quellen.",
      "quelle": "RP Informatik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Informatik und Medienbildung Regionale Schule/Gesamtschule 2019, Klasse 8, Thema „Suchmaschinen verstehen“: die Macht einer Suchmaschine einschätzen und persönliche Schlussfolgerungen ableiten; Auswirkung von Suchergebnissen auf Handeln und Meinungsbildung (S. 27)"
    }
   ]
  }
 ]
});
