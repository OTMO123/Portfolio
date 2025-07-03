/**
 * Custom Particle System Extension for Neo Clouds
 * Ready for integration with custom particle assets
 */

class CustomParticleSystem {
    constructor(neoCloudsInstance) {
        this.neoClouds = neoCloudsInstance;
        this.particleGroups = {};
        this.particleTextures = {};
        this.isLoaded = false;
        
        this.config = {
            maxParticles: 50,
            emissionRate: 2, // particles per second
            particleLifetime: 10, // seconds
            speeds: {
                min: 0.5,
                max: 2.0
            },
            sizes: {
                min: 5,
                max: 20
            },
            opacity: {
                start: 0.8,
                end: 0.0
            }
        };
        
        this.particles = [];
        this.lastEmissionTime = 0;
    }
    
    async loadCustomParticles(particleAssets) {
        /*
         * particleAssets format:
         * [
         *   { name: 'spark', path: 'path/to/spark.png', type: 'trail' },
         *   { name: 'dust', path: 'path/to/dust.png', type: 'ambient' },
         *   { name: 'energy', path: 'path/to/energy.png', type: 'burst' }
         * ]
         */
        
        const loader = new THREE.TextureLoader();
        const loadPromises = particleAssets.map(asset => 
            new Promise((resolve, reject) => {
                loader.load(
                    asset.path,
                    (texture) => {
                        texture.generateMipmaps = false;
                        texture.wrapS = THREE.ClampToEdgeWrapping;
                        texture.wrapT = THREE.ClampToEdgeWrapping;
                        
                        this.particleTextures[asset.name] = {
                            texture: texture,
                            type: asset.type
                        };
                        resolve();
                    },
                    undefined,
                    reject
                );
            })
        );
        
        try {
            await Promise.all(loadPromises);
            this.createParticleGeometries();
            this.isLoaded = true;
            console.log('✨ Custom particles loaded:', Object.keys(this.particleTextures));
        } catch (error) {
            console.warn('Failed to load some particle assets:', error);
        }
    }
    
    createParticleGeometries() {
        Object.keys(this.particleTextures).forEach(name => {
            const particleData = this.particleTextures[name];
            
            // Create particle system for each type
            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                map: particleData.texture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                size: 10,
                sizeAttenuation: true,
                alphaTest: 0.1,
                depthWrite: false
            });
            
            // Initialize empty geometry (will be populated during animation)
            const positions = new Float32Array(this.config.maxParticles * 3);
            const opacities = new Float32Array(this.config.maxParticles);
            const sizes = new Float32Array(this.config.maxParticles);
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('alpha', new THREE.BufferAttribute(opacities, 1));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            
            const particleSystem = new THREE.Points(geometry, material);
            
            // Add to both background and overlay scenes
            if (this.neoClouds.scenes.background) {
                this.neoClouds.scenes.background.add(particleSystem.clone());
            }
            if (this.neoClouds.scenes.overlay) {
                const overlaySystem = particleSystem.clone();
                overlaySystem.material = material.clone();
                overlaySystem.material.opacity = 0.3;
                this.neoClouds.scenes.overlay.add(overlaySystem);
            }
            
            this.particleGroups[name] = {
                system: particleSystem,
                particles: [],
                type: particleData.type
            };
        });
    }
    
    createDefaultParticles() {
        // Fallback procedural particles when custom assets aren't loaded
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Create different particle types
        const particleTypes = [
            { name: 'glow', color: '#84FE8E', type: 'ambient' },
            { name: 'spark', color: '#3B82F6', type: 'trail' },
            { name: 'energy', color: '#8B5CF6', type: 'burst' }
        ];
        
        particleTypes.forEach(particle => {
            // Clear canvas
            ctx.clearRect(0, 0, 32, 32);
            
            // Create gradient particle
            const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.5, particle.color + '80');
            gradient.addColorStop(1, particle.color + '00');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 32);
            
            // Create texture
            const texture = new THREE.CanvasTexture(canvas);
            texture.generateMipmaps = false;
            
            this.particleTextures[particle.name] = {
                texture: texture,
                type: particle.type
            };
        });
        
        this.createParticleGeometries();
        this.isLoaded = true;
    }
    
    update(timestamp) {
        if (!this.isLoaded) return;
        
        const deltaTime = timestamp - this.lastEmissionTime;
        
        // Emit new particles
        if (deltaTime > 1000 / this.config.emissionRate) {
            this.emitParticle();
            this.lastEmissionTime = timestamp;
        }
        
        // Update existing particles
        this.updateParticles(timestamp);
    }
    
    emitParticle() {
        // Find clouds to emit particles from
        if (!this.neoClouds.cloudGroups.background) return;
        
        const clouds = this.neoClouds.cloudGroups.background.children;
        if (clouds.length === 0) return;
        
        const sourceCloud = clouds[Math.floor(Math.random() * clouds.length)];
        const particleType = Object.keys(this.particleTextures)[
            Math.floor(Math.random() * Object.keys(this.particleTextures).length)
        ];
        
        const particle = {
            position: sourceCloud.position.clone(),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * this.config.speeds.max,
                (Math.random() - 0.5) * this.config.speeds.max,
                (Math.random() - 0.5) * this.config.speeds.max
            ),
            life: 0,
            maxLife: this.config.particleLifetime * (0.5 + Math.random() * 0.5),
            size: this.config.sizes.min + Math.random() * (this.config.sizes.max - this.config.sizes.min),
            type: particleType,
            opacity: this.config.opacity.start
        };
        
        // Add some randomness to initial position
        particle.position.add(new THREE.Vector3(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50
        ));
        
        this.particles.push(particle);
        
        // Remove old particles if we exceed max count
        if (this.particles.length > this.config.maxParticles) {
            this.particles.shift();
        }
    }
    
    updateParticles(timestamp) {
        const time = timestamp * 0.001;
        
        this.particles.forEach((particle, index) => {
            particle.life += 0.016; // Assuming 60fps
            
            // Update position
            particle.position.add(particle.velocity);
            
            // Apply forces
            particle.velocity.y -= 0.01; // Slight gravity
            particle.velocity.multiplyScalar(0.99); // Air resistance
            
            // Update opacity based on life
            const lifeRatio = particle.life / particle.maxLife;
            particle.opacity = THREE.MathUtils.lerp(
                this.config.opacity.start,
                this.config.opacity.end,
                lifeRatio
            );
            
            // Remove dead particles
            if (particle.life >= particle.maxLife) {
                this.particles.splice(index, 1);
            }
        });
        
        // Update particle system geometries
        this.updateParticleGeometries();
    }
    
    updateParticleGeometries() {
        Object.keys(this.particleGroups).forEach(type => {
            const group = this.particleGroups[type];
            const typeParticles = this.particles.filter(p => p.type === type);
            
            const positions = group.system.geometry.attributes.position.array;
            const opacities = group.system.geometry.attributes.alpha.array;
            const sizes = group.system.geometry.attributes.size.array;
            
            // Clear arrays
            positions.fill(0);
            opacities.fill(0);
            sizes.fill(0);
            
            // Fill with active particles
            typeParticles.forEach((particle, i) => {
                if (i >= this.config.maxParticles) return;
                
                const i3 = i * 3;
                positions[i3] = particle.position.x;
                positions[i3 + 1] = particle.position.y;
                positions[i3 + 2] = particle.position.z;
                
                opacities[i] = particle.opacity;
                sizes[i] = particle.size;
            });
            
            // Mark for update
            group.system.geometry.attributes.position.needsUpdate = true;
            group.system.geometry.attributes.alpha.needsUpdate = true;
            group.system.geometry.attributes.size.needsUpdate = true;
            
            // Update draw range
            group.system.geometry.setDrawRange(0, Math.min(typeParticles.length, this.config.maxParticles));
        });
    }
    
    // Public methods for customization
    setEmissionRate(rate) {
        this.config.emissionRate = rate;
    }
    
    setParticleLifetime(lifetime) {
        this.config.particleLifetime = lifetime;
    }
    
    setParticleSize(min, max) {
        this.config.sizes.min = min;
        this.config.sizes.max = max;
    }
    
    pauseEmission() {
        this.config.emissionRate = 0;
    }
    
    resumeEmission(rate = 2) {
        this.config.emissionRate = rate;
    }
}

// Auto-attach to Neo Clouds when available
document.addEventListener('DOMContentLoaded', () => {
    const checkForNeoClouds = () => {
        if (window.neoClouds && window.neoClouds.initialized) {
            window.particleSystem = new CustomParticleSystem(window.neoClouds);
            
            // Initialize with default particles
            window.particleSystem.createDefaultParticles();
            
            // Hook into the animation loop
            const originalAnimate = window.neoClouds.updateClouds;
            window.neoClouds.updateClouds = function(timestamp) {
                originalAnimate.call(this, timestamp);
                window.particleSystem.update(timestamp);
            };
            
            console.log('🌟 Particle system attached to Neo Clouds');
        } else {
            setTimeout(checkForNeoClouds, 100);
        }
    };
    
    checkForNeoClouds();
});

window.CustomParticleSystem = CustomParticleSystem;