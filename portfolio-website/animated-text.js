/**
 * Animated Text Effects
 * CSS-based animations for text elements
 */

// Simple Fade Words Animation
class FlipWords {
    constructor(element, words, duration = 3000) {
        this.element = element;
        this.words = words;
        this.duration = duration;
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Clear existing content and setup container
        this.element.innerHTML = '';
        this.element.style.display = 'inline-block';
        this.element.style.minWidth = '120px'; // Fixed width to prevent layout shifts
        this.element.style.textAlign = 'center';
        
        // Create single text element
        this.textEl = document.createElement('span');
        this.textEl.textContent = this.words[0];
        this.textEl.style.transition = 'all 0.5s ease-in-out';
        this.element.appendChild(this.textEl);
        
        // Start animation cycle
        this.startCycle();
    }
    
    updateWord(word) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Fade out
        this.textEl.style.opacity = '0';
        this.textEl.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Change text
            this.textEl.textContent = word;
            
            // Fade in
            this.textEl.style.opacity = '1';
            this.textEl.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 250);
        }, 250);
    }
    
    startCycle() {
        setInterval(() => {
            if (!this.isAnimating) {
                this.currentIndex = (this.currentIndex + 1) % this.words.length;
                this.updateWord(this.words[this.currentIndex]);
            }
        }, this.duration);
    }
}

// Number Counter Animation
class NumberCounter {
    constructor(element, targetNumber, duration = 2000) {
        this.element = element;
        this.target = parseInt(targetNumber);
        this.duration = duration;
        this.current = 0;
        
        this.animate();
    }
    
    animate() {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.current = Math.floor(startValue + (this.target - startValue) * easeOut);
            this.element.textContent = this.current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Auto-initialize animations when elements come into view
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1 }
        );
        
        this.init();
    }
    
    init() {
        // Flip words elements
        document.querySelectorAll('[data-flip-words]').forEach(el => {
            this.observer.observe(el);
        });
        
        // Number counter elements
        document.querySelectorAll('[data-number-counter]').forEach(el => {
            this.observer.observe(el);
        });
        
        // Typewriter elements
        document.querySelectorAll('[data-typewriter]').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                
                if (entry.target.hasAttribute('data-flip-words')) {
                    const words = entry.target.getAttribute('data-flip-words').split(',');
                    const duration = parseInt(entry.target.getAttribute('data-duration')) || 3000;
                    new FlipWords(entry.target, words, duration);
                }
                
                if (entry.target.hasAttribute('data-number-counter')) {
                    const target = entry.target.getAttribute('data-number-counter');
                    const duration = parseInt(entry.target.getAttribute('data-duration')) || 2000;
                    new NumberCounter(entry.target, target, duration);
                }
                
                if (entry.target.hasAttribute('data-typewriter')) {
                    const text = entry.target.getAttribute('data-typewriter');
                    const speed = parseInt(entry.target.getAttribute('data-speed')) || 100;
                    new TypewriterEffect(entry.target, text, speed);
                }
            }
        });
    }
}

// Globe CSS Animation (simplified 3D globe)
class SimpleGlobe {
    constructor(container) {
        this.container = container;
        this.createGlobe();
    }
    
    createGlobe() {
        this.container.innerHTML = `
            <div class="simple-globe">
                <div class="globe-sphere">
                    <div class="globe-continents">
                        <div class="continent" style="top: 20%; left: 30%;"></div>
                        <div class="continent" style="top: 40%; left: 60%;"></div>
                        <div class="continent" style="top: 60%; left: 15%;"></div>
                        <div class="continent" style="top: 35%; left: 75%;"></div>
                    </div>
                    <div class="globe-connections">
                        ${this.generateConnections()}
                    </div>
                </div>
                <div class="globe-glow"></div>
            </div>
        `;
        
        this.injectStyles();
    }
    
    generateConnections() {
        let connections = '';
        for (let i = 0; i < 6; i++) {
            const delay = i * 0.5;
            connections += `<div class="connection" style="animation-delay: ${delay}s;"></div>`;
        }
        return connections;
    }
    
    injectStyles() {
        if (document.getElementById('globe-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'globe-styles';
        style.textContent = `
            .simple-globe {
                position: relative;
                width: 200px;
                height: 200px;
                margin: 0 auto;
            }
            
            .globe-sphere {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                position: relative;
                overflow: hidden;
                animation: globe-rotate 20s linear infinite;
                box-shadow: 
                    inset -20px -20px 50px rgba(0,0,0,0.5),
                    0 0 50px rgba(132, 254, 142, 0.3);
            }
            
            .globe-glow {
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(132, 254, 142, 0.1) 0%, transparent 70%);
                animation: globe-pulse 3s ease-in-out infinite;
            }
            
            .globe-continents {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            
            .continent {
                position: absolute;
                width: 20px;
                height: 15px;
                background: rgba(132, 254, 142, 0.6);
                border-radius: 50% 30% 50% 30%;
                animation: continent-fade 4s ease-in-out infinite;
            }
            
            .globe-connections {
                position: absolute;
                width: 100%;
                height: 100%;
            }
            
            .connection {
                position: absolute;
                width: 2px;
                height: 40px;
                background: linear-gradient(to bottom, transparent, #84fe8e, transparent);
                border-radius: 1px;
                animation: connection-pulse 3s ease-in-out infinite;
                transform-origin: bottom center;
            }
            
            .connection:nth-child(1) { top: 20%; left: 30%; transform: rotate(15deg); }
            .connection:nth-child(2) { top: 40%; right: 20%; transform: rotate(-25deg); }
            .connection:nth-child(3) { bottom: 30%; left: 20%; transform: rotate(45deg); }
            .connection:nth-child(4) { top: 50%; left: 50%; transform: rotate(-15deg); }
            .connection:nth-child(5) { top: 30%; right: 30%; transform: rotate(35deg); }
            .connection:nth-child(6) { bottom: 20%; right: 40%; transform: rotate(-45deg); }
            
            @keyframes globe-rotate {
                0% { transform: rotateY(0deg); }
                100% { transform: rotateY(360deg); }
            }
            
            @keyframes globe-pulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.6; }
            }
            
            @keyframes continent-fade {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
            
            @keyframes connection-pulse {
                0%, 100% { opacity: 0; transform: scaleY(0); }
                50% { opacity: 1; transform: scaleY(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation observer
    new AnimationObserver();
    
    // Initialize globes
    document.querySelectorAll('[data-globe]').forEach(container => {
        new SimpleGlobe(container);
    });
    
    console.log('✨ Animated elements initialized');
});

// Export for manual use
window.FlipWords = FlipWords;
window.NumberCounter = NumberCounter;
window.TypewriterEffect = TypewriterEffect;
window.SimpleGlobe = SimpleGlobe;