#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ready Steady Grow - przetwarzanie zdjec do wersji webowej.

Skanuje folder "../Gotowe zdjęcia" (i podfoldery), robi z kazdego JPG:
  media/foto/<nazwa>.webp    - wersja pelna, max 1920 px
  media/thumb/<nazwa>.webp   - miniatura, max 900 px
  media/galeria.json         - manifest (wymiary, data EXIF, sekcja)

Uruchamiaj ponownie po dorzuceniu nowych zdjec - przetworzy tylko nowe.
Potem odswiez galerie:  python narzedzia/zbuduj-galerie.py
"""

import json
import os
import sys
from datetime import datetime

from PIL import Image, ImageOps

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Skad brac zdjecia. Bierzemy tylko materialy PRZYGOTOWANE do publikacji:
#   - nowe-zdjecia      (folder wewnatrz strony - tu wrzuca klient)
#   - ../Gotowe zdjęcia (wyretuszowane pliki)
# Surowe pliki z aparatu (../Zdjecia) sa uzywane TYLKO gdy nie ma zadnego z powyzszych.
ZRODLA = [z for z in [
    os.path.join(BASE, "nowe-zdjecia"),
    os.path.abspath(os.path.join(BASE, "..", "Gotowe zdjęcia")),
] if os.path.isdir(z)]
if not ZRODLA:
    zapas = os.path.abspath(os.path.join(BASE, "..", "Zdjecia"))
    if os.path.isdir(zapas):
        ZRODLA = [zapas]
ZRODLO = ZRODLA[0] if ZRODLA else os.path.join(BASE, "nowe-zdjecia")
FOTO = os.path.join(BASE, "media", "foto")
THUMB = os.path.join(BASE, "media", "thumb")
MANIFEST = os.path.join(BASE, "media", "galeria.json")
PRZYPISANIA = os.path.join(BASE, "media", "sekcje.json")

MAX_FULL = 1920
MAX_THUMB = 900
Q_FULL = 82
Q_THUMB = 78
ROZSZERZENIA = (".jpg", ".jpeg", ".png")


def data_exif(im):
    try:
        exif = im.getexif()
        for tag in (36867, 36868, 306):
            v = exif.get(tag)
            if v:
                return datetime.strptime(str(v)[:19], "%Y:%m:%d %H:%M:%S").isoformat()
    except Exception:
        pass
    return None


def zapisz(im, sciezka, maks, jakosc):
    kopia = im.copy()
    kopia.thumbnail((maks, maks), Image.LANCZOS)
    if kopia.mode not in ("RGB", "L"):
        kopia = kopia.convert("RGB")
    kopia.save(sciezka, "WEBP", quality=jakosc, method=4)
    return kopia.size


def przetworz(sciezka_src, nazwa):
    cel_full = os.path.join(FOTO, nazwa + ".webp")
    cel_thumb = os.path.join(THUMB, nazwa + ".webp")
    swieze = (
        os.path.exists(cel_full)
        and os.path.exists(cel_thumb)
        and os.path.getmtime(cel_full) >= os.path.getmtime(sciezka_src)
    )

    im = Image.open(sciezka_src)
    im.draft("RGB", (MAX_FULL * 2, MAX_FULL * 2))
    im = ImageOps.exif_transpose(im)
    data = data_exif(Image.open(sciezka_src))

    if swieze:
        with Image.open(cel_full) as f:
            w, h = f.size
        with Image.open(cel_thumb) as f:
            tw, th = f.size
        return {"nowe": False, "w": w, "h": h, "tw": tw, "th": th, "data": data}

    w, h = zapisz(im, cel_full, MAX_FULL, Q_FULL)
    tw, th = zapisz(im, cel_thumb, MAX_THUMB, Q_THUMB)
    return {"nowe": True, "w": w, "h": h, "tw": tw, "th": th, "data": data}


def main():
    if not ZRODLA:
        print("Nie znaleziono zadnego folderu ze zdjeciami.")
        print("Wrzuc pliki JPG do folderu 'nowe-zdjecia' obok tego pliku.")
        sys.exit(1)

    os.makedirs(FOTO, exist_ok=True)
    os.makedirs(THUMB, exist_ok=True)

    pliki = []
    for zrodlo in ZRODLA:
      for root, _, names in os.walk(zrodlo):
        for n in sorted(names):
            if n.lower().endswith(ROZSZERZENIA):
                pliki.append(os.path.join(root, n))
    pliki.sort()

    sekcje = {}
    if os.path.exists(PRZYPISANIA):
        with open(PRZYPISANIA, encoding="utf-8") as f:
            sekcje = json.load(f)

    wpisy = []
    nowe = 0
    for i, p in enumerate(pliki, 1):
        nazwa = os.path.splitext(os.path.basename(p))[0]
        try:
            info = przetworz(p, nazwa)
        except Exception as e:  # noqa: BLE001
            print("  ! blad:", nazwa, e)
            continue
        if info["nowe"]:
            nowe += 1
        przypis = sekcje.get(nazwa, {})
        wpisy.append(
            {
                "id": nazwa,
                "full": "media/foto/%s.webp" % nazwa,
                "thumb": "media/thumb/%s.webp" % nazwa,
                "w": info["w"],
                "h": info["h"],
                "tw": info["tw"],
                "th": info["th"],
                "data": info["data"],
                "sekcja": przypis.get("sekcja", "teren"),
                "opis": przypis.get("opis", ""),
            }
        )
        if i % 20 == 0:
            print("  ...%d / %d" % (i, len(pliki)))

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(wpisy, f, ensure_ascii=False, indent=1)

    print("Gotowe: %d zdjec (%d nowych) -> media/galeria.json" % (len(wpisy), nowe))


if __name__ == "__main__":
    main()
