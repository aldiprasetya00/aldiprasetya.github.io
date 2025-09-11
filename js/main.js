// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {

    // --- FUNGSI SMOOTH SCROLL ---
    // Memilih semua link di nav-menu yang href-nya dimulai dengan '#'
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Mencegah perilaku default 'lompat' dari link
            e.preventDefault();
            
            // Mengambil id dari atribut href (misal: '#portfolio')
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            // Jika elemen tujuan ada, scroll ke sana dengan mulus
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FUNGSI ACTIVE LINK HIGHLIGHTING SAAT SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    // Opsi untuk Intersection Observer
    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.4 // Dianggap aktif jika 40% dari section terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link navigasi
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Dapatkan link yang sesuai dengan section yang sedang terlihat
                let correspondingLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
                
                // Tambahkan kelas 'active' ke link tersebut
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Mulai 'mengamati' setiap section
    sections.forEach(section => {
        observer.observe(section);
    });


    // --- FUNGSI THEME TOGGLE (MODE TERANG/GELAP) ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Fungsi untuk menerapkan tema berdasarkan pilihan
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            themeToggle.checked = true; // Set checkbox ke posisi 'on'
        } else {
            document.body.removeAttribute('data-theme');
            themeToggle.checked = false; // Set checkbox ke posisi 'off'
        }
    }

    // Saat halaman dimuat, periksa apakah ada tema yang tersimpan di localStorage
    if (currentTheme) {
        applyTheme(currentTheme);
    }

    // Tambahkan event listener untuk tombol toggle
    themeToggle.addEventListener('change', function() {
        // Tentukan tema berdasarkan status checkbox
        let theme = this.checked ? 'light' : 'dark';
        
        // Terapkan tema yang dipilih
        applyTheme(theme);
        
        // Simpan pilihan tema ke localStorage
        localStorage.setItem('theme', theme);
    });

});