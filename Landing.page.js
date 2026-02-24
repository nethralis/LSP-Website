// Memastikan script berjalan setelah seluruh elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fungsi Navbar Berubah Warna saat di-Scroll ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Jika layar di-scroll lebih dari 50 pixel ke bawah
        if (window.scrollY > 50) {
            header.classList.add('scrolled'); // Tambahkan efek putih & bayangan
        } else {
            header.classList.remove('scrolled'); // Kembali transparan
        }
    });

    // --- 2. Efek Parallax Sederhana pada Laptop ---
    document.addEventListener('mousemove', function(e) {
        const mockup = document.getElementById('mockup');
        if (mockup) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60; // Disesuaikan agar lebih halus
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
            
            mockup.style.transform = `scale(0.9) translate(${xAxis}px, ${yAxis}px)`; 
        }
    });

    // --- 3. Fungsi Tombol Scroll ke Atas (Di Footer) ---
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah reload halaman
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Efek gulir mulus
            });
        });
    }

    // --- 4. Animasi Scroll Reveal (Muncul Perlahan saat di-Scroll) ---
    // Memilih semua elemen yang ingin dianimasikan
    const revealElements = document.querySelectorAll('.about-container, .aspek-card, .skema-card, .berita-card, .section-header');

    // Pengaturan kapan animasi dipicu (saat elemen 15% terlihat di layar)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Menambahkan class 'reveal-active' saat elemen terlihat
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Hentikan observasi agar animasi hanya jalan 1x
            }
        });
    }, revealOptions);

    // Menjalankan observer ke setiap elemen
    revealElements.forEach(el => {
        el.classList.add('reveal-item'); // Tambahkan class awal untuk menyembunyikan elemen
        revealOnScroll.observe(el);
    });

    // --- 5. Interaksi Dropdown Menu "Beranda" ---
    // (Mengganti id investDropdown yang sudah tidak kita pakai)
    const berandaMenu = document.querySelector('.nav-right a:first-child');
    if (berandaMenu) {
        berandaMenu.addEventListener('click', function(e) {
            e.preventDefault();
            // Anda bisa mengganti ini dengan fungsi dropdown sungguhan nantinya
            console.log('Menu dropdown diklik');
        });
    }
    
});