// Utility Functions Module
export class Utils {
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            Utils.preventZoom();
            Utils.setupSmoothScroll();
            Utils.setupScrollAnimations();
        });

        window.addEventListener('load', () => {
            Utils.setupScrollAnimations();
        });
    }

    static preventZoom() {
        // Prevent wheel zoom
        document.addEventListener('wheel', function(e) {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent keyboard zoom (Ctrl + +/-)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
                e.preventDefault();
            }
        });
        
        // Prevent double tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    static setupSmoothScroll() {
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
    }

    static setupScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        if (sections.length === 0) return;
        
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

    static openMap() {
        // Open Kakao Map for wedding venue
        const address = encodeURIComponent('서울 송파구 문정동 루이비스컨벤션');
        const kakaoMapUrl = `https://map.kakao.com/link/search/${address}`;
        
        // Open in new window
        window.open(kakaoMapUrl, '_blank');
    }
}

// Global function for backward compatibility
window.openMap = () => Utils.openMap();