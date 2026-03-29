document.addEventListener('DOMContentLoaded', function () {
    // initialize lucide icons
    lucide.createIcons();

    // print shortcut opens resume PDF instead
    window.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.open('https://rramboer.github.io/resume/', '_blank');
        }
    });

    // navbar sticky + scroll-up button
    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.navbar');
        var scrollBtn = document.querySelector('.scroll-up-btn');
        if (window.scrollY > 20) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // slide-up script
    document.querySelector('.scroll-up-btn').addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // toggle menu/navbar script
    var menuBtn = document.querySelector('.menu-btn');
    var menu = document.querySelector('.navbar .menu');

    function toggleMenu() {
        menu.classList.toggle('active');
        var svg = menuBtn.querySelector('svg');
        var isOpen = menu.classList.contains('active');
        var newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        svg.replaceWith(newIcon);
        menuBtn.setAttribute('aria-expanded', isOpen);
        lucide.createIcons();
    }

    menuBtn.addEventListener('click', toggleMenu);

    // close mobile menu on nav link click
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // typing animation script
    new Typed(".typing", {
        strings: ["I'm a Software Engineer."],
        typeSpeed: 100,
        loop: false,
        showCursor: true,
        onComplete: function (self) {
            setTimeout(function () {
                self.cursor.remove();
            }, 3200);
        }
    });

    new Typed(".typing-2", {
        strings: ["Software Engineer", "AI Enthusiast", "Hockey Player", "Web Designer", "Chess Player", "Options Trader", "Tennis Player", "Lifelong Learner"],
        typeSpeed: 40,
        backSpeed: 20,
        loop: true
    });

    // projects carousel (Swiper)
    new Swiper('.carousel', {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        grabCursor: true,
        speed: 1200,
        autoplay: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : {
            delay: 3000,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            400: { slidesPerView: 2 },
            700: { slidesPerView: 3 },
            1350: { slidesPerView: 4 },
            1650: { slidesPerView: 5 },
        }
    });

    // skill icon hover: scale + brand color glow
    var skillCards = document.querySelectorAll('.skills .skills-content .card');

    skillCards.forEach(function (card) {
        var icon = card.querySelector('.icon');
        var color = card.dataset.color || '#60a5fa';

        card.addEventListener('mouseenter', function () {
            icon.style.transform = 'scale(1.2)';
            card.style.borderColor = color + '60';
            card.style.boxShadow = '0 0 20px ' + color + ', 0 0 40px ' + color + '80';
        });

        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            card.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, ' + color + '55 0%, transparent 65%)';
        });

        card.addEventListener('mouseleave', function () {
            icon.style.transform = 'scale(1)';
            card.style.borderColor = '';
            card.style.boxShadow = '';
            card.style.background = '';
        });

        card.addEventListener('focus', function () {
            icon.style.transform = 'scale(1.2)';
            card.style.borderColor = color + '60';
            card.style.boxShadow = '0 0 20px ' + color + ', 0 0 40px ' + color + '80';
            card.style.background = 'radial-gradient(circle at 50% 50%, ' + color + '55 0%, transparent 65%)';
        });

        card.addEventListener('blur', function () {
            icon.style.transform = 'scale(1)';
            card.style.borderColor = '';
            card.style.boxShadow = '';
            card.style.background = '';
        });
    });

    // degree card mouse glow
    var degreeCard = document.querySelector('.education .educ-content .degree');
    var degreeColor = '#3572ff';

    degreeCard.addEventListener('mousemove', function (e) {
        var rect = degreeCard.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        degreeCard.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, ' + degreeColor + '30 0%, transparent 50%)';
        degreeCard.style.borderColor = degreeColor + '40';
    });

    degreeCard.addEventListener('mouseleave', function () {
        degreeCard.style.background = '';
        degreeCard.style.borderColor = '';
    });

    // scroll reveal
    var revealElements = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (el) {
        observer.observe(el);
    });
});
