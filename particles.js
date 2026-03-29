(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    var themeColor = document.documentElement.getAttribute('data-theme') === 'light' ? '#2558cc' : '#3572ff';
    const PARTICLE_COUNT_DESKTOP = 80;
    const PARTICLE_COUNT_MOBILE = 40;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_RADIUS = 200;

    const SCROLL_FORCE = -0.03;

    let width, height, particles, mouse, particleCount;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    function getParticleCount() {
        return window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    }

    function createParticles() {
        particleCount = getParticleCount();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const bvx = (Math.random() - 0.5) * 0.6;
            const bvy = (Math.random() - 0.5) * 0.6;
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: bvx,
                vy: bvy,
                baseVx: bvx,
                baseVy: bvy,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Apply scroll momentum with per-particle variation
            p.vy += scrollVelocity * SCROLL_FORCE * (0.5 + Math.random());
            p.vx += scrollVelocity * SCROLL_FORCE * (Math.random() - 0.5);

            // Gentle push away from mouse
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.03;
                    p.vx += dx / dist * force;
                    p.vy += dy / dist * force;
                }
            }

            // Ease velocity back toward base drift
            p.vx += (p.baseVx - p.vx) * 0.02;
            p.vy += (p.baseVy - p.vy) * 0.02;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = themeColor;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = themeColor;
                    ctx.globalAlpha = 1 - dist / CONNECTION_DISTANCE;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Decay scroll velocity
        scrollVelocity *= 0.92;
        if (Math.abs(scrollVelocity) < 0.1) scrollVelocity = 0;

        if (isVisible) requestAnimationFrame(animate);
    }

    // Pause when off-screen
    let isVisible = true;
    var visObserver = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible) animate();
    }, { threshold: 0 });
    visObserver.observe(canvas);

    // Mouse tracking relative to canvas
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle touch for mobile
    canvas.addEventListener('touchmove', function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    canvas.addEventListener('touchend', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;
        scrollVelocity = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
    }, { passive: true });

    window.addEventListener('resize', function () {
        resize();
        createParticles();
    });

    resize();
    createParticles();

    window.updateParticleColor = function (color) {
        themeColor = color;
    };
})();
