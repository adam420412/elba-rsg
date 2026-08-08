@echo off
chcp 65001 >nul
title Ready Steady Grow - publikacja strony
cd /d "%~dp0"

set REPO=https://github.com/adam420412/elba-rsg.git
set GALAZ=main

echo.
echo   WYSYLKA STRONY NA GITHUB
echo   ------------------------
echo   Repozytorium: %REPO%
echo   Po wyslaniu Vercel sam zbuduje nowa wersje (1-2 minuty).
echo.

where git >nul 2>nul
if not %errorlevel%==0 (
  echo   Nie znaleziono Gita. Pobierz go ze strony git-scm.com i uruchom ten plik ponownie.
  echo.
  pause
  exit /b 1
)

rem --- opis zmian (mozna podac jako parametr, np. 2-OPUBLIKUJ.bat "nowe zdjecia") ---
set OPIS=%~1
if not "%OPIS%"=="" goto :mam_opis
set /p OPIS=  Co sie zmienilo? (Enter = "aktualizacja strony"):
if "%OPIS%"=="" set OPIS=aktualizacja strony
:mam_opis

rem --- pierwsze uruchomienie: podlaczenie repozytorium ---
if not exist ".git" (
  echo.
  echo   Pierwsze uruchomienie - podlaczam repozytorium...
  git init -b %GALAZ% || goto :blad
  git remote add origin %REPO% || goto :blad
  git config user.name "Adam" >nul
  git config user.email "amaziarz@edu.cdv.pl" >nul
)

echo.
echo   Sprawdzam, co jest na GitHubie...
git fetch origin %GALAZ% 2>nul
if not %errorlevel%==0 goto :po_sprawdzeniu

rem --- czy ktos inny opublikowal zmiany, ktorych nie mamy u siebie? ---
set LOKALNY=
set ZDALNY=
for /f "delims=" %%i in ('git rev-parse HEAD 2^>nul') do set LOKALNY=%%i
for /f "delims=" %%i in ('git rev-parse FETCH_HEAD 2^>nul') do set ZDALNY=%%i

if "%LOKALNY%"=="" goto :ustaw_baze
if "%LOKALNY%"=="%ZDALNY%" goto :ustaw_baze

echo.
echo   ================================================================
echo    UWAGA: ktos inny opublikowal zmiany na stronie.
echo.
echo    Zeby ich nie skasowac, najpierw kliknij:
echo        3-POBIERZ-NAJNOWSZE.bat
echo    a potem powtorz swoje zmiany i opublikuj jeszcze raz.
echo   ================================================================
echo.
pause
exit /b 1

:ustaw_baze
git reset --soft FETCH_HEAD

:po_sprawdzeniu

echo   Przygotowuje pliki...
git add -A || goto :blad

git diff --cached --quiet
if %errorlevel%==0 (
  echo.
  echo   Brak zmian do wyslania - na GitHubie jest juz ta sama wersja.
  echo.
  pause
  exit /b 0
)

git commit -m "%OPIS%" || goto :blad

echo.
echo   Wysylam na GitHub...
echo   (przy pierwszym razie Git poprosi o zalogowanie sie do GitHuba w przegladarce)
echo.
git push -u origin %GALAZ% || goto :blad

echo.
echo   GOTOWE. Zmiany sa na GitHubie.
echo   Za chwile odswiez: https://elba-rsg.vercel.app/
echo.
pause
exit /b 0

:blad
echo.
echo   Cos poszlo nie tak - przeczytaj komunikat powyzej.
echo   Najczestsze przyczyny: brak zalogowania do GitHuba albo brak internetu.
echo.
pause
exit /b 1
