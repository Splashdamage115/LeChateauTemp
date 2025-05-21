document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeButton = document.querySelector('.closeButton');

    closeButton.addEventListener('click', () => {
        menuToggle.checked = false;
    });

    const slides = document.querySelectorAll('.Slideshow img');
    let currentSlide = 0;

    function showNextSlide() {
        if (slides.length === 0) {
            console.error('No slides found in the slideshow.');
            return;
        }
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 3000); // Change slide every 3 seconds
});

document.addEventListener('scroll', () => {
    const banner = document.querySelector('.Banner');
    if (window.scrollY > 100) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});

// Fetch translations from YAML file
async function fetchTranslations() {
    const response = await fetch('src/assets/translations/translations.yaml');
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}

// Language toggle functionality
fetchTranslations().then(translations => {
    const langButtons = document.querySelectorAll('.LanguageToggle button');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.id.split('-')[1];
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                const translation = translations[selectedLang]?.[key];
                if (translation) {
                    element.textContent = translation;
                } else {
                    console.warn(`Missing translation for key: ${key}`);
                }
            });
            // Update menu links
            document.querySelectorAll('.menuContent a').forEach(link => {
                const key = link.getAttribute('data-key');
                if (key) {
                    const linkTranslation = translations[selectedLang]?.[key];
                    if (linkTranslation) {
                        link.textContent = linkTranslation;
                    } else {
                        console.warn(`Missing translation for key: ${key}`);
                    }
                }
            });
        });
    });
}).catch(error => {
    console.error('Failed to load translations:', error);
});