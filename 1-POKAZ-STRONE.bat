@echo off
chcp 65001 >nul
title Ready Steady Grow - podglad strony
cd /d "%~dp0"

set PORT=8080

echo.
echo   READY STEADY GROW - podglad lokalny
echo   ------------------------------------
echo   Adres: http://localhost:%PORT%/
echo   Zatrzymanie: zamknij to okno
echo.

rem --- sprawdzamy, czy narzedzie NAPRAWDE dziala (samo "where" lapie skrot do Microsoft Store) ---

python --version >nul 2>nul
if %errorlevel%==0 goto :python

py --version >nul 2>nul
if %errorlevel%==0 goto :py

node --version >nul 2>nul
if %errorlevel%==0 goto :node

goto :powershell

:python
start "" http://localhost:%PORT%/
python -m http.server %PORT%
goto :koniec

:py
start "" http://localhost:%PORT%/
py -m http.server %PORT%
goto :koniec

:node
start "" http://localhost:%PORT%/
npx --yes serve -l %PORT% .
goto :koniec

:powershell
rem serwer wbudowany - dziala na czystym Windowsie, bez Pythona i Node.js
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0narzedzia\serwer.ps1"
goto :koniec

:koniec
echo.
echo   Serwer zatrzymany.
pause
