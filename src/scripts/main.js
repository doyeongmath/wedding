// Main Application Entry Point
import { AudioController } from './audio.js';
import { GalleryController, LightboxController } from './gallery.js';
import { CountdownTimer } from './countdown.js';
import { Utils } from './utils.js';

class WeddingApp {
    constructor() {
        this.audioController = null;
        this.galleryController = null;
        this.lightboxController = null;
        this.countdownTimer = null;
        this.init();
    }

    init() {
        // Initialize all modules
        this.audioController = new AudioController();
        this.galleryController = new GalleryController();
        this.lightboxController = new LightboxController();
        this.countdownTimer = new CountdownTimer();
        
        // Initialize utilities
        Utils.init();

        // Make controllers globally available for compatibility
        window.audioController = this.audioController;
        window.galleryController = this.galleryController;
        window.lightboxController = this.lightboxController;
        window.countdownTimer = this.countdownTimer;

        console.log('Wedding App initialized successfully');
    }

    destroy() {
        // Clean up if needed
        if (this.countdownTimer) {
            this.countdownTimer.destroy();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.weddingApp = new WeddingApp();
});

// Also initialize on window load for better compatibility
window.addEventListener('load', () => {
    if (!window.weddingApp) {
        window.weddingApp = new WeddingApp();
    }
});

export default WeddingApp;