#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Buduje sekcje galerii w galeria.html na podstawie media/galeria.json.

Wstawia HTML pomiedzy znacznikami:
  <!-- GALERIA:START -->  ...  <!-- GALERIA:END -->

Uruchamiaj po przetworzeniu zdjec:
  python narzedzia/przetworz-zdjecia.py
  python narzedzia/zbuduj-galerie.py
"""

import html
import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(BASE, "media", "galeria.json")
STRONA = os.path.join(BASE, "galeria.html")

START = "<!-- GALERIA:START -->"
END = "<!-- GALERIA:END -->"

# kolejnosc i nazwy sekcji; klucz = wartosc pola "sekcja" w manifescie
SEKCJE = [
    ("przygotowanie", "Zanim padnie pierwszy strzał",
     "Sprzęt rozłożony, oś pusta, spokojna rozmowa o tym, co się zaraz wydarzy."),
    ("odprawa", "Odprawa i zasady",
     "Bezpieczeństwo na pierwszym miejscu — zawsze, niezależnie od poziomu."),
    ("instruktaz", "Instruktaż 1:1",
     "Chwyt, postawa, ładowanie. Korekta na bieżąco, bez krzyku i pośpiechu."),
    ("os", "Na osi",
     "Moment strzału — postawa, praca z przyrządami, kontrola po każdej serii."),
    ("tarcza", "Analiza tarczy",
     "Każda seria kończy się rozmową: co zadziałało, co poprawiamy w następnej."),
    ("karabin", "Broń długa",
     "Karabin: składanie się, praca z celownikiem, stabilna postawa."),
    ("detal", "Detale",
     "Chwyt, osprzęt, łuski na ziemi — rzeczy, które robią różnicę."),
    ("teren", "Teren i eventy",
     "Wyjścia w teren, survival i szkolenia grupowe."),
]


def odmiana(n):
    """1 kadr / 2-4 kadry / 5+ kadrow"""
    if n == 1:
        return "1 kadr"
    r100, r10 = n % 100, n % 10
    if r10 in (2, 3, 4) and r100 not in (12, 13, 14):
        return "%d kadry" % n
    return "%d kadrów" % n


def kafelek(z):
    alt = html.escape(z.get("opis") or "Ready Steady Grow — trening strzelecki")
    cap = html.escape(z.get("opis") or "")
    return (
        '            <a class="gal-item" data-full="{full}">'
        '<img src="{thumb}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async">'
        '<span class="cap">{cap}</span></a>'
    ).format(
        full=z["full"],
        thumb=z["thumb"],
        alt=alt,
        cap=cap,
        w=z.get("tw", z["w"]),
        h=z.get("th", z["h"]),
    )


def main():
    with open(MANIFEST, encoding="utf-8") as f:
        zdjecia = json.load(f)

    wg_sekcji = {}
    for z in zdjecia:
        wg_sekcji.setdefault(z.get("sekcja", "teren"), []).append(z)

    bloki = []
    nr = 0
    for klucz, tytul, lead in SEKCJE:
        lista = wg_sekcji.get(klucz)
        if not lista:
            continue
        nr += 1
        bloki.append(
            '        <div class="gal-series">\n'
            '          <div class="gal-series__head"><h2>{tytul}</h2><span>{nr:02d} · {ile}</span></div>\n'
            '          <p class="gal-series__lead">{lead}</p>\n'
            '          <div class="masonry">\n{kafelki}\n          </div>\n'
            "        </div>".format(
                tytul=html.escape(tytul),
                nr=nr,
                ile=odmiana(len(lista)),
                lead=html.escape(lead),
                kafelki="\n".join(kafelek(z) for z in lista),
            )
        )

    with open(STRONA, encoding="utf-8") as f:
        strona = f.read()

    if START not in strona or END not in strona:
        raise SystemExit("Brak znacznikow GALERIA:START / GALERIA:END w galeria.html")

    a = strona.index(START) + len(START)
    b = strona.index(END)
    strona = strona[:a] + "\n" + "\n\n".join(bloki) + "\n        " + strona[b:]

    tmp = STRONA + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(strona)
    os.replace(tmp, STRONA)

    print("Galeria zbudowana: %d zdjec w %d sekcjach" % (len(zdjecia), nr))


if __name__ == "__main__":
    main()
