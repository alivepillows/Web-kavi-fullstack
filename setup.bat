@echo off
echo ========================================
echo KAVI Application Setup
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo [3/4] Generating Prisma Client...
cd ..\backend
call npx prisma generate
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo 1. Buat database MySQL: CREATE DATABASE kavi_db;
echo 2. Edit backend\.env sesuai konfigurasi MySQL Anda
echo 3. Jalankan: cd backend ^&^& npx prisma migrate dev --name init
echo 4. Jalankan aplikasi: start.bat
echo ========================================
pause
