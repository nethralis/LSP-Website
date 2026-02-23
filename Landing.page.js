// Memastikan script berjalan setelah seluruh elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fungsi Navbar Berubah Warna saat di-Scroll ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Jika layar di-scroll lebih dari 50 pixel ke bawah
        if (window.scrollY > 50) {
            header.classList.add('scrolled'); // Tambahkan efek putih & bayangan
        } else {
            header.classList.remove('scrolled'); // Kembali transparan saat di paling atas
        }
    });

    // --- 2. Efek Parallax Sederhana pada Laptop ---
    document.addEventListener('mousemove', function(e) {
        const mockup = document.getElementById('mockup');
        if (mockup) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            mockup.style.transform = `scale(0.9) translate(${xAxis}px, ${yAxis}px)`; 
            // Catatan: scale(0.9) ditambahkan kembali agar ukuran laptop tetap fit
        }
    });

    // --- 3. Interaksi menu dropdown (Opsional) ---
    const investMenu = document.getElementById('investDropdown');
    if (investMenu) {
        investMenu.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Dropdown menu untuk "Beranda" diklik!');
        });
    }
    
});