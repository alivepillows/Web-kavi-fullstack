@echo off
echo Starting KAVI Application...
echo.

start cmd /k "cd backend && echo Starting Backend Server... && npm run dev"
timeout /t 3 /nobreak >nul
start cmd /k "cd frontend && echo Starting Frontend Server... && npm run dev"

echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
