// Countdown Timer Module
export class CountdownTimer {
    constructor(targetDate = '2026-01-04T13:40:00') {
        this.targetDate = new Date(targetDate);
        this.intervalId = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.startCountdown();
        });

        window.addEventListener('load', () => {
            this.startCountdown();
        });
    }

    startCountdown() {
        // Update immediately
        this.updateCountdown();
        
        // Update every second
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date();
        const difference = this.targetDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            this.updateDisplay('days', days);
            this.updateDisplay('hours', hours);
            this.updateDisplay('minutes', minutes);
            this.updateDisplay('seconds', seconds);
        } else {
            // Wedding day has passed
            this.updateDisplay('days', 0);
            this.updateDisplay('hours', 0);
            this.updateDisplay('minutes', 0);
            this.updateDisplay('seconds', 0);
            
            // Stop the timer
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }

    updateDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value.toString().padStart(2, '0');
        }
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Global function for backward compatibility
window.updateCountdown = () => {
    if (window.countdownTimer) {
        window.countdownTimer.updateCountdown();
    }
};