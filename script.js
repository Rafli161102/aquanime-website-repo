document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (e.g., Visi & Misi in Tentang page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hamburger menu for mobile navigation
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const header = document.querySelector('header');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Simple form submission (for contact form)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            alert('Pesan Anda telah terkirim! (Fungsionalitas ini adalah contoh dan tidak mengirim data ke server.)');

            contactForm.reset();
        });
    }

    // ========================================= //
    // HEADER SCROLL EFFECT                      //
    // ========================================= //
    // Aktifkan efek scroll untuk header di SEMUA halaman
    if (header) { // Periksa apakah elemen header ada
         window.addEventListener('scroll', () => {
            if (window.scrollY > 100) { // Setelah scroll 100px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        // Panggil saat DOMContentLoaded untuk set state awal jika halaman dimuat tidak dari top
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        }
    }


    // ========================================= //
    // SCROLL ANIMATION (Fade In / Fade Out)     //
    // ========================================= //

    const elementsToAnimate = document.querySelectorAll(
        '.homepage-section .animate-target, ' + /* Konten utama di homepage */
        'main:not(.homepage-main-content) .content-section, ' + /* Konten di halaman lain */
        'main:not(.homepage-main-content) .partners-section, ' + /* Seksi partner di halaman lain */
        'main:not(.homepage-main-content) .contact-section' /* Seksi kontak di halaman lain */
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            } else {
                entry.target.classList.remove('fade-in-active');
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // ========================================= //
    // TESTIMONIAL SLIDER LOGIC                  //
    // ========================================= //
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let itemsPerView = 3; // Default for desktop

    function updateItemsPerView() {
        if (window.innerWidth <= 767) { // Mobile
            itemsPerView = 1;
        } else if (window.innerWidth <= 992) { // Tablet
            itemsPerView = 2;
        } else { // Desktop
            itemsPerView = 3;
        }
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalItems = document.querySelectorAll('.testimonial-item').length;
        const totalSlides = Math.ceil(totalItems / itemsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        if (testimonialItems.length === 0 || !slider) return;

        const itemStyle = getComputedStyle(testimonialItems[0]);
        const itemMarginLeft = parseFloat(itemStyle.marginLeft);
        const itemMarginRight = parseFloat(itemStyle.marginRight);
        const itemWidthWithMargin = testimonialItems[0].offsetWidth + itemMarginLeft + itemMarginRight;
        
        let offset = -currentIndex * itemWidthWithMargin;

        slider.style.transform = `translateX(${offset}px)`;

        // Update active dot
        if (dotsContainer) {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Update active testimonial item (for scaling effect)
        testimonialItems.forEach((item, index) => {
            item.classList.remove('active-slide');
            if (itemsPerView === 1) {
                if (index === currentIndex) {
                    item.classList.add('active-slide');
                }
            } else if (itemsPerView === 2) {
                if (index === currentIndex || index === currentIndex + 1) {
                    item.classList.add('active-slide');
                }
            } else { // itemsPerView === 3
                if (index === currentIndex || index === currentIndex + 1 || index === currentIndex + 2) {
                    item.classList.add('active-slide');
                }
            }
        });
    }


    if (slider && prevBtn && nextBtn) { // Pastikan elemen slider ada di halaman
        updateItemsPerView();
        createDots();
        updateSlider(); // Initial update

        prevBtn.addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.testimonial-item').length;
            const totalSlides = Math.ceil(totalItems / itemsPerView);
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.testimonial-item').length;
            const totalSlides = Math.ceil(totalItems / itemsPerView);
            currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        // Update slider on window resize
        window.addEventListener('resize', () => {
            updateItemsPerView();
            createDots();
            updateSlider();
        });
    }

    // ========================================= //
    // BACKGROUND MUSIC ON PROJECT CLICK         //
    // ========================================= //
    const projectCards = document.querySelectorAll('.project-card');
    let currentAudio = null;

    projectCards.forEach(card => {
        const audioSrc = card.dataset.audio;
        const playBtn = card.querySelector('.play-audio-btn');

        if (audioSrc && playBtn) {
            playBtn.addEventListener('click', (event) => {
                event.stopPropagation();

                if (currentAudio && currentAudio.src === new URL(audioSrc, window.location.href).href) {
                    currentAudio.pause();
                    currentAudio = null;
                    playBtn.innerHTML = '<i class="fas fa-play"></i> Dengar Audio';
                    playBtn.classList.remove('playing');
                } else {
                    if (currentAudio) {
                        currentAudio.pause();
                        document.querySelectorAll('.play-audio-btn').forEach(btn => {
                            if (btn !== playBtn) {
                                btn.innerHTML = '<i class="fas fa-play"></i> Dengar Audio';
                                btn.classList.remove('playing');
                            }
                        });
                    }

                    currentAudio = new Audio(audioSrc);
                    currentAudio.play().then(() => {
                        playBtn.innerHTML = '<i class="fas fa-pause"></i> Sedang Diputar';
                        playBtn.classList.add('playing');
                    }).catch(error => {
                        console.error('Error playing audio:', error);
                        alert('Tidak dapat memutar audio. Pastikan file tersedia dan format didukung. Browser mungkin memblokir autoplay.');
                    });

                    currentAudio.onended = () => {
                        playBtn.innerHTML = '<i class="fas fa-play"></i> Dengar Audio';
                        playBtn.classList.remove('playing');
                        currentAudio = null;
                    };
                }
            });
        }
    });
});