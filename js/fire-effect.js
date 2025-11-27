document.addEventListener('DOMContentLoaded', () => {
    // Only init Three.js if library is loaded
    if (typeof THREE !== 'undefined') {
        initThreeJS();
    }
    
    // Only init cursor trail on non-touch devices
    if (!('ontouchstart' in window)) {
        initCursorTrail();
    }
});

let threeRenderer = null;
let animationFrameId = null;

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    // Add some fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Reduce pixel ratio on mobile for performance
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    threeRenderer = renderer;
    container.appendChild(renderer.domElement);

    // Create Particles - reduce count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 500 : 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0xff4d4d); // Red
    const color2 = new THREE.Color(0xffd700); // Yellow
    const color3 = new THREE.Color(0xff8c00); // Orange

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100 - 20; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

        // Randomize colors between red, orange, yellow
        const mixedColor = color1.clone().lerp(color2, Math.random());
        if (Math.random() > 0.5) mixedColor.lerp(color3, Math.random());
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;

        sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Shader Material for glowing particles
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            pointTexture: { value: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/spark1.png') }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            void main() {
                vColor = color;
                vec3 pos = position;
                // Add some wave motion
                pos.y += sin(time * 2.0 + pos.x * 0.1) * 2.0;
                pos.x += cos(time * 1.5 + pos.y * 0.2) * 1.0;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
                gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                if (gl_FragColor.a < 0.5) discard;
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop
    const clock = new THREE.Clock();
    
    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        material.uniforms.time.value = time;

        // Rotate the entire system slightly
        particles.rotation.y = time * 0.05;
        particles.rotation.z = time * 0.02;

        // Move particles up to simulate rising fire
        const positions = particles.geometry.attributes.position.array;
        for(let i = 0; i < particleCount; i++) {
            // Reset if too high
            if (positions[i * 3 + 1] > 50) {
                positions[i * 3 + 1] = -50;
            } else {
                positions[i * 3 + 1] += 0.1 + Math.random() * 0.1;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 100);
    });
}

function initCursorTrail() {
    const trailCount = 20;
    const trails = [];
    const colors = ['#ff4d4d', '#ffd700', '#ff8c00'];

    for (let i = 0; i < trailCount; i++) {
        const div = document.createElement('div');
        div.className = 'cursor-trail';
        document.body.appendChild(div);
        trails.push({
            element: div,
            x: 0,
            y: 0,
            life: 0
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        // Shift trails
        for (let i = trails.length - 1; i > 0; i--) {
            trails[i].x = trails[i-1].x;
            trails[i].y = trails[i-1].y;
            trails[i].life = trails[i-1].life;
        }

        trails[0].x = mouseX;
        trails[0].y = mouseY;
        trails[0].life = 1;

        trails.forEach((trail, index) => {
            const scale = (trailCount - index) / trailCount;
            trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) scale(${scale})`;
            trail.element.style.opacity = scale;
            trail.element.style.backgroundColor = colors[index % colors.length];
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}
