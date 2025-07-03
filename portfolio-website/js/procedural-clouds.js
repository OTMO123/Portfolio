/**
 * Procedural Neo Cloud Generator
 * Professional-grade cloud generation mimicking your artistic style
 * Created by AI as a professional animator and designer
 */

class ProceduralCloudGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cloudTextures = new Map();
        this.cloudVariations = [];
        
        // Professional animation parameters based on your design
        this.designParams = {
            // Your neo style characteristics
            strokeWidth: 2.5,
            glowIntensity: 8,
            concentricLayers: 15,
            organicVariation: 0.3,
            neonColors: [
                '#84FE8E', // Primary cyan-green
                '#40E0D0', // Turquoise
                '#00CED1', // Dark turquoise  
                '#20B2AA', // Light sea green
                '#48D1CC'  // Medium turquoise
            ]
        };
        
        this.createCloudVariations();
    }
    
    createCloudVariations() {
        // Generate 8 unique cloud variations in your style
        const variations = [
            { size: 'small', complexity: 'simple', shape: 'round' },
            { size: 'medium', complexity: 'detailed', shape: 'oval' },
            { size: 'large', complexity: 'complex', shape: 'irregular' },
            { size: 'small', complexity: 'detailed', shape: 'wispy' },
            { size: 'medium', complexity: 'simple', shape: 'round' },
            { size: 'large', complexity: 'detailed', shape: 'oval' },
            { size: 'small', complexity: 'complex', shape: 'irregular' },
            { size: 'medium', complexity: 'detailed', shape: 'wispy' }
        ];
        
        variations.forEach((variation, index) => {
            const cloudTexture = this.generateCloudTexture(variation, index);
            this.cloudVariations.push({
                texture: cloudTexture,
                variation: variation,
                id: `neo-cloud-${index}`
            });
        });
    }
    
    generateCloudTexture(variation, seed) {
        // Set canvas size based on cloud size
        const sizes = {
            small: { width: 300, height: 180 },
            medium: { width: 500, height: 300 },
            large: { width: 700, height: 420 }
        };
        
        const size = sizes[variation.size];
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set random seed for consistent generation
        Math.seedrandom = this.createSeededRandom(seed);
        
        // Generate cloud shape based on your concentric design
        this.drawNeoConcentric(variation, size);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(this.canvas);
        texture.generateMipmaps = false;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.transparent = true;
        
        return texture;
    }
    
    drawNeoConcentric(variation, size) {
        const centerX = size.width / 2;
        const centerY = size.height / 2;
        const maxRadius = Math.min(size.width, size.height) * 0.4;
        
        // Choose color based on variation
        const colorIndex = Math.floor(Math.random() * this.designParams.neonColors.length);
        const baseColor = this.designParams.neonColors[colorIndex];
        
        // Set up glow effect
        this.ctx.shadowColor = baseColor;
        this.ctx.shadowBlur = this.designParams.glowIntensity;
        
        // Draw concentric layers like in your original art
        for (let layer = this.designParams.concentricLayers; layer > 0; layer--) {
            const radiusRatio = layer / this.designParams.concentricLayers;
            const currentRadius = maxRadius * radiusRatio;
            
            // Calculate organic variation for each layer
            const points = this.generateOrganicPoints(
                centerX, centerY, currentRadius, variation, layer
            );
            
            // Set stroke properties
            this.ctx.strokeStyle = baseColor;
            this.ctx.lineWidth = this.designParams.strokeWidth * (radiusRatio * 0.5 + 0.5);
            this.ctx.globalAlpha = radiusRatio * 0.8 + 0.2;
            
            // Draw the organic shape
            this.drawOrganicShape(points);
        }
        
        // Add floating particles around the cloud
        this.addFloatingParticles(centerX, centerY, maxRadius, baseColor);
        
        // Reset context
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
    }
    
    generateOrganicPoints(centerX, centerY, radius, variation, layer) {
        const points = [];
        const numPoints = 32; // Smooth curve
        const organicFactor = this.designParams.organicVariation * (Math.random() * 0.5 + 0.5);
        
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            
            // Base cloud shape variations
            let shapeMultiplier = 1;
            switch (variation.shape) {
                case 'oval':
                    shapeMultiplier = 1 + 0.3 * Math.cos(angle * 2);
                    break;
                case 'irregular':
                    shapeMultiplier = 1 + 0.4 * Math.sin(angle * 3) + 0.2 * Math.cos(angle * 5);
                    break;
                case 'wispy':
                    shapeMultiplier = 1 + 0.5 * Math.sin(angle * 1.5) * Math.cos(angle * 2.5);
                    break;
                default: // round
                    shapeMultiplier = 1 + 0.1 * Math.sin(angle * 4);
            }
            
            // Add layer-specific detail
            const layerDetail = 0.1 * Math.sin(angle * layer) * organicFactor;
            
            // Add noise for organic feel
            const noise = (Math.random() - 0.5) * organicFactor * 0.3;
            
            const finalRadius = radius * (shapeMultiplier + layerDetail + noise);
            
            points.push({
                x: centerX + Math.cos(angle) * finalRadius,
                y: centerY + Math.sin(angle) * finalRadius
            });
        }
        
        return points;
    }
    
    drawOrganicShape(points) {
        if (points.length < 3) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        
        // Use smooth curves between points
        for (let i = 0; i < points.length; i++) {
            const current = points[i];
            const next = points[(i + 1) % points.length];
            const control1 = points[(i + points.length - 1) % points.length];
            const control2 = next;
            
            // Calculate smooth curve control points
            const cpX = current.x + (next.x - control1.x) * 0.2;
            const cpY = current.y + (next.y - control1.y) * 0.2;
            
            this.ctx.quadraticCurveTo(cpX, cpY, next.x, next.y);
        }
        
        this.ctx.closePath();
        this.ctx.stroke();
    }
    
    addFloatingParticles(centerX, centerY, maxRadius, color) {
        const particleCount = 8 + Math.floor(Math.random() * 12);
        
        for (let i = 0; i < particleCount; i++) {
            // Position particles around the cloud
            const angle = Math.random() * Math.PI * 2;
            const distance = maxRadius + Math.random() * 100;
            const size = 3 + Math.random() * 8;
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Draw particle with glow
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size;
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.6 + Math.random() * 0.4;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    createSeededRandom(seed) {
        // Simple seeded random for consistent generation
        let x = Math.sin(seed) * 10000;
        Math.random = () => {
            x = Math.sin(x) * 10000;
            return x - Math.floor(x);
        };
    }
    
    getCloudTexture(index) {
        return this.cloudVariations[index % this.cloudVariations.length].texture;
    }
    
    getAllTextures() {
        return this.cloudVariations.map(v => v.texture);
    }
}

/**
 * Strategic Cloud Placement System
 * Professional layout based on your design mockup
 */

class StrategicCloudPlacer {
    constructor(neoCloudSystem) {
        this.neoCloudSystem = neoCloudSystem;
        this.cloudGenerator = new ProceduralCloudGenerator();
        this.placements = [];
        
        // Strategic placement zones based on your design
        this.zones = {
            heroLeft: { x: 0.15, y: 0.3, depth: 'behind', size: 'medium' },
            heroRight: { x: 0.85, y: 0.6, depth: 'overlay', size: 'large' },
            headerFloat: { x: 0.65, y: 0.15, depth: 'overlay', size: 'small' },
            cardFloat1: { x: 0.25, y: 0.7, depth: 'behind', size: 'medium' },
            cardFloat2: { x: 0.75, y: 0.45, depth: 'overlay', size: 'small' },
            bottomLeft: { x: 0.1, y: 0.85, depth: 'behind', size: 'large' },
            topRight: { x: 0.9, y: 0.1, depth: 'behind', size: 'medium' },
            centerFloat: { x: 0.5, y: 0.5, depth: 'overlay', size: 'small' }
        };
        
        this.createStrategicPlacements();
        console.log('🎯 Strategic placements created:', this.placements.length);
    }
    
    createStrategicPlacements() {
        Object.entries(this.zones).forEach(([zoneName, zone], index) => {
            this.createZoneCloud(zone, index, zoneName);
        });
    }
    
    createZoneCloud(zone, textureIndex, zoneName) {
        const texture = this.cloudGenerator.getCloudTexture(textureIndex);
        
        // Size mapping
        const sizeMultipliers = {
            small: 0.6,
            medium: 1.0,
            large: 1.4
        };
        
        const baseSize = 200;
        const size = baseSize * sizeMultipliers[zone.size];
        
        // Create material with appropriate opacity for depth
        const isOverlay = zone.depth === 'overlay';
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: isOverlay ? 0.25 : 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });
        
        // Create geometry
        const geometry = new THREE.PlaneGeometry(size, size * 0.6);
        const cloud = new THREE.Mesh(geometry, material);
        
        // Position cloud
        cloud.position.x = (zone.x - 0.5) * window.innerWidth;
        cloud.position.y = (0.5 - zone.y) * window.innerHeight;
        cloud.position.z = isOverlay ? 100 : -100;
        
        // Animation properties
        cloud.userData = {
            zone: zoneName,
            originalX: cloud.position.x,
            originalY: cloud.position.y,
            floatSpeed: 0.5 + Math.random() * 1.0,
            floatAmplitude: 30 + Math.random() * 50,
            rotationSpeed: (Math.random() - 0.5) * 0.001,
            pulsePhase: Math.random() * Math.PI * 2,
            isOverlay: isOverlay,
            depth: zone.depth
        };
        
        // Add to appropriate scene
        const targetScene = isOverlay ? 'overlay' : 'background';
        if (this.neoCloudSystem.scenes[targetScene] && this.neoCloudSystem.cloudGroups[targetScene]) {
            this.neoCloudSystem.cloudGroups[targetScene].add(cloud);
            console.log(`☁️ Added ${zoneName} cloud to ${targetScene} scene`);
        } else {
            console.error(`❌ Scene ${targetScene} not available for ${zoneName}`);
        }
        
        this.placements.push({
            cloud: cloud,
            zone: zone,
            name: zoneName
        });
    }
    
    updateStrategicClouds(timestamp) {
        const time = timestamp * 0.001;
        
        this.placements.forEach(placement => {
            const cloud = placement.cloud;
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
            
            // Overlay clouds have additional effects
            if (userData.isOverlay) {
                // Gentle opacity pulsing for overlay clouds
                const opacityPulse = 1 + Math.sin(time * 1.2 + userData.pulsePhase) * 0.3;
                cloud.material.opacity = 0.25 * opacityPulse;
                
                // Additional drift for overlay
                cloud.position.z = 100 + Math.sin(time * 0.3) * 20;
            }
        });
    }
    
    // Responsive adjustment
    handleResize() {
        this.placements.forEach(placement => {
            const cloud = placement.cloud;
            const zone = placement.zone;
            
            cloud.userData.originalX = (zone.x - 0.5) * window.innerWidth;
            cloud.userData.originalY = (0.5 - zone.y) * window.innerHeight;
        });
    }
    
    // Interactive effects
    addMouseParallax(mouseX, mouseY) {
        const normalizedX = (mouseX / window.innerWidth - 0.5) * 2;
        const normalizedY = (mouseY / window.innerHeight - 0.5) * 2;
        
        this.placements.forEach(placement => {
            const cloud = placement.cloud;
            const parallaxStrength = cloud.userData.isOverlay ? 15 : 8;
            
            cloud.position.x += normalizedX * parallaxStrength;
            cloud.position.y -= normalizedY * parallaxStrength;
        });
    }
}

// Extend the existing Neo Clouds System
const extendNeoClouds = () => {
    if (typeof NeoCloudsSystem === 'undefined') {
        setTimeout(extendNeoClouds, 100);
        return;
    }
    
    const originalInit = NeoCloudsSystem.prototype.init;
    
    NeoCloudsSystem.prototype.init = function() {
        // Call original init
        originalInit.call(this);
        
        // Add strategic cloud placer after setup is complete
        setTimeout(() => {
            this.strategicPlacer = new StrategicCloudPlacer(this);
            console.log('🎨 Strategic cloud placement initialized');
        }, 100);
    };
    
    NeoCloudsSystem.prototype.createStrategicClouds = function() {
        // Clear existing clouds
        ['background', 'overlay'].forEach(type => {
            if (this.cloudGroups[type]) {
                // Properly clear Three.js group
                while(this.cloudGroups[type].children.length > 0) {
                    this.cloudGroups[type].remove(this.cloudGroups[type].children[0]);
                }
            }
        });
        
        // Strategic placer will handle cloud creation
        // in the constructor above
    };
    
    const originalUpdate = NeoCloudsSystem.prototype.updateClouds;
    
    NeoCloudsSystem.prototype.updateClouds = function(timestamp) {
        // Update strategic clouds
        if (this.strategicPlacer) {
            this.strategicPlacer.updateStrategicClouds(timestamp);
        }
        
        // Call original update for any additional effects
        // originalUpdate.call(this, timestamp);
    };
    
    const originalResize = NeoCloudsSystem.prototype.handleResize;
    
    NeoCloudsSystem.prototype.handleResize = function() {
        originalResize.call(this);
        
        if (this.strategicPlacer) {
            this.strategicPlacer.handleResize();
        }
    };
    
    // Add mouse parallax
    NeoCloudsSystem.prototype.setupMouseParallax = function() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (this.strategicPlacer) {
                this.strategicPlacer.addMouseParallax(mouseX, mouseY);
            }
        });
    };
};

// Initialize extension
extendNeoClouds();

// Export for use
window.ProceduralCloudGenerator = ProceduralCloudGenerator;
window.StrategicCloudPlacer = StrategicCloudPlacer;