// Audio/Music Control Module
export class AudioController {
    constructor() {
        this.musicToggle = null;
        this.musicText = null;
        this.bgMusic = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeElements();
            this.setupEventListeners();
        });
    }

    initializeElements() {
        this.musicToggle = document.getElementById('musicToggle');
        this.musicText = document.getElementById('musicText');
        this.bgMusic = document.getElementById('bgMusic');
    }

    setupEventListeners() {
        if (this.musicToggle) {
            this.musicToggle.addEventListener('click', () => this.toggleMusic());
        }

        if (this.bgMusic) {
            this.bgMusic.addEventListener('ended', () => this.resetMusicState());
        }

        // Auto-pause when page becomes hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                this.pauseMusic();
            }
        });
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    playMusic() {
        if (this.bgMusic) {
            this.bgMusic.play().then(() => {
                this.isPlaying = true;
                this.updateUIPlaying();
            }).catch(error => {
                console.log('음악 재생 실패:', error);
                alert('음악을 재생할 수 없습니다. 브라우저 설정을 확인해주세요.');
            });
        }
    }

    pauseMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
            this.isPlaying = false;
            this.updateUIPaused();
        }
    }

    resetMusicState() {
        this.isPlaying = false;
        this.updateUIPaused();
    }

    updateUIPlaying() {
        if (this.musicToggle && this.musicText) {
            this.musicToggle.classList.add('playing');
            this.musicText.textContent = '음악 끄기';
        }
    }

    updateUIPaused() {
        if (this.musicToggle && this.musicText) {
            this.musicToggle.classList.remove('playing');
            this.musicText.textContent = '음악 켜기';
        }
    }
}