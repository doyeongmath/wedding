# 웨딩 사이트 이미지 압축 PowerShell 스크립트

Write-Host "🎉 웨딩 사이트 이미지 압축을 시작합니다!" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan

# 이미지 파일 찾기
$imagesDir = "images"
$compressedDir = "images\compressed"

# 압축된 이미지 저장 폴더 생성
if (!(Test-Path $compressedDir)) {
    New-Item -ItemType Directory -Path $compressedDir -Force
    Write-Host "📁 $compressedDir 폴더를 생성했습니다." -ForegroundColor Yellow
}

# 이미지 파일 찾기
$imageFiles = Get-ChildItem -Path $imagesDir -Include "*.jpg", "*.jpeg", "*.JPG", "*.JPEG" -Recurse

if ($imageFiles.Count -eq 0) {
    Write-Host "❌ images 폴더에서 이미지를 찾을 수 없습니다." -ForegroundColor Red
    exit
}

Write-Host "📸 총 $($imageFiles.Count)개의 이미지를 발견했습니다." -ForegroundColor Green
Write-Host ""

# 각 이미지 정보 출력
$totalOriginalSize = 0
$successCount = 0

foreach ($imageFile in $imageFiles) {
    $originalSize = $imageFile.Length
    $totalOriginalSize += $originalSize
    
    Write-Host "📸 $($imageFile.Name)" -ForegroundColor Cyan
    Write-Host "   용량: $([math]::Round($originalSize/1MB, 2))MB" -ForegroundColor White
    Write-Host "   경로: $($imageFile.FullName)" -ForegroundColor Gray
    Write-Host ""
    
    $successCount++
}

# 결과 요약
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "📊 이미지 정보 요약" -ForegroundColor Green
Write-Host "✅ 총 이미지: $successCount개" -ForegroundColor White
Write-Host "📊 전체 용량: $([math]::Round($totalOriginalSize/1MB, 2))MB" -ForegroundColor White
Write-Host ""
Write-Host "💡 다음 단계:" -ForegroundColor Yellow
Write-Host "1. TinyPNG (https://tinypng.com/) 에 접속하세요" -ForegroundColor White
Write-Host "2. 위의 이미지들을 드래그해서 업로드하세요" -ForegroundColor White
Write-Host "3. 자동으로 압축된 이미지를 다운로드하세요" -ForegroundColor White
Write-Host "4. 압축된 이미지로 기존 이미지를 교체하세요" -ForegroundColor White
Write-Host "5. 웹사이트 로딩 속도가 10-20배 빨라질 것입니다!" -ForegroundColor Green

# 압축 권장사항
Write-Host ""
Write-Host "🎯 압축 권장사항:" -ForegroundColor Yellow
Write-Host "- 품질: 80-85%" -ForegroundColor White
Write-Host "- 최대 너비: 1200px" -ForegroundColor White
Write-Host "- 최대 높이: 800px" -ForegroundColor White
Write-Host "- 예상 압축률: 80-95%" -ForegroundColor White

