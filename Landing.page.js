document.addEventListener("DOMContentLoaded", () => {
    // 0. Scroll Progress Bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navUl = document.querySelector("nav ul");

    menuToggle.addEventListener("click", () => {
        navUl.classList.toggle("active");
    });

    // 2. Dark Mode Toggle
    const darkToggle = document.getElementById("darkToggle");
    const body = document.body;
    
    // Cek preferensi sebelumnya di localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkToggle.textContent = "☀️";
    }

    darkToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkToggle.textContent = "☀️"; // Ubah icon
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkToggle.textContent = "🌙"; // Ubah icon
        }
    });

    // 3. Hero Slider Logic
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".arrow.left");
    const btnRight = document.querySelector(".arrow.right");
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove("active"));
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add("active");
    };

    const nextSlide = () => {
        currentSlide++;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide--;
        showSlide(currentSlide);
    };

    // Auto slide setiap 5 detik
    const startSlider = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    const resetSlider = () => {
        clearInterval(slideInterval);
        startSlider();
    };

    btnRight.addEventListener("click", () => {
        nextSlide();
        resetSlider(); // Reset timer saat diklik manual
    });

    btnLeft.addEventListener("click", () => {
        prevSlide();
        resetSlider();
    });

    startSlider(); // Inisialisasi auto-slide

    // 4. Smooth Scrolling Navbar Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navUl.classList.remove("active"); // Tutup menu mobile jika terbuka
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 5. Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Panggil sekali saat halaman dimuat

    // 6. Counter Animation untuk Statistik
    const counterAnimation = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Kecepatan animasi
        let countersStarted = false;

        const startCounters = () => {
            if (!countersStarted) {
                countersStarted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / speed;

                    const updateCount = () => {
                        const count = +counter.innerText;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                });
            }
        };

        // Trigger saat elemen masuk viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    };

    counterAnimation();