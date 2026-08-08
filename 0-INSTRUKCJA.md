# Strona Ready Steady Grow — instrukcja

Trzy pliki, trzy czynności. Nic więcej nie musisz umieć.

```
Claude                 →  powiedz, co ma się zmienić
1-POKAZ-STRONE.bat     →  obejrzyj u siebie, zanim ktokolwiek zobaczy
2-OPUBLIKUJ.bat        →  wyślij do internetu (strona sama się zaktualizuje)
3-POBIERZ-NAJNOWSZE.bat →  ściągnij aktualną wersję (gdy ktoś inny coś zmienił)
```

---

# CZĘŚĆ 0 — Pierwsze uruchomienie (robisz raz)

Potrzebujesz trzech rzeczy. Każda to kilka kliknięć „Dalej".

### 1. Git — program, który wysyła zmiany na stronę

Wejdź na **https://git-scm.com/download/win**, pobierz i zainstaluj.
Na wszystkich ekranach klikasz **Next / Install**, nic nie zmieniasz. Na końcu **Finish**.

### 2. Konto GitHub

Jeśli nie masz: **https://github.com/signup** — mail, hasło, gotowe.
**Podaj swój login do osoby, która przekazała Ci stronę** — musi Cię dopisać
do projektu, inaczej publikacja nie zadziała.

### 3. Claude

Zainstaluj aplikację Claude i zaloguj się.

### 4. Folder ze stroną

Rozpakuj otrzymany folder **`strona-v2`** na Pulpit.
(Albo, jeśli dostałeś tylko link: uruchom `3-POBIERZ-NAJNOWSZE.bat` w pustym folderze —
sam pobierze całą stronę.)

### 5. Pierwsza publikacja

Kliknij `2-OPUBLIKUJ.bat`. Za pierwszym razem otworzy się przeglądarka
z pytaniem, czy zezwolić Gitowi na dostęp do GitHuba → klikasz **Authorize**.
Robisz to **raz w życiu**.

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

- `Wrzuciłem nowe zdjęcia do folderu nowe-zdjecia — dodaj je do galerii`
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

Wartości poniżej są już gotowe, wzięte z panelu Vercela. Nic nie musisz sprawdzać —
po prostu je przepisz.

---

### Krok 1. Domena w Vercelu — ZROBIONE ✅

Domena `rsg.com.pl` i `www.rsg.com.pl` są już dodane w Vercelu.
Vercel czeka teraz na dwa rekordy w cyberFolks (pisze przy nich *Invalid Configuration* —
to znika samo, gdy zrobisz krok 2).

---

### Krok 2. Zmień dwa rekordy w cyberFolks

1. Zaloguj się do panelu **cyberFolks**.
2. Wejdź w **Domeny** → `rsg.com.pl` → **Strefa DNS**
   (może się nazywać *Edytor stref DNS* albo *DNS*).
3. Zobaczysz listę rekordów. Zmieniasz **tylko te dwa**:

#### Rekord 1 — sama domena

Znajdź rekord typu **`A`** o nazwie `rsg.com.pl` (albo `@`) i **zmień wartość**:

| | |
|---|---|
| ❌ było | `185.208.164.193` |
| ✅ ma być | **`216.198.79.1`** |

Klikasz *Edytuj*, podmieniasz adres, zapisujesz. Typ zostaje `A`, nazwa bez zmian.

#### Rekord 2 — wersja z www

Tu trzeba **usunąć stary rekord i dodać nowy** (bo zmienia się typ z `A` na `CNAME`).

1. Znajdź rekord **`A`** o nazwie `www` (wartość `185.208.164.193`) → **Usuń**.
2. Dodaj nowy rekord:

| pole | co wpisać |
|---|---|
| Typ | **`CNAME`** |
| Nazwa / Host | **`www`** |
| Wartość / Cel | **`a75a6f32eb3aaf8d.vercel-dns-017.com.`** |
| TTL | zostaw domyślny (albo 3600) |

> Na końcu wartości CNAME **jest kropka** — przepisz ją. Jeśli panel jej nie przyjmuje,
> wpisz bez kropki, cyberFolks doda ją sam.

3. Zapisz. Niektóre panele mają jeszcze przycisk **Zapisz strefę** / **Zastosuj** na dole —
   kliknij go, inaczej zmiany nie wejdą.

### Krok 3. Poczekaj

- Zwykle **15–60 minut**, maksymalnie doba.
- W Vercelu przy domenie zapali się zielony napis **Valid Configuration**.
- Kłódka (certyfikat SSL) zrobi się sama — nic nie klikasz.
- Chcesz sprawdzić postęp: wejdź na **dnschecker.org**, wpisz `rsg.com.pl`, typ `A`.
  Ma pokazywać nowy adres IP, a nie `185.208.164.193`.

### Gdyby coś nie działało

| Problem | Co zrobić |
|---|---|
| Vercel pisze *Invalid Configuration* | Normalne, dopóki nie zrobisz kroku 2. Jeśli już zrobiłeś — kliknij **Refresh** w Vercelu i sprawdź, czy przy `www` nie został stary rekord `A`. Ma być tylko `CNAME`. |
| Strona nie otwiera się po godzinie | Sprawdź na dnschecker.org, czy IP się zmieniło. Jeśli nie — rekord nie został zapisany. |
| Brak kłódki / ostrzeżenie o certyfikacie | Poczekaj jeszcze godzinę. Jeśli dalej nie ma — napisz do mnie. |
| Przestały chodzić maile | Ktoś ruszył `MX` albo `TXT`. Przywróć je i będzie dobrze. |

---

# Gdy stronę zmienia więcej niż jedna osoba

Zasada jest jedna: **zanim zaczniesz zmieniać, kliknij `3-POBIERZ-NAJNOWSZE.bat`.**
Wtedy masz u siebie to, co jest teraz na stronie.

Gdybyś zapomniał — `2-OPUBLIKUJ.bat` sam to wykryje i napisze:

> *UWAGA: ktoś inny opublikował zmiany na stronie.*

Wtedy klikasz `3-POBIERZ-NAJNOWSZE.bat` i powtarzasz swoją zmianę.
Nic nie zostanie skasowane — skrypt zatrzyma się, zanim cokolwiek nadpisze.

---

# Ściąga na lodówkę

| Chcę… | Co robię |
|---|---|
| dodać zdjęcia | wrzucam je do folderu `nowe-zdjecia` → mówię Claude → `2-OPUBLIKUJ.bat` |
| zmienić tekst albo cenę | mówię Claude → `2-OPUBLIKUJ.bat` |
| zobaczyć przed publikacją | `1-POKAZ-STRONE.bat` |
| coś zepsułem | mówię Claude: *„cofnij ostatnią zmianę"* |
| strona się nie odświeża | czekam 2 minuty, potem **Ctrl + F5** |
| ktoś inny coś zmienił | `3-POBIERZ-NAJNOWSZE.bat` przed rozpoczęciem pracy |

**Adres roboczy strony:** https://elba-rsg.vercel.app/
**Adres docelowy (po podpięciu domeny):** https://rsg.com.pl

---

*Szczegóły techniczne (jak działa galeria, skąd się biorą zdjęcia i film) —
w pliku `9-SZCZEGOLY-TECHNICZNE.md`.*
