@echo off
chcp 65001 >nul
title Ready Steady Grow - pobierz najnowsza wersje
cd /d "%~dp0"

set REPO=https://github.com/adam420412/elba-rsg.git
set GALAZ=main

echo.
echo   POBIERANIE NAJNOWSZEJ WERSJI STRONY
echo   -----------------------------------
echo   Sciaga z internetu to, co jest teraz na stronie.
echo.
echo   UWAGA: jesli robiles zmiany i ich NIE opublikowales,
echo   zostana skasowane.
echo.

where git >nul 2>nul
if not %errorlevel%==0 (
  echo   Nie znaleziono Gita. Pobierz go ze strony git-scm.com i uruchom ten plik ponownie.
  echo.
  pause
  exit /b 1
)

set ZGODA=
set /p ZGODA=  Kontynuowac? (t = tak, dowolny inny klawisz = nie):
if /i not "%ZGODA%"=="t" (
  echo.
  echo   Anulowane. Nic nie zostalo zmienione.
  echo.
  pause
  exit /b 0
)

if not exist ".git" (
  echo.
  echo   Pierwsze uruchomienie - podlaczam repozytorium...
  git init -b %GALAZ% || goto :blad
  git remote add origin %REPO% || goto :blad
)

echo.
echo   Pobieram...
git fetch origin %GALAZ% || goto :blad
git reset --hard FETCH_HEAD || goto :blad

echo.
echo   GOTOWE. Masz najnowsza wersje strony.
echo   Mozesz teraz obejrzec ja przez 1-POKAZ-STRONE.bat
echo.
pause
exit /b 0

:blad
echo.
echo   Cos poszlo nie tak - przeczytaj komunikat powyzej.
echo   Najczestsze przyczyny: brak internetu albo brak zalogowania do GitHuba.
echo.
pause
exit /b 1
