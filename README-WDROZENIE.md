# Ready Steady Grow (Elba) — strona WWW · instrukcja wdrożenia

Samodzielny projekt strony internetowej marki **Ready Steady Grow** (Elba, Poznań).
Zbudowany na podstawie notatki głosowej i profilu Instagram [@elba_rsg](https://www.instagram.com/elba_rsg/).
Kompletny, statyczny serwis — nie wymaga żadnego zaplecza ani zewnętrznych projektów.

## Co jest w folderze

Gotowa, statyczna strona (HTML/CSS/JS, bez backendu):

- **Podstrony:** `index.html`, `oferta.html` (strzelectwo/pakiety), `szkolenia.html` (survival + pierwsza pomoc + B2B), `eventy.html`, `sklep.html` (wkrótce), `galeria.html`, `kontakt.html`, `polityka-prywatnosci.html`
- **Foldery:** `css/` (jeden plik `style.css`), `js/` (`main.js`), `img/` (logo, reticle, favicon, OG — wszystko w SVG), `files/` (miejsce na PDF/katalog, na razie puste)

## Jak opublikować

1. Wykup hosting z obsługą stron statycznych i domenę (np. `readysteadygrow.pl`).
2. Wgraj przez FTP/panel **całą zawartość folderu** (poza tym plikiem) do katalogu głównego domeny (np. `public_html`).
3. Wejdź na domenę — strona działa od razu, bez instalacji.
4. Włącz w panelu certyfikat SSL (Let's Encrypt — zwykle 1 klik).

## ⚠️ Do uzupełnienia przed publikacją

Wszystkie miejsca są oznaczone na stronie przerywaną ramką **„do uzupełnienia / do podmiany"** (`todo-badge`) — po uzupełnieniu je usuń.

- [ ] **Dane kontaktowe** — e-mail i telefon. Domyślnie wpisany jest roboczy `kontakt@readysteadygrow.pl` (do potwierdzenia) oraz `+48 [do uzupełnienia]`. Popraw w: `kontakt.html`, stopkach wszystkich podstron oraz w atrybucie `data-mail` formularza (`kontakt.html`).
- [ ] **Zdjęcia (WAŻNE — do podmiany)** — w slotach są **poglądowe zdjęcia wygenerowane przez AI** (pliki `img/rsg-*.webp`), żeby pokazać docelowy wygląd strony. **Przed publikacją podmień je na realne kadry** (z sesji zdjęciowej / Instagrama). Najprościej: wgraj swoje zdjęcia pod tymi samymi nazwami do `img/` — reszta zadziała bez zmian w kodzie. Zdjęcia użyte: `rsg-strzelnica.webp`, `rsg-strzelectwo-detal.webp`, `rsg-survival.webp`, `rsg-pierwsza-pomoc.webp`, `rsg-event.webp`. Polecany format: **WebP**, lekka kompresja.
- [ ] **Galeria** — `galeria.html` korzysta z tych samych zdjęć z działającym **lightboxem** (klik → powiększenie, ←/→, Esc) oraz z pustymi slotami „Twoje zdjęcie". Aby dodać kadr, skopiuj wzór: `<a class="gal-item" data-full="img/duze.webp"><img src="img/male.webp" alt="…"><span class="cap">Podpis</span></a>`.
- [ ] **Film / wideo (miejsce na film)** — sekcja „Zobacz nas w akcji" na stronie głównej i w galerii to na razie plakat + przycisk „play" prowadzący na Instagram. Aby wstawić **prawdziwy film**, w `.reel__stage` zamień `<img>` na: `<video src="video/twoj-film.mp4" poster="img/rsg-event.webp" controls playsinline></video>` (wgraj plik do nowego folderu `video/`). Możesz też zostawić link do reels.
- [ ] **Opinie** — na stronie głównej są 3 przykładowe. Podmień na prawdziwe (np. zrzuty z DM / opinie Google).
- [ ] **Ceny pakietów** — w `oferta.html` widnieje „Wycena indywidualna". Wpisz realne kwoty lub widełki (albo zostaw, jeśli tak wolisz sprzedawać).
- [ ] **Sklep** — `sklep.html` jest w trybie „wkrótce". Dodaj realne produkty/zdjęcia/ceny albo podepnij zewnętrzny sklep.
- [ ] **Social media** — podmień linki TikTok/Facebook (`href="#"`) na prawdziwe. Instagram `@elba_rsg` jest już podpięty.
- [ ] **Polityka prywatności** — uzupełnij dane administratora (imię/nazwisko lub firma, adres, NIP, e-mail, data) i zweryfikuj pod kątem RODO.
- [ ] **OG image** — `og:image` wskazuje na `img/og-cover.svg`. Dla najlepszej zgodności z social media warto wyeksportować go do PNG 1200×630 i podmienić ścieżkę na pełny URL domeny.
- [ ] **Pełne imię i nazwisko** — jeśli ma być publiczne, uzupełnij (stopka/polityka). Domyślnie strona posługuje się ksywką „Elba".

## Funkcje

- Preloader (licznik + kurtyna) i kinowe wejście hero „READY / STEADY / GROW"
- Bramka **18+** (zapamiętywana w sesji — nie blokuje ponownie w trakcie wizyty)
- Pełnoekranowe menu, chowający się nagłówek, custom cursor
- System animacji reveal (GSAP + ScrollTrigger), liczniki, marquee, magnetyczne przyciski
- Oś **READY · STEADY · GROW** jako motyw przewodni; motywy celownika (reticle) w SVG
- Galeria z gotowym lightboxem (aktywuje się po dodaniu zdjęć)
- Formularz kontaktowy przez `mailto` (bez backendu i bez zapisywania danych)
- Pełny RWD (desktop / tablet / mobile), SEO + OpenGraph, brak cookies śledzących
- Fallback: bez GSAP / przy `prefers-reduced-motion` cała treść jest w pełni widoczna (klasa `no-anim`)

## Uwagi techniczne

- **Czcionki:** Google Fonts — Oswald (nagłówki) + Manrope (tekst). Wzmianka w polityce prywatności.
- **Animacje:** GSAP 3.12 z CDN (cdnjs.cloudflare.com). Bez internetu/CDN działa statyczny fallback — treść, liczby i galeria pozostają dostępne.
- **Grafika:** logo, celownik, favicon i OG są wektorowe (SVG) — skalują się bez utraty jakości i ważą kilka kB.
- **Bez sprzedaży online** — strona ma charakter informacyjny (wizytówka). Zajęcia strzeleckie 18+ prowadzone zgodnie z zasadami bezpieczeństwa.

## Szybka personalizacja kolorów

W `css/style.css`, w bloku `:root`:

- `--accent` — główny akcent (limonka `#c6ff2e`)
- `--c-ready` / `--c-steady` / `--c-grow` — kolory trzech etapów
- `--bg` / `--panel` — tła (ciemny grafit)

Zmiana jednej zmiennej propaguje się na całą stronę.
