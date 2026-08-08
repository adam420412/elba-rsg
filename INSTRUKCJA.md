# Ready Steady Grow — instrukcja obsługi strony

Wszystko, co potrzebne, żeby samodzielnie zmieniać stronę i publikować ją w internecie.
Nie musisz nic umieć z programowania.

---

## Jak to działa w trzech krokach

```
1. Zmieniasz stronę           →  rozmawiasz z Claude (aplikacja Cowork)
2. Oglądasz u siebie          →  dwuklik START-SERWER.bat
3. Publikujesz w internecie   →  dwuklik WYSLIJ-NA-GITHUB.bat
```

Po kroku 3 Vercel sam przebudowuje stronę — po 1–2 minutach zmiany są widoczne
pod adresem **https://elba-rsg.vercel.app/** (a po podpięciu domeny — pod Twoją domeną).

---

## 1. Zmiany na stronie — przez Claude

Otwórz aplikację Claude, wejdź w tryb **Cowork** i wskaż folder `Pulpit/ELBA`.
Potem po prostu napisz, co ma się zmienić. Przykłady, które działają:

| Chcesz… | Napisz do Claude |
|---|---|
| dodać zdjęcia | „Wrzuciłem nowe zdjęcia do folderu Gotowe zdjęcia — dodaj je do galerii" |
| zmienić tekst | „Na stronie głównej zmień opis pakietu startowego na: …" |
| wstawić cenę | „W ofercie wpisz cenę pakietu startowego: 450 zł" |
| poprawić kontakt | „Ustaw mój telefon 600 123 456 i mail kontakt@… na stronie kontaktu" |
| dodać opinię | „Podmień przykładowe opinie na te prawdziwe: …" |
| wymienić film | „Nowy film jest na YouTube pod tym linkiem — podmień" |
| usunąć kadr | „Wywal z galerii zdjęcie z ładowaniem magazynka" |

**Zasada:** mów normalnym językiem, tak jak do człowieka. Nie musisz podawać nazw plików.

Jeśli coś wyjdzie nie tak, napisz „cofnij ostatnią zmianę" — albo poproś o poprawkę.

---

## 2. Podgląd u siebie na komputerze

Dwuklik na **START-SERWER.bat** → otworzy się przeglądarka z adresem
`http://localhost:8080/`. To Twoja prywatna kopia, nikt inny jej nie widzi.

Zatrzymanie: zamknij czarne okno konsoli.

> Jeśli po zmianach przeglądarka pokazuje starą wersję — wciśnij **Ctrl+F5**.

---

## 3. Publikacja w internecie

Dwuklik na **WYSLIJ-NA-GITHUB.bat**:

1. skrypt zapyta „Co się zmieniło?" — wpisz krótko, np. `nowe zdjęcia z sierpnia`
   (możesz też po prostu wcisnąć Enter),
2. przy **pierwszym uruchomieniu** Git poprosi o zalogowanie do GitHuba —
   otworzy się przeglądarka, klikasz „Authorize". Później już o to nie pyta,
3. gotowe — po 1–2 minutach zmiany są w internecie.

Jeśli skrypt napisze „Brak zmian do wysłania" — znaczy, że wszystko już tam jest.

**Nie masz Gita?** Pobierz z [git-scm.com](https://git-scm.com/download/win),
zainstaluj klikając „Dalej" na wszystkich ekranach.

---

## 4. Podpięcie własnej domeny (cyberFolks → Vercel)

Strona stoi na Vercelu. Domenę zostawiasz w cyberFolks, zmieniasz tylko dwa rekordy DNS.

### Krok 1 — dodaj domenę w Vercelu

1. wejdź na [vercel.com](https://vercel.com) → projekt **elba-rsg**,
2. **Settings** → **Domains** → **Add Domain**,
3. wpisz swoją domenę, np. `readysteadygrow.pl`, zatwierdź,
4. Vercel zaproponuje dodanie też `www.readysteadygrow.pl` — zgódź się,
5. **Vercel pokaże teraz konkretne wartości do wpisania.** Zostaw tę stronę otwartą —
   przepisujesz je dokładnie, znak w znak.

### Krok 2 — zmień rekordy w cyberFolks

1. zaloguj się do panelu cyberFolks → **Domeny** → wybierz domenę → **Strefa DNS**
   (w starszym panelu: *Konta hostingowe → Zarządzaj → DNS*),
2. **usuń** istniejące rekordy `A` i `CNAME` dla nazwy `@` (domena główna) oraz `www`,
3. dodaj dwa nowe rekordy:

| Typ | Nazwa | Wartość | TTL |
|---|---|---|---|
| `A` | `@` (albo puste / nazwa domeny) | adres IP pokazany przez Vercel — zwykle `216.198.79.1` | 3600 |
| `CNAME` | `www` | wartość pokazana przez Vercel, np. `cname.vercel-dns.com` lub `xxxxxxxx.vercel-dns-017.com` | 3600 |

> ⚠️ **Wpisz to, co pokazuje Twój panel Vercela**, a nie z tej tabelki — Vercel nadaje
> części projektów własne adresy. Jeśli w polu wartości CNAME jest kropka na końcu,
> przepisz ją też.

4. **NIE ruszaj rekordów `MX` ani `TXT`** — na nich stoi Twoja poczta.
   Zmiana tylko A i CNAME nie psuje maili.

> ℹ️ Sprawdzone dzisiaj: `readysteadygrow.pl` nie ma jeszcze żadnych rekordów DNS
> (domena nie odpowiada). Najpierw upewnij się w panelu cyberFolks, że domena jest
> zarejestrowana i obsługiwana przez ich serwery nazw — dopiero potem dodawaj rekordy.

### Krok 3 — poczekaj

Zmiana rozchodzi się po świecie zwykle w 15–60 minut (czasem do 24 h).
W panelu Vercela przy domenie zapali się zielone **Valid Configuration**,
a certyfikat SSL (kłódka) zrobi się sam.

Postęp sprawdzisz na [dnschecker.org](https://dnschecker.org) — wpisz domenę, typ `A`.

### Gdyby nie działało

- **„Invalid Configuration" w Vercelu** — najczęściej został stary rekord A albo CNAME
  dla `@`/`www`. Wróć do strefy DNS i sprawdź, czy nie ma duplikatów.
- **Brak kłódki / błąd certyfikatu** — jeśli w strefie DNS są rekordy `CAA`,
  dodaj jeszcze jeden: typ `CAA`, nazwa `@`, wartość `0 issue "letsencrypt.org"`.
- **Przestały chodzić maile** — sprawdź, czy rekordy `MX` są nietknięte.

---

## Co jest gdzie

```
ELBA/
  Gotowe zdjęcia/      ← tutaj wrzucasz nowe, wyretuszowane zdjęcia
  Zdjecia/             ← surowe pliki z aparatu (nie idą na stronę)
  wideo/, DRON/, POV/  ← materiał źródłowy (nie idzie na stronę)
  strona-v2/           ← SAMA STRONA (to leci na GitHub i do internetu)
      START-SERWER.bat        podgląd u siebie
      WYSLIJ-NA-GITHUB.bat    publikacja
      INSTRUKCJA.md           ten plik
      media/foto, media/thumb zdjęcia w wersji webowej
      media/wideo             pętla wideo pod nagłówkiem
```

Film pokazowy jest wpięty z YouTube (*Ready steady grow — film pokazowy*),
więc nie obciąża strony. Pod nagłówkiem chodzi krótka, wyciszona pętla z drona.

---

## Krótka ściąga

| Sytuacja | Co zrobić |
|---|---|
| mam nowe zdjęcia | wrzuć do `Gotowe zdjęcia` → powiedz Claude → `WYSLIJ-NA-GITHUB.bat` |
| chcę zmienić tekst | powiedz Claude → `WYSLIJ-NA-GITHUB.bat` |
| chcę zobaczyć przed publikacją | `START-SERWER.bat` |
| strona w internecie się nie zmienia | odczekaj 2 min, potem Ctrl+F5 |
| coś zepsułem | powiedz Claude „cofnij ostatnią zmianę" |
