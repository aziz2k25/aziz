document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click context menu to protect content
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Get references to all necessary DOM elements
    const languageSwitcher = document.getElementById('language-switcher');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const translatableElements = document.querySelectorAll('[data-lang-en]');
    
    // Set up Intersection Observer for scroll animations
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

    /**
     * Sets the website language by updating all translatable elements.
     * @param {string} lang - The language to set ('en' or 'bn').
     */
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
    
    // Event listener for the language switcher button
    languageSwitcher.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'en' ? 'bn' : 'en';
        setLanguage(newLang);
    });

    // Event listener for the mobile menu button
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Event listeners to close the mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Set the default language to Bengali on initial load
    setLanguage('bn');
});
