# 🐍 Python으로 이미지 압축하기

## 🚀 빠른 실행 방법

### 1️⃣ Windows 명령 프롬프트에서 실행
```cmd
# 1. 프로젝트 폴더로 이동
cd "C:\Users\pm\Documents\GitHub\wedding"

# 2. Pillow 설치 (한 번만)
pip install Pillow
# 또는
py -m pip install Pillow

# 3. 압축 스크립트 실행
python compress_images_simple.py
# 또는
py compress_images_simple.py
```

### 2️⃣ 파일 탐색기에서 더블클릭
- `setup.bat` 파일을 더블클릭하면 자동으로 설치 및 압축 실행

### 3️⃣ VSCode나 파이참에서 실행
- `compress_images_simple.py` 파일을 열고 F5로 실행

## 📊 압축 결과 예상

**현재 상태:**
```
compressed/
├── photo-01.jpg (19MB)
├── photo-02.jpg (22MB)
├── photo-03.jpg (21MB)
...
└── photo-12.jpg (26MB)
총 245MB
```

**압축 후:**
```
optimized/
├── photo-01.jpg (~180KB)
├── photo-02.jpg (~200KB)
├── photo-03.jpg (~190KB)
...
└── photo-12.jpg (~220KB)
총 2.3MB (99% 감소!)
```

## 🔧 압축 설정
- **해상도**: 800px 너비로 리사이즈
- **품질**: 85% (고품질 유지)
- **형식**: Progressive JPEG (점진적 로딩)
- **최적화**: 파일 크기 최소화

## ❌ 문제 해결

### Python을 찾을 수 없는 경우
1. **Python 재설치**: https://python.org에서 최신 버전 다운로드
2. **PATH 추가 체크**: 설치 시 "Add Python to PATH" 체크
3. **재부팅**: 설치 후 컴퓨터 재시작

### Pillow 설치 실패 시
```cmd
# 관리자 권한으로 실행
pip install --user Pillow

# 또는 conda 사용
conda install Pillow
```

### 스크립트 실행 오류 시
1. `compressed/` 폴더에 이미지 파일이 있는지 확인
2. 파일 권한 문제: 관리자 권한으로 실행
3. 디스크 공간 부족: 충분한 공간 확보

## ✅ 성공 후 작업

### HTML 경로 업데이트
`index.html`에서 다음과 같이 변경:
```html
<!-- 기존 -->
<img src="compressed/photo-01.jpg">

<!-- 변경 -->
<img src="optimized/photo-01.jpg">
```

### 자동 경로 업데이트 스크립트
`update_html.py`를 실행하면 자동으로 HTML 경로가 업데이트됩니다.

## 🎯 최종 확인
1. 브라우저에서 `index.html` 열기
2. 이미지가 빠르게 로드되는지 확인
3. 모든 12개 이미지가 표시되는지 확인
4. 라이트박스(클릭 확대)가 작동하는지 확인

압축이 완료되면 웹사이트가 훨씬 빠르게 로드될 것입니다! 🚀