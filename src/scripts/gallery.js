// Gallery Module
export class GalleryController {
    constructor() {
        this.currentCard = 1;
        this.totalCards = 12; // Updated for new image count
        this.startX = 0;
        this.endX = 0;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeGallery();
        });

        window.addEventListener('load', () => {
            this.initializeGallery();
        });
    }

    initializeGallery() {
        this.showCard(1);
        this.updateNavArrows();
        this.updatePageIndicator();
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
        console.log('Gallery initialized with card navigation and swipe support');
    }

    setupTouchEvents() {
        const galleryContainer = document.querySelector('.gallery-card-container');
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            galleryContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevGalleryPage();
            } else if (e.key === 'ArrowRight') {
                this.nextGalleryPage();
            }
        });
    }

    showCard(cardNumber) {
        // Hide all cards
        for (let i = 1; i <= this.totalCards; i++) {
            const card = document.getElementById(`card${i}`);
            if (card) {
                card.classList.remove('active');
            }
        }
        
        // Show selected card
        const selectedCard = document.getElementById(`card${cardNumber}`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
        
        this.currentCard = cardNumber;
        this.updateNavArrows();
        this.updatePageIndicator();
    }

    nextGalleryPage() {
        if (this.currentCard < this.totalCards) {
            this.showCard(this.currentCard + 1);
        }
    }

    prevGalleryPage() {
        if (this.currentCard > 1) {
            this.showCard(this.currentCard - 1);
        }
    }

    goToCard(cardNumber) {
        if (cardNumber >= 1 && cardNumber <= this.totalCards) {
            this.showCard(cardNumber);
        }
    }

    updateNavArrows() {
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        
        if (prevArrow) {
            prevArrow.disabled = this.currentCard === 1;
        }
        if (nextArrow) {
            nextArrow.disabled = this.currentCard === this.totalCards;
        }
    }

    updatePageIndicator() {
        document.querySelectorAll('.page-dot').forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentCard - 1) {
                dot.classList.add('active');
            }
        });
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.endX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.startX - this.endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left (next card)
                this.nextGalleryPage();
            } else {
                // Swipe right (previous card)
                this.prevGalleryPage();
            }
        }
    }
}

// Lightbox functionality
export class LightboxController {
    constructor() {
        this.currentIndex = 0;
        this.galleryImages = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        // ESC key and arrow keys
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.showPrevImage(e);
            } else if (e.key === 'ArrowRight') {
                this.showNextImage(e);
            }
        });

        // Click to close lightbox
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }
    }

    openLightbox(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        if (!lightbox || !lightboxImg) {
            alert('라이트박스를 찾을 수 없습니다.');
            return;
        }
        
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
        
        // Update gallery images array
        this.galleryImages = Array.from(document.querySelectorAll('.gallery-item img, .gallery-card img'));
        this.currentIndex = this.galleryImages.findIndex(img => img.src === imageSrc);
        
        // Store current index globally for compatibility
        window.currentLightboxIndex = this.currentIndex;
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    showPrevImage(event) {
        event?.stopPropagation();
        
        if (this.galleryImages.length === 0) {
            this.galleryImages = Array.from(document.querySelectorAll('.gallery-item img, .gallery-card img'));
        }
        
        this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        window.currentLightboxIndex = this.currentIndex;
        
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg && this.galleryImages[this.currentIndex]) {
            lightboxImg.src = this.galleryImages[this.currentIndex].src;
        }
    }

    showNextImage(event) {
        event?.stopPropagation();
        
        if (this.galleryImages.length === 0) {
            this.galleryImages = Array.from(document.querySelectorAll('.gallery-item img, .gallery-card img'));
        }
        
        this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
        window.currentLightboxIndex = this.currentIndex;
        
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg && this.galleryImages[this.currentIndex]) {
            lightboxImg.src = this.galleryImages[this.currentIndex].src;
        }
    }
}

// Global functions for backward compatibility
window.nextGalleryPage = () => {
    if (window.galleryController) {
        window.galleryController.nextGalleryPage();
    }
};

window.prevGalleryPage = () => {
    if (window.galleryController) {
        window.galleryController.prevGalleryPage();
    }
};

window.goToCard = (cardNumber) => {
    if (window.galleryController) {
        window.galleryController.goToCard(cardNumber);
    }
};

window.openLightbox = (imageSrc) => {
    if (window.lightboxController) {
        window.lightboxController.openLightbox(imageSrc);
    }
};

window.closeLightbox = () => {
    if (window.lightboxController) {
        window.lightboxController.closeLightbox();
    }
};

window.showPrevImage = (event) => {
    if (window.lightboxController) {
        window.lightboxController.showPrevImage(event);
    }
};

window.showNextImage = (event) => {
    if (window.lightboxController) {
        window.lightboxController.showNextImage(event);
    }
};