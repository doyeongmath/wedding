@echo off
echo 🖼️ 이미지 압축 도구
echo ==================

REM 압축된 이미지 폴더 생성
if not exist "optimized" mkdir optimized

echo.
echo 📁 최적화된 이미지 생성 중...

REM FFmpeg가 있는지 확인하고 압축
where ffmpeg >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ✅ FFmpeg 발견! 압축을 시작합니다...
    
    ffmpeg -i "compressed/photo-01.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-01.jpg"
    ffmpeg -i "compressed/photo-02.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-02.jpg" 
    ffmpeg -i "compressed/photo-03.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-03.jpg"
    ffmpeg -i "compressed/photo-04.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-04.jpg"
    ffmpeg -i "compressed/photo-05.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-05.jpg"
    ffmpeg -i "compressed/photo-06.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-06.jpg"
    ffmpeg -i "compressed/photo-07.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-07.jpg"
    ffmpeg -i "compressed/photo-08.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-08.jpg"
    ffmpeg -i "compressed/photo-09.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-09.jpg"
    ffmpeg -i "compressed/photo-10.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-10.jpg"
    ffmpeg -i "compressed/photo-11.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-11.jpg"
    ffmpeg -i "compressed/photo-12.jpg" -vf "scale=600:-1" -q:v 4 -y "optimized/photo-12.jpg"
    
    echo.
    echo ✅ 압축 완료!
    echo 📊 압축 결과:
    dir compressed\photo-01.jpg | find "photo-01.jpg"
    dir optimized\photo-01.jpg | find "photo-01.jpg"
    
) else (
    echo ❌ FFmpeg가 설치되지 않았습니다.
    echo 💡 설치 방법: https://ffmpeg.org/download.html
    echo.
    echo 🔄 임시 방법: 원본 파일을 optimized 폴더로 복사합니다...
    copy "compressed\*.jpg" "optimized\"
)

echo.
echo 🎉 완료! 이제 HTML에서 optimized/ 폴더의 이미지를 사용하세요.
pause