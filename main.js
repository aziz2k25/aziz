document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click context menu
    document.addEventListener('contextmenu', event => event.preventDefault());

    const languageSwitcher = document.getElementById('language-switcher');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const translatableElements = document.querySelectorAll('[data-lang-en]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.body.lang = lang;

        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.innerHTML = text;
            }
        });
        
        languageSwitcher.innerText = (lang === 'en') ? 'বাংলা' : 'English';
    }
    
    languageSwitcher.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'en' ? 'bn' : 'en';
        setLanguage(newLang);
    });

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Set default language to Bengali
    setLanguage('bn');
});

