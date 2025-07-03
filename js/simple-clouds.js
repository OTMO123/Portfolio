/**
 * Simple Strategic Cloud System
 * Uses your original cloud artwork with strategic placement
 */

class SimpleStrategicClouds {
    constructor() {
        this.initialized = false;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clouds = [];
        this.animationId = null;
        
        // Strategic positions from your design - fewer clouds, more visible
        this.cloudPositions = [
            { x: 0.15, y: 0.3, size: 1.5, depth: -50, opacity: 1.0, name: 'heroLeft' },
            { x: 0.85, y: 0.6, size: 1.8, depth: 50, opacity: 1.0, name: 'heroRight' },
            { x: 0.25, y: 0.7, size: 1.2, depth: -30, opacity: 1.0, name: 'cardFloat1' }
        ];
        
        this.init();
    }
    
    async init() {
        try {
            // Load Three.js if needed
            if (typeof THREE === 'undefined') {
                await this.loadThreeJS();
            }
            
            // Load your cloud texture
            const cloudTexture = await this.loadCloudTexture();
            
            // Setup Three.js scene
            this.setupScene();
            
            // Create clouds
            this.createClouds(cloudTexture);
            
            // Start animation
            this.startAnimation();
            
            // Setup events
            this.setupEvents();
            
            this.initialized = true;
            console.log('✨ Simple Strategic Clouds initialized');
            
        } catch (error) {
            console.error('Failed to initialize clouds:', error);
            this.fallbackToCSS();
        }
    }
    
    async loadThreeJS() {
        return new Promise((resolve, reject) => {
            if (typeof THREE !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    async loadCloudTexture() {
        return new Promise((resolve, reject) => {
            // First try to load the image directly
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                console.log('✅ Image loaded directly, creating texture');
                
                // Create canvas and draw the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Create Three.js texture from canvas
                const texture = new THREE.CanvasTexture(canvas);
                texture.generateMipmaps = false;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                console.log('✅ Canvas texture created successfully');
                resolve(texture);
            };
            
            img.onerror = (error) => {
                console.error('Failed to load image:', error);
                reject(error);
            };
            
            img.src = 'main_cloude.jpg';
        });
    }
    
    setupScene() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'strategic-clouds-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);
        
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 500;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Ensure content is above clouds
        this.injectCSS();
    }
    
    injectCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ensure content layers are above clouds */
            main, section, .project-card, .skill-card, .demo-card, .hero-card {
                position: relative;
                z-index: 500;
            }
            
            /* Navigation and controls stay on top */
            .nav-bar, .controls-panel, .info-panel {
                z-index: 1001;
            }
        `;
        document.head.appendChild(style);
    }
    
    createClouds(texture) {
        this.cloudPositions.forEach((pos, index) => {
            const cloud = this.createCloud(texture, pos, index);
            this.clouds.push(cloud);
            this.scene.add(cloud);
        });
    }
    
    createCloud(texture, position, index) {
        // Create material - completely opaque
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: false,
            opacity: 1.0,
            blending: THREE.NormalBlending,
            depthWrite: true,
            side: THREE.FrontSide
        });
        
        // Create geometry
        const size = 200 * position.size;
        const geometry = new THREE.PlaneGeometry(size, size * 0.6);
        
        // Create mesh
        const cloud = new THREE.Mesh(geometry, material);
        
        // Position
        cloud.position.x = (position.x - 0.5) * window.innerWidth;
        cloud.position.y = (0.5 - position.y) * window.innerHeight;
        cloud.position.z = position.depth;
        
        // Animation data
        cloud.userData = {
            originalX: cloud.position.x,
            originalY: cloud.position.y,
            originalZ: cloud.position.z,
            floatSpeed: 0.5 + Math.random() * 1.0,
            floatAmplitude: 30 + Math.random() * 40,
            rotationSpeed: (Math.random() - 0.5) * 0.001,
            pulsePhase: Math.random() * Math.PI * 2,
            name: position.name,
            isOverlay: position.depth > 0
        };
        
        return cloud;
    }
    
    startAnimation() {
        const animate = (timestamp) => {
            this.animationId = requestAnimationFrame(animate);
            this.updateClouds(timestamp);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
    
    updateClouds(timestamp) {
        const time = timestamp * 0.001;
        
        this.clouds.forEach(cloud => {
            const userData = cloud.userData;
            
            // Organic floating motion
            const floatX = Math.sin(time * userData.floatSpeed * 0.3) * userData.floatAmplitude;
            const floatY = Math.cos(time * userData.floatSpeed * 0.5) * userData.floatAmplitude * 0.7;
            
            cloud.position.x = userData.originalX + floatX;
            cloud.position.y = userData.originalY + floatY;
            
            // Gentle rotation
            cloud.rotation.z += userData.rotationSpeed;
            
            // Breathing scale
            const breathe = 1 + Math.sin(time * 0.8 + userData.pulsePhase) * 0.05;
            cloud.scale.setScalar(breathe);
            
            // Overlay effects - no opacity changes
            if (userData.isOverlay) {
                cloud.position.z = userData.originalZ + Math.sin(time * 0.3) * 10;
            }
        });
    }
    
    setupEvents() {
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Mouse parallax
        this.setupMouseParallax();
    }
    
    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update cloud positions
        this.clouds.forEach((cloud, index) => {
            const pos = this.cloudPositions[index];
            cloud.userData.originalX = (pos.x - 0.5) * window.innerWidth;
            cloud.userData.originalY = (0.5 - pos.y) * window.innerHeight;
        });
    }
    
    setupMouseParallax() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0001;
            
            this.clouds.forEach(cloud => {
                const strength = cloud.userData.isOverlay ? 20 : 10;
                cloud.position.x += mouseX * strength;
                cloud.position.y -= mouseY * strength;
            });
        });
    }
    
    fallbackToCSS() {
        console.log('🔄 Falling back to CSS clouds');
        
        const style = document.createElement('style');
        style.textContent = `
            .css-cloud-fallback {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: 
                    radial-gradient(circle at 15% 30%, rgba(132, 254, 142, 0.3) 0%, transparent 20%),
                    radial-gradient(circle at 85% 60%, rgba(132, 254, 142, 0.2) 0%, transparent 25%),
                    radial-gradient(circle at 65% 15%, rgba(132, 254, 142, 0.15) 0%, transparent 15%),
                    radial-gradient(circle at 25% 70%, rgba(132, 254, 142, 0.25) 0%, transparent 20%),
                    radial-gradient(circle at 75% 45%, rgba(132, 254, 142, 0.2) 0%, transparent 18%);
                animation: cloud-drift 60s ease-in-out infinite;
                pointer-events: none;
                z-index: 1;
            }
            
            @keyframes cloud-drift {
                0%, 100% { transform: translateX(0) translateY(0); }
                25% { transform: translateX(20px) translateY(-15px); }
                50% { transform: translateX(-15px) translateY(25px); }
                75% { transform: translateX(10px) translateY(5px); }
            }
        `;
        document.head.appendChild(style);
        
        const fallback = document.createElement('div');
        fallback.className = 'css-cloud-fallback';
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
    
    updateOpacity(backgroundOpacity, overlayOpacity) {
        this.clouds.forEach(cloud => {
            const originalOpacity = this.cloudPositions.find(p => p.name === cloud.userData.name).opacity;
            if (cloud.userData.isOverlay) {
                cloud.material.opacity = originalOpacity * overlayOpacity;
            } else {
                cloud.material.opacity = originalOpacity * backgroundOpacity;
            }
        });
    }
    
    destroy() {
        this.pause();
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        const canvas = document.getElementById('strategic-clouds-canvas');
        if (canvas) {
            canvas.remove();
        }
        
        this.initialized = false;
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.simpleClouds = new SimpleStrategicClouds();
});

// Export
window.SimpleStrategicClouds = SimpleStrategicClouds;