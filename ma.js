window.L8 = window.L8 || [];
window.L8.push({
 "id": "ma",
 "kind": "fach",
 "nr": 1,
 "title": "Mathematik",
 "short": "Mathematik · Klasse 8",
 "color": "#1f5fa8",
 "icon": "📐",
 "hours": "ca. 120 Stunden im Schuljahr (4 Wochenstunden)",
 "intro": "Funktionen, Terme, Satz des Pythagoras, Körper und Wahrscheinlichkeit – alles aus dem Rahmenplan für Klasse 8.",
 "source": "Rahmenplan Mathematik, Regionale Schule/Gesamtschule, 2019, Klasse 8 (gültig bis 31.07.2031)",
 "topics": [
  {
   "id": "ma-1",
   "title": "Lineare Funktionen",
   "subs": [
    {
     "id": "ma-1-1",
     "title": "Was ist eine Funktion? (Tabelle, Graph, Gleichung)",
     "content": [
      {
       "p": "Eine **Funktion** ordnet jedem x-Wert genau einen y-Wert zu."
      },
      {
       "p": "Der x-Wert heißt **Stelle** oder **Argument**. Der y-Wert heißt **Funktionswert** f(x)."
      },
      {
       "h": "Drei Darstellungen"
      },
      {
       "rules": [
        [
         "Wertetabelle",
         [
          "Oben stehen die x-Werte.",
          "Darunter steht der passende y-Wert."
         ]
        ],
        [
         "Graph",
         [
          "Jedes Wertepaar ist ein Punkt im Koordinatensystem."
         ]
        ],
        [
         "Gleichung",
         [
          "z. B. f(x) = 2·x + 5"
         ]
        ]
       ]
      },
      {
       "ex": "Handytarif: 5 € Grundgebühr und 2 € je GB Datenvolumen. Die Gleichung ist f(x) = 2·x + 5."
      },
      {
       "calc": {
        "title": "Funktionswert: f(3) bei f(x) = 2·x + 5",
        "rows": [
         {
          "label": "2 € · 3 GB",
          "n": "6 €"
         },
         {
          "op": "+",
          "label": "Grundgebühr",
          "n": "5 €"
         },
         {
          "op": "=",
          "label": "f(3)",
          "n": "11 €",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Der **Definitionsbereich** sind alle x-Werte, die du einsetzen darfst. Der **Wertebereich** sind alle y-Werte, die herauskommen."
      },
      {
       "note": "Gehören zu einem x zwei verschiedene y-Werte, ist es keine Funktion."
      }
     ],
     "card": {
      "title": "Was ist eine Funktion?",
      "frage": "Was macht eine Funktion, und wie kann man sie darstellen?",
      "rules": [
       [
        "Funktion",
        [
         "jedem x genau ein y"
        ]
       ],
       [
        "x",
        [
         "Stelle oder Argument"
        ]
       ],
       [
        "y = f(x)",
        [
         "Funktionswert"
        ]
       ],
       [
        "Darstellung",
        [
         "Wertetabelle",
         "Graph",
         "Gleichung"
        ]
       ],
       [
        "Beispiel",
        [
         "f(x) = 2·x + 5"
        ]
       ],
       [
        "f(3)",
        [
         "= 2 · 3 + 5",
         "= 6 + 5 = **11**"
        ]
       ]
      ],
      "merke": "Merke: Zu jedem x gehört genau ein y.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“: Funktionsbegriff, Darstellungsformen, Stelle, Argument, Funktionswert (S. 22)"
    },
    {
     "id": "ma-1-2",
     "title": "f(x) = m·x + n: Anstieg und y-Achsenabschnitt",
     "content": [
      {
       "p": "Eine **lineare Funktion** hat die Gleichung f(x) = m·x + n. Ihr Graph ist immer eine Gerade."
      },
      {
       "h": "Was m und n bedeuten"
      },
      {
       "rules": [
        [
         "m = Anstieg",
         [
          "m größer als 0 → die Gerade steigt",
          "m kleiner als 0 → die Gerade fällt",
          "m = 0 → die Gerade ist waagerecht"
         ]
        ],
        [
         "n = y-Achsenabschnitt",
         [
          "Hier schneidet die Gerade die y-Achse.",
          "Der Schnittpunkt ist (0 | n)."
         ]
        ]
       ]
      },
      {
       "ex": "f(x) = 2·x + 1: Die Gerade trifft die y-Achse bei 1. Gehst du 1 nach rechts, geht sie 2 nach oben."
      },
      {
       "calc": {
        "title": "Funktionswert berechnen: f(3) bei f(x) = 2·x + 1",
        "rows": [
         {
          "label": "m · x = 2 · 3",
          "n": "6"
         },
         {
          "op": "+",
          "label": "n",
          "n": "1"
         },
         {
          "op": "=",
          "label": "f(3)",
          "n": "7",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Der Funktionswert f(x) ist der y-Wert. Der Punkt heißt hier (3 | 7)."
      },
      {
       "note": "Bei f(x) = m·x + n darfst du jede Zahl für x einsetzen (Definitionsbereich). Ist m nicht 0, kann auch jede Zahl herauskommen (Wertebereich). Ist m = 0, kommt immer nur n heraus. In Sachaufgaben sind die Bereiche oft kleiner."
      }
     ],
     "card": {
      "title": "Lineare Funktion",
      "frage": "Was bedeuten m und n in dieser Gleichung?",
      "formel": "f(x) = m·x + n",
      "rules": [
       [
        "Gleichung",
        [
         "f(x) = m·x + n"
        ]
       ],
       [
        "m = Anstieg",
        [
         "m > 0 → steigt",
         "m < 0 → fällt",
         "m = 0 → waagerecht"
        ]
       ],
       [
        "n = y-Abschnitt",
        [
         "Schnitt mit y-Achse: (0 | n)"
        ]
       ],
       [
        "Beispiel",
        [
         "f(x) = 2·x + 1"
        ]
       ],
       [
        "f(3)",
        [
         "= 2 · 3 + 1",
         "= 6 + 1 = **7**"
        ]
       ]
      ],
      "merke": "Merke: m sagt, wie steil. n sagt, wo die Gerade die y-Achse trifft.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“ (S. 22)"
    },
    {
     "id": "ma-1-3",
     "title": "Nullstelle und Schnittpunkte mit den Achsen",
     "content": [
      {
       "p": "Die **Nullstelle** ist der x-Wert, bei dem f(x) = 0 ist. Dort schneidet die Gerade die x-Achse."
      },
      {
       "rules": [
        [
         "Schnitt mit der y-Achse",
         [
          "x = 0 einsetzen.",
          "Der Punkt ist (0 | n)."
         ]
        ],
        [
         "Schnitt mit der x-Achse",
         [
          "f(x) = 0 setzen.",
          "Nach x auflösen.",
          "Der Punkt ist (x₀ | 0)."
         ]
        ]
       ]
      },
      {
       "ex": "f(x) = 2·x – 6. Setze 2·x – 6 = 0. Dann ist 2·x = 6, also x = 3. Die Nullstelle ist x₀ = 3, der Punkt (3 | 0)."
      },
      {
       "calc": {
        "title": "Nullstelle von f(x) = 2·x – 6",
        "rows": [
         {
          "label": "2·x = 6 (+ 6 auf beiden Seiten)",
          "n": "6"
         },
         {
          "op": ":",
          "label": "durch m = 2",
          "n": "2"
         },
         {
          "op": "=",
          "label": "Nullstelle x₀",
          "n": "3",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Den Schnitt mit der y-Achse liest du an n ab: (0 | –6)."
      },
      {
       "note": "Ist m = 0 und n nicht 0, ist die Gerade waagerecht. Dann gibt es keine Nullstelle."
      }
     ],
     "card": {
      "title": "Nullstelle und Achsenschnitte",
      "frage": "Wo schneidet diese Gerade die x-Achse und die y-Achse? Wie gehst du vor?",
      "formel": "f(x) = 2·x – 6",
      "rules": [
       [
        "Nullstelle",
        [
         "x-Wert mit f(x) = 0"
        ]
       ],
       [
        "Schnitt y-Achse",
        [
         "x = 0 einsetzen → (0 | n)"
        ]
       ],
       [
        "Schnitt x-Achse",
        [
         "f(x) = 0 setzen",
         "nach x auflösen"
        ]
       ],
       [
        "Beispiel",
        [
         "f(x) = 2·x – 6"
        ]
       ],
       [
        "x₀",
        [
         "2·x – 6 = 0",
         "2·x = 6",
         "x = **3** → (3 | 0)"
        ]
       ],
       [
        "y-Achse",
        [
         "(0 | –6)"
        ]
       ]
      ],
      "merke": "Merke: An der Nullstelle ist f(x) = 0. Dort trifft die Gerade die x-Achse.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“: Nullstelle, Schnittpunkte mit x- und y-Achse (S. 22)"
    },
    {
     "id": "ma-1-4",
     "title": "Anstiegsdreieck zeichnen",
     "content": [
      {
       "p": "Mit einem **Anstiegsdreieck** zeichnest du eine Gerade ohne Wertetabelle. Du brauchst nur m und n."
      },
      {
       "rules": [
        [
         "1. Schritt",
         [
          "Punkt (0 | n) auf der y-Achse markieren."
         ]
        ],
        [
         "2. Schritt",
         [
          "Von dort 1 nach rechts gehen."
         ]
        ],
        [
         "3. Schritt",
         [
          "m nach oben gehen (bei m < 0 nach unten)."
         ]
        ],
        [
         "4. Schritt",
         [
          "Beide Punkte mit dem Lineal verbinden."
         ]
        ]
       ]
      },
      {
       "ex": "f(x) = 2·x + 1: Start bei (0 | 1). 1 nach rechts, 2 nach oben. Du landest bei (1 | 3)."
      },
      {
       "h": "m aus dem Graphen ablesen"
      },
      {
       "p": "Umgekehrt geht es auch: m = Höhe des Dreiecks : Breite des Dreiecks."
      },
      {
       "calc": {
        "title": "m ablesen: Punkte (0 | 1) und (2 | 5)",
        "rows": [
         {
          "label": "hoch: 5 – 1",
          "n": "4"
         },
         {
          "op": ":",
          "label": "rechts: 2 – 0",
          "n": "2"
         },
         {
          "op": "=",
          "label": "Anstieg m",
          "n": "2",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Ist m ein Bruch, z. B. 2/3, gehst du 3 nach rechts und 2 nach oben. So triffst du die Kästchen genau."
      }
     ],
     "card": {
      "title": "Anstiegsdreieck",
      "frage": "Wie zeichnest du diese Gerade mit dem Anstiegsdreieck?",
      "formel": "f(x) = 2·x + 1",
      "rules": [
       [
        "Start",
        [
         "Punkt (0 | n) auf y-Achse"
        ]
       ],
       [
        "Dreieck",
        [
         "1 nach rechts",
         "m nach oben (m < 0: unten)"
        ]
       ],
       [
        "Gerade",
        [
         "beide Punkte verbinden"
        ]
       ],
       [
        "Beispiel",
        [
         "f(x) = 2·x + 1"
        ]
       ],
       [
        "Weg",
        [
         "Start bei (0 | 1)",
         "1 rechts, 2 hoch → (1 | 3)"
        ]
       ],
       [
        "m ablesen",
        [
         "m = hoch : rechts"
        ]
       ]
      ],
      "merke": "Merke: Vom y-Achsenabschnitt aus 1 nach rechts und m nach oben.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“: grafische Darstellung, Anstiegsdreiecke (S. 22)"
    },
    {
     "id": "ma-1-5",
     "title": "Steigend, fallend, konstant",
     "content": [
      {
       "p": "**Monotonie** sagt, wie die Gerade von links nach rechts verläuft. Das hängt nur von m ab."
      },
      {
       "rules": [
        [
         "m > 0",
         [
          "monoton steigend",
          "Größeres x → größeres y."
         ]
        ],
        [
         "m < 0",
         [
          "monoton fallend",
          "Größeres x → kleineres y."
         ]
        ],
        [
         "m = 0",
         [
          "konstante Funktion f(x) = n",
          "Die Gerade ist waagerecht."
         ]
        ]
       ]
      },
      {
       "ex": "Ein Handyakku hat 100 %. Er verliert 8 % pro Stunde: f(x) = –8·x + 100. Hier ist m = –8, also fällt die Gerade."
      },
      {
       "calc": {
        "title": "Akku nach 5 Stunden",
        "rows": [
         {
          "label": "Start",
          "n": "100 %"
         },
         {
          "op": "–",
          "label": "8 % · 5 Stunden",
          "n": "40 %"
         },
         {
          "op": "=",
          "label": "Akku nach 5 Stunden",
          "n": "60 %",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Eine Flatrate kostet 10 € im Monat, egal wie viel du surfst: f(x) = 10. Das ist eine konstante Funktion."
      },
      {
       "note": "Bei einer konstanten Funktion kommt für jedes x derselbe Wert n heraus."
      }
     ],
     "card": {
      "title": "Steigend, fallend, konstant",
      "frage": "Woran erkennst du, ob eine Gerade steigt, fällt oder waagerecht ist?",
      "rules": [
       [
        "m > 0",
        [
         "monoton steigend"
        ]
       ],
       [
        "m < 0",
        [
         "monoton fallend"
        ]
       ],
       [
        "m = 0",
        [
         "konstant: f(x) = n",
         "waagerechte Gerade"
        ]
       ],
       [
        "Akku",
        [
         "f(x) = –8·x + 100"
        ]
       ],
       [
        "m = –8",
        [
         "kleiner als 0 → **fallend**"
        ]
       ],
       [
        "Flatrate",
        [
         "f(x) = 10 → **konstant**"
        ]
       ]
      ],
      "merke": "Merke: Das Vorzeichen von m entscheidet: steigend, fallend oder konstant.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“: Monotonie, konstante Funktionen für m = 0 (S. 22)"
    },
    {
     "id": "ma-1-6",
     "title": "Einfluss von m und n; Lage von zwei Geraden",
     "content": [
      {
       "warn": "Nur für den Weg zur Mittleren Reife."
      },
      {
       "p": "Änderst du m, wird die Gerade steiler oder flacher. Änderst du n, rutscht sie nach oben oder unten."
      },
      {
       "rules": [
        [
         "m weiter weg von 0",
         [
          "Die Gerade wird steiler."
         ]
        ],
        [
         "m näher an 0",
         [
          "Die Gerade wird flacher."
         ]
        ],
        [
         "n größer",
         [
          "Die Gerade rutscht nach oben."
         ]
        ],
        [
         "n kleiner",
         [
          "Die Gerade rutscht nach unten."
         ]
        ]
       ]
      },
      {
       "h": "Lage von zwei Geraden"
      },
      {
       "rules": [
        [
         "gleiches m, anderes n",
         [
          "parallel, kein Schnittpunkt"
         ]
        ],
        [
         "gleiches m, gleiches n",
         [
          "dieselbe Gerade"
         ]
        ],
        [
         "verschiedenes m",
         [
          "genau ein Schnittpunkt"
         ]
        ]
       ]
      },
      {
       "ex": "f(x) = 2·x + 1 und g(x) = 2·x – 3 haben beide m = 2. Sie sind parallel."
      },
      {
       "ex": "f(x) = x + 1 und g(x) = –x + 3: Zeichne beide Geraden. Sie schneiden sich im Punkt (1 | 2)."
      },
      {
       "note": "In Klasse 8 liest du den Schnittpunkt im Graphen ab. Das Rechnen kommt in Klasse 9."
      }
     ],
     "card": {
      "title": "m, n und zwei Geraden",
      "frage": "Was ändern m und n am Graphen, und wie können zwei Geraden liegen?",
      "rules": [
       [
        "m weiter von 0",
        [
         "Gerade steiler"
        ]
       ],
       [
        "n größer",
        [
         "Gerade weiter oben"
        ]
       ],
       [
        "Gleiches m, anderes n",
        [
         "parallel, kein Schnittpunkt"
        ]
       ],
       [
        "Gleiches m und n",
        [
         "dieselbe Gerade"
        ]
       ],
       [
        "Anderes m",
        [
         "genau ein Schnittpunkt"
        ]
       ],
       [
        "Beispiel",
        [
         "f(x) = x + 1",
         "g(x) = –x + 3"
        ]
       ],
       [
        "Schnittpunkt",
        [
         "abgelesen: **(1 | 2)**"
        ]
       ]
      ],
      "merke": "Merke: Gleiches m heißt parallel. Verschiedenes m heißt: Die Geraden schneiden sich.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Lineare Funktionen, konstante Funktionen“, zusätzlich Mittlere Reife: Einfluss der Parameter m und n, Lagebeziehung von Geraden (S. 22)"
    }
   ]
  },
  {
   "id": "ma-2",
   "title": "Arbeiten mit Variablen",
   "subs": [
    {
     "id": "ma-2-1",
     "title": "Terme addieren und subtrahieren",
     "content": [
      {
       "p": "Ein **Term** ist ein Rechenausdruck mit Zahlen und Variablen, z. B. 3x + 2. Eine **Variable** ist ein Platzhalter für eine Zahl."
      },
      {
       "rules": [
        [
         "Gleichartige Terme",
         [
          "gleiche Variable, gleiche Hochzahl",
          "z. B. 3x und 5x"
         ]
        ],
        [
         "Zusammenfassen",
         [
          "Nur die Zahlen davor rechnen.",
          "3x + 5x = 8x"
         ]
        ],
        [
         "Nicht zusammenfassen",
         [
          "3x + 2 bleibt 3x + 2.",
          "x und x² sind verschieden."
         ]
        ]
       ]
      },
      {
       "ex": "Fußball: Ein Ball kostet x €. Ihr kauft erst 4 Bälle, dann 3 Bälle. Zusammen: 4x + 3x = 7x."
      },
      {
       "ex": "5a + 2b – 3a + b = 5a – 3a + 2b + b = 2a + 3b"
      },
      {
       "calc": {
        "title": "Probe: 5a + 2b – 3a + b mit a = 2, b = 1",
        "rows": [
         {
          "label": "5a = 5 · 2",
          "n": "10"
         },
         {
          "op": "+",
          "label": "2b = 2 · 1",
          "n": "2"
         },
         {
          "op": "–",
          "label": "3a = 3 · 2",
          "n": "6"
         },
         {
          "op": "+",
          "label": "b",
          "n": "1"
         },
         {
          "op": "=",
          "label": "Ergebnis",
          "n": "7",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Und 2a + 3b = 4 + 3 = 7. Passt."
      },
      {
       "note": "Vor einer Variablen ohne Zahl steht eine unsichtbare 1: x = 1x."
      }
     ],
     "card": {
      "title": "Terme zusammenfassen",
      "frage": "Welche Terme darfst du zusammenfassen, und wie geht das?",
      "rules": [
       [
        "Erlaubt",
        [
         "gleiche Variable: 3x und 5x"
        ]
       ],
       [
        "Rechnen",
        [
         "nur die Zahlen davor",
         "3x + 5x = 8x"
        ]
       ],
       [
        "Nicht erlaubt",
        [
         "3x + 2 bleibt 3x + 2",
         "x und x² nicht mischen"
        ]
       ],
       [
        "Beispiel",
        [
         "5a + 2b – 3a + b"
        ]
       ],
       [
        "Sortieren",
        [
         "= 5a – 3a + 2b + b"
        ]
       ],
       [
        "Ergebnis",
        [
         "= **2a + 3b**"
        ]
       ]
      ],
      "merke": "Merke: Nur Gleichartiges zusammenfassen – wie Äpfel mit Äpfeln.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“: Termumformungen, Addieren, Subtrahieren (S. 23)"
    },
    {
     "id": "ma-2-2",
     "title": "Ausmultiplizieren und Ausklammern",
     "content": [
      {
       "p": "**Ausmultiplizieren:** Die Zahl vor der Klammer wird mit jedem Glied in der Klammer malgenommen."
      },
      {
       "p": "**Ausklammern** ist der umgekehrte Weg. Du ziehst einen gemeinsamen Faktor vor die Klammer."
      },
      {
       "rules": [
        [
         "Ausmultiplizieren",
         [
          "a · (b + c) = a·b + a·c"
         ]
        ],
        [
         "Ausklammern",
         [
          "a·b + a·c = a · (b + c)"
         ]
        ]
       ]
      },
      {
       "ex": "3 · (x + 4) = 3x + 12"
      },
      {
       "ex": "–2 · (y – 5) = –2y + 10. Minus mal Minus ergibt Plus."
      },
      {
       "ex": "6x + 9 = 3 · (2x + 3). Der gemeinsame Faktor ist 3."
      },
      {
       "p": "Probe für x = 2: Links ist 3 · (2 + 4) = 3 · 6 = 18."
      },
      {
       "calc": {
        "title": "Rechts: 3x + 12 für x = 2",
        "rows": [
         {
          "label": "3x = 3 · 2",
          "n": "6"
         },
         {
          "op": "+",
          "label": "12",
          "n": "12"
         },
         {
          "op": "=",
          "label": "3x + 12",
          "n": "18",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Als Bild: Ein Rechteck ist 3 breit und x + 4 lang. Seine Fläche ist 3·x plus 3·4."
      }
     ],
     "card": {
      "title": "Ausmultiplizieren, Ausklammern",
      "frage": "Wie multiplizierst du eine Klammer aus, und wie klammerst du aus?",
      "rules": [
       [
        "Ausmultiplizieren",
        [
         "a · (b + c) = a·b + a·c"
        ]
       ],
       [
        "Beispiel",
        [
         "3 · (x + 4) = 3x + 12"
        ]
       ],
       [
        "Vorsicht",
        [
         "–2 · (y – 5) = –2y + 10"
        ]
       ],
       [
        "Ausklammern",
        [
         "a·b + a·c = a · (b + c)"
        ]
       ],
       [
        "Beispiel",
        [
         "6x + 9 = 3 · (2x + 3)"
        ]
       ],
       [
        "Tipp",
        [
         "gemeinsamen Faktor suchen"
        ]
       ]
      ],
      "merke": "Merke: Jedes Glied in der Klammer wird malgenommen – keins vergessen!",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“: Ausmultiplizieren, Ausklammern (S. 23)"
    },
    {
     "id": "ma-2-3",
     "title": "Summen multiplizieren",
     "content": [
      {
       "p": "Zwei Klammern multiplizierst du so: **Jedes Glied der ersten Klammer mal jedes Glied der zweiten Klammer.**"
      },
      {
       "rules": [
        [
         "Regel",
         [
          "(a + b) · (c + d) = ac + ad + bc + bd"
         ]
        ]
       ]
      },
      {
       "ex": "(x + 2) · (x + 5) = x² + 5x + 2x + 10 = x² + 7x + 10"
      },
      {
       "ex": "(x – 3) · (x + 4) = x² + 4x – 3x – 12 = x² + x – 12"
      },
      {
       "calc": {
        "title": "Probe für x = 1: x² + 7x + 10",
        "rows": [
         {
          "label": "x² = 1²",
          "n": "1"
         },
         {
          "op": "+",
          "label": "7x = 7 · 1",
          "n": "7"
         },
         {
          "op": "+",
          "label": "10",
          "n": "10"
         },
         {
          "op": "=",
          "label": "Ergebnis",
          "n": "18",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Links: (1 + 2) · (1 + 5) = 3 · 6 = 18. Passt."
      },
      {
       "note": "Erst entstehen vier Produkte. Danach fasst du gleichartige Terme zusammen."
      }
     ],
     "card": {
      "title": "Summen multiplizieren",
      "frage": "Wie multiplizierst du zwei Klammern miteinander?",
      "rules": [
       [
        "Regel",
        [
         "jedes Glied mal jedes Glied"
        ]
       ],
       [
        "(a + b)(c + d)",
        [
         "= ac + ad + bc + bd"
        ]
       ],
       [
        "Beispiel",
        [
         "(x + 2)(x + 5)"
        ]
       ],
       [
        "Ausrechnen",
        [
         "= x² + 5x + 2x + 10"
        ]
       ],
       [
        "Zusammenfassen",
        [
         "= **x² + 7x + 10**"
        ]
       ],
       [
        "Probe x = 1",
        [
         "links: 3 · 6 = 18",
         "rechts: 1 + 7 + 10 = 18"
        ]
       ]
      ],
      "merke": "Merke: Zwei Glieder mal zwei Glieder ergibt erst vier Produkte.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“: Multiplizieren von Summen (S. 23)"
    },
    {
     "id": "ma-2-4",
     "title": "Die drei binomischen Formeln",
     "content": [
      {
       "p": "Mit den **binomischen Formeln** löst du bestimmte Klammern schnell auf. Es gibt genau drei."
      },
      {
       "rules": [
        [
         "1. Formel",
         [
          "(a + b)² = a² + 2ab + b²"
         ]
        ],
        [
         "2. Formel",
         [
          "(a – b)² = a² – 2ab + b²"
         ]
        ],
        [
         "3. Formel",
         [
          "(a + b) · (a – b) = a² – b²"
         ]
        ]
       ]
      },
      {
       "ex": "(x + 3)² = x² + 2·x·3 + 3² = x² + 6x + 9"
      },
      {
       "ex": "(y – 4)² = y² – 8y + 16 und (z + 5) · (z – 5) = z² – 25"
      },
      {
       "note": "Häufiger Fehler: (a + b)² ist **nicht** a² + b². Das Mittelglied 2ab gehört dazu."
      },
      {
       "p": "Probe mit Zahlen: (2 + 3)² = 25. Und 2² + 2·2·3 + 3² = 4 + 12 + 9 = 25. Passt."
      }
     ],
     "card": {
      "title": "Binomische Formeln",
      "frage": "Wie lauten die drei binomischen Formeln?",
      "rules": [
       [
        "1.",
        [
         "(a + b)² = a² + 2ab + b²"
        ]
       ],
       [
        "2.",
        [
         "(a – b)² = a² – 2ab + b²"
        ]
       ],
       [
        "3.",
        [
         "(a + b)(a – b) = a² – b²"
        ]
       ],
       [
        "Beispiel",
        [
         "(x + 3)² = x² + 6x + 9"
        ]
       ]
      ],
      "merke": "Merke: Beim Quadrat einer Summe nie das Mittelglied 2ab vergessen.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“: binomische Formeln (S. 23)"
    },
    {
     "id": "ma-2-5",
     "title": "Lineare Gleichungen lösen (Äquivalenzumformung, Probe)",
     "content": [
      {
       "p": "In einer **linearen Gleichung** steht x ohne Hochzahl, z. B. 3x + 4 = 19. Ziel: x allein auf eine Seite bringen."
      },
      {
       "p": "Bei einer **Äquivalenzumformung** rechnest du auf beiden Seiten dasselbe. So bleibt die Gleichung richtig."
      },
      {
       "rules": [
        [
         "1. Schritt",
         [
          "Zahlen ohne x auf eine Seite bringen."
         ]
        ],
        [
         "2. Schritt",
         [
          "Durch die Zahl vor dem x teilen."
         ]
        ],
        [
         "Probe",
         [
          "Lösung in die Gleichung einsetzen."
         ]
        ]
       ]
      },
      {
       "ex": "3x + 4 = 19 | – 4 → 3x = 15 | : 3 → x = 5"
      },
      {
       "calc": {
        "title": "Probe: x = 5 in 3x + 4 einsetzen",
        "rows": [
         {
          "label": "3 · 5",
          "n": "15"
         },
         {
          "op": "+",
          "label": "4",
          "n": "4"
         },
         {
          "op": "=",
          "label": "linke Seite",
          "n": "19",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Rechts steht auch 19. Passt."
      },
      {
       "ex": "x auf beiden Seiten: 5x – 2 = 2x + 7 | – 2x → 3x – 2 = 7 | + 2 → 3x = 9 | : 3 → x = 3"
      },
      {
       "ex": "Rügen: Ein Leihrad kostet 8 € plus 3 € pro Stunde. Du hast 20 €. 3x + 8 = 20 → 3x = 12 → x = 4 Stunden."
      },
      {
       "note": "Prüfe auch, ob das Ergebnis Sinn ergibt. Eine halbe Person oder –3 Bälle gibt es nicht."
      }
     ],
     "card": {
      "title": "Lineare Gleichungen lösen",
      "frage": "Wie löst du eine Gleichung wie 3x + 4 = 19?",
      "rules": [
       [
        "Regel",
        [
         "beide Seiten gleich behandeln"
        ]
       ],
       [
        "Ziel",
        [
         "x allein auf einer Seite"
        ]
       ],
       [
        "Gleichung",
        [
         "3x + 4 = 19"
        ]
       ],
       [
        "| – 4",
        [
         "3x = 15"
        ]
       ],
       [
        "| : 3",
        [
         "x = **5**"
        ]
       ],
       [
        "Probe",
        [
         "3 · 5 + 4 = 19, passt"
        ]
       ]
      ],
      "merke": "Merke: Was du links rechnest, rechnest du auch rechts. Zum Schluss die Probe.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“: lineare Gleichungen, Äquivalenzumformungen, Ergebniskontrolle (S. 23)"
    },
    {
     "id": "ma-2-6",
     "title": "Einfache Bruchgleichungen, lineare Ungleichungen",
     "content": [
      {
       "warn": "Nur für den Weg zur Mittleren Reife."
      },
      {
       "p": "In einer **Bruchgleichung** steht die Variable im Nenner, z. B. 6/x = 3/2. Eine einfache Form ist die **Verhältnisgleichung**: Zwei Brüche sind gleich, z. B. x/4 = 3/2 oder 6/x = 3/2."
      },
      {
       "rules": [
        [
         "Lösen",
         [
          "Mit dem Nenner unter x malnehmen."
         ]
        ],
        [
         "x/5 = 3",
         [
          "| · 5 → x = 15"
         ]
        ],
        [
         "x/4 = 3/2",
         [
          "| · 4 → x = 12/2 = 6"
         ]
        ],
        [
         "6/x = 3/2",
         [
          "| · x → 6 = 3/2 · x",
          "| · 2/3 → x = **4**"
         ]
        ]
       ]
      },
      {
       "ex": "Saftschorle: 2 Teile Saft auf 5 Teile Wasser. Wie viel Saft für 10 Liter Wasser? x/10 = 2/5."
      },
      {
       "calc": {
        "title": "x/10 = 2/5 lösen",
        "rows": [
         {
          "label": "2 : 5",
          "n": "0,4"
         },
         {
          "op": "×",
          "label": "Liter Wasser",
          "n": "10"
         },
         {
          "op": "=",
          "label": "Saft x",
          "n": "4 Liter",
          "t": "sum"
         }
        ]
       }
      },
      {
       "h": "Lineare Ungleichungen"
      },
      {
       "p": "Eine **Ungleichung** hat statt „=“ ein Zeichen wie <, >, ≤ oder ≥. Du löst sie fast wie eine Gleichung."
      },
      {
       "rules": [
        [
         "Wie bei Gleichungen",
         [
          "Auf beiden Seiten dasselbe rechnen."
         ]
        ],
        [
         "Achtung",
         [
          "Mal oder durch eine Minuszahl → Zeichen umdrehen."
         ]
        ],
        [
         "Lösung",
         [
          "Viele Zahlen, z. B. alle x < 4.",
          "Du kannst sie am Zahlenstrahl zeigen."
         ]
        ]
       ]
      },
      {
       "ex": "2x + 3 < 11 | – 3 → 2x < 8 | : 2 → x < 4. Probe mit x = 3: 2 · 3 + 3 = 9, und 9 < 11. Passt."
      },
      {
       "ex": "–3x > 6 | : (–3) → x < –2. Das Zeichen dreht sich um."
      }
     ],
     "card": {
      "title": "Bruchgleichung, Ungleichung",
      "frage": "Wie löst du eine Verhältnisgleichung und eine lineare Ungleichung?",
      "rules": [
       [
        "Bruchgleichung",
        [
         "mit dem Nenner malnehmen"
        ]
       ],
       [
        "Beispiel",
        [
         "x/4 = 3/2 | · 4",
         "x = 12/2 = **6**"
        ]
       ],
       [
        "Ungleichung",
        [
         "rechnen wie bei Gleichungen"
        ]
       ],
       [
        "Achtung",
        [
         "· oder : mit Minuszahl",
         "→ Zeichen umdrehen"
        ]
       ],
       [
        "Beispiel",
        [
         "2x + 3 < 11 | – 3",
         "2x < 8 | : 2",
         "x < **4**"
        ]
       ]
      ],
      "merke": "Merke: Rechnest du mal oder durch eine Minuszahl, dreht sich das Zeichen um.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Arbeiten mit Variablen“, zusätzlich Mittlere Reife: einfache Bruchgleichungen (Verhältnisgleichungen), lineare Ungleichungen (S. 23)"
    }
   ]
  },
  {
   "id": "ma-3",
   "title": "Satz des Pythagoras",
   "subs": [
    {
     "id": "ma-3-1",
     "title": "Katheten und Hypotenuse",
     "content": [
      {
       "p": "Ein Dreieck mit einem Winkel von 90° heißt **rechtwinklig**. Den rechten Winkel markierst du mit einem Bogen und einem Punkt."
      },
      {
       "h": "Die Namen der Seiten"
      },
      {
       "rules": [
        [
         "Katheten",
         [
          "die zwei Seiten am rechten Winkel",
          "Sie bilden zusammen den rechten Winkel."
         ]
        ],
        [
         "Hypotenuse",
         [
          "die Seite gegenüber dem rechten Winkel",
          "Sie ist immer die **längste** Seite."
         ]
        ]
       ]
      },
      {
       "ex": "Dreieck ABC mit dem rechten Winkel bei C: Die Hypotenuse ist c. Die Katheten sind a und b."
      },
      {
       "ex": "Liegt der rechte Winkel bei B, ist b die Hypotenuse. Die Katheten sind dann a und c."
      },
      {
       "ex": "Eine Leiter lehnt an einer Wand. Wand und Boden bilden den rechten Winkel. Die Leiter ist die Hypotenuse."
      },
      {
       "note": "Die Namen hängen vom rechten Winkel ab, nicht von den Buchstaben. Suche immer zuerst den rechten Winkel."
      }
     ],
     "card": {
      "title": "Seiten im rechtwinkligen Dreieck",
      "frage": "Wie heißen die Seiten im rechtwinkligen Dreieck?",
      "rules": [
       [
        "Rechtwinklig",
        [
         "ein Winkel ist 90°"
        ]
       ],
       [
        "Katheten",
        [
         "2 Seiten am rechten Winkel",
         "bilden den 90°-Winkel"
        ]
       ],
       [
        "Hypotenuse",
        [
         "gegenüber dem 90°-Winkel",
         "immer die **längste** Seite"
        ]
       ],
       [
        "90° bei C",
        [
         "Hypotenuse c",
         "Katheten a und b"
        ]
       ],
       [
        "90° bei B",
        [
         "Hypotenuse b"
        ]
       ]
      ],
      "merke": "Merke: Erst den rechten Winkel suchen. Die Seite gegenüber ist die Hypotenuse.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Satz des Pythagoras“: rechtwinkliges Dreieck, Katheten, Hypotenuse (S. 24)"
    },
    {
     "id": "ma-3-2",
     "title": "a² + b² = c² anwenden",
     "content": [
      {
       "p": "Der Satz gilt **nur im rechtwinkligen Dreieck**. Die längste Seite heißt **Hypotenuse** (c). Sie liegt gegenüber dem rechten Winkel. Die beiden anderen Seiten heißen **Katheten** (a und b)."
      },
      {
       "note": "Geschichte: Der Satz heißt nach dem Griechen Pythagoras von Samos (um 570 bis um 510 v. Chr.). Babylonische Tontafeln zeigen: Der Zusammenhang war schon über 1000 Jahre früher bekannt."
      },
      {
       "rules": [
        [
         "Hypotenuse gesucht",
         [
          "c² = a² + b²"
         ]
        ],
        [
         "Kathete gesucht",
         [
          "a² = c² – b²"
         ]
        ]
       ]
      },
      {
       "calc": {
        "title": "Hypotenuse: a = 3 cm, b = 4 cm",
        "rows": [
         {
          "label": "a² = 3²",
          "n": "9 cm²"
         },
         {
          "op": "+",
          "label": "b² = 4²",
          "n": "16 cm²"
         },
         {
          "op": "=",
          "label": "c²",
          "n": "25 cm²",
          "t": "sub"
         },
         {
          "label": "c = √25",
          "n": "5 cm",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Eine Leiter ist 5 m lang. Ihr Fuß steht 3 m von der Wand weg. Wie hoch reicht sie? 5² – 3² = 25 – 9 = 16, also 4 m."
      },
      {
       "note": "Erst quadrieren, dann addieren oder subtrahieren, zum Schluss die Wurzel ziehen."
      }
     ],
     "card": {
      "title": "Satz des Pythagoras",
      "frage": "Wie berechnest du die längste Seite im rechtwinkligen Dreieck?",
      "rules": [
       [
        "Gilt",
        [
         "nur im rechtwinkligen Dreieck"
        ]
       ],
       [
        "c",
        [
         "Hypotenuse, gegenüber 90°"
        ]
       ],
       [
        "a, b",
        [
         "Katheten"
        ]
       ],
       [
        "Formel",
        [
         "**a² + b² = c²**"
        ]
       ],
       [
        "Beispiel",
        [
         "a = 3 cm, b = 4 cm"
        ]
       ],
       [
        "c²",
        [
         "= 3² + 4²",
         "= 9 + 16 = 25"
        ]
       ],
       [
        "c",
        [
         "= √25 = **5 cm**"
        ]
       ]
      ],
      "merke": "Merke: Die Hypotenuse liegt immer gegenüber dem rechten Winkel.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Satz des Pythagoras“ (S. 24)"
    },
    {
     "id": "ma-3-3",
     "title": "Umkehrung des Satzes",
     "content": [
      {
       "warn": "Nur für den Weg zur Mittleren Reife."
      },
      {
       "p": "Der Satz des Pythagoras gilt auch **umgekehrt**: Gilt in einem Dreieck a² + b² = c², dann ist es rechtwinklig. Der rechte Winkel liegt gegenüber von c."
      },
      {
       "h": "So prüfst du ein Dreieck"
      },
      {
       "rules": [
        [
         "Schritt 1",
         [
          "Nimm die längste Seite als c."
         ]
        ],
        [
         "Schritt 2",
         [
          "Rechne a² + b² aus."
         ]
        ],
        [
         "Schritt 3",
         [
          "Vergleiche mit c²."
         ]
        ],
        [
         "Ergebnis",
         [
          "gleich → rechtwinklig",
          "ungleich → nicht rechtwinklig"
         ]
        ]
       ]
      },
      {
       "calc": {
        "title": "Prüfen: Seiten 6 cm, 8 cm und 10 cm",
        "rows": [
         {
          "label": "a² = 6²",
          "n": "36 cm²"
         },
         {
          "op": "+",
          "label": "b² = 8²",
          "n": "64 cm²"
         },
         {
          "op": "=",
          "label": "a² + b²",
          "n": "100 cm²",
          "t": "sub"
         },
         {
          "label": "c² = 10²",
          "n": "100 cm²",
          "t": "sum"
         }
        ]
       }
      },
      {
       "p": "Beide Werte sind gleich. Das Dreieck ist rechtwinklig."
      },
      {
       "ex": "Seiten 4 cm, 5 cm und 6 cm: 16 + 25 = 41. Aber 6² = 36. 41 ist nicht 36, also nicht rechtwinklig."
      },
      {
       "ex": "Du steckst auf Rügen ein Beet ab: 3 m, 4 m und 5 m. 9 + 16 = 25 = 5². Die Ecke hat genau 90°."
      },
      {
       "note": "Nimm immer die längste Seite als c. Sonst stimmt die Prüfung nicht."
      }
     ],
     "card": {
      "title": "Ist das Dreieck rechtwinklig?",
      "frage": "Wie prüfst du, ob ein Dreieck rechtwinklig ist?",
      "rules": [
       [
        "1.",
        [
         "längste Seite = c"
        ]
       ],
       [
        "2.",
        [
         "a² + b² ausrechnen"
        ]
       ],
       [
        "3.",
        [
         "mit c² vergleichen"
        ]
       ],
       [
        "gleich",
        [
         "→ **rechtwinklig**"
        ]
       ],
       [
        "ungleich",
        [
         "→ nicht rechtwinklig"
        ]
       ],
       [
        "Beispiel",
        [
         "6 cm, 8 cm, 10 cm"
        ]
       ],
       [
        "a² + b²",
        [
         "= 36 + 64 = 100"
        ]
       ],
       [
        "c²",
        [
         "= 10² = 100 → rechtwinklig"
        ]
       ]
      ],
      "merke": "Merke: Gilt a² + b² = c², dann liegt gegenüber von c ein rechter Winkel.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Satz des Pythagoras“: Umkehrung des Satzes, zusätzlich für den Bildungsgang der mittleren Reife (S. 24)"
    }
   ]
  },
  {
   "id": "ma-4",
   "title": "Körper berechnen",
   "subs": [
    {
     "id": "ma-4-1",
     "title": "Prisma: Ecken, Kanten, Flächen",
     "content": [
      {
       "p": "Ein **Prisma** ist ein Körper mit zwei gleichen Vielecken. Sie heißen **Grundfläche** und **Deckfläche**. Sie liegen parallel übereinander."
      },
      {
       "p": "Die Seitenflächen dazwischen bilden den **Mantel**."
      },
      {
       "h": "Gerade und schiefe Prismen"
      },
      {
       "rules": [
        [
         "gerades Prisma",
         [
          "Die Seitenkanten stehen senkrecht auf der Grundfläche.",
          "Die Seitenflächen sind Rechtecke."
         ]
        ],
        [
         "schiefes Prisma",
         [
          "Die Seitenkanten sind geneigt.",
          "Die Seitenflächen sind Parallelogramme."
         ]
        ]
       ]
      },
      {
       "h": "Ecken, Kanten und Flächen zählen"
      },
      {
       "p": "Die Grundfläche ist ein n-Eck. n ist die Zahl ihrer Ecken."
      },
      {
       "rules": [
        [
         "Ecken",
         [
          "2 · n (oben n, unten n)"
         ]
        ],
        [
         "Kanten",
         [
          "3 · n (oben n, unten n, dazwischen n)"
         ]
        ],
        [
         "Flächen",
         [
          "n + 2 (n Seitenflächen, dazu Grund- und Deckfläche)"
         ]
        ]
       ]
      },
      {
       "ex": "Ein Zelt in Dachform ist ein Dreiecksprisma, also n = 3: 6 Ecken, 9 Kanten, 5 Flächen."
      },
      {
       "ex": "Ein Schuhkarton ist ein Quader. Das ist ein Prisma mit n = 4: 8 Ecken, 12 Kanten, 6 Flächen."
      },
      {
       "note": "Probe: Ecken + Flächen – Kanten = 2. Beim Quader: 8 + 6 – 12 = 2. Passt."
      }
     ],
     "card": {
      "title": "Prisma: Ecken, Kanten, Flächen",
      "frage": "Wie viele Ecken, Kanten und Flächen hat ein Prisma mit einem n-Eck als Grundfläche?",
      "rules": [
       [
        "Prisma",
        [
         "2 gleiche, parallele Vielecke"
        ]
       ],
       [
        "gerade",
        [
         "Seitenflächen sind Rechtecke"
        ]
       ],
       [
        "Ecken",
        [
         "2 · n"
        ]
       ],
       [
        "Kanten",
        [
         "3 · n"
        ]
       ],
       [
        "Flächen",
        [
         "n + 2"
        ]
       ],
       [
        "Beispiel",
        [
         "Dreiecksprisma, n = 3"
        ]
       ],
       [
        "Ergebnis",
        [
         "6 Ecken",
         "9 Kanten",
         "5 Flächen"
        ]
       ]
      ],
      "merke": "Merke: n ist die Zahl der Ecken der Grundfläche.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: Prisma, Eigenschaften (Ecken, Kanten, Flächen; gerade und schiefe Prismen) (S. 25)"
    },
    {
     "id": "ma-4-2",
     "title": "Netz, Schrägbild, Zweitafelbild",
     "content": [
      {
       "p": "Einen Körper kannst du auf drei Arten zeichnen. Jede Darstellung zeigt etwas anderes."
      },
      {
       "h": "Netz"
      },
      {
       "p": "Du schneidest den Körper an Kanten auf und klappst ihn flach aus. Alle Flächen hängen zusammen. Aus dem Netz kannst du den Körper wieder falten."
      },
      {
       "ex": "Ein Würfelnetz besteht aus 6 gleichen Quadraten. Das Netz eines Dreiecksprismas hat 2 Dreiecke und 3 Rechtecke."
      },
      {
       "h": "Schrägbild"
      },
      {
       "p": "Das **Schrägbild** ist eine räumliche Zeichnung. So sieht der Körper fast echt aus."
      },
      {
       "rules": [
        [
         "Vorderfläche",
         [
          "in wahrer Größe zeichnen"
         ]
        ],
        [
         "Tiefenkanten",
         [
          "unter 45° nach hinten",
          "nur halb so lang"
         ]
        ],
        [
         "verdeckte Kanten",
         [
          "gestrichelt zeichnen"
         ]
        ]
       ]
      },
      {
       "ex": "Würfel mit 4 cm Kante: Vorn zeichnest du ein Quadrat mit 4 cm Seite. Die Tiefenkanten sind 2 cm lang, schräg unter 45°."
      },
      {
       "h": "Zweitafelbild"
      },
      {
       "p": "Du schaust genau von vorn und genau von oben auf den Körper. Beide Ansichten zeichnest du untereinander."
      },
      {
       "rules": [
        [
         "oben",
         [
          "Vorderansicht (Aufriss)"
         ]
        ],
        [
         "unten",
         [
          "Draufsicht (Grundriss)"
         ]
        ]
       ]
      },
      {
       "note": "Zusammengehörige Punkte verbindest du mit dünnen senkrechten Linien. So passen beide Ansichten zusammen."
      },
      {
       "warn": "Manche Lehrkräfte geben für das Schrägbild einen anderen Winkel oder eine andere Verkürzung vor. Dann gilt die Vorgabe aus dem Unterricht."
      }
     ],
     "card": {
      "title": "Netz, Schrägbild, Zweitafelbild",
      "frage": "Was zeigen Netz, Schrägbild und Zweitafelbild?",
      "rules": [
       [
        "Netz",
        [
         "alle Flächen flach ausgebreitet"
        ]
       ],
       [
        "Schrägbild",
        [
         "räumliche Zeichnung",
         "Tiefe: 45°, halbe Länge",
         "verdeckte Kanten gestrichelt"
        ]
       ],
       [
        "Zweitafelbild",
        [
         "oben: Vorderansicht",
         "unten: Draufsicht"
        ]
       ],
       [
        "Würfelnetz",
        [
         "6 gleiche Quadrate"
        ]
       ]
      ],
      "merke": "Merke: Im Schrägbild laufen Tiefenkanten unter 45° und sind nur halb so lang.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: Darstellung; Wechsel zwischen Schrägbild, Netz und Zweitafelprojektion (S. 25)"
    },
    {
     "id": "ma-4-3",
     "title": "Prisma: Volumen und Oberfläche",
     "content": [
      {
       "p": "Das **Volumen** sagt, wie viel in einen Körper hineinpasst. Die **Oberfläche** ist die Summe aller Außenflächen."
      },
      {
       "rules": [
        [
         "Volumen",
         [
          "V = G · h (Grundfläche mal Höhe)"
         ]
        ],
        [
         "Mantel",
         [
          "M = u · h (Umfang der Grundfläche mal Höhe, nur beim geraden Prisma)"
         ]
        ],
        [
         "Oberfläche",
         [
          "O = 2 · G + M"
         ]
        ]
       ]
      },
      {
       "note": "Die Höhe h ist der Abstand von Grund- und Deckfläche. Das gilt auch, wenn das Prisma liegt."
      },
      {
       "ex": "Ein Dreiecksprisma ist 10 cm hoch. Die Grundfläche ist ein rechtwinkliges Dreieck mit den Seiten 3 cm, 4 cm und 5 cm."
      },
      {
       "calc": {
        "title": "Volumen: Katheten 3 cm und 4 cm, h = 10 cm",
        "rows": [
         {
          "label": "G = 3 · 4 : 2",
          "n": "6 cm²"
         },
         {
          "op": "×",
          "label": "Höhe h",
          "n": "10 cm"
         },
         {
          "op": "=",
          "label": "Volumen V",
          "n": "60 cm³",
          "t": "sum"
         }
        ]
       }
      },
      {
       "calc": {
        "title": "Oberfläche: gleiches Prisma, u = 3 + 4 + 5 = 12 cm",
        "rows": [
         {
          "label": "2 · G = 2 · 6",
          "n": "12 cm²"
         },
         {
          "op": "+",
          "label": "M = 12 · 10",
          "n": "120 cm²"
         },
         {
          "op": "=",
          "label": "Oberfläche O",
          "n": "132 cm²",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Ein Quader ist auch ein Prisma. Darum gilt dort ebenfalls V = G · h = a · b · c."
      }
     ],
     "card": {
      "title": "Prisma: V und O",
      "frage": "Wie berechnest du Volumen und Oberfläche eines Prismas?",
      "rules": [
       [
        "Volumen",
        [
         "V = G · h"
        ]
       ],
       [
        "Mantel",
        [
         "M = u · h (gerades Prisma)"
        ]
       ],
       [
        "u",
        [
         "Umfang der Grundfläche"
        ]
       ],
       [
        "Oberfläche",
        [
         "O = 2 · G + M"
        ]
       ],
       [
        "Beispiel",
        [
         "G = 6 cm², u = 12 cm",
         "h = 10 cm"
        ]
       ],
       [
        "V",
        [
         "= 6 · 10 = **60 cm³**"
        ]
       ],
       [
        "O",
        [
         "= 2 · 6 + 12 · 10",
         "= 12 + 120 = **132 cm²**"
        ]
       ]
      ],
      "merke": "Merke: Die Höhe h ist der Abstand zwischen Grund- und Deckfläche.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: Prisma, Volumen und Oberflächeninhalt (S. 25)"
    },
    {
     "id": "ma-4-4",
     "title": "Zylinder: Volumen und Oberfläche",
     "content": [
      {
       "p": "Ein **Zylinder** hat zwei gleiche Kreise als Grund- und Deckfläche. Dazwischen liegt der **Mantel**. Abgerollt ist der Mantel ein Rechteck."
      },
      {
       "rules": [
        [
         "Ecken",
         [
          "0"
         ]
        ],
        [
         "Kanten",
         [
          "2 (die beiden Kreisränder)"
         ]
        ],
        [
         "Flächen",
         [
          "3 (2 Kreise und der Mantel)"
         ]
        ]
       ]
      },
      {
       "rules": [
        [
         "Grundfläche",
         [
          "G = π · r²"
         ]
        ],
        [
         "Volumen",
         [
          "V = G · h = π · r² · h"
         ]
        ],
        [
         "Mantel",
         [
          "M = 2 · π · r · h (Kreisumfang mal Höhe)"
         ]
        ],
        [
         "Oberfläche",
         [
          "O = 2 · G + M"
         ]
        ]
       ]
      },
      {
       "calc": {
        "title": "Volumen: r = 3 cm, h = 10 cm, π ≈ 3,14",
        "rows": [
         {
          "label": "G = 3,14 · 3²",
          "n": "28,26 cm²"
         },
         {
          "op": "×",
          "label": "Höhe h",
          "n": "10 cm"
         },
         {
          "op": "=",
          "label": "Volumen V",
          "n": "282,60 cm³",
          "t": "sum"
         }
        ]
       }
      },
      {
       "calc": {
        "title": "Oberfläche: gleicher Zylinder",
        "rows": [
         {
          "label": "2 · G = 2 · 28,26",
          "n": "56,52 cm²"
         },
         {
          "op": "+",
          "label": "M = 2 · 3,14 · 3 · 10",
          "n": "188,40 cm²"
         },
         {
          "op": "=",
          "label": "Oberfläche O",
          "n": "244,92 cm²",
          "t": "sum"
         }
        ]
       }
      },
      {
       "warn": "Deine Lehrkraft rechnet vielleicht mit der π-Taste des Taschenrechners. Dann weichen die Ergebnisse etwas ab (z. B. 282,74 cm³)."
      }
     ],
     "card": {
      "title": "Zylinder: V und O",
      "frage": "Wie berechnest du Volumen und Oberfläche eines Zylinders?",
      "rules": [
       [
        "Grundfläche",
        [
         "G = π · r²"
        ]
       ],
       [
        "Volumen",
        [
         "V = G · h"
        ]
       ],
       [
        "Mantel",
        [
         "M = 2 · π · r · h"
        ]
       ],
       [
        "Oberfläche",
        [
         "O = 2 · G + M"
        ]
       ],
       [
        "Beispiel",
        [
         "r = 3 cm, h = 10 cm, π ≈ 3,14"
        ]
       ],
       [
        "V",
        [
         "= 3,14 · 3² · 10",
         "= **282,60 cm³**"
        ]
       ]
      ],
      "merke": "Merke: Volumen = Grundfläche mal Höhe – genau wie beim Prisma.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: Zylinder, Volumen und Oberflächeninhalt (S. 25)"
    },
    {
     "id": "ma-4-5",
     "title": "Pyramide: Volumen und Oberfläche",
     "content": [
      {
       "p": "Eine **Pyramide** hat eine Grundfläche und eine Spitze. Die Grundfläche ist ein Vieleck. Die Seitenflächen sind Dreiecke. Zusammen bilden sie den **Mantel**."
      },
      {
       "h": "Ecken, Kanten, Flächen (Grundfläche: n-Eck)"
      },
      {
       "rules": [
        [
         "Ecken",
         [
          "n + 1"
         ]
        ],
        [
         "Kanten",
         [
          "2 · n"
         ]
        ],
        [
         "Flächen",
         [
          "n + 1"
         ]
        ]
       ]
      },
      {
       "ex": "Eine Pyramide mit quadratischer Grundfläche hat 5 Ecken, 8 Kanten und 5 Flächen."
      },
      {
       "h": "Formeln"
      },
      {
       "rules": [
        [
         "Volumen",
         [
          "V = 1/3 · G · h"
         ]
        ],
        [
         "Mantel",
         [
          "M = alle Seitendreiecke zusammen",
          "quadratische Grundfläche: M = 4 · a · hs : 2"
         ]
        ],
        [
         "Oberfläche",
         [
          "O = G + M"
         ]
        ]
       ]
      },
      {
       "note": "h ist die Körperhöhe: von der Spitze senkrecht auf die Grundfläche. hs ist die Höhe eines Seitendreiecks. Verwechsle die beiden nicht."
      },
      {
       "calc": {
        "title": "Volumen: Quadrat a = 6 cm, h = 4 cm",
        "rows": [
         {
          "label": "G = 6 · 6",
          "n": "36 cm²"
         },
         {
          "op": "×",
          "label": "Höhe h",
          "n": "4 cm"
         },
         {
          "op": "=",
          "label": "G · h",
          "n": "144 cm³",
          "t": "sub"
         },
         {
          "op": ":",
          "label": "durch 3",
          "n": "3"
         },
         {
          "op": "=",
          "label": "Volumen V",
          "n": "48 cm³",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Die Seitenhöhe hs findest du mit Pythagoras: hs² = 4² + 3² = 16 + 9 = 25. Also ist hs = 5 cm."
      },
      {
       "calc": {
        "title": "Oberfläche: gleiche Pyramide, hs = 5 cm",
        "rows": [
         {
          "label": "G = 6 · 6",
          "n": "36 cm²"
         },
         {
          "op": "+",
          "label": "M = 4 · 6 · 5 : 2",
          "n": "60 cm²"
         },
         {
          "op": "=",
          "label": "Oberfläche O",
          "n": "96 cm²",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Eine Pyramide hat nur ein Drittel des Volumens eines Prismas mit gleicher Grundfläche und Höhe."
      }
     ],
     "card": {
      "title": "Pyramide: V und O",
      "frage": "Wie berechnest du Volumen und Oberfläche einer Pyramide?",
      "rules": [
       [
        "Volumen",
        [
         "V = 1/3 · G · h"
        ]
       ],
       [
        "Mantel",
        [
         "M = alle Seitendreiecke"
        ]
       ],
       [
        "Oberfläche",
        [
         "O = G + M"
        ]
       ],
       [
        "hs",
        [
         "Höhe eines Seitendreiecks"
        ]
       ],
       [
        "Beispiel",
        [
         "Quadrat a = 6 cm, h = 4 cm"
        ]
       ],
       [
        "V",
        [
         "= 6 · 6 · 4 : 3",
         "= 144 : 3 = **48 cm³**"
        ]
       ],
       [
        "O (hs = 5 cm)",
        [
         "= 36 + 4 · 6 · 5 : 2",
         "= 36 + 60 = **96 cm²**"
        ]
       ]
      ],
      "merke": "Merke: Pyramide = ein Drittel vom Prisma mit gleicher Grundfläche und Höhe.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: Pyramide, Eigenschaften, Volumen und Oberflächeninhalt (S. 25)"
    },
    {
     "id": "ma-4-6",
     "title": "Zusammengesetzte Körper",
     "content": [
      {
       "p": "Viele Dinge sind aus einfachen Körpern zusammengesetzt. Du zerlegst sie in Teile, die du schon kennst."
      },
      {
       "rules": [
        [
         "1. Zerlegen",
         [
          "in Quader, Prismen, Zylinder oder Pyramiden"
         ]
        ],
        [
         "2. Einzeln rechnen",
         [
          "das Volumen jedes Teils"
         ]
        ],
        [
         "3. Zusammenfügen",
         [
          "Teil angesetzt → addieren",
          "Teil herausgeschnitten → subtrahieren"
         ]
        ]
       ]
      },
      {
       "ex": "Ein Gartenhaus ist ein Quader mit 4 m, 3 m und 2,5 m. Darauf sitzt ein Dach als Dreiecksprisma: Dreieck mit 3 m Grundseite und 1 m Höhe, 4 m lang."
      },
      {
       "calc": {
        "title": "Gartenhaus: Quader + Dach",
        "rows": [
         {
          "label": "Quader 4 · 3 · 2,5",
          "n": "30 m³"
         },
         {
          "op": "+",
          "label": "Dach (3 · 1 : 2) · 4",
          "n": "6 m³"
         },
         {
          "op": "=",
          "label": "Volumen gesamt",
          "n": "36 m³",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Ein Wasserrohr ist ein Zylinder mit Loch. Außen ist r = 5 cm, innen r = 4 cm, das Rohr ist 10 cm lang. Wie viel Material steckt im Rohr?"
      },
      {
       "calc": {
        "title": "Rohr: außen minus innen, π ≈ 3,14",
        "rows": [
         {
          "label": "außen 3,14 · 5² · 10",
          "n": "785,00 cm³"
         },
         {
          "op": "–",
          "label": "innen 3,14 · 4² · 10",
          "n": "502,40 cm³"
         },
         {
          "op": "=",
          "label": "Volumen des Rohrmaterials",
          "n": "282,60 cm³",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Bei der Oberfläche aufpassen: Flächen, an denen zwei Teile aneinanderstoßen, liegen innen. Sie zählen nicht mit."
      },
      {
       "ex": "Beim Gartenhaus gehört die Deckfläche des Quaders nicht zur Oberfläche. Dort liegt das Dach auf."
      }
     ],
     "card": {
      "title": "Zusammengesetzte Körper",
      "frage": "Wie berechnest du das Volumen eines zusammengesetzten Körpers?",
      "rules": [
       [
        "1. Zerlegen",
        [
         "in bekannte Körper"
        ]
       ],
       [
        "2. Rechnen",
        [
         "jedes Teil einzeln"
        ]
       ],
       [
        "3. Zusammen",
        [
         "angesetzt → addieren",
         "ausgeschnitten → subtrahieren"
        ]
       ],
       [
        "Gartenhaus",
        [
         "Quader 30 m³, Dach 6 m³"
        ]
       ],
       [
        "V",
        [
         "= 30 + 6 = **36 m³**"
        ]
       ]
      ],
      "merke": "Merke: Flächen, an denen sich Teile berühren, gehören nicht zur Oberfläche.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Stereometrie“: aus Pyramiden, Zylindern und Prismen zusammengesetzte Körper (S. 25)"
    }
   ]
  },
  {
   "id": "ma-5",
   "title": "Wahrscheinlichkeit",
   "subs": [
    {
     "id": "ma-5-1",
     "title": "Ergebnis und Ereignis",
     "content": [
      {
       "p": "Bei einem **Zufallsexperiment** gibt es mehrere mögliche Ausgänge. Vorher weißt du nicht, welcher eintritt. Beispiele: Würfeln, Münze werfen, Glücksrad drehen."
      },
      {
       "rules": [
        [
         "Ergebnis",
         [
          "ein einzelner möglicher Ausgang",
          "Würfel: zum Beispiel die 4"
         ]
        ],
        [
         "Ereignis",
         [
          "eine Gruppe von Ergebnissen",
          "Würfel: „gerade Zahl“ = 2, 4, 6"
         ]
        ]
       ]
      },
      {
       "p": "Ein Ereignis **tritt ein**, wenn eines seiner Ergebnisse fällt. Du würfelst eine 4. Dann ist „gerade Zahl“ eingetreten."
      },
      {
       "ex": "Glücksrad mit den Feldern 1 bis 8. Ereignis „Zahl größer als 6“: Dazu gehören die Ergebnisse 7 und 8."
      },
      {
       "ul": [
        "Ein Ereignis kann auch nur ein Ergebnis haben, z. B. „eine 6“.",
        "Sicheres Ereignis: tritt immer ein, z. B. „Zahl von 1 bis 6“.",
        "Unmögliches Ereignis: tritt nie ein, z. B. „eine 7“."
       ]
      },
      {
       "note": "Ergebnis = ein Ausgang. Ereignis = eine Auswahl von Ausgängen."
      }
     ],
     "card": {
      "title": "Ergebnis und Ereignis",
      "frage": "Was ist der Unterschied zwischen Ergebnis und Ereignis?",
      "rules": [
       [
        "Zufallsexperiment",
        [
         "Ausgang vorher unbekannt"
        ]
       ],
       [
        "Ergebnis",
        [
         "**ein** möglicher Ausgang",
         "Würfel: 4"
        ]
       ],
       [
        "Ereignis",
        [
         "**Gruppe** von Ergebnissen",
         "Würfel: „gerade“ = 2, 4, 6"
        ]
       ],
       [
        "Eintreten",
        [
         "bei 4 tritt „gerade“ ein"
        ]
       ],
       [
        "Würfel: „7“",
        [
         "unmögliches Ereignis"
        ]
       ]
      ],
      "merke": "Merke: Ein Ergebnis ist ein Ausgang. Ein Ereignis fasst Ergebnisse zusammen.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Wahrscheinlichkeitsrechnung“: Wahrscheinlichkeit eines Ereignisses, Unterschied zwischen Ereignis und Ergebnis (S. 26)"
    },
    {
     "id": "ma-5-2",
     "title": "Die Laplace-Regel",
     "content": [
      {
       "p": "Bei einem **Laplace-Experiment** sind alle Ergebnisse gleich wahrscheinlich, zum Beispiel beim fairen Würfel oder bei einer fairen Münze."
      },
      {
       "rules": [
        [
         "Formel",
         [
          "P(E) = Anzahl günstige Ergebnisse : Anzahl mögliche Ergebnisse"
         ]
        ]
       ]
      },
      {
       "ex": "Würfel, Ereignis „gerade Zahl“: günstig sind 2, 4, 6, also 3. Möglich sind 6. P = 3/6 = 1/2 = 50 %."
      },
      {
       "ex": "Glücksrad mit 8 gleich großen Feldern, 2 davon rot: P(rot) = 2/8 = 1/4 = 25 %."
      },
      {
       "note": "Eine Wahrscheinlichkeit liegt immer zwischen 0 (unmöglich) und 1 (sicher), also zwischen 0 % und 100 %."
      },
      {
       "h": "Aussagen richtig deuten"
      },
      {
       "p": "P(6) = 1/6 heißt nicht: Nach 6 Würfen kommt sicher eine 6. Es heißt: Bei sehr vielen Würfen ist ungefähr jeder sechste Wurf eine 6."
      },
      {
       "note": "Der Würfel hat kein Gedächtnis. Nach drei 1en hintereinander ist eine 1 genauso wahrscheinlich wie vorher."
      }
     ],
     "card": {
      "title": "Laplace-Regel",
      "frage": "Wie berechnest du eine Wahrscheinlichkeit mit der Laplace-Regel?",
      "rules": [
       [
        "Bedingung",
        [
         "alle Ergebnisse gleich wahrscheinlich"
        ]
       ],
       [
        "Formel",
        [
         "P = günstige : mögliche"
        ]
       ],
       [
        "Würfel: gerade",
        [
         "günstig: 2, 4, 6 → 3",
         "möglich: 1 bis 6 → 6",
         "P = 3/6 = 1/2 = 50 %"
        ]
       ]
      ],
      "merke": "Merke: Wahrscheinlichkeit = günstige durch mögliche Ergebnisse.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Wahrscheinlichkeitsrechnung“: Laplace-Regel (S. 26)"
    },
    {
     "id": "ma-5-3",
     "title": "Baumdiagramm und Pfadregeln",
     "content": [
      {
       "p": "Bei einem **mehrstufigen** Zufallsexperiment machst du mehrere Versuche nacheinander, z. B. zweimal eine Münze werfen. Ein **Baumdiagramm** zeigt alle Möglichkeiten."
      },
      {
       "rules": [
        [
         "Baumdiagramm",
         [
          "Jede Stufe ist ein Versuch.",
          "An jedem Ast steht seine Wahrscheinlichkeit.",
          "Ein Weg vom Start bis zum Ende ist ein Pfad."
         ]
        ],
        [
         "1. Pfadregel",
         [
          "Entlang eines Pfades **multiplizierst** du."
         ]
        ],
        [
         "2. Pfadregel",
         [
          "Gehören mehrere Pfade zum Ereignis, **addierst** du."
         ]
        ]
       ]
      },
      {
       "calc": {
        "title": "Münze zweimal: P(Kopf, Kopf)",
        "rows": [
         {
          "label": "P(Kopf) im 1. Wurf",
          "n": "0,5"
         },
         {
          "op": "×",
          "label": "P(Kopf) im 2. Wurf",
          "n": "0,5"
         },
         {
          "op": "=",
          "label": "P(Kopf, Kopf)",
          "n": "0,25",
          "t": "sum"
         }
        ]
       }
      },
      {
       "calc": {
        "title": "Münze zweimal: genau einmal Kopf",
        "rows": [
         {
          "label": "P(Kopf, Zahl)",
          "n": "0,25"
         },
         {
          "op": "+",
          "label": "P(Zahl, Kopf)",
          "n": "0,25"
         },
         {
          "op": "=",
          "label": "P(genau einmal Kopf)",
          "n": "0,50",
          "t": "sum"
         }
        ]
       }
      },
      {
       "ex": "Als Bruch: P(Kopf, Kopf) = 1/2 · 1/2 = 1/4. Genau einmal Kopf: 1/4 + 1/4 = 1/2."
      },
      {
       "note": "Die Äste an einer Verzweigung ergeben zusammen immer 1. So kannst du dein Baumdiagramm prüfen."
      }
     ],
     "card": {
      "title": "Baumdiagramm, Pfadregeln",
      "frage": "Wie rechnest du mit einem Baumdiagramm Wahrscheinlichkeiten aus?",
      "rules": [
       [
        "Baum",
        [
         "jede Stufe = ein Versuch",
         "am Ast: seine Wahrscheinlichkeit"
        ]
       ],
       [
        "1. Pfadregel",
        [
         "entlang des Pfades **mal**"
        ]
       ],
       [
        "2. Pfadregel",
        [
         "mehrere Pfade **plus**"
        ]
       ],
       [
        "Münze 2-mal",
        [
         "P(K, K) = 1/2 · 1/2 = 1/4"
        ]
       ],
       [
        "genau 1-mal K",
        [
         "P(K, Z) + P(Z, K)",
         "= 1/4 + 1/4 = **1/2**"
        ]
       ]
      ],
      "merke": "Merke: Entlang eines Pfades wird multipliziert, verschiedene Pfade werden addiert.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Wahrscheinlichkeitsrechnung“: Baumdiagramm, Pfadregeln (S. 26)"
    },
    {
     "id": "ma-5-4",
     "title": "Gegenereignis",
     "content": [
      {
       "p": "Das **Gegenereignis** zu einem Ereignis E enthält alle Ergebnisse, die **nicht** zu E gehören. Man schreibt Ē und sagt „E quer“."
      },
      {
       "rules": [
        [
         "Formel",
         [
          "P(Ē) = 1 – P(E)"
         ]
        ],
        [
         "In Prozent",
         [
          "P(Ē) = 100 % – P(E)"
         ]
        ]
       ]
      },
      {
       "ex": "Würfel, E = „eine 6“: P(E) = 1/6. Das Gegenereignis ist „keine 6“: P = 1 – 1/6 = 5/6."
      },
      {
       "ex": "Die Regenwahrscheinlichkeit auf Rügen ist 30 %. Dann bleibt es mit 100 % – 30 % = 70 % trocken."
      },
      {
       "h": "Trick bei „mindestens eine“"
      },
      {
       "p": "Du würfelst dreimal. Gesucht ist „mindestens eine 6“. Das sind viele Pfade. Leichter ist das Gegenereignis „keine 6“."
      },
      {
       "calc": {
        "title": "Dreimal würfeln: mindestens eine 6",
        "rows": [
         {
          "label": "sicheres Ereignis",
          "n": "1,000"
         },
         {
          "op": "–",
          "label": "P(keine 6) = 5/6 · 5/6 · 5/6",
          "n": "0,579"
         },
         {
          "op": "=",
          "label": "P(mindestens eine 6)",
          "n": "0,421",
          "t": "sum"
         }
        ]
       }
      },
      {
       "note": "Genau ist P(keine 6) = 125/216. Gerundet sind das 0,579. Mindestens eine 6 kommt also mit etwa 42 %."
      }
     ],
     "card": {
      "title": "Gegenereignis",
      "frage": "Wie berechnest du die Wahrscheinlichkeit des Gegenereignisses?",
      "rules": [
       [
        "Gegenereignis Ē",
        [
         "alles, was nicht zu E gehört"
        ]
       ],
       [
        "Formel",
        [
         "**P(Ē) = 1 – P(E)**"
        ]
       ],
       [
        "Beispiel",
        [
         "E = „eine 6“, P(E) = 1/6"
        ]
       ],
       [
        "P(keine 6)",
        [
         "= 1 – 1/6 = **5/6**"
        ]
       ],
       [
        "Regen 30 %",
        [
         "trocken: **70 %**"
        ]
       ],
       [
        "Tipp",
        [
         "bei „mindestens eine“ nutzen"
        ]
       ]
      ],
      "merke": "Merke: Ereignis und Gegenereignis ergeben zusammen immer 1, also 100 %.",
      "quelle": "RP Mathematik RegS 2019, Klasse 8"
     },
     "src": "Rahmenplan Mathematik Regionale Schule 2019, Klasse 8, Thema „Wahrscheinlichkeitsrechnung“: Gegenereignis; Beispiel K2 „mindestens eine 6 beim dreimaligen Würfeln“ (S. 26)"
    }
   ]
  }
 ]
});
