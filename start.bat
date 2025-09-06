@echo off
echo 🚀 Starting Fusion Project...
echo.

echo 📦 Installing dependencies...
call npm run install:all

echo.
echo 🔧 Setting up environment...
if not exist "backend\.env" (
    echo Copying backend environment template...
    copy "backend\env.example" "backend\.env"
    echo ⚠️  Please edit backend\.env with your actual values
)

if not exist "frontend\.env" (
    echo Copying frontend environment template...
    copy "frontend\env.example" "frontend\.env"
    echo ⚠️  Please edit frontend\.env with your actual values
)

echo.
echo 🎯 Starting development servers...
echo Frontend will be available at: http://localhost:8080
echo Backend will be available at: http://localhost:5000
echo.
call npm run dev

pause


