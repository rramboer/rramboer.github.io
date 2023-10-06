$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script
    var typed = new Typed(".typing", {
        strings: ["I'm a Software Engineer."],
        typeSpeed: 100,
        loop: false,
        showCursor: true,
        onComplete: (self) => {
            setTimeout(() => {
                self.cursor.remove();
            }, 3200);
        }
    });

    var typed = new Typed(".typing-2", {
        strings: ["Software Engineer", "Hockey Player", "Web Designer", "Chess Player", "Options Trader", "Tennis Player", "Lifelong Learner"],
        typeSpeed: 40,
        backSpeed: 20,
        loop: true
    });

    // owl carousel script
    $('.owl-carousel').owlCarousel({
        margin: 10,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            700: {
                items: 3
            },
            1350: {
                items: 4
            },
            1650: {
                items: 5
            }
        }
    });

    const rotatingLogos = document.querySelectorAll('.skills .skills-content .card');

    rotatingLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logo.querySelector(".icon").style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(1.7)`;
        });
        logo.addEventListener('focus', () => {
            logo.querySelector(".icon").style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(1.7)`;
        });
        logo.addEventListener('mouseleave', () => {
            logo.querySelector(".icon").style.transform = `rotate(0deg) scale(1)`;
        });
        logo.addEventListener('blur', () => {
            logo.querySelector(".icon").style.transform = `rotate(0deg) scale(1)`;
        });
    });




});

