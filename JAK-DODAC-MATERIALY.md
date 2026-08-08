# Ready Steady Grow — wersja 2 (z realnymi materiałami)

Strona statyczna, bez frameworków. Wpięte są: **21 kadrów** z folderu `Gotowe zdjęcia`
oraz **film 45 s** (tło hero + odtwarzacz na stronie głównej i w galerii).

## Podgląd lokalny

Dwuklik na **START-SERWER.bat** → przeglądarka otworzy `http://localhost:8080/`.
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

W `media/wideo/` leżą cztery pliki wygenerowane z Twojego montażu:

| plik | co to | gdzie działa |
|---|---|---|
| `rsg-film.mp4` | pełny film, 1080p, 45 s, 24 MB | odtwarzacz na `index.html` i `galeria.html` |
| `rsg-film-plakat.webp` | klatka tytułowa odtwarzacza | — |
| `rsg-hero.mp4` | pierwsze 9 s (dron), bez dźwięku, 2,7 MB | zapętlone tło hero na stronie głównej |
| `rsg-hero-plakat.webp` | pierwsza klatka, zanim wideo wystartuje | — |

Film startuje dopiero po kliknięciu (`preload="none"`), więc nie obciąża wejścia na stronę.
Tło hero jest wyciszone i zapętlone — przeglądarki puszczają je automatycznie tylko bez dźwięku.

**Podmiana filmu:** wrzuć nowy plik pod tą samą nazwą albo daj znać — przygotuję wersję
webową z oryginału (surowy montaż 4K waży 750 MB, do sieci trzeba go przeliczyć).

## Co jeszcze zostało do uzupełnienia (treść, nie zdjęcia)

Żółte plakietki na stronach oznaczają miejsca do dopięcia przed publikacją:

- realny e-mail i telefon (`kontakt.html`), linki TikTok / Facebook w stopce,
- ceny i widełki (`oferta.html`), zakres godzinowy i certyfikat (`szkolenia.html`),
- prawdziwe opinie zamiast przykładowych (`index.html`),
- produkty i ceny w sklepie (`sklep.html`),
- dane administratora i weryfikacja RODO (`polityka-prywatnosci.html`).

Brakuje też zdjęć z **survivalu, pierwszej pomocy i eventów** — w tych miejscach
stoją teraz najbliższe tematycznie kadry ze strzelnicy.

## Struktura

```
strona-v2/
  index.html, oferta.html, szkolenia.html, eventy.html,
  sklep.html, galeria.html, kontakt.html, polityka-prywatnosci.html
  css/, js/, fonts/, img/        — szablon strony
  media/foto/                    — zdjęcia webowe (1920 px, WebP)
  media/thumb/                   — miniatury (900 px, WebP)
  media/wideo/                   — film + pętla hero + plakaty
  media/galeria.json             — manifest (generowany)
  media/sekcje.json              — przypisanie kadrów do sekcji (edytowalne)
  narzedzia/                     — skrypty przetwarzania + serwer PowerShell
  START-SERWER.bat               — podgląd lokalny
```
