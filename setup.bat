@echo off
echo 🐍 Python 이미지 압축 환경 설정
echo ================================

echo 1. Python 설치 확인...
py --version
if %ERRORLEVEL% neq 0 (
    echo ❌ Python이 설치되지 않았거나 PATH에 없습니다.
    echo 💡 https://python.org 에서 Python을 다운로드하세요.
    pause
    exit /b 1
)

echo.
echo 2. Pillow 라이브러리 설치...
py -m pip install Pillow

if %ERRORLEVEL% == 0 (
    echo ✅ Pillow 설치 완료!
) else (
    echo ❌ Pillow 설치 실패
    pause
    exit /b 1
)

echo.
echo 3. 이미지 압축 시작...
py compress_images.py

pause