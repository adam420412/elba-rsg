# Ready Steady Grow - prosty serwer statyczny na PowerShellu.
# Nie wymaga Pythona ani Node.js. Uruchamiany przez 1-POKAZ-STRONE.bat.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$port = 8080

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".webp" = "image/webp"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".woff2" = "font/woff2"
  ".woff" = "font/woff"
  ".mp4"  = "video/mp4"
  ".webm" = "video/webm"
  ".txt"  = "text/plain; charset=utf-8"
  ".md"   = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
  $listener.Start()
} catch {
  Write-Host ""
  Write-Host "  Nie udalo sie zajac portu $port." -ForegroundColor Red
  Write-Host "  Prawdopodobnie serwer juz dziala w innym oknie - sprawdz http://localhost:$port/"
  Write-Host ""
  Read-Host "  Enter zamyka okno"
  exit 1
}

Write-Host ""
Write-Host "  READY STEADY GROW - podglad lokalny" -ForegroundColor Green
Write-Host "  -----------------------------------"
Write-Host "  Adres:  http://localhost:$port/"
Write-Host "  Folder: $root"
Write-Host "  Zatrzymanie: zamknij to okno"
Write-Host ""

Start-Process "http://localhost:$port/"

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
  } catch {
    break
  }

  $req = $ctx.Request
  $res = $ctx.Response

  $sciezka = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
  if ($sciezka -eq "/" -or $sciezka.EndsWith("/")) { $sciezka += "index.html" }
  $sciezka = $sciezka.TrimStart("/").Replace("/", "\")

  $plik = Join-Path $root $sciezka
  $pelna = [System.IO.Path]::GetFullPath($plik)

  # blokada wyjscia poza folder strony
  if (-not $pelna.StartsWith([System.IO.Path]::GetFullPath($root))) {
    $res.StatusCode = 403
    $res.Close()
    continue
  }

  if (Test-Path -LiteralPath $pelna -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($pelna).ToLower()
    $typ = $mime[$ext]
    if (-not $typ) { $typ = "application/octet-stream" }
    try {
      $dane = [System.IO.File]::ReadAllBytes($pelna)
      $res.ContentType = $typ
      $res.ContentLength64 = $dane.Length
      $res.OutputStream.Write($dane, 0, $dane.Length)
      Write-Host ("  200  " + $sciezka)
    } catch {
      $res.StatusCode = 500
      Write-Host ("  500  " + $sciezka) -ForegroundColor Red
    }
  } else {
    $res.StatusCode = 404
    $bledy = [System.Text.Encoding]::UTF8.GetBytes("404 - nie znaleziono: $sciezka")
    $res.OutputStream.Write($bledy, 0, $bledy.Length)
    Write-Host ("  404  " + $sciezka) -ForegroundColor Yellow
  }

  $res.Close()
}

$listener.Stop()
