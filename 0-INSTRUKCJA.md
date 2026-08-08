# Strona Ready Steady Grow — instrukcja

Trzy pliki, trzy czynności. Nic więcej nie musisz umieć.

```
1-POKAZ-STRONE.bat   →  obejrzyj stronę u siebie na komputerze
2-OPUBLIKUJ.bat      →  wyślij zmiany do internetu
Claude               →  powiedz, co ma się zmienić
```

---

# CZĘŚĆ 1 — Jak zmienić coś na stronie

### Krok 1. Otwórz Claude

Kliknij ikonę **Claude** na pulpicie (albo w menu Start wpisz `Claude` i wciśnij Enter).

### Krok 2. Wejdź w tryb pracy z plikami

W oknie Claude kliknij **Cowork** (po lewej stronie).
Potem kliknij **Wybierz folder** i wskaż:

```
Pulpit → ELBA
```

Klikasz **Wybierz folder** / **OK**. To robisz **raz** — Claude to zapamięta.

### Krok 3. Napisz, co ma się zmienić

Piszesz normalnie, tak jak do człowieka. Nie musisz znać nazw plików.

Przykłady, które możesz skopiować:

- `Wrzuciłem nowe zdjęcia do folderu Gotowe zdjęcia — dodaj je do galerii`
- `W ofercie wpisz cenę pakietu startowego: 450 zł`
- `Na stronie kontakt ustaw mój telefon 600 123 456`
- `Zmień opis na stronie głównej na taki: ...` (i wklejasz swój tekst)
- `Usuń z galerii zdjęcie z ładowaniem magazynka`
- `Nowy film jest tutaj: https://youtu.be/... — podmień`

Claude wykona zmianę i napisze, co zrobił.

### Krok 4. Zobacz, jak wyszło

Wejdź do folderu **ELBA → strona-v2** i kliknij dwa razy na:

**`1-POKAZ-STRONE.bat`**

Otworzy się czarne okienko (to normalne — **nie zamykaj go**) i przeglądarka
ze stroną pod adresem `localhost:8080`. To Twoja prywatna kopia — nikt z internetu
jej nie widzi.

- Nie podoba się? Wróć do Claude i napisz, co poprawić.
- Widzisz starą wersję? Wciśnij **Ctrl + F5**.
- Skończyłeś oglądać? Zamknij czarne okienko.

### Krok 5. Opublikuj

Kliknij dwa razy na:

**`2-OPUBLIKUJ.bat`**

1. Okienko zapyta *„Co się zmieniło?"* — napisz krótko, np. `nowe zdjęcia`,
   i wciśnij **Enter**. (Możesz też od razu wcisnąć Enter.)
2. Poczekaj, aż napisze **GOTOWE**.
3. Wciśnij dowolny klawisz, żeby zamknąć.

Po **1–2 minutach** zmiany są widoczne w internecie. Odśwież stronę przez **Ctrl + F5**.

> Gdy napisze **„Brak zmian do wysłania"** — znaczy, że wszystko już tam jest. Nic nie zepsułeś.

---

# CZĘŚĆ 2 — Podpięcie domeny rsg.com.pl

**Robi się to raz.** Poniżej dokładne wartości sprawdzone dla Twojej domeny.

### Jak jest teraz

Domena `rsg.com.pl` pokazuje na serwer cyberFolks (`185.208.164.193`), na którym
nie ma żadnej strony (0 MB zajętego miejsca). Trzeba ją przełączyć na Vercel,
gdzie stoi nowa strona.

DNS domeny obsługuje cyberFolks (`ns1/ns2/ns3.cyberfolks.pl`) — czyli **rekordy
zmieniasz w panelu cyberFolks**, mimo że domena jest kupiona gdzie indziej.

---

### Krok 1. Dodaj domenę w Vercelu

1. Wejdź na: **https://vercel.com/fotz-studios-projects/elba-rsg/settings/domains**
2. Kliknij **Add Domain** (albo **Add**).
3. Wpisz: `rsg.com.pl` → **Add**.
4. Vercel zapyta, jak podpiąć — wybierz opcję z `www` (*Add www.rsg.com.pl and redirect...*).
   Dzięki temu `rsg.com.pl` i `www.rsg.com.pl` będą działać.
5. **Zostaw tę stronę otwartą.** Vercel wypisze teraz dwie wartości:
   - **adres IP** (coś w stylu `216.198.79.1`) — do rekordu **A**
   - **adres tekstowy** (coś w stylu `cname.vercel-dns.com` albo `abc123.vercel-dns-017.com`) — do rekordu **CNAME**

   Te wartości przepisujesz w kroku 2, **dokładnie tak, jak je widzisz**.

---

### Krok 2. Zmień dwa rekordy w cyberFolks

1. Zaloguj się do panelu **cyberFolks**.
2. Wejdź w **Domeny** → `rsg.com.pl` → **Strefa DNS**
   (może się nazywać *Edytor stref DNS* albo *DNS*).
3. Zobaczysz listę rekordów. Zmieniasz **tylko te dwa**:

**Rekord numer 1 — sama domena**

| | teraz jest | ma być |
|---|---|---|
| Typ | `A` | `A` |
| Nazwa | `rsg.com.pl` (albo `@`) | bez zmian |
| Wartość | `185.208.164.193` | **adres IP z Vercela** |

Klikasz *Edytuj* przy tym rekordzie, podmieniasz adres IP, zapisujesz.

**Rekord numer 2 — wersja z www**

| | teraz jest | ma być |
|---|---|---|
| Typ | `A` | `CNAME` |
| Nazwa | `www` | `www` |
| Wartość | `185.208.164.193` | **adres tekstowy z Vercela** |

Tutaj trzeba **usunąć** stary rekord `A` dla `www` i **dodać nowy** typu `CNAME`.
(Panel nie pozwoli mieć obu naraz.)

> Jeśli w polu wartości Vercel pokazuje kropkę na końcu — przepisz ją też.

---

### ⛔ Czego NIE WOLNO ruszać

| rekord | dlaczego |
|---|---|
| `MX` (mail.rsg.com.pl) | na tym stoi Twoja poczta — skasujesz, przestaną przychodzić maile |
| `TXT` (v=spf1...) | to też poczta — chroni przed trafianiem do spamu |
| `mail`, `ftp`, `webmail` | obsługa poczty i logowania |
| serwery DNS (`ns1/ns2/ns3.cyberfolks.pl`) | zostają bez zmian |

**Zmieniasz wyłącznie dwa rekordy z tabelek powyżej.** Poczta działa dalej normalnie.

---

### Krok 3. Poczekaj

- Zwykle **15–60 minut**, maksymalnie doba.
- W Vercelu przy domenie zapali się zielony napis **Valid Configuration**.
- Kłódka (certyfikat SSL) zrobi się sama — nic nie klikasz.
- Chcesz sprawdzić postęp: wejdź na **dnschecker.org**, wpisz `rsg.com.pl`, typ `A`.
  Ma pokazywać nowy adres IP, a nie `185.208.164.193`.

### Gdyby coś nie działało

| Problem | Co zrobić |
|---|---|
| Vercel pisze *Invalid Configuration* | Wróć do strefy DNS — pewnie został stary rekord `A` przy `www`. Ma być tylko `CNAME`. |
| Strona nie otwiera się po godzinie | Sprawdź na dnschecker.org, czy IP się zmieniło. Jeśli nie — rekord nie został zapisany. |
| Brak kłódki / ostrzeżenie o certyfikacie | Poczekaj jeszcze godzinę. Jeśli dalej nie ma — napisz do mnie. |
| Przestały chodzić maile | Ktoś ruszył `MX` albo `TXT`. Przywróć je i będzie dobrze. |

---

# Ściąga na lodówkę

| Chcę… | Co robię |
|---|---|
| dodać zdjęcia | wrzucam je do folderu `Gotowe zdjęcia` → mówię Claude → `2-OPUBLIKUJ.bat` |
| zmienić tekst albo cenę | mówię Claude → `2-OPUBLIKUJ.bat` |
| zobaczyć przed publikacją | `1-POKAZ-STRONE.bat` |
| coś zepsułem | mówię Claude: *„cofnij ostatnią zmianę"* |
| strona się nie odświeża | czekam 2 minuty, potem **Ctrl + F5** |

**Adres roboczy strony:** https://elba-rsg.vercel.app/
**Adres docelowy (po podpięciu domeny):** https://rsg.com.pl

---

*Szczegóły techniczne (jak działa galeria, skąd się biorą zdjęcia i film) —
w pliku `9-SZCZEGOLY-TECHNICZNE.md`.*
