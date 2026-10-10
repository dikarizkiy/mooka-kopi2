@echo off
title Kopi Mooka - server lokal (untuk memasang PWA)
cd /d "%~dp0"

echo Menjalankan server lokal di http://localhost:5000 ...
echo Biarkan jendela kecil ini tetap terbuka selama memakai aplikasi.
echo Tekan Ctrl+C atau tutup jendela untuk menghentikan server.
echo.

start "Kopi Mooka Server" /min cmd /c "py -m http.server 5000 2>nul || python -m http.server 5000"
timeout /t 2 /nobreak >nul
start "" "http://localhost:5000/index.html"

echo.
echo Buka di browser: http://localhost:5000
echo Untuk memasang: menu browser -^> "Install app" atau ikon di bilah alamat.
pause
