/**
 * Daily Affirmations SPA - JavaScript Module
 * Handles affirmation loading, display, and user interactions
 */

class DailyAffirmationsApp {
    constructor() {
        this.affirmations = [];
        this.currentAffirmationIndex = 0;
        this.usedIndices = new Set();
        this.isLoading = false;
        
        // DOM Elements
        this.affirmationDisplay = null;
        this.nextButton = null;
        
        // Configuration
        this.config = {
            jsonPath: './src/affirmations.json',
            fadeTransitionDuration: 300,
            loadingText: 'Loading your daily affirmation...',
            errorText: 'Unable to load affirmations. Please refresh the page.',
            buttonTexts: {
                default: 'Get New Affirmation',
                loading: 'Loading...',
                error: 'Try Again'
            }
        };
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            this.bindDOMElements();
            this.bindEvents();
            await this.loadAffirmations();
            this.displayRandomAffirmation();
            this.logAppStart();
        } catch (error) {
            console.error('Failed to initialize Daily Affirmations App:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Bind DOM elements to class properties
     */
    bindDOMElements() {
        this.affirmationDisplay = document.getElementById('affirmation-display');
        this.nextButton = document.getElementById('next-affirmation-btn');
        
        if (!this.affirmationDisplay || !this.nextButton) {
            throw new Error('Required DOM elements not found');
        }
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Button click event
        this.nextButton.addEventListener('click', () => {
            this.handleNextAffirmation();
        });
        
        // Keyboard accessibility
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                if (document.activeElement === this.nextButton) {
                    event.preventDefault();
                    this.handleNextAffirmation();
                }
            }
            
            // Allow 'n' key for next affirmation (power user feature)
            if (event.key === 'n' || event.key === 'N') {
                if (!this.isLoading) {
                    this.handleNextAffirmation();
                }
            }
        });
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.affirmations.length === 0) {
                this.loadAffirmations();
            }
        });
    }
    
    /**
     * Load affirmations from JSON file
     */
    async loadAffirmations() {
        try {
            this.setLoadingState(true);
            
            const response = await fetch(this.config.jsonPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.affirmations || !Array.isArray(data.affirmations)) {
                throw new Error('Invalid JSON structure: missing affirmations array');
            }
            
            if (data.affirmations.length === 0) {
                throw new Error('No affirmations found in the data file');
            }
            
            this.affirmations = data.affirmations;
            this.shuffleAffirmations();
            
            console.log(`Loaded ${this.affirmations.length} affirmations successfully`);
            
        } catch (error) {
            console.error('Error loading affirmations:', error);
            this.handleLoadingError(error);
            throw error;
        } finally {
            this.setLoadingState(false);
        }
    }
    
    /**
     * Shuffle affirmations array for better randomization
     * Uses Fisher-Yates shuffle algorithm
     */
    shuffleAffirmations() {
        for (let i = this.affirmations.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.affirmations[i], this.affirmations[j]] = [this.affirmations[j], this.affirmations[i]];
        }
    }
    
    /**
     * Get a random affirmation that hasn't been shown recently
     */
    getRandomAffirmation() {
        if (this.affirmations.length === 0) {
            return this.config.errorText;
        }
        
        // Reset used indices if we've shown most affirmations
        if (this.usedIndices.size >= Math.floor(this.affirmations.length * 0.8)) {
            this.usedIndices.clear();
            this.shuffleAffirmations(); // Re-shuffle for variety
        }
        
        let randomIndex;
        let attempts = 0;
        const maxAttempts = 50;
        
        // Find an unused affirmation
        do {
            randomIndex = Math.floor(Math.random() * this.affirmations.length);
            attempts++;
        } while (this.usedIndices.has(randomIndex) && attempts < maxAttempts);
        
        this.usedIndices.add(randomIndex);
        this.currentAffirmationIndex = randomIndex;
        
        return this.affirmations[randomIndex];
    }
    
    /**
     * Display a random affirmation with fade transition
     */
    async displayRandomAffirmation() {
        if (!this.affirmationDisplay) return;
        
        try {
            const affirmation = this.getRandomAffirmation();
            
            // Add fade-out class
            this.affirmationDisplay.classList.add('fade-out');
            
            // Wait for fade-out transition
            await this.sleep(this.config.fadeTransitionDuration);
            
            // Update content
            this.affirmationDisplay.textContent = affirmation;
            
            // Remove fade-out and add fade-in
            this.affirmationDisplay.classList.remove('fade-out');
            this.affirmationDisplay.classList.add('fade-in');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                this.affirmationDisplay.classList.remove('fade-in');
            }, 500);
            
            // Track affirmation display
            this.trackAffirmationView(affirmation);
            
        } catch (error) {
            console.error('Error displaying affirmation:', error);
            this.displayErrorMessage();
        }
    }
    
    /**
     * Handle next affirmation button click
     */
    async handleNextAffirmation() {
        if (this.isLoading) return;
        
        try {
            // Add button feedback
            this.nextButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.nextButton.style.transform = '';
            }, 150);
            
            await this.displayRandomAffirmation();
            
        } catch (error) {
            console.error('Error getting next affirmation:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Set loading state for UI elements
     */
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        
        if (!this.nextButton) return;
        
        if (isLoading) {
            this.nextButton.disabled = true;
            this.nextButton.textContent = this.config.buttonTexts.loading;
            this.affirmationDisplay?.classList.add('loading');
        } else {
            this.nextButton.disabled = false;
            this.nextButton.textContent = this.config.buttonTexts.default;
            this.affirmationDisplay?.classList.remove('loading');
        }
    }
    
    /**
     * Handle loading errors
     */
    handleLoadingError(error) {
        if (this.affirmationDisplay) {
            this.affirmationDisplay.textContent = this.config.errorText;
        }
        
        if (this.nextButton) {
            this.nextButton.textContent = this.config.buttonTexts.error;
            this.nextButton.onclick = () => window.location.reload();
        }
    }
    
    /**
     * Handle general errors
     */
    handleError(error) {
        console.error('Application error:', error);
        
        if (this.affirmationDisplay) {
            this.affirmationDisplay.textContent = 'Something went wrong. Please try again.';
        }
    }
    
    /**
     * Display error message in affirmation area
     */
    displayErrorMessage() {
        if (this.affirmationDisplay) {
            this.affirmationDisplay.textContent = this.config.errorText;
            this.affirmationDisplay.classList.add('error');
        }
    }
    
    /**
     * Track affirmation views (for analytics - optional)
     */
    trackAffirmationView(affirmation) {
        // This could be used for analytics or user engagement tracking
        // For now, just log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Affirmation displayed:', affirmation.substring(0, 50) + '...');
        }
        
        // Store in sessionStorage for potential future features
        try {
            const viewCount = parseInt(sessionStorage.getItem('affirmationViews') || '0') + 1;
            sessionStorage.setItem('affirmationViews', viewCount.toString());
            sessionStorage.setItem('lastAffirmation', affirmation);
            sessionStorage.setItem('lastViewTime', new Date().toISOString());
        } catch (e) {
            // Ignore storage errors
        }
    }
    
    /**
     * Log application start (for debugging)
     */
    logAppStart() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Daily Affirmations App initialized successfully');
            console.log(`Loaded ${this.affirmations.length} affirmations`);
        }
    }
    
    /**
     * Utility function for delays
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Get app statistics (for potential future features)
     */
    getStats() {
        return {
            totalAffirmations: this.affirmations.length,
            viewedInSession: this.usedIndices.size,
            currentIndex: this.currentAffirmationIndex,
            sessionViews: parseInt(sessionStorage.getItem('affirmationViews') || '0')
        };
    }
}

/**
 * Utility functions for enhanced user experience
 */
class AffirmationUtils {
    /**
     * Get affirmation of the day based on date
     */
    static getAffirmationOfTheDay(affirmations) {
        if (!affirmations || affirmations.length === 0) return null;
        
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const index = dayOfYear % affirmations.length;
        
        return affirmations[index];
    }
    
    /**
     * Get user's local time greeting
     */
    static getTimeBasedGreeting() {
        const hour = new Date().getHours();
        
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }
    
    /**
     * Check if user is returning visitor
     */
    static isReturningVisitor() {
        try {
            return localStorage.getItem('hasVisited') === 'true';
        } catch (e) {
            return false;
        }
    }
    
    /**
     * Mark user as visitor
     */
    static markAsVisited() {
        try {
            localStorage.setItem('hasVisited', 'true');
            localStorage.setItem('firstVisit', new Date().toISOString());
        } catch (e) {
            // Ignore storage errors
        }
    }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mark user as visited
    AffirmationUtils.markAsVisited();
    
    // Initialize the main application
    window.affirmationApp = new DailyAffirmationsApp();
    
    // Add any additional setup here
    if ('serviceWorker' in navigator) {
        // Service worker could be added here for offline functionality
        console.log('Service Worker support detected (not implemented)');
    }
});

/**
 * Handle page visibility changes for better user experience
 */
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.affirmationApp) {
        // User returned to tab - could refresh affirmation or show greeting
        console.log('Welcome back to Daily Affirmations!');
    }
});

/**
 * Export for potential module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DailyAffirmationsApp, AffirmationUtils };
}