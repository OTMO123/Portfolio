/**
 * Glowing Cards Effect
 * CSS-based glowing hover effect for project cards
 */

class GlowingCards {
    constructor() {
        this.cards = [];
        this.init();
    }
    
    init() {
        // Find only project cards in the grid section (not featured projects)
        const projectCards = document.querySelectorAll('.grid .project-card');
        
        projectCards.forEach((card, index) => {
            this.wrapCardWithGlow(card, index);
        });
        
        // Setup mouse tracking
        this.setupMouseTracking();
        
        console.log(`✨ Initialized glowing effect for ${projectCards.length} cards`);
    }
    
    wrapCardWithGlow(originalCard, index) {
        // Create wrapper with glow effect
        const glowWrapper = document.createElement('div');
        glowWrapper.className = 'glow-card-wrapper';
        glowWrapper.style.cssText = `
            position: relative;
            border-radius: 24px;
            padding: 2px;
            background: linear-gradient(135deg, transparent, rgba(132, 254, 142, 0.1), transparent);
            transition: all 0.3s ease;
        `;
        
        // Create inner container
        const innerContainer = document.createElement('div');
        innerContainer.className = 'glow-card-inner';
        innerContainer.style.cssText = `
            position: relative;
            height: 100%;
            border-radius: 22px;
            overflow: hidden;
            background: var(--bg-card);
            border: 1px solid rgba(132, 254, 142, 0.1);
            transition: all 0.3s ease;
        `;
        
        // Create glow overlay
        const glowOverlay = document.createElement('div');
        glowOverlay.className = 'glow-overlay';
        glowOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            background: radial-gradient(
                600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(132, 254, 142, 0.15) 0%,
                rgba(132, 254, 142, 0.05) 40%,
                transparent 70%
            );
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        // Insert wrapper before original card
        originalCard.parentNode.insertBefore(glowWrapper, originalCard);
        
        // Move original card into the new structure
        innerContainer.appendChild(originalCard);
        innerContainer.appendChild(glowOverlay);
        glowWrapper.appendChild(innerContainer);
        
        // Remove original styling that might conflict
        originalCard.style.border = 'none';
        originalCard.style.borderRadius = '0';
        originalCard.style.background = 'transparent';
        
        // Store reference
        this.cards.push({
            wrapper: glowWrapper,
            inner: innerContainer,
            overlay: glowOverlay,
            original: originalCard
        });
        
        // Add hover effects
        this.addHoverEffects(glowWrapper, innerContainer, glowOverlay);
    }
    
    addHoverEffects(wrapper, inner, overlay) {
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.background = `
                linear-gradient(135deg, 
                    rgba(132, 254, 142, 0.2), 
                    rgba(132, 254, 142, 0.1), 
                    rgba(132, 254, 142, 0.2)
                )
            `;
            wrapper.style.transform = 'translateY(-4px)';
            wrapper.style.boxShadow = '0 20px 40px rgba(132, 254, 142, 0.1)';
            
            inner.style.borderColor = 'rgba(132, 254, 142, 0.3)';
            overlay.style.opacity = '1';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.background = `
                linear-gradient(135deg, transparent, rgba(132, 254, 142, 0.1), transparent)
            `;
            wrapper.style.transform = 'translateY(0)';
            wrapper.style.boxShadow = 'none';
            
            inner.style.borderColor = 'rgba(132, 254, 142, 0.1)';
            overlay.style.opacity = '0';
        });
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            overlay.style.setProperty('--mouse-x', `${x}%`);
            overlay.style.setProperty('--mouse-y', `${y}%`);
        });
    }
    
    setupMouseTracking() {
        // Global mouse tracking for enhanced effects
        document.addEventListener('mousemove', (e) => {
            this.cards.forEach(card => {
                const rect = card.wrapper.getBoundingClientRect();
                const isHovered = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                
                if (isHovered) {
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    // Update CSS custom properties for smooth tracking
                    card.overlay.style.setProperty('--mouse-x', `${x}%`);
                    card.overlay.style.setProperty('--mouse-y', `${y}%`);
                }
            });
        });
    }
    
    // Public method to add glow effect to new elements
    addGlowToElement(element) {
        const index = this.cards.length;
        this.wrapCardWithGlow(element, index);
    }
    
    // Public method to remove glow effects
    destroy() {
        this.cards.forEach(card => {
            const parent = card.wrapper.parentNode;
            parent.insertBefore(card.original, card.wrapper);
            parent.removeChild(card.wrapper);
        });
        this.cards = [];
    }
}

// Enhanced Modal System with Glowing Cards
class GlowingModal {
    constructor(modalId, triggerSelector) {
        this.modalId = modalId;
        this.modal = document.getElementById(modalId);
        this.triggers = document.querySelectorAll(triggerSelector);
        this.isOpen = false;
        
        if (this.modal) {
            this.init();
        }
    }
    
    init() {
        // Enhanced modal styling
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        // Enhanced modal content
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.cssText = `
                background: var(--bg-card);
                border-radius: 20px;
                padding: 0;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                border: 1px solid rgba(132, 254, 142, 0.2);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
            
            // Add glow effect to modal content
            this.addGlowToModal(modalContent);
        }
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    addGlowToModal(content) {
        // Create glow wrapper for modal
        const glowWrapper = document.createElement('div');
        glowWrapper.style.cssText = `
            position: relative;
            border-radius: 22px;
            padding: 2px;
            background: linear-gradient(135deg, 
                rgba(132, 254, 142, 0.3), 
                rgba(132, 254, 142, 0.1), 
                rgba(132, 254, 142, 0.3)
            );
        `;
        
        content.parentNode.insertBefore(glowWrapper, content);
        glowWrapper.appendChild(content);
        
        content.style.borderRadius = '20px';
        content.style.background = 'var(--bg-card)';
        content.style.border = 'none';
    }
    
    setupEventListeners() {
        // Open modal
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });
        
        // Close modal
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    open() {
        this.isOpen = true;
        this.modal.style.opacity = '1';
        this.modal.style.visibility = 'visible';
        
        const content = this.modal.querySelector('.modal-content');
        if (content) {
            setTimeout(() => {
                content.style.transform = 'scale(1)';
            }, 10);
        }
        
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.isOpen = false;
        
        const content = this.modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
        }
        
        setTimeout(() => {
            this.modal.style.opacity = '0';
            this.modal.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }, 100);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize glowing cards
    window.glowingCards = new GlowingCards();
    
    // Initialize glowing modals for existing project modals
    const modalIds = ['project1', 'project2', 'project3'];
    modalIds.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            new GlowingModal(id, `[onclick*="${id}"]`);
        }
    });
    
    console.log('✨ Glowing cards and modals initialized');
});

// Export for manual use
window.GlowingCards = GlowingCards;
window.GlowingModal = GlowingModal;