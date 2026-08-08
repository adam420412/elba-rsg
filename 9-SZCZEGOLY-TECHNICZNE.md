# Szczegóły techniczne

> Codzienna obsługa strony jest w pliku **`0-INSTRUKCJA.md`**.
> Ten plik opisuje, jak to działa od środka.

Strona statyczna, bez frameworków. Wpięte są: **21 kadrów** z folderu `Gotowe zdjęcia`
oraz **film 45 s** (tło hero + odtwarzacz na stronie głównej i w galerii).

## Podgląd lokalny

Dwuklik na **1-POKAZ-STRONE.bat** → przeglądarka otworzy `http://localhost:8080/`.
Zatrzymanie: zamknij okno konsoli.

Skrypt sam wybiera, czym postawić serwer: Python → Node.js → wbudowany serwer
w PowerShellu (`narzedzia/serwer.ps1`). Ta ostatnia opcja działa na czystym Windowsie,
więc nic nie musisz instalować.

## Zdjęcia

Źródłem jest folder **`ELBA/Gotowe zdjęcia`** (wyretuszowane JPG). Wszystkie 36 plików
są przerobione na wersje webowe, ale w galerii pokazuje się wybrane **21** — z każdej
grupy bardzo podobnych ujęć został jeden kadr. Pozostałe czekają w `media/foto`
oznaczone jako `archiwum`.

### Dorzucanie nowych zdjęć

1. Wrzuć pliki JPG do **`ELBA/Gotowe zdjęcia`**.
2. Uruchom oba skrypty z folderu `strona-v2`:

   ```
   python narzedzia/przetworz-zdjecia.py
   python narzedzia/zbuduj-galerie.py
   ```

   Pierwszy tworzy wersje webowe (`media/foto` — 1920 px, `media/thumb` — 900 px)
   i pomija zdjęcia już przetworzone. Drugi przebudowuje sekcje w `galeria.html`.
3. Odśwież przeglądarkę.

> Skrypty wymagają Pythona (na tym komputerze go nie ma — do pobrania z python.org,
> przy instalacji zaznacz „Add python.exe to PATH"). Sam podgląd strony działa bez niego.
> Alternatywnie po prostu podeślij mi nowe zdjęcia, a przerobię je i przebuduję galerię.

### Które zdjęcie w której sekcji

Plik **`media/sekcje.json`** decyduje o sekcji i podpisie:

```json
"DSC06959": { "sekcja": "os", "opis": "Postawa strzelecka" }
```

Sekcje w kolejności występowania na stronie:
`przygotowanie` · `odprawa` · `instruktaz` · `os` · `tarcza` · `karabin` · `teren`.

Wpisz `"sekcja": "archiwum"`, żeby ukryć kadr w galerii (plik zostaje na dysku).
Zdjęcie bez wpisu trafia do `teren`. Po edycji uruchom `zbuduj-galerie.py`.

## Wideo

Film pokazowy leci z **YouTube** (*Ready steady grow — film pokazowy*, kanał Fotz Studio) —
dzięki temu nie waży nic w repozytorium i ładuje się błyskawicznie. Na stronie widać
plakat z przyciskiem play; YouTube wczytuje się dopiero po kliknięciu, więc nie spowalnia
wejścia i nie ustawia ciasteczek zanim ktoś świadomie kliknie.

| plik / element | co to | gdzie |
|---|---|---|
| YouTube `2S-0q2ibfko` | pełny film 45 s | `index.html` i `galeria.html` (atrybut `data-yt`) |
| `media/wideo/rsg-film-plakat.webp` | plakat pod przyciskiem play | — |
| `media/wideo/rsg-hero.mp4` | 9 s z drona, bez dźwięku, 2,7 MB | zapętlone tło pod nagłówkiem strony głównej |
| `media/wideo/rsg-hero-plakat.webp` | pierwsza klatka tła | — |

**Podmiana filmu:** wgraj nowy na YouTube i zmień `data-yt="..."` na nowe ID
(to ta część linku po `youtu.be/`). Albo po prostu podeślij link — podmienię.

**Podmiana tła hero:** potrzebny krótki, wyciszony fragment (8–12 s, do ~3 MB) —
przygotuję go z Twojego montażu.

## Co jeszcze zostało do uzupełnienia (treść, nie zdjęcia)

Żółte plakietki na stronach oznaczają miejsca do dopięcia przed publikacją:

- realny e-mai