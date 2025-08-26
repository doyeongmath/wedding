// 음악 컨트롤 기능
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // 음악 토글 버튼 클릭 이벤트
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            // 음악 정지
            bgMusic.pause();
            bgMusic.currentTime = 0;
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicText.textContent = '음악 켜기';
        } else {
            // 음악 재생
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicText.textContent = '음악 끄기';
            }).catch(error => {
                console.log('음악 재생 실패:', error);
                alert('음악을 재생할 수 없습니다. 브라우저 설정을 확인해주세요.');
            });
        }
    });

    // 음악이 끝나면 자동으로 재생 상태 초기화
    bgMusic.addEventListener('ended', function() {
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicText.textContent = '음악 켜기';
    });

    // 페이지가 보이지 않을 때 음악 자동 정지
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicText.textContent = '음악 켜기';
        }
    });
});

// 지도 열기 기능
function openMap() {
    // 카카오맵으로 열기 (루이비스컨벤션 송파문정점)
    const address = encodeURIComponent('서울 송파구 문정동 루이비스컨벤션');
    const kakaoMapUrl = `https://map.kakao.com/link/search/${address}`;
    
    // 새 창에서 지도 열기
    window.open(kakaoMapUrl, '_blank');
}

// 라이트박스 열기
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImg) {
        alert('라이트박스를 찾을 수 없습니다.');
        return;
    }
    
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
    
    // 현재 이미지 인덱스 저장
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = Array.from(galleryImages).findIndex(img => img.src === imageSrc);
    
    // 전역 변수로 현재 인덱스 저장
    window.currentLightboxIndex = currentIndex;
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage(e);
        } else if (e.key === 'ArrowRight') {
            showNextImage(e);
        }
    });
    
    // 클릭으로 닫기 기능
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// 라이트박스 닫기
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// 이전 이미지 보기
function showPrevImage(event) {
    event.stopPropagation();
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = window.currentLightboxIndex || 0;
    
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    window.currentLightboxIndex = currentIndex;
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
}

// 다음 이미지 보기
function showNextImage(event) {
    event.stopPropagation();
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentIndex = window.currentLightboxIndex || 0;
    
    currentIndex = (currentIndex + 1) % galleryImages.length;
    window.currentLightboxIndex = currentIndex;
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[currentIndex].src;
}

// 스크롤 애니메이션 효과
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 페이지 로드 시 애니메이션 시작 및 이벤트 리스너 설정
function initializeGallery() {
    // 갤러리 초기화
    showCard(1);
    updateNavArrows();
    updatePageIndicator();
    
    console.log('Gallery initialized with card navigation');
}

// 줌 방지 함수
function preventZoom() {
    // 휠 줌 방지
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // 키보드 줌 방지 (Ctrl + +/-)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
            e.preventDefault();
        }
    });
    
    // 더블 탭 줌 방지
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 카운트다운 타이머 함수
function updateCountdown() {
    const weddingDate = new Date('2026-01-04T13:40:00');
    const now = new Date();
    const difference = weddingDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // 결혼식이 지난 경우
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// 갤러리 카드 네비게이션
let currentCard = 1;
const totalCards = 8;

function showCard(cardNumber) {
    // 모든 카드 숨기기
    for (let i = 1; i <= totalCards; i++) {
        document.getElementById(`card${i}`).classList.remove('active');
    }
    
    // 선택된 카드 보이기
    document.getElementById(`card${cardNumber}`).classList.add('active');
    
    currentCard = cardNumber;
    
    // 네비게이션 화살표 상태 업데이트
    updateNavArrows();
    
    // 페이지 인디케이터 업데이트
    updatePageIndicator();
}

function nextGalleryPage() {
    if (currentCard < totalCards) {
        showCard(currentCard + 1);
    }
}

function prevGalleryPage() {
    if (currentCard > 1) {
        showCard(currentCard - 1);
    }
}

function goToPage(pageNumber) {
    // 페이지 번호를 카드 번호로 변환 (3개씩 그룹)
    const cardNumber = (pageNumber - 1) * 3 + 1;
    if (cardNumber >= 1 && cardNumber <= totalCards) {
        showCard(cardNumber);
    }
}

function updateNavArrows() {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    prevArrow.disabled = currentCard === 1;
    nextArrow.disabled = currentCard === totalCards;
}

function updatePageIndicator() {
    // 현재 카드가 속한 페이지 계산
    const currentPage = Math.ceil(currentCard / 3);
    
    // 모든 페이지 점 업데이트
    document.querySelectorAll('.page-dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentPage - 1) {
            dot.classList.add('active');
        }
    });
}

// DOM이 준비되면 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    preventZoom();
    updateCountdown();
    // 1초마다 카운트다운 업데이트
    setInterval(updateCountdown, 1000);
});

// 페이지 완전 로드 후에도 한 번 더 실행
window.addEventListener('load', function() {
    animateOnScroll();
    initializeGallery();
    preventZoom();
    updateCountdown();
    // 1초마다 카운트다운 업데이트
    setInterval(updateCountdown, 1000);
});

// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
