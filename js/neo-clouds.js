/**
 * Neo Clouds Animation System
 * Advanced WebGL-based cloud animation using Three.js
 * Designed for premium portfolio experience
 */

class NeoCloudsSystem {
    constructor() {
        this.initialized = false;
        this.scenes = {
            background: null,
            overlay: null
        };
        this.renderers = {};
        this.cameras = {};
        this.cloudGroups = {};
        this.animationId = null;
        
        // Configuration
        this.config = {
            performance: {
                maxClouds: this.getMaxClouds(),
                targetFPS: 60,
                enableBloom: true,
                enableParticles: true
            },
            animation: {
                backgroundSpeed: 0.003,
                overlaySpeed: 0.001,
                rotationSpeed: 0.001,
                pulseSpeed: 0.002,
                driftDistance: 200
            },
            visual: {
                backgroundOpacity: 0.8,
                overlayOpacity: 0.15,
                glowIntensity: 1.2,
                colors: {
                    primary: '#84FE8E',
                    secondary: '#3B82F6', 
                    accent: '#8B5CF6',
                    glow: '#10B981'
                }
            }
        };
        
        this.cloudVariations = [
            { size: 0.6, color: this.config.visual.colors.primary, opacity: 1.0 },
            { size: 1.0, color: this.config.visual.colors.secondary, opacity: 0.8 },
            { size: 1.4, color: this.config.visual.colors.accent, opacity: 0.6 },
            { size: 0.8, color: this.config.visual.colors.glow, opacity: 0.9 }
        ];
        
        this.loadAssets();
    }
    
    getMaxClouds() {
        // Performance-based cloud count
        const isMobile = window.innerWidth < 768;
        const isLowEnd = navigator.hardwareConcurrency < 4;
        
        if (isMobile) return 3;
        if (isLowEnd) return 5;
        return 8;
    }
    
    async loadAssets() {
        try {
            // Load Three.js if not already loaded
            if (typeof THREE === 'undefined') {
                await this.loadThreeJS();
            }
            
            // Convert cloud image to texture
            await this.createCloudTexture();
            
            this.init();
        } catch (error) {
            console.warn('Neo Clouds: Falling back to CSS animation', error);
            this.fallbackToCSS();
        }
    }
    
    async loadThreeJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    async createCloudTexture() {
        // Wait for ProceduralCloudGenerator to be available
        if (typeof ProceduralCloudGenerator === 'undefined') {
            console.log('⏳ Waiting for ProceduralCloudGenerator...');
            await this.waitForGenerator();
        }
        
        // Use procedural cloud generation
        this.proceduralGenerator = new ProceduralCloudGenerator();
        this.cloudTextures = this.proceduralGenerator.getAllTextures();
        
        console.log('✨ Procedural clouds generated:', this.cloudTextures.length);
        
        // Also try to load your original cloud image as fallback
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                this.originalCloudTexture = new THREE.CanvasTexture(canvas);
                this.originalCloudTexture.generateMipmaps = false;
                this.originalCloudTexture.wrapS = THREE.ClampToEdgeWrapping;
                this.originalCloudTexture.wrapT = THREE.ClampToEdgeWrapping;
                
                resolve();
            };
            
            img.onerror = () => {
                // If original image fails to load, just use procedural
                console.log('Using procedural clouds only');
                resolve();
            };
            
            // Try to load your original cloud image
            img.src = '../personal_material/main_cloude.jpg';
        });
    }
    
    async waitForGenerator() {
        return new Promise((resolve) => {
            const checkGenerator = () => {
                if (typeof ProceduralCloudGenerator !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkGenerator, 50);
                }
            };
            checkGenerator();
        });
    }
    
    init() {
        if (this.initialized) return;
        
        this.createCanvases();
        this.setupScenes();
        this.createClouds();
        this.startAnimation();
        this.setupEventListeners();
        
        this.initialized = true;
        console.log('✨ Neo Clouds System initialized');
    }
    
    createCanvases() {
        // Create container
        const container = document.createElement('div');
        container.className = 'neo-clouds-container';
        container.innerHTML = `
            <canvas id="neo-clouds-background" class="neo-clouds-layer neo-clouds-background"></canvas>
            <canvas id="neo-clouds-overlay" class="neo-clouds-layer neo-clouds-overlay"></canvas>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(container, document.body.firstChild);
        
        // Add CSS
        this.injectCSS();
    }
    
    injectCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .neo-clouds-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            }
            
            .neo-clouds-layer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            
            .neo-clouds-background {
                z-index: 1;
                opacity: 0.8;
            }
            
            .neo-clouds-overlay {
                z-index: 1000;
                opacity: 0.15;
                mix-blend-mode: screen;
                backdrop-filter: blur(0.5px);
            }
            
            /* Ensure content layers are above background clouds */
            main, section, .project-card, .skill-card {
                position: relative;
                z-index: 500;
            }
            
            /* Performance optimizations */
            .neo-clouds-layer {
                will-change: transform;
                transform: translateZ(0);
            }
            
            /* Mobile fallback */
            @media (max-width: 768px) {
                .neo-clouds-overlay {
                    display: none;
                }
                .neo-clouds-background {
                    opacity: 0.4;
                }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .neo-clouds-layer {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupScenes() {
        ['background', 'overlay'].forEach(type => {
            const canvas = document.getElementById(`neo-clouds-${type}`);
            
            // Scene
            this.scenes[type] = new THREE.Scene();
            
            // Camera
            this.cameras[type] = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.1, 
                2000
            );
            this.cameras[type].position.z = 500;
            
            // Renderer
            this.renderers[type] = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: window.devicePixelRatio < 2,
                powerPreference: 'high-performance'
            });
            
            this.renderers[type].setSize(window.innerWidth, window.innerHeight);
            this.renderers[type].setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Cloud group
            this.cloudGroups[type] = new THREE.Group();
            this.scenes[type].add(this.cloudGroups[type]);
        });
    }
    
    createClouds() {
        // Strategic clouds will be created by the StrategicCloudPlacer
        // This method is overridden after initialization
        console.log('🌟 Strategic cloud placement will handle cloud creation');
    }
    
    createCloud(type, index) {
        const variation = this.cloudVariations[index % this.cloudVariations.length];
        const isOverlay = type === 'overlay';
        
        // Create cloud material
        const material = new THREE.MeshBasicMaterial({
            map: this.cloudTexture,
            transparent: true,
            opacity: isOverlay ? this.config.visual.overlayOpacity : this.config.visual.backgroundOpacity * variation.opacity,
            color: new THREE.Color(variation.color),
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        // Create cloud geometry (plane)
        const geometry = new THREE.PlaneGeometry(200 * variation.size, 120 * variation.size);
        const cloud = new THREE.Mesh(geometry, material);
        
        // Random positioning
        cloud.position.x = (Math.random() - 0.5) * 2000;
        cloud.position.y = (Math.random() - 0.5) * 1000;
        cloud.position.z = (Math.random() - 0.5) * 500;
        
        // Animation properties
        cloud.userData = {
            originalX: cloud.position.x,
            originalY: cloud.position.y,
            speed: 0.5 + Math.random() * 1.5,
            rotationSpeed: (Math.random() - 0.5) * 0.002,
            pulsePhase: Math.random() * Math.PI * 2,
            driftAmplitude: 50 + Math.random() * 100,
            type: type
        };
        
        this.cloudGroups[type].add(cloud);
    }
    
    startAnimation() {
        const animate = (timestamp) => {
            this.animationId = requestAnimationFrame(animate);
            
            this.updateClouds(timestamp);
            this.render();
        };
        
        animate();
    }
    
    updateClouds(timestamp) {
        const time = timestamp * 0.001; // Convert to seconds
        
        ['background', 'overlay'].forEach(type => {
            this.cloudGroups[type].children.forEach(cloud => {
                const userData = cloud.userData;
                const baseSpeed = type === 'background' ? 
                    this.config.animation.backgroundSpeed : 
                    this.config.animation.overlaySpeed;
                
                // Horizontal drift
                cloud.position.x += userData.speed * baseSpeed * 60;
                
                // Vertical floating
                cloud.position.y = userData.originalY + 
                    Math.sin(time * 0.5 + userData.pulsePhase) * userData.driftAmplitude;
                
                // Rotation
                cloud.rotation.z += userData.rotationSpeed;
                
                // Scale breathing
                const breathe = 1 + Math.sin(time * this.config.animation.pulseSpeed + userData.pulsePhase) * 0.1;
                cloud.scale.setScalar(breathe);
                
                // Wrap around screen
                if (cloud.position.x > window.innerWidth + 300) {
                    cloud.position.x = -300;
                    cloud.position.y = (Math.random() - 0.5) * window.innerHeight;
                }
            });
        });
    }
    
    render() {
        Object.keys(this.renderers).forEach(type => {
            this.renderers[type].render(this.scenes[type], this.cameras[type]);
        });
    }
    
    setupEventListeners() {
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Mouse parallax (subtle)
        this.setupMouseParallax();
    }
    
    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        Object.keys(this.cameras).forEach(type => {
            this.cameras[type].aspect = width / height;
            this.cameras[type].updateProjectionMatrix();
            this.renderers[type].setSize(width, height);
        });
    }
    
    setupPerformanceMonitoring() {
        // Simple FPS monitoring
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust quality based on performance
                if (fps < 30 && this.config.performance.maxClouds > 3) {
                    this.reduceClouds();
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        checkPerformance();
    }
    
    setupMouseParallax() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0001;
        });
        
        // Apply parallax in animation loop
        const applyParallax = () => {
            if (this.cloudGroups.background) {
                this.cloudGroups.background.rotation.x = mouseY;
                this.cloudGroups.background.rotation.y = mouseX;
            }
            
            requestAnimationFrame(applyParallax);
        };
        
        applyParallax();
    }
    
    reduceClouds() {
        ['background', 'overlay'].forEach(type => {
            const group = this.cloudGroups[type];
            if (group.children.length > 2) {
                group.remove(group.children[group.children.length - 1]);
            }
        });
        
        this.config.performance.maxClouds = Math.max(3, this.config.performance.maxClouds - 1);
        console.log('Neo Clouds: Reduced cloud count for performance');
    }
    
    fallbackToCSS() {
        // CSS-only fallback for weak devices
        const style = document.createElement('style');
        style.textContent = `
            .neo-clouds-fallback {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 20% 30%, rgba(132, 254, 142, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
                animation: neo-clouds-drift 60s ease-in-out infinite;
                pointer-events: none;
                z-index: 1;
            }
            
            @keyframes neo-clouds-drift {
                0%, 100% { transform: translateX(0) translateY(0); }
                25% { transform: translateX(20px) translateY(-10px); }
                50% { transform: translateX(-10px) translateY(20px); }
                75% { transform: translateX(15px) translateY(5px); }
            }
        `;
        document.head.appendChild(style);
        
        const fallback = document.createElement('div');
        fallback.className = 'neo-clouds-fallback';
        document.body.insertBefore(fallback, document.body.firstChild);
    }
    
    // Public methods
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (!this.animationId && this.initialized) {
            this.startAnimation();
        }
    }
    
    destroy() {
        this.pause();
        
        // Clean up Three.js objects
        Object.keys(this.renderers).forEach(type => {
            this.renderers[type].dispose();
        });
        
        // Remove DOM elements
        const container = document.querySelector('.neo-clouds-container');
        if (container) {
            container.remove();
        }
        
        this.initialized = false;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the main portfolio page
    if (document.querySelector('main') || document.querySelector('.portfolio')) {
        window.neoClouds = new NeoCloudsSystem();
    }
});

// Export for manual initialization
window.NeoCloudsSystem = NeoCloudsSystem;