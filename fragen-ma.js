window.L8_FRAGEN = (window.L8_FRAGEN || []).concat([
 {
  "id": "q-ma-1-2-1",
  "ref": "ma-1-2",
  "type": "mc",
  "q": "Bei welcher Funktion **fällt** die Gerade?",
  "options": [
   "f(x) = 2x + 5",
   "f(x) = –3x + 1",
   "f(x) = 4",
   "f(x) = 0,5x – 2"
  ],
  "correct": [
   1
  ],
  "why": "Die Gerade fällt, wenn m kleiner als 0 ist. Nur bei –3x + 1 ist m negativ (m = –3)."
 },
 {
  "id": "q-ma-1-2-2",
  "ref": "ma-1-2",
  "type": "zahl",
  "q": "f(x) = 3·x – 2. Berechne f(4).",
  "answer": 10,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "3 · 4",
     "n": "12"
    },
    {
     "op": "–",
     "label": "2",
     "n": "2"
    },
    {
     "op": "=",
     "label": "f(4)",
     "n": "10",
     "t": "sum"
    }
   ]
  },
  "why": "Setze 4 für x ein: erst 3 · 4 = 12, dann 12 – 2 = 10."
 },
 {
  "id": "q-ma-2-4-1",
  "ref": "ma-2-4",
  "type": "mc",
  "q": "Was ergibt (x + 5)²?",
  "options": [
   "x² + 25",
   "x² + 10x + 25",
   "x² + 5x + 25",
   "2x + 10"
  ],
  "correct": [
   1
  ],
  "why": "1. binomische Formel: a² + 2ab + b² = x² + 2·x·5 + 25 = x² + 10x + 25."
 },
 {
  "id": "q-ma-2-4-2",
  "ref": "ma-2-4",
  "type": "mc",
  "q": "Was ergibt (a + 4) · (a – 4)?",
  "options": [
   "a² – 16",
   "a² + 16",
   "a² – 8a + 16",
   "a² – 8"
  ],
  "correct": [
   0
  ],
  "why": "3. binomische Formel: (a + b)(a – b) = a² – b² = a² – 16."
 },
 {
  "id": "q-ma-3-2-1",
  "ref": "ma-3-2",
  "type": "zahl",
  "q": "Ein rechtwinkliges Dreieck hat die Katheten 6 cm und 8 cm. Wie lang ist die Hypotenuse (in cm)?",
  "answer": 10,
  "unit": "cm",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "6²",
     "n": "36"
    },
    {
     "op": "+",
     "label": "8²",
     "n": "64"
    },
    {
     "op": "=",
     "label": "c²",
     "n": "100",
     "t": "sub"
    },
    {
     "label": "c = √100",
     "n": "10 cm",
     "t": "sum"
    }
   ]
  },
  "why": "a² + b² = c²: 36 + 64 = 100. Die Wurzel aus 100 ist 10."
 },
 {
  "id": "q-ma-3-2-2",
  "ref": "ma-3-2",
  "type": "mc",
  "q": "Welche Seite ist die **Hypotenuse**?",
  "options": [
   "die kürzeste Seite",
   "die Seite gegenüber dem rechten Winkel",
   "eine Seite am rechten Winkel",
   "immer die untere Seite"
  ],
  "correct": [
   1
  ],
  "why": "Die Hypotenuse liegt gegenüber dem rechten Winkel. Sie ist die längste Seite."
 },
 {
  "id": "q-ma-4-4-1",
  "ref": "ma-4-4",
  "type": "zahl",
  "q": "Ein Zylinder hat r = 2 cm und h = 5 cm. Berechne das Volumen mit π ≈ 3,14 (in cm³).",
  "answer": 62.8,
  "unit": "cm³",
  "tol": 0.05,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "G = 3,14 · 2²",
     "n": "12,56 cm²"
    },
    {
     "op": "×",
     "label": "h",
     "n": "5 cm"
    },
    {
     "op": "=",
     "label": "V",
     "n": "62,80 cm³",
     "t": "sum"
    }
   ]
  },
  "why": "Erst die Grundfläche: 3,14 · 4 = 12,56 cm². Dann mal die Höhe: 12,56 · 5 = 62,80 cm³."
 },
 {
  "id": "q-ma-4-4-2",
  "ref": "ma-4-4",
  "type": "mc",
  "q": "Woraus besteht die Oberfläche eines Zylinders?",
  "options": [
   "aus 2 Kreisen und dem Mantel",
   "aus 1 Kreis und dem Mantel",
   "nur aus dem Mantel",
   "aus 2 Kreisen"
  ],
  "correct": [
   0
  ],
  "why": "Grundfläche und Deckfläche sind zwei gleiche Kreise. Dazu kommt der Mantel: O = 2 · G + M."
 },
 {
  "id": "q-ma-5-2-1",
  "ref": "ma-5-2",
  "type": "mc",
  "q": "Ein fairer Würfel wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für eine Zahl **größer als 4**?",
  "options": [
   "1/6",
   "2/3",
   "1/2",
   "1/3"
  ],
  "correct": [
   3
  ],
  "why": "Günstig sind 5 und 6, also 2. Möglich sind 6. P = 2/6 = 1/3."
 },
 {
  "id": "q-ma-5-2-2",
  "ref": "ma-5-2",
  "type": "mc",
  "q": "Ein Glücksrad hat 10 gleich große Felder. 3 davon sind blau. Wie groß ist P(blau)?",
  "options": [
   "3 %",
   "3/7",
   "30 %",
   "7/10"
  ],
  "correct": [
   2
  ],
  "why": "P = 3 : 10 = 3/10 = 30 %."
 },
 {
  "id": "q-ma-1-1-1",
  "ref": "ma-1-1",
  "type": "mc",
  "q": "Wie heißt der y-Wert, der zu einem x gehört?",
  "options": [
   "Stelle",
   "Funktionswert",
   "Argument",
   "Anstieg"
  ],
  "correct": [
   1
  ],
  "why": "Der y-Wert heißt Funktionswert f(x). Der x-Wert heißt Stelle oder Argument."
 },
 {
  "id": "q-ma-1-1-2",
  "ref": "ma-1-1",
  "type": "zahl",
  "q": "Handytarif: f(x) = 3·x + 4 (x = GB, f(x) in €). Was kostet ein Monat mit 5 GB?",
  "answer": 19,
  "unit": "€",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "3 · 5",
     "n": "15 €"
    },
    {
     "op": "+",
     "label": "Grundgebühr",
     "n": "4 €"
    },
    {
     "op": "=",
     "label": "f(5)",
     "n": "19 €",
     "t": "sum"
    }
   ]
  },
  "why": "Setze 5 für x ein: 3 · 5 = 15, dann 15 + 4 = 19 €."
 },
 {
  "id": "q-ma-1-3-1",
  "ref": "ma-1-3",
  "type": "zahl",
  "q": "f(x) = 5·x – 20. Berechne die Nullstelle x₀.",
  "answer": 4,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "5·x = 20",
     "n": "20"
    },
    {
     "op": ":",
     "label": "durch 5",
     "n": "5"
    },
    {
     "op": "=",
     "label": "x₀",
     "n": "4",
     "t": "sum"
    }
   ]
  },
  "why": "Setze f(x) = 0: 5·x – 20 = 0. Dann 5·x = 20 und x = 4."
 },
 {
  "id": "q-ma-1-3-2",
  "ref": "ma-1-3",
  "type": "mc",
  "q": "Wo schneidet f(x) = 3·x + 2 die y-Achse?",
  "options": [
   "(2 | 0)",
   "(0 | 3)",
   "(0 | 2)",
   "(3 | 2)"
  ],
  "correct": [
   2
  ],
  "why": "Der Schnitt mit der y-Achse ist (0 | n). Hier ist n = 2."
 },
 {
  "id": "q-ma-1-4-1",
  "ref": "ma-1-4",
  "type": "mc",
  "q": "f(x) = –2·x + 3. Wie gehst du vom Punkt (0 | 3) aus im Anstiegsdreieck?",
  "options": [
   "1 rechts, 2 runter",
   "1 rechts, 2 hoch",
   "2 rechts, 1 runter",
   "3 rechts, 2 runter"
  ],
  "correct": [
   0
  ],
  "why": "Immer 1 nach rechts. m = –2 ist negativ, also 2 nach unten."
 },
 {
  "id": "q-ma-1-4-2",
  "ref": "ma-1-4",
  "type": "zahl",
  "q": "Eine Gerade geht durch (0 | 2) und (3 | 8). Wie groß ist der Anstieg m?",
  "answer": 2,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "hoch: 8 – 2",
     "n": "6"
    },
    {
     "op": ":",
     "label": "rechts: 3 – 0",
     "n": "3"
    },
    {
     "op": "=",
     "label": "m",
     "n": "2",
     "t": "sum"
    }
   ]
  },
  "why": "m = hoch : rechts. Es geht 6 nach oben und 3 nach rechts: 6 : 3 = 2."
 },
 {
  "id": "q-ma-1-5-1",
  "ref": "ma-1-5",
  "type": "mc",
  "q": "Welche Funktion ist **konstant**?",
  "options": [
   "f(x) = x",
   "f(x) = 2x + 7",
   "f(x) = –x",
   "f(x) = 7"
  ],
  "correct": [
   3
  ],
  "why": "Bei f(x) = 7 ist m = 0. Für jedes x kommt 7 heraus. Die Gerade ist waagerecht."
 },
 {
  "id": "q-ma-1-5-2",
  "ref": "ma-1-5",
  "type": "zahl",
  "q": "Ein Handyakku hat 90 %. Er verliert 6 % pro Stunde: f(x) = –6·x + 90. Wie viel Prozent sind nach 4 Stunden übrig?",
  "answer": 66,
  "unit": "%",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "Start",
     "n": "90 %"
    },
    {
     "op": "–",
     "label": "6 % · 4 Stunden",
     "n": "24 %"
    },
    {
     "op": "=",
     "label": "f(4)",
     "n": "66 %",
     "t": "sum"
    }
   ]
  },
  "why": "In 4 Stunden gehen 6 · 4 = 24 % verloren. 90 – 24 = 66 %."
 },
 {
  "id": "q-ma-1-6-1",
  "ref": "ma-1-6",
  "type": "mc",
  "q": "Wie liegen f(x) = 3x + 1 und g(x) = 3x – 4 zueinander?",
  "options": [
   "Sie schneiden sich in (0 | 1).",
   "Sie sind parallel.",
   "Sie sind dieselbe Gerade.",
   "Sie schneiden sich zweimal."
  ],
  "correct": [
   1
  ],
  "why": "Beide haben m = 3, aber verschiedene n. Darum sind sie parallel."
 },
 {
  "id": "q-ma-1-6-2",
  "ref": "ma-1-6",
  "type": "mc",
  "q": "Aus f(x) = 2x + 1 wird f(x) = 2x + 4. Was passiert mit der Geraden?",
  "options": [
   "Sie rutscht um 3 nach oben.",
   "Sie wird steiler.",
   "Sie fällt jetzt.",
   "Sie wird flacher."
  ],
  "correct": [
   0
  ],
  "why": "m bleibt 2, also gleich steil. n wächst von 1 auf 4, also rutscht sie 3 nach oben."
 },
 {
  "id": "q-ma-2-1-1",
  "ref": "ma-2-1",
  "type": "mc",
  "q": "Was ergibt 7y – 2y + 4?",
  "options": [
   "9y",
   "11y",
   "5y + 4",
   "9y + 4"
  ],
  "correct": [
   2
  ],
  "why": "Nur 7y und 2y sind gleichartig: 7y – 2y = 5y. Die 4 bleibt allein stehen."
 },
 {
  "id": "q-ma-2-1-2",
  "ref": "ma-2-1",
  "type": "zahl",
  "q": "Fasse zusammen: 6a + 3a – 2a. Wie viele a bleiben?",
  "answer": 7,
  "unit": "a",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "6a",
     "n": "6"
    },
    {
     "op": "+",
     "label": "3a",
     "n": "3"
    },
    {
     "op": "–",
     "label": "2a",
     "n": "2"
    },
    {
     "op": "=",
     "label": "Anzahl a",
     "n": "7",
     "t": "sum"
    }
   ]
  },
  "why": "Rechne nur mit den Zahlen davor: 6 + 3 – 2 = 7. Also 7a."
 },
 {
  "id": "q-ma-2-2-1",
  "ref": "ma-2-2",
  "type": "mc",
  "q": "Was ergibt 4 · (a – 3)?",
  "options": [
   "4a – 3",
   "4a + 12",
   "a – 12",
   "4a – 12"
  ],
  "correct": [
   3
  ],
  "why": "Beide Glieder mal 4: 4 · a = 4a und 4 · 3 = 12. Das Minus bleibt: 4a – 12."
 },
 {
  "id": "q-ma-2-2-2",
  "ref": "ma-2-2",
  "type": "zahl",
  "q": "Rechne geschickt mit Ausklammern: 7 · 48 + 7 · 52 = 7 · (48 + 52). Was kommt heraus?",
  "answer": 700,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "48 + 52",
     "n": "100"
    },
    {
     "op": "×",
     "label": "7",
     "n": "7"
    },
    {
     "op": "=",
     "label": "Ergebnis",
     "n": "700",
     "t": "sum"
    }
   ]
  },
  "why": "Erst die Klammer: 48 + 52 = 100. Dann 7 · 100 = 700. Das geht im Kopf."
 },
 {
  "id": "q-ma-2-3-1",
  "ref": "ma-2-3",
  "type": "mc",
  "q": "Was ergibt (x + 1) · (x + 4)?",
  "options": [
   "x² + 5x + 4",
   "x² + 4",
   "x² + 4x + 4",
   "2x + 5"
  ],
  "correct": [
   0
  ],
  "why": "Jedes Glied mal jedes: x² + 4x + x + 4. Zusammengefasst: x² + 5x + 4."
 },
 {
  "id": "q-ma-2-3-2",
  "ref": "ma-2-3",
  "type": "zahl",
  "q": "(x + 3) · (x + 2) = x² + 5x + 6. Mach die Probe mit x = 2: Was ergibt x² + 5x + 6?",
  "answer": 20,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "x² = 2²",
     "n": "4"
    },
    {
     "op": "+",
     "label": "5x = 5 · 2",
     "n": "10"
    },
    {
     "op": "+",
     "label": "6",
     "n": "6"
    },
    {
     "op": "=",
     "label": "Ergebnis",
     "n": "20",
     "t": "sum"
    }
   ]
  },
  "why": "4 + 10 + 6 = 20. Links: (2 + 3) · (2 + 2) = 5 · 4 = 20. Passt."
 },
 {
  "id": "q-ma-2-5-1",
  "ref": "ma-2-5",
  "type": "zahl",
  "q": "Löse die Gleichung: 4x – 7 = 13",
  "answer": 5,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "4x = 13 + 7",
     "n": "20"
    },
    {
     "op": ":",
     "label": "durch 4",
     "n": "4"
    },
    {
     "op": "=",
     "label": "x",
     "n": "5",
     "t": "sum"
    }
   ]
  },
  "why": "Auf beiden Seiten + 7: 4x = 20. Dann durch 4: x = 5. Probe: 4 · 5 – 7 = 13."
 },
 {
  "id": "q-ma-2-5-2",
  "ref": "ma-2-5",
  "type": "mc",
  "q": "Was rechnest du bei 2x + 6 = 14 zuerst?",
  "options": [
   "auf beiden Seiten : 6",
   "nur links – 6",
   "auf beiden Seiten – 6",
   "auf beiden Seiten + 6"
  ],
  "correct": [
   2
  ],
  "why": "Die 6 soll weg. Darum auf beiden Seiten – 6. Dann steht 2x = 8 da."
 },
 {
  "id": "q-ma-2-6-1",
  "ref": "ma-2-6",
  "type": "zahl",
  "q": "Löse die Verhältnisgleichung: x/6 = 2/3",
  "answer": 4,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "2 · 6",
     "n": "12"
    },
    {
     "op": ":",
     "label": "3",
     "n": "3"
    },
    {
     "op": "=",
     "label": "x",
     "n": "4",
     "t": "sum"
    }
   ]
  },
  "why": "Mal 6 auf beiden Seiten: x = 2/3 · 6 = 12 : 3 = 4."
 },
 {
  "id": "q-ma-2-6-2",
  "ref": "ma-2-6",
  "type": "mc",
  "q": "Was ist die Lösung von –2x < 8?",
  "options": [
   "x < –4",
   "x > –4",
   "x > 4",
   "x < 4"
  ],
  "correct": [
   1
  ],
  "why": "Teile durch –2. Bei einer Minuszahl dreht sich das Zeichen um: x > –4."
 },
 {
  "id": "q-ma-3-1-1",
  "ref": "ma-3-1",
  "type": "mc",
  "q": "Im Dreieck ABC liegt der rechte Winkel bei A. Welche Seite ist die **Hypotenuse**?",
  "options": [
   "c",
   "b",
   "a",
   "keine Seite"
  ],
  "correct": [
   2
  ],
  "why": "Die Hypotenuse liegt gegenüber dem rechten Winkel. Gegenüber von A liegt die Seite a."
 },
 {
  "id": "q-ma-3-1-2",
  "ref": "ma-3-1",
  "type": "mc",
  "q": "Ein rechtwinkliges Dreieck hat die Seiten 5 cm, 12 cm und 13 cm. Welche Seite ist die Hypotenuse?",
  "options": [
   "13 cm",
   "12 cm",
   "5 cm",
   "das kann man nicht sagen"
  ],
  "correct": [
   0
  ],
  "why": "Die Hypotenuse ist immer die längste Seite. Hier ist das 13 cm."
 },
 {
  "id": "q-ma-3-3-1",
  "ref": "ma-3-3",
  "type": "zahl",
  "q": "Ein Dreieck hat die Seiten 5 cm, 12 cm und 13 cm. Berechne 5² + 12².",
  "answer": 169,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "5²",
     "n": "25"
    },
    {
     "op": "+",
     "label": "12²",
     "n": "144"
    },
    {
     "op": "=",
     "label": "5² + 12²",
     "n": "169",
     "t": "sum"
    }
   ]
  },
  "why": "25 + 144 = 169. Und 13² ist auch 169. Also ist das Dreieck rechtwinklig. Gut gemacht!"
 },
 {
  "id": "q-ma-3-3-2",
  "ref": "ma-3-3",
  "type": "mc",
  "q": "Welches Dreieck ist **rechtwinklig**?",
  "options": [
   "4 cm, 5 cm, 6 cm",
   "9 cm, 12 cm, 15 cm",
   "2 cm, 3 cm, 4 cm",
   "5 cm, 6 cm, 8 cm"
  ],
  "correct": [
   1
  ],
  "why": "9² + 12² = 81 + 144 = 225. Und 15² = 225. Bei den anderen passt es nicht."
 },
 {
  "id": "q-ma-5-1-1",
  "ref": "ma-5-1",
  "type": "mc",
  "q": "Du würfelst einmal. Welche Ergebnisse gehören zum Ereignis „ungerade Zahl“?",
  "options": [
   "2, 4, 6",
   "1, 3, 5",
   "1, 2, 3",
   "5 und 6"
  ],
  "correct": [
   1
  ],
  "why": "Ungerade Zahlen auf dem Würfel sind 1, 3 und 5. Diese drei Ergebnisse bilden das Ereignis."
 },
 {
  "id": "q-ma-5-1-2",
  "ref": "ma-5-1",
  "type": "mc",
  "q": "Du würfelst eine 5. Welches Ereignis ist **eingetreten**?",
  "options": [
   "„gerade Zahl“",
   "„Zahl kleiner als 4“",
   "„eine 6“",
   "„Zahl größer als 4“"
  ],
  "correct": [
   3
  ],
  "why": "Zu „Zahl größer als 4“ gehören 5 und 6. Die 5 ist dabei, also ist das Ereignis eingetreten."
 },
 {
  "id": "q-ma-5-3-1",
  "ref": "ma-5-3",
  "type": "zahl",
  "q": "Du wirfst eine Münze dreimal. Wie groß ist die Wahrscheinlichkeit für dreimal Kopf (in %)?",
  "answer": 12.5,
  "unit": "%",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "P(Kopf)",
     "n": "0,5"
    },
    {
     "op": "×",
     "label": "P(Kopf)",
     "n": "0,5"
    },
    {
     "op": "×",
     "label": "P(Kopf)",
     "n": "0,5"
    },
    {
     "op": "=",
     "label": "P(Kopf, Kopf, Kopf)",
     "n": "0,125",
     "t": "sub"
    },
    {
     "label": "in Prozent",
     "n": "12,5 %",
     "t": "sum"
    }
   ]
  },
  "why": "1. Pfadregel: entlang des Pfades multiplizieren. 0,5 · 0,5 · 0,5 = 0,125. Das sind 12,5 %."
 },
 {
  "id": "q-ma-5-3-2",
  "ref": "ma-5-3",
  "type": "mc",
  "q": "Was machst du mit den Wahrscheinlichkeiten **entlang eines Pfades**?",
  "options": [
   "addieren",
   "subtrahieren",
   "dividieren",
   "multiplizieren"
  ],
  "correct": [
   3
  ],
  "why": "Das ist die 1. Pfadregel: Entlang eines Pfades wird multipliziert. Addiert werden verschiedene Pfade."
 },
 {
  "id": "q-ma-5-4-1",
  "ref": "ma-5-4",
  "type": "zahl",
  "q": "Die Wahrscheinlichkeit, dass deine Mannschaft das Fußballspiel gewinnt, ist 45 %. Wie groß ist die Wahrscheinlichkeit, dass sie **nicht** gewinnt (in %)?",
  "answer": 55,
  "unit": "%",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "sicheres Ereignis",
     "n": "100 %"
    },
    {
     "op": "–",
     "label": "P(gewinnt)",
     "n": "45 %"
    },
    {
     "op": "=",
     "label": "P(gewinnt nicht)",
     "n": "55 %",
     "t": "sum"
    }
   ]
  },
  "why": "„Nicht gewinnen“ ist das Gegenereignis. 100 % – 45 % = 55 %."
 },
 {
  "id": "q-ma-5-4-2",
  "ref": "ma-5-4",
  "type": "mc",
  "q": "Bei einem Glücksrad ist P(gelb) = 1/5. Wie groß ist P(nicht gelb)?",
  "options": [
   "4/5",
   "1/5",
   "5/4",
   "1/4"
  ],
  "correct": [
   0
  ],
  "why": "Gegenereignis: 1 – 1/5 = 4/5."
 },
 {
  "id": "q-ma-4-1-1",
  "ref": "ma-4-1",
  "type": "zahl",
  "q": "Ein Prisma hat ein Fünfeck als Grundfläche. Wie viele Kanten hat es?",
  "answer": 15,
  "unit": "",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "n (Ecken des Fünfecks)",
     "n": "5"
    },
    {
     "op": "×",
     "label": "Faktor für Kanten",
     "n": "3"
    },
    {
     "op": "=",
     "label": "Kanten 3 · n",
     "n": "15",
     "t": "sum"
    }
   ]
  },
  "why": "Oben 5 Kanten, unten 5 Kanten, dazwischen 5 Kanten. Zusammen 3 · 5 = 15."
 },
 {
  "id": "q-ma-4-1-2",
  "ref": "ma-4-1",
  "type": "mc",
  "q": "Woran erkennst du ein **gerades** Prisma?",
  "options": [
   "Die Seitenkanten sind geneigt.",
   "Die Seitenflächen sind Rechtecke.",
   "Die Grundfläche ist ein Dreieck.",
   "Es hat genau 8 Ecken."
  ],
  "correct": [
   1
  ],
  "why": "Beim geraden Prisma stehen die Seitenkanten senkrecht. Darum sind die Seitenflächen Rechtecke."
 },
 {
  "id": "q-ma-4-2-1",
  "ref": "ma-4-2",
  "type": "zahl",
  "q": "Ein Würfel hat 6 cm Kantenlänge. Du zeichnest ein Schrägbild mit 45° und Verkürzung 1/2. Wie lang zeichnest du die Tiefenkanten (in cm)?",
  "answer": 3,
  "unit": "cm",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "Kante",
     "n": "6 cm"
    },
    {
     "op": ":",
     "label": "halbieren",
     "n": "2"
    },
    {
     "op": "=",
     "label": "Tiefenkante",
     "n": "3 cm",
     "t": "sum"
    }
   ]
  },
  "why": "Tiefenkanten zeichnest du nur halb so lang: 6 : 2 = 3 cm."
 },
 {
  "id": "q-ma-4-2-2",
  "ref": "ma-4-2",
  "type": "mc",
  "q": "Welche Darstellung zeigt den Körper genau von vorn **und** genau von oben?",
  "options": [
   "das Netz",
   "das Schrägbild",
   "das Körpermodell",
   "das Zweitafelbild"
  ],
  "correct": [
   3
  ],
  "why": "Im Zweitafelbild steht oben die Vorderansicht und darunter die Draufsicht."
 },
 {
  "id": "q-ma-4-3-1",
  "ref": "ma-4-3",
  "type": "zahl",
  "q": "Eine Schachtel in Prismaform hat die Grundfläche G = 15 cm² und die Höhe h = 8 cm. Berechne das Volumen (in cm³).",
  "answer": 120,
  "unit": "cm³",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "G",
     "n": "15 cm²"
    },
    {
     "op": "×",
     "label": "h",
     "n": "8 cm"
    },
    {
     "op": "=",
     "label": "V",
     "n": "120 cm³",
     "t": "sum"
    }
   ]
  },
  "why": "V = G · h = 15 · 8 = 120 cm³."
 },
 {
  "id": "q-ma-4-3-2",
  "ref": "ma-4-3",
  "type": "mc",
  "q": "Ein gerades Prisma hat G = 10 cm², u = 14 cm und h = 5 cm. Wie groß ist die Oberfläche?",
  "options": [
   "50 cm²",
   "70 cm²",
   "90 cm²",
   "80 cm²"
  ],
  "correct": [
   2
  ],
  "why": "M = u · h = 14 · 5 = 70 cm². O = 2 · G + M = 20 + 70 = 90 cm²."
 },
 {
  "id": "q-ma-4-5-1",
  "ref": "ma-4-5",
  "type": "zahl",
  "q": "Eine Pyramide hat die Grundfläche G = 30 cm² und die Höhe h = 9 cm. Berechne das Volumen (in cm³).",
  "answer": 90,
  "unit": "cm³",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "G",
     "n": "30 cm²"
    },
    {
     "op": "×",
     "label": "h",
     "n": "9 cm"
    },
    {
     "op": "=",
     "label": "G · h",
     "n": "270 cm³",
     "t": "sub"
    },
    {
     "op": ":",
     "label": "durch 3",
     "n": "3"
    },
    {
     "op": "=",
     "label": "V",
     "n": "90 cm³",
     "t": "sum"
    }
   ]
  },
  "why": "V = 1/3 · G · h. Erst 30 · 9 = 270, dann 270 : 3 = 90 cm³."
 },
 {
  "id": "q-ma-4-5-2",
  "ref": "ma-4-5",
  "type": "mc",
  "q": "Wie viele Flächen hat eine Pyramide mit quadratischer Grundfläche?",
  "options": [
   "5",
   "4",
   "6",
   "8"
  ],
  "correct": [
   0
  ],
  "why": "Das Quadrat unten ist 1 Fläche. Dazu kommen 4 Seitendreiecke. Zusammen 5 Flächen."
 },
 {
  "id": "q-ma-4-6-1",
  "ref": "ma-4-6",
  "type": "zahl",
  "q": "Ein Spielturm ist ein Quader (V = 8 m³) mit einem Pyramidendach (G = 4 m², h = 1,5 m). Berechne das Gesamtvolumen (in m³).",
  "answer": 10,
  "unit": "m³",
  "tol": 0.01,
  "solution": {
   "title": "Lösung",
   "rows": [
    {
     "label": "Quader",
     "n": "8 m³"
    },
    {
     "op": "+",
     "label": "Dach 4 · 1,5 : 3",
     "n": "2 m³"
    },
    {
     "op": "=",
     "label": "Gesamtvolumen",
     "n": "10 m³",
     "t": "sum"
    }
   ]
  },
  "why": "Dach: 4 · 1,5 = 6, dann 6 : 3 = 2 m³. Zusammen 8 + 2 = 10 m³."
 },
 {
  "id": "q-ma-4-6-2",
  "ref": "ma-4-6",
  "type": "mc",
  "q": "In einen Holzquader (V = 500 cm³) wird ein Loch mit 120 cm³ gebohrt. Wie groß ist das Restvolumen?",
  "options": [
   "620 cm³",
   "500 cm³",
   "380 cm³",
   "120 cm³"
  ],
  "correct": [
   2
  ],
  "why": "Das Loch ist herausgeschnitten. Darum subtrahierst du: 500 – 120 = 380 cm³."
 }
]);
