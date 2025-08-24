# 모바일 청첩장 웹사이트

박도영 ♥ 손민정의 2026년 1월 4일 결혼식을 위한 모바일 친화적인 청첩장 웹사이트입니다.

## 🎵 음악 추가 방법

### 1. 음악 파일 준비
- `music` 폴더에 원하는 음악 파일을 넣어주세요
- 지원 형식: MP3, OGG
- 권장 파일명: `wedding-song.mp3`

### 2. HTML 수정 (필요시)
현재 HTML에서는 다음 경로를 사용합니다:
```html
<source src="music/wedding-song.mp3" type="audio/mpeg">
<source src="music/wedding-song.ogg" type="audio/ogg">
```

다른 파일명을 사용하려면 위 경로를 수정해주세요.

## 🎨 주요 기능

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **음악 컨트롤**: 배경음악 켜기/끄기
- **지도 연동**: 카카오맵으로 장소 확인
- **애니메이션**: 스크롤 시 부드러운 등장 효과
- **달력 표시**: 결혼식 날짜 하이라이트

## 📱 사용법

1. `index.html` 파일을 웹 브라우저에서 열기
2. 우측 상단의 음악 버튼으로 배경음악 재생/정지
3. "지도 보기" 버튼으로 결혼식 장소 확인

## 🔧 커스터마이징

### 색상 변경
`style.css` 파일에서 다음 변수들을 수정하세요:
- 헤더 배경: `.header`의 `background` 속성
- 하트 색상: `.heart`의 `color` 속성
- 결혼식 날짜: `.wedding-day`의 `background` 속성

### 텍스트 수정
`index.html` 파일에서 원하는 텍스트로 변경하세요.

## 📁 파일 구조

```
wedding/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 기능
├── music/              # 음악 파일 폴더
│   └── wedding-song.mp3  # 배경음악 (직접 추가)
└── README.md           # 이 파일
```

## 🌐 배포 방법

1. **GitHub Pages**: 저장소를 GitHub에 업로드하고 Pages 기능 활성화
2. **Netlify**: 파일을 Netlify에 드래그 앤 드롭
3. **Vercel**: Vercel 계정으로 프로젝트 연결

## 📞 문의사항

추가 기능이나 디자인 수정이 필요하시면 언제든 말씀해 주세요!
