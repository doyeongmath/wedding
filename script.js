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
    
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'block';
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// 라이트박스 닫기
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
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

// 페이지 로드 시 애니메이션 시작
window.addEventListener('load', function() {
    animateOnScroll();
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
