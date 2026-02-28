document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navList = document.querySelector('.nav-list');

    // Style the mobile nav list dynamically
    navList.style.transition = "all 0.3s ease-in-out";

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Toggle an active class for styling if needed
            mobileToggle.classList.toggle('active');

            // Simple toggle for the display using an inline style or class
            if (navList.style.display === 'flex' && window.innerWidth <= 768) {
                navList.style.display = 'none';
            } else if (window.innerWidth <= 768) {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '70px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                navList.style.padding = '20px 0';
                navList.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navList.style.display === 'flex') {
                navList.style.display = 'none';
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Reset styles if window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
            navList.style.position = 'static';
            navList.style.backgroundColor = 'transparent';
            navList.style.padding = '0';
            navList.style.borderBottom = 'none';
        } else if (!mobileToggle.classList.contains('active')) {
            navList.style.display = 'none';
        }
    });

    // Initial check for mobile display
    if (window.innerWidth <= 768) {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'flex';
    }

    // Header Shrink on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Multi-language Support & Translation Logic ---
    const langSwitcher = document.getElementById('language-switcher');

    // Function to apply translations
    function applyTranslations(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Save preference locally
        localStorage.setItem('preferredLanguage', lang);
    }

    // Detect or retrieve initial language
    let initialLang = localStorage.getItem('preferredLanguage');
    if (!initialLang) {
        const browserLang = navigator.language.slice(0, 2);
        if (typeof translations !== 'undefined' && translations[browserLang]) {
            initialLang = browserLang;
        } else {
            initialLang = 'en'; // Default fallback
        }
    }

    // Apply starting language to UI
    if (langSwitcher) {
        langSwitcher.value = initialLang;
        applyTranslations(initialLang);

        // Listen for manual language changes
        langSwitcher.addEventListener('change', (e) => {
            applyTranslations(e.target.value);
        });
    }
});
